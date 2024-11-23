import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { SignupDto } from './dto/signup.dto';
import { Tokens } from './types';
export declare class AuthService {
    private readonly prisma;
    private readonly jwtService;
    private readonly config;
    constructor(prisma: PrismaService, jwtService: JwtService, config: ConfigService);
    signup(dto: SignupDto): Promise<Tokens>;
    getTokens(userId: string, email: string, firstname: string, lastname: string, phone: string): Promise<Tokens>;
    updateRtHash(userId: string, rt: string): Promise<void>;
}
