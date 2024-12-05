import { Module } from "@nestjs/common";
import { ExpenseService } from "./expense.service";
import { ExpenseController } from "./expense.controller";
import { PriceService } from "src/common/formatter/priceService";

@Module({
  providers: [ExpenseService, PriceService],
  controllers: [ExpenseController],
})
export class ExpenseModule {}
