import { AuthService } from 'src/auth/auth.service';
import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import LoginUserDto from 'src/user/dto/login-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // @UseGuards(AuthGuard('local'))
  @Post('validate')
  async validateUser(@Body() loginUser: LoginUserDto): Promise<any> {
    const { email, password } = loginUser;
    const user = await this.authService.validateUser(email, password);

    console.log(user);
    return user;
  }

  @Post('login')
  async login(@Body() loginUser: LoginUserDto): Promise<any> {
    const { email, password } = loginUser;
    const user = await this.authService.login(email, password);

    console.log(user);

    return user;
  }
}
