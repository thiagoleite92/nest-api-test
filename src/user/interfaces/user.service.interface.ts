import CreateUserDto from '../dto/create-user.dto';

export default interface IUserService {
  registerUser(createUser: CreateUserDto): Promise<{ message: string }>;
}
