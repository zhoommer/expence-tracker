import { Controller, Get, HttpCode, HttpStatus } from "@nestjs/common";
import { CategoriesService } from "./categories.service";

@Controller("api/categories")
export class CategoriesController {
  constructor(private categoriesService: CategoriesService) {}

  @Get("/get-all")
  @HttpCode(HttpStatus.OK)
  get() {
    return this.categoriesService.get();
  }
}
