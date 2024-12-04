import { Injectable } from "@nestjs/common";
import { CustomException } from "src/common/exceptions/custom-exception";
import { PrismaService } from "src/prisma/prisma.service";

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
        data: categories,
      };
    } catch (error) {
      throw new CustomException(
        "An error occurred while fetching categories",
        400,
        error,
      );
    }
  }
}
