/* eslint-disable prettier/prettier */
import {
    IsString, IsNumber, Min
    , IsArray, IsUUID, Length,
    IsOptional
} from '@nestjs/class-validator';
// import { IsOptional } from '@nestjs/class-validator'; 

export class UpdateItemDTO {
    @IsOptional()
    @IsString()
    @Length(3, 30, { message: 'Name must be between 3 and 30 characters' })
    name: string;

    @IsOptional()
    @IsString()
    @IsNumber()
    @Min(0)
    Price: number;

    @IsOptional()
    @IsString()
    @Length(5, 100, { message: 'Description must be between 5 and 100 characters' })
    description: string;

    @IsArray()
    @IsOptional()
    @IsUUID('4', { message: 'Each item ID must be a valid UUID' })
    restaurantIds: string[]; // For restaurantId, if it's just an ID reference

}