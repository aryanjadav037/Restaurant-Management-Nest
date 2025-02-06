/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Items } from '../entities/item.entity';  // Import User entity
import { ItemController } from './item.controller';  // Import User controller
import {ItemsService} from './item.service';  // Import User service

@Module({
  imports: [TypeOrmModule.forFeature([Items])],  // Register the Users entity with TypeORM
  controllers: [ItemController],  // Register the controller
  providers: [ItemsService],  // Register the service
  exports: [ItemsService],  // Export UsersService for use in other modules if needed
})
export class ItemsModule {}
