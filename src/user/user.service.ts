import { User } from './user.entity';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreateUserInput } from './dto/create-user.input';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(newUser: CreateUserInput) {
    const user = await this.userRepository.create(newUser);
    await this.userRepository.save(user);
    return user;
  }

  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async findById(id: string) {
    const user = await this.userRepository.findOne(id);
    if (!user) {
      throw new HttpException('Usuario não encontrado.', HttpStatus.NOT_FOUND);
    }
    return user;
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: email });
    if (!user) {
      throw new HttpException('Usuario não encontrado.', HttpStatus.NOT_FOUND);
    }
    return user;
  }

  async findByName(name: string): Promise<User[]> {
    const user = await this.userRepository
      .createQueryBuilder('user')
      .where('user.firstName like :name', { name: `%${name}%` })
      .getMany();
    if (!user) {
      throw new HttpException('Usuario não encontrado.', HttpStatus.NOT_FOUND);
    }
    return user;
  }

  // async update(id: string, updateUserInput: UpdateUserInput) {
  //   const user = await this.findOne(id);
  //   if (!user) {
  //     throw new HttpException('Usuario não encontrado, falhou ao realizar a atualização.', HttpStatus.NOT_FOUND);
  //   }
  //   return await this.userRepository.update(id, { ...updateUserInput });;
  // }

  // async remove(id: string): Promise<string> {
  //   const deleteUser = await this.userRepository.delete(id);
  //   if (!deleteUser.affected) {
  //     throw new HttpException('Usuario não encontrado, falhou ao realizar a deleção.', HttpStatus.NOT_FOUND);
  //   }
  //   return id;
  // }
}
