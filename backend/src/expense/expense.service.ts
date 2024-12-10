import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { PriceService } from "src/common/formatter/priceService";
import { CreateExpenseDto } from "./dto/createExpense.dto";
import { CustomException } from "src/common/exceptions/custom-exception";
import { Expense } from "./types/expense.type";

@Injectable()
export class ExpenseService {
  constructor(
    private prisma: PrismaService,
    private priceService: PriceService,
  ) {}

  async create(
    createExpenseDto: CreateExpenseDto,
    userId: string,
  ): Promise<{ message: string; data: Expense }> {
    const { name, categoryId, amount, price, currency } = createExpenseDto;
    const category = await this.prisma.categories.findUnique({
      where: { id: categoryId },
    });

    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) throw new CustomException("User not found", 404);

    if (!category) {
      throw new CustomException("Category not found", 404);
    }

    const expense = await this.prisma.expense.create({
      data: {
        name,
        categoryId,
        userId,
        amount,
        price,
        currency,
      },
    });

    return {
      message: "Expense created successfully",
      data: {
        id: expense.id,
        name: expense.name,
        categoryId: expense.categoryId,
        category: category.name,
        amount: expense.amount,
        price: this.priceService.formatPrice(expense.price, expense.currency),
        createdAt: expense.createdAt.toLocaleString(),
        updatedAt: expense.updatedAt.toLocaleString(),
      },
    };
  }

  async getAll(
    userId: string,
    query?: string,
    page?: number,
    limit?: number,
  ): Promise<{
    message: string;
    data: Expense[];
    totalElements: number;
  }> {
    const offset = (page - 1) * limit;
    try {
      const allExpenses = await this.prisma.expense.findMany({
        where: {
          userId,
          name: {
            contains: query,
          },
        },
        take: limit,
        skip: offset,
        orderBy: {
          createdAt: "desc",
        },
        include: { category: true },
      });

      const totalExpenses = await this.prisma.expense.findMany({
        where: { userId },
      });

      const totalElements = totalExpenses.length;

      return {
        message: "All expenses fetch successfully",
        data: allExpenses.map((expense) => {
          return {
            id: expense.id,
            name: expense.name,
            categoryId: expense.categoryId,
            category: expense.category.name,
            amount: expense.amount,
            price: this.priceService.formatPrice(
              expense.price,
              expense.currency,
            ),
            createdAt: expense.createdAt.toLocaleString(),
            updatedAt: expense.updatedAt.toLocaleString(),
          };
        }),
        totalElements: query ? allExpenses.length : totalElements,
      };
    } catch (error) {
      throw new CustomException(
        "An error occurred while fetching expenses",
        404,
        error,
      );
    }
  }

  async getById(
    expenseId: string,
  ): Promise<{ message: string; data: Expense }> {
    try {
      const expense = await this.prisma.expense.findUnique({
        where: {
          id: Number(expenseId),
        },
        include: { category: true },
      });
      return {
        message: "Expense fetch successfully",
        data: {
          id: expense.id,
          name: expense.name,
          categoryId: expense.categoryId,
          category: expense.category.name,
          amount: expense.amount,
          price: this.priceService.formatPrice(expense.price, expense.currency),
          createdAt: expense.createdAt.toLocaleString(),
          updatedAt: expense.updatedAt.toLocaleString(),
        },
      };
    } catch (error) {
      throw new CustomException(
        "An error occurred while fetching expense",
        404,
        error,
      );
    }
  }

  async update(
    expenseId: string,
    dto: CreateExpenseDto,
  ): Promise<{ message: string; data: Expense }> {
    try {
      const updatedExpense = await this.prisma.expense.update({
        where: {
          id: Number(expenseId),
        },
        data: {
          name: dto.name,
          categoryId: dto.categoryId,
          amount: dto.amount,
          price: dto.price,
        },
        include: { category: true },
      });
      return {
        message: "Expense updated successfully",
        data: {
          id: updatedExpense.id,
          name: updatedExpense.name,
          categoryId: updatedExpense.categoryId,
          category: updatedExpense.category.name,
          amount: updatedExpense.amount,
          price: this.priceService.formatPrice(
            updatedExpense.price,
            updatedExpense.currency,
          ),
          createdAt: updatedExpense.createdAt.toLocaleString(),
          updatedAt: updatedExpense.updatedAt.toLocaleString(),
        },
      };
    } catch (error) {
      throw new CustomException("Expense not updated", 404, error);
    }
  }

  async delete(expenseId: string): Promise<{ message: string; data: Expense }> {
    try {
      const response = await this.prisma.expense.delete({
        where: {
          id: Number(expenseId),
        },
        include: { category: true },
      });
      return {
        message: "Expense successfully deleted",
        data: {
          id: response.id,
          name: response.name,
          categoryId: response.categoryId,
          category: response.category.name,
          amount: response.amount,
          price: this.priceService.formatPrice(
            response.price,
            response.currency,
          ),
          createdAt: response.createdAt.toLocaleString(),
          updatedAt: response.updatedAt.toLocaleString(),
        },
      };
    } catch (error) {
      throw new CustomException("Expense cannot delete", 400, error);
    }
  }
}
