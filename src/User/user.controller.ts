/* eslint-disable prettier/prettier */
import { Controller, Post, Get, Body } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  createUser(@Body() createUserDto: { name: string; email: string; password: string }) {
    return this.usersService.createUser(createUserDto.name, createUserDto.email, createUserDto.password);
  }

  @Get()
  getUsers() {
    return this.usersService.findAllUsers();
  }
}
