import { Module } from "@nestjs/common";
import { CategoriesService } from "./categories.service";
import { CategoriesController } from "./categories.controller";
import { PriceService } from "src/common/formatter/priceService";

@Module({
  providers: [CategoriesService, PriceService],
  controllers: [CategoriesController],
})
export class CategoriesModule {}
