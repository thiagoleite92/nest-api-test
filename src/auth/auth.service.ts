import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.userService.findOne(email);

    console.log(user, 'auth service');

    if (user && bcrypt.compare(pass, user.password)) {
      const { password, ...result } = user;
      console.log(result, 'dentro if auth service');
      return result;
    }
    return null;
  }
}
