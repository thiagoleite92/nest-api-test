import { IsString, IsNotEmpty, IsEmail, Length } from 'class-validator';

export default class LoginUserDto {
  @Length(5)
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  @Length(4)
  password: string;
}
