import { JwtService } from '@nestjs/jwt';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.userService.findOne(email);

    if (user && (await bcrypt.compare(pass, user.password))) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(email: string, pass: string) {
    const user = await this.validateUser(email, pass);

    if (!user) {
      throw new HttpException(
        { message: 'Usuário não encontrado' },
        HttpStatus.NOT_FOUND,
      );
    }

    const payload = { name: user.name, email: user.email, id: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
