import { UserService } from './user.service';
import { Body, Controller, Post } from '@nestjs/common';
import IUserController from './interfaces/user.controller.interface';
import CreateUserDto from './dto/create-user.dto';
import LoginUserDto from './dto/login-user.dto';

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

  // to do login
  // @Post('login')
  // async loginUser(loginUser: LoginUserDto): Promise<{ message: string }> {
  //   throw new Error('Method not implemented.');
  // }
}
