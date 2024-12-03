import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  UseGuards,
} from "@nestjs/common";
import { ExpenseService } from "./expense.service";
import { CreateExpenseDto } from "./dto/createExpense.dto";
import { AtGuard } from "src/common/guards";
import { GetCurrentUserId } from "src/common/decorators";

@Controller("api/expense")
export class ExpenseController {
  constructor(private expenseService: ExpenseService) {}

  @Post("/create")
  @HttpCode(HttpStatus.OK)
  @UseGuards(AtGuard)
  async create(
    @Body() createExpenseDto: CreateExpenseDto,
    @GetCurrentUserId() userId: string,
  ) {
    return this.expenseService.create(createExpenseDto, userId);
  }

  @Get("/get-all")
  @HttpCode(HttpStatus.OK)
  @UseGuards(AtGuard)
  async getAll(@GetCurrentUserId() userId: string) {
    return this.expenseService.getAll(userId);
  }

  @Get("/get-by-id/:expenseId")
  @HttpCode(HttpStatus.OK)
  @UseGuards(AtGuard)
  async getById(@Param("expenseId") expenseId: string) {
    return this.expenseService.getById(expenseId);
  }

  @Put("/update/:expenseId")
  @HttpCode(HttpStatus.OK)
  @UseGuards(AtGuard)
  async update(
    @Param("expenseId") expenseId: string,
    @Body() dto: CreateExpenseDto,
  ) {
    return this.expenseService.update(expenseId, dto);
  }

  @Delete("/delete/:expenseId")
  @HttpCode(HttpStatus.OK)
  @UseGuards(AtGuard)
  async delete(@Param("expenseId") expenseId: string) {
    return this.expenseService.delete(expenseId);
  }
}