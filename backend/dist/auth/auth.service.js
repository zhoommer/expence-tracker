"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const jwt_1 = require("@nestjs/jwt");
const prisma_service_1 = require("../prisma/prisma.service");
const argon = require("argon2");
const custom_exception_1 = require("../common/exceptions/custom-exception");
let AuthService = class AuthService {
    constructor(prisma, jwtService, config) {
        this.prisma = prisma;
        this.jwtService = jwtService;
        this.config = config;
    }
    async signup(dto) {
        const hash = await argon.hash(dto.password);
        const is_user = await this.prisma.user.findUnique({
            where: {
                email: dto.email,
            },
        });
        if (is_user)
            throw new custom_exception_1.CustomException('User already exists', 409);
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
            const tokens = await this.getTokens(user.id, user.email, profile.firstname, profile.lastname, profile.phone);
            await tx.user.update({
                where: { id: user.id },
                data: { hashRt: hash },
            });
            return tokens;
        });
    }
    async getTokens(userId, email, firstname, lastname, phone) {
        const jwtPayload = {
            sub: userId,
            email: email,
            firstname,
            lastname,
            phone,
        };
        const [at, rt] = await Promise.all([
            this.jwtService.signAsync(jwtPayload, {
                secret: this.config.get('AT_SECRET'),
                expiresIn: '1h',
            }),
            this.jwtService.signAsync(jwtPayload, {
                secret: this.config.get('RT_SECRET'),
                expiresIn: '7d',
            }),
        ]);
        return {
            access_token: at,
            refresh_token: rt,
        };
    }
    async updateRtHash(userId, rt) {
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
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        jwt_1.JwtService,
        config_1.ConfigService])
], AuthService);
//# sourceMappingURL=auth.service.js.map