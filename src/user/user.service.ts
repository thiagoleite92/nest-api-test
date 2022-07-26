import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import IUserService from './interfaces/user.service.interface';
import CreateUserDto from './dto/create-user.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UserService implements IUserService {
  private readonly saltRounds = 10;
  constructor(
    @Inject('USER_REPOSITORY')
    private userRepository: Repository<User>,
  ) {}

  async registerUser(createUser: CreateUserDto): Promise<{ message: string }> {
    try {
      const { name, email, password } = createUser;

      const hashPassword = await bcrypt.hash(password, this.saltRounds);

      console.log(hashPassword);

      await this.userRepository.insert({ name, email, password: hashPassword });

      return { message: `Usuário registrado com sucesso` };
    } catch (e) {
      if (e?.errno === 1062) {
        throw new HttpException(
          {
            message: 'Email já registrado',
          },
          HttpStatus.CONFLICT,
        );
      }
      throw new HttpException(
        { message: 'Algo deu errado' },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
