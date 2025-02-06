/* eslint-disable prettier/prettier */
import {
    IsString, IsNumber, Min
    , IsArray, ArrayNotEmpty, IsUUID, IsNotEmpty, Length
} from '@nestjs/class-validator';
// import { IsOptional } from '@nestjs/class-validator'; 

export class CreateItemDTO {
    @IsNotEmpty()
    @IsString()
    @Length(3, 30, { message: 'Name must be between 3 and 30 characters' })
    name: string;

    @IsNotEmpty()
    @IsString()
    @IsNumber()
    @Min(0)
    Price: number;

    @IsNotEmpty()
    @IsString()
    @Length(5, 100, { message: 'Description must be between 5 and 100 characters' })
    description: string;

    @IsArray()
    @ArrayNotEmpty()
    @IsUUID('4', { message: 'Each item ID must be a valid UUID' })
    restaurantIds: string[]; // For restaurantId, if it's just an ID reference

    

}