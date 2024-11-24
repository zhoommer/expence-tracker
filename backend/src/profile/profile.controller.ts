import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Patch,
  UseGuards,
} from "@nestjs/common";
import { ProfileService } from "./profile.service";
import { AtGuard } from "src/common/guards";
import { GetCurrentUserId } from "src/common/decorators";

@Controller("api/profile")
export class ProfileController {
  constructor(private profileService: ProfileService) {}

  @Get("/me")
  @HttpCode(HttpStatus.OK)
  @UseGuards(AtGuard)
  async getProfile(@GetCurrentUserId() userId: string) {
    return this.profileService.getProfile(userId);
  }

  @Patch("/update-image")
  @HttpCode(HttpStatus.OK)
  @UseGuards(AtGuard)
  async updateImage(@GetCurrentUserId() userId: string, dto: any) {
    return this.profileService.updateImage(userId, dto);
  }
}
