import { Body, Controller, HttpCode, HttpStatus, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { SignupDto } from "./dto/signup.dto";
import { Tokens } from "./types";
import { Public } from "src/common/decorators";
import { SigninDto } from "./dto/signin.dto";

@Controller("api/auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post("/signup")
  @HttpCode(HttpStatus.OK)
  async signup(@Body() signupDto: SignupDto): Promise<Tokens> {
    return this.authService.signup(signupDto);
  }

  @Public()
  @Post("/signin")
  @HttpCode(HttpStatus.OK)
  async signin(@Body() signinDto: SigninDto): Promise<Tokens> {
    return this.authService.signin(signinDto);
  }
}
