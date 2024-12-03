import { IsNotEmpty, IsNumber, IsPositive } from "class-validator";

export class CreateExpenseDto {
  @IsNotEmpty({ message: "name cannot be empty" })
  name: string;

  @IsNotEmpty({ message: "categoryId cannot be empty" })
  categoryId: number;

  @IsNumber()
  @IsPositive({ message: "amount must be a positive number" })
  @IsNotEmpty({ message: "amount cannot be empty" })
  amount: number;

  @IsNumber()
  @IsPositive({ message: "price must be a positive number" })
  @IsNotEmpty({ message: "price cannot be empty" })
  price: number;
}
