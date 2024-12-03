import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateExpenseDto } from "./dto/createExpense.dto";
import { CustomException } from "src/common/exceptions/custom-exception";
import { ExpenseResponse } from "./types/expenseResponse.type";
import { ListAllResponse } from "./types/listAllExpenseResponse.type";

@Injectable()
export class ExpenseService {
  constructor(private prisma: PrismaService) {}

  async create(
    createExpenseDto: CreateExpenseDto,
    userId: string,
  ): Promise<ExpenseResponse> {
    const { name, categoryId, amount, price } = createExpenseDto;
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
      },
    });

    return {
      message: "Expense created successfully",
      data: expense,
    };
  }

  async getAll(userId: string): Promise<ListAllResponse> {
    try {
      const allExpenses = await this.prisma.expense.findMany({
        where: { userId },
      });

      return {
        message: "All expenses fetch successfully",
        data: allExpenses,
      };
    } catch (error) {
      throw new CustomException(
        "An error occurred while fetching expenses",
        404,
        error,
      );
    }
  }

  async getById(expenseId: string): Promise<ExpenseResponse> {
    try {
      const expense = await this.prisma.expense.findUnique({
        where: {
          id: Number(expenseId),
        },
      });
      return {
        message: "Expense fetch successfully",
        data: expense,
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
  ): Promise<ExpenseResponse> {
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
      });
      return {
        message: "Expense updated successfully",
        data: updatedExpense,
      };
    } catch (error) {
      throw new CustomException("Expense not updated", 404, error);
    }
  }

  async delete(expenseId: string): Promise<ExpenseResponse> {
    try {
      const response = await this.prisma.expense.delete({
        where: {
          id: Number(expenseId),
        },
      });
      return {
        message: "Expense successfully deleted",
        data: response,
      };
    } catch (error) {
      throw new CustomException("Expense cannot delete", 400, error);
    }
  }
}
