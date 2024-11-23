import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateExpenceDto } from "./dto/createExpence.dto";
import { CustomException } from "src/common/exceptions/custom-exception";
import { ExpenceResponse } from "./types/expenceResponse.type";
import { ListAllResponse } from "./types/listAllExpenceResponse.type";

@Injectable()
export class ExpenceService {
  constructor(private prisma: PrismaService) {}

  async create(
    createExpenceDto: CreateExpenceDto,
    userId: string,
  ): Promise<ExpenceResponse> {
    const { name, categoryId, amount, price } = createExpenceDto;
    const category = await this.prisma.expenceCategories.findUnique({
      where: { id: categoryId },
    });

    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) throw new CustomException("User not found", 404);

    if (!category) {
      throw new CustomException("Category not found", 404);
    }

    const expence = await this.prisma.expence.create({
      data: {
        name,
        categoryId,
        userId,
        amount,
        price,
      },
    });

    return {
      message: "Expence created successfully",
      data: expence,
    };
  }

  async getAll(userId: string): Promise<ListAllResponse> {
    try {
      const allExpences = await this.prisma.expence.findMany({
        where: { userId },
      });

      return {
        message: "All expences fetch successfully",
        data: allExpences,
      };
    } catch (error) {
      throw new CustomException(
        "An error occurred while fetching expenses",
        404,
        error,
      );
    }
  }

  async getById(expenceId: string): Promise<ExpenceResponse> {
    try {
      const expence = await this.prisma.expence.findUnique({
        where: {
          id: Number(expenceId),
        },
      });
      return {
        message: "Expence fetch successfully",
        data: expence,
      };
    } catch (error) {
      throw new CustomException(
        "An error occurred while fetching expence",
        404,
        error,
      );
    }
  }

  async update(
    expenceId: string,
    dto: CreateExpenceDto,
  ): Promise<ExpenceResponse> {
    try {
      const updatedExpence = await this.prisma.expence.update({
        where: {
          id: Number(expenceId),
        },
        data: {
          name: dto.name,
          categoryId: dto.categoryId,
          amount: dto.amount,
          price: dto.price,
        },
      });
      return {
        message: "Expence updated successfully",
        data: updatedExpence,
      };
    } catch (error) {
      throw new CustomException("Expence not updated", 404, error);
    }
  }

  async delete(expenceId: string): Promise<ExpenceResponse> {
    try {
      const response = await this.prisma.expence.delete({
        where: {
          id: Number(expenceId),
        },
      });
      return {
        message: "Expence successfully deleted",
        data: response,
      };
    } catch (error) {
      throw new CustomException("Expence cannot delete", 400, error);
    }
  }
}
