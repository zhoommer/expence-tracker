import { IsEmail, IsNotEmpty } from "class-validator";

export class SigninDto {
  @IsEmail()
  @IsNotEmpty({ message: "Email cannot be empty" })
  email: string;

  @IsNotEmpty({ message: "Password cannot be empty" })
  password: string;
}
