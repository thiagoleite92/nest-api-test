import { UserLogin } from '../types/login-user.type';
import CreateUserDto from '../dto/create-user.dto';
import LoginUserDto from '../dto/login-user.dto';

export default interface IUserController {
  registerUser(createUser: CreateUserDto): Promise<{ message: string }>;
  loginUser(loginUser: LoginUserDto): Promise<UserLogin>;
}
