/* eslint-disable prettier/prettier */
import { Max,  IsNumber, IsOptional} from '@nestjs/class-validator';
// import { OrderStatus } from '../entities/order.entity'; 

export class CreateOrderItemDTO {

  @IsOptional()
  @IsNumber()
  @Max(999, { message: 'Quantity must be less than 1000' })
  quantity?: number;

}