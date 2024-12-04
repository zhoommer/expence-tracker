import { Injectable } from "@nestjs/common";
import { CustomException } from "src/common/exceptions/custom-exception";
import { PrismaService } from "src/prisma/prisma.service";
import { Profile } from "./types/profile.type";

@Injectable()
export class ProfileService {
  constructor(private readonly prisma: PrismaService) {}

  async getProfile(
    userId: string,
  ): Promise<{ message: string; data: Profile }> {
    try {
      const profile = await this.prisma.profile.findUnique({
        where: { userId },
        include: { user: true },
      });

      const { image, phone, gender, lastname, birthDate, firstname } = profile;

      return {
        message: "Profile successfully fetched",
        data: {
          image,
          phone,
          gender,
          userId: profile.userId,
          lastname,
          birthDate,
          firstname,
          email: profile.user.email,
        },
      };
    } catch (error) {
      throw new CustomException(
        "An error occured when fetching profile",
        404,
        error,
      );
    }
  }

  async updateImage(userId: string, dto: any) {
    const profile = await this.prisma.profile.update({
      where: { userId },
      data: {
        image: dto.image,
      },
    });
    return profile;
  }
}
