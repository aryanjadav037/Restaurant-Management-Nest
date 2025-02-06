/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from '../entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private userRepository: Repository<Users>,
  ) {}

  async createUser(name: string, email: string, password: string): Promise<Users> {
    const newUser = this.userRepository.create({ name, email, password });
    return this.userRepository.save(newUser);
  }

  async findAllUsers(): Promise<Users[]> {
    return this.userRepository.find();
  }
}
