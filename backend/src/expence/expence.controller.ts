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
import { ExpenceService } from "./expence.service";
import { CreateExpenceDto } from "./dto/createExpence.dto";
import { AtGuard } from "src/common/guards";
import { GetCurrentUserId } from "src/common/decorators";

@Controller("api/expence")
export class ExpenceController {
  constructor(private expenceService: ExpenceService) {}

  @Post("/create")
  @HttpCode(HttpStatus.OK)
  @UseGuards(AtGuard)
  async create(
    @Body() createExpenceDto: CreateExpenceDto,
    @GetCurrentUserId() userId: string,
  ) {
    return this.expenceService.create(createExpenceDto, userId);
  }

  @Get("/get-all")
  @HttpCode(HttpStatus.OK)
  @UseGuards(AtGuard)
  async getAll(@GetCurrentUserId() userId: string) {
    return this.expenceService.getAll(userId);
  }

  @Get("/get-by-id/:expenceId")
  @HttpCode(HttpStatus.OK)
  @UseGuards(AtGuard)
  async getById(@Param("expenceId") expenceId: string) {
    return this.expenceService.getById(expenceId);
  }

  @Put("/update/:expenceId")
  @HttpCode(HttpStatus.OK)
  @UseGuards(AtGuard)
  async update(
    @Param("expenceId") expenceId: string,
    @Body() dto: CreateExpenceDto,
  ) {
    return this.expenceService.update(expenceId, dto);
  }

  @Delete("/delete/:expenceId")
  @HttpCode(HttpStatus.OK)
  @UseGuards(AtGuard)
  async delete(@Param("expenceId") expenceId: string) {
    return this.expenceService.delete(expenceId);
  }

  @Get("/get-total-by-category")
  @HttpCode(HttpStatus.OK)
  @UseGuards(AtGuard)
  async getTotalByCategory(@GetCurrentUserId() userId: string) {
    return this.expenceService.getTotalByCategory(userId);
  }
}
