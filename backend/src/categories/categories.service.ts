import { Injectable } from "@nestjs/common";
import { CustomException } from "src/common/exceptions/custom-exception";
import { PrismaService } from "src/prisma/prisma.service";
import { TotalExpensesByCategory } from "./types/totalExpensesByCategoryResponse";

@Injectable()
export class CategoriesService {
  constructor(private prisma: PrismaService) {}

  async get(): Promise<{
    message: string;
    data: { id: number; name: string }[];
  }> {
    try {
      const categories = await this.prisma.categories.findMany();

      return {
        message: "Categories fetched successfully",
        data: categories.sort((a, b) => a.id - b.id),
      };
    } catch (error) {
      throw new CustomException(
        "An error occurred while fetching categories",
        400,
        error,
      );
    }
  }

  async getTotalExpensesByCategory(
    userId: string,
  ): Promise<TotalExpensesByCategory> {
    const totalExpensesByCategory = await this.prisma.categories
      .findMany({
        select: {
          id: true,
          name: true,
          categoryLimits: true,
          expenses: {
            where: {
              userId: userId,
            },
            select: {
              price: true,
              currency: true,
            },
          },
        },
      })
      .then((categories) =>
        categories.map((category) => {
          const tryExpenses = category.expenses
            .filter((expense) => expense.currency === "TRY")
            .reduce((total, expense) => total + expense.price, 0);

          const usdExpenses = category.expenses
            .filter((expense) => expense.currency === "USD")
            .reduce((total, expense) => total + expense.price, 0);

          return {
            categoryId: category.id,
            categoryName: category.name,
            totalExpense: {
              TRY: tryExpenses,
              USD: usdExpenses,
            },
          };
        }),
      );
    return {
      message: "Total expenses were calculated by categories.",
      data: totalExpensesByCategory,
    };
  }

  async getAllCategoryExpenseDetails(userId: string) {
    const categories = await this.prisma.categoryLimit.findMany({
      where: { userId },
      include: {
        category: {
          include: {
            expenses: true,
          },
        },
      },
    });

    return categories.map((categoryLimit) => {
      const totalSpent = categoryLimit.category.expenses.reduce(
        (sum, expense) => sum + (expense.price || 0),
        0,
      );

      return {
        categoryName: categoryLimit.category.name,
        limit: categoryLimit.limit,
        totalSpent,
        isLimitExceeded: totalSpent > (categoryLimit.limit || 0),
      };
    });
  }
}
