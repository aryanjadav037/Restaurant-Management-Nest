/* eslint-disable prettier/prettier */
import { 
  Controller, 
  Post, 
  Body, 
  Get, 
  Param, 
  Delete, 
  Put, 
  ParseIntPipe, 
  NotFoundException, 
  BadRequestException 
} from '@nestjs/common';
import { UsersService } from './user.service';
import { CreateUserDTO } from './create-user.dto';  // DTO with validations
import { UpdateUserDTO } from './update-user.dto';  // DTO with validations
import { Users } from '../entities/user.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // Create a new user with validation
  @Post()
  async createUser(@Body() userDTO: CreateUserDTO): Promise<Users> {
    try {
      return await this.usersService.createUser(userDTO);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  // Get all users
  @Get()
  async findAllUsers(): Promise<Users[]> {
    return this.usersService.findAllUsers();
  }

  // Get a single user by ID with validation
  @Get(':id')
  async findUserById(@Param('id', ParseIntPipe) id: number): Promise<Users> {
    const user = await this.usersService.findUserById(id);
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  // Update user by ID
  @Put(':id')
  async updateUser(
    @Param('id', ParseIntPipe) id: number, 
    @Body() userDTO: UpdateUserDTO
  ): Promise<Users> {
    try {
      return await this.usersService.updateUser(id, userDTO);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  // Delete user by ID
  @Delete(':id')
  async deleteUser(@Param('id', ParseIntPipe) id: number): Promise<{ message: string }> {
    try {
      await this.usersService.deleteUser(id);
      return { message: `User with ID ${id} deleted successfully` };
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }
}

