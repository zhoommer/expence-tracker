import { Controller, Get, HttpCode, HttpStatus } from "@nestjs/common";
import { CategoriesService } from "./categories.service";
import { GetCurrentUserId } from "src/common/decorators";
import { CustomException } from "src/common/exceptions/custom-exception";

@Controller("api/categories")
export class CategoriesController {
  constructor(private categoriesService: CategoriesService) {}

  @Get("/get-all")
  @HttpCode(HttpStatus.OK)
  get() {
    return this.categoriesService.get();
  }

  @Get("/get-categories-of-spending")
  @HttpCode(HttpStatus.OK)
  getCategoriesOfSpending(@GetCurrentUserId() userId: string) {
    if (!userId) throw new CustomException("User not found", 404);
    return this.categoriesService.getUserCategoriesOfSpending(userId);
  }

  @Get("/get-total-expenses-by-category")
  @HttpCode(HttpStatus.OK)
  getTotalExpensesByCategory(@GetCurrentUserId() userId: string) {
    return this.categoriesService.getTotalExpensesByCategory(userId);
  }

  @Get("/check-expenses")
  @HttpCode(HttpStatus.OK)
  async getCategoryExpenseDetails(@GetCurrentUserId() userId: string) {
    return this.categoriesService.getAllCategoryExpenseDetails(userId);
  }
}
