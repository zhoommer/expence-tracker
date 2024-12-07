import { Controller, Get, HttpCode, HttpStatus } from "@nestjs/common";
import { CategoriesService } from "./categories.service";
import { GetCurrentUserId } from "src/common/decorators";

@Controller("api/categories")
export class CategoriesController {
  constructor(private categoriesService: CategoriesService) {}

  @Get("/get-all")
  @HttpCode(HttpStatus.OK)
  get() {
    return this.categoriesService.get();
  }

  @Get("/get-total-expenses-by-category")
  @HttpCode(HttpStatus.OK)
  getTotalExpensesByCategory(@GetCurrentUserId() userId: string) {
    return this.categoriesService.getTotalExpensesByCategory(userId);
  }
}
