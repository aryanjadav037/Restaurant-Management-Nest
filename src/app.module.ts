/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Restaurants } from './entities/restaurant.entity';
import { Users } from './entities/user.entity';
import { Orders } from './entities/order.entity';
import { Items } from './entities/item.entity';
import { OrderItems } from './entities/orderitem.entity';

import { UsersModule } from './User/user.module'; 
import { RestaurantsModule } from './Restaurant/restaurant.module';
import { ItemsModule } from './Item/item.module';
import { OrdersModule } from './Order/order.module';
import { OrderItemsModule } from './OrderItem/orderitem.module';

import { AppController } from './app.controller';
import { AppService } from './app.service';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '123456',
      database: 'restaurant',
      entities: [Restaurants, Users, Orders, Items, OrderItems,OrdersModule],
      synchronize: true, // Set to false in production
    }),
    UsersModule,
    RestaurantsModule,
    OrdersModule,
    ItemsModule,
    OrderItemsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}