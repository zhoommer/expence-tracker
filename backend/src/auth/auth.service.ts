import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { SignupDto } from './dto/signup.dto';
import { JwtPayload, Tokens } from './types';
import * as argon from 'argon2';
import { CustomException } from 'src/common/exceptions/custom-exception';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
    private readonly config: ConfigService,
  ) {}

  async signup(dto: SignupDto): Promise<Tokens> {
    const hash = await argon.hash(dto.password);
    const is_user = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });

    if (is_user) throw new CustomException('User already exists', 409);

    return this.prisma.$transaction(async (tx) => {
      const user = await tx.user.create({
        data: {
          email: dto.email,
          hash,
        },
      });

      const profile = await tx.profile.create({
        data: {
          userId: user.id,
          firstname: dto.firstname,
          lastname: dto.lastname,
          phone: dto.phone,
          birthDate: dto.birthDate,
          gender: dto.gender,
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
        secret: this.config.get<string>('AT_SECRET'),
        expiresIn: '1h',
      }),
      this.jwtService.signAsync(jwtPayload, {
        secret: this.config.get<string>('RT_SECRET'),
        expiresIn: '7d',
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
      throw new Error('User not found');
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
