import CreateUserDto from '../dto/create-user.dto';
import LoginUserDto from '../dto/login-user.dto';
import { UserLogin } from '../types/login-user.type';

export default interface IUserService {
  registerUser(createUser: CreateUserDto): Promise<{ message: string }>;

  loginUser(loginUser: LoginUserDto): Promise<UserLogin>;
}
