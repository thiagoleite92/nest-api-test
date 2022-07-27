import { UserService } from './user.service';
import { Body, Controller, Post } from '@nestjs/common';
import IUserController from './interfaces/user.controller.interface';
import CreateUserDto from './dto/create-user.dto';
import LoginUserDto from './dto/login-user.dto';
import { UserLogin } from './types/login-user.type';

@Controller('user')
export class UserController implements IUserController {
  constructor(private userService: UserService) {}

  @Post('register')
  async registerUser(
    @Body() createUser: CreateUserDto,
  ): Promise<{ message: string }> {
    const { name, email, password } = createUser;
    const { message } = await this.userService.registerUser({
      name,
      email,
      password,
    });

    return { message };
  }

  @Post('login')
  async loginUser(@Body() loginUser: LoginUserDto): Promise<UserLogin> {
    const { email, password } = loginUser;

    const user = await this.userService.loginUser({ email, password });

    return user;
  }
}
