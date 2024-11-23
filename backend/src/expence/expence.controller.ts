import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
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
  async getById(
    @GetCurrentUserId() userId: string,
    @Param("expenceId") expenceId: string,
  ) {
    return this.expenceService.getById(userId, expenceId);
  }
}
