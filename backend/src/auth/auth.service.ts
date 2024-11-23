import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { PrismaService } from "src/prisma/prisma.service";
import { SignupDto } from "./dto/signup.dto";
import { JwtPayload, Tokens } from "./types";
import * as argon from "argon2";
import { CustomException } from "src/common/exceptions/custom-exception";
import { SigninDto } from "./dto/signin.dto";

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
    private readonly config: ConfigService,
  ) {}

  async signup(signupDto: SignupDto): Promise<Tokens> {
    const hash = await argon.hash(signupDto.password);
    const is_user = await this.prisma.user.findUnique({
      where: {
        email: signupDto.email,
      },
    });

    if (is_user) throw new CustomException("User already exists", 409);

    return this.prisma.$transaction(async (tx) => {
      const user = await tx.user.create({
        data: {
          email: signupDto.email,
          hash,
        },
      });

      const profile = await tx.profile.create({
        data: {
          userId: user.id,
          firstname: signupDto.firstname,
          lastname: signupDto.lastname,
          phone: signupDto.phone,
          birthDate: signupDto.birthDate,
          gender: signupDto.gender,
        },
      });

      const tokens = await this.getTokens(
        user.id,
        user.email,
        profile.firstname,
        profile.lastname,
        profile.phone,
      );

      await tx.user.update({
        where: { id: user.id },
        data: { hashRt: hash },
      });

      return tokens;
    });
  }

  async signin(signinDto: SigninDto): Promise<Tokens> {
    const userExists = await this.prisma.user.findUnique({
      where: { email: signinDto.email },
    });

    if (!userExists)
      throw new CustomException("No user found with this email.", 404);

    const passwordMatches = await argon.verify(
      userExists.hash,
      signinDto.password,
    );
    if (!passwordMatches) throw new CustomException("Password is wrong", 400);

    const userProfile = await this.prisma.profile.findUnique({
      where: { userId: userExists.id },
    });

    const tokens = await this.getTokens(
      userExists.id,
      userExists.email,
      userProfile.firstname,
      userProfile.lastname,
      userProfile.phone,
    );
    await this.updateRtHash(userExists.id, tokens.refresh_token);
    return tokens;
  }

  async getTokens(
    userId: string,
    email: string,
    firstname: string,
    lastname: string,
    phone: string,
  ): Promise<Tokens> {
    const jwtPayload: JwtPayload = {
      sub: userId,
      email: email,
      firstname,
      lastname,
      phone,
    };

    const [at, rt] = await Promise.all([
      this.jwtService.signAsync(jwtPayload, {
        secret: this.config.get<string>("AT_SECRET"),
        expiresIn: "1h",
      }),
      this.jwtService.signAsync(jwtPayload, {
        secret: this.config.get<string>("RT_SECRET"),
        expiresIn: "7d",
      }),
    ]);

    return {
      access_token: at,
      refresh_token: rt,
    };
  }

  async updateRtHash(userId: string, rt: string): Promise<void> {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      throw new Error("User not found");
    }

    const hash = await argon.hash(rt);
    await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        hashRt: hash,
      },
    });
  }
}
