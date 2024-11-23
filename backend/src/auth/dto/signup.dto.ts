import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { Gender } from '../enums/gender.enum';

export class SignupDto {
  @IsEmail()
  @IsString()
  @IsNotEmpty({ message: 'Email cannot be empty' })
  email: string;

  @IsNotEmpty({ message: 'Password cannot be empty' })
  password: string;

  @IsString()
  @IsNotEmpty({ message: 'Fistname cannot be empty' })
  firstname: string;

  @IsString()
  @IsNotEmpty({ message: 'Lastname cannot be empty' })
  lastname: string;

  @IsNotEmpty({ message: 'Phone cannot be empty' })
  phone: string;

  @IsNotEmpty({ message: 'Birth Date cannot be empty' })
  birthDate: string;

  @IsNotEmpty({ message: 'Gender cannot be empty' })
  gender: Gender;
}
