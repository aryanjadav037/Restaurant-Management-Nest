/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from './entities/user.entity';
import { Items } from './entities/item.entity';
import { Orders } from './entities/order.entity';
import { Restaurants } from './entities/restaurant.entity';
import { OrderItems } from './entities/orderitem.entity';
import * as dotenv from 'dotenv';

dotenv.config(); // Load .env variables

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: process.env.DB_TYPE , // TypeORM expects a string type
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT || '5000'), // TypeORM expects a number port
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      autoLoadEntities: true,
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Users, Items, Orders, Restaurants, OrderItems]),
  ],
})
export class AppModule {}
