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
  import { ItemsService } from './item.service'  // Import User service
  import { CreateItemDTO } from './create-item.dto';  // DTO with validations
  import { UpdateItemDTO } from './update-item.dot'  // DTO with validations
  import { Items } from '../entities/item.entity';
  
  @Controller('items')
  export class ItemController {
    constructor(private readonly ItemsService: ItemsService) {}
  
    // Create a new item with validation
    @Post()
    async createItem(@Body() itemDTO: CreateItemDTO): Promise<Items> {
      try {
        return await this.ItemsService.createItem(itemDTO);
      } catch (error) {
        throw new BadRequestException(error);
      }
    }
  
    // Get all Items
    @Get()
    async findAllItems(): Promise<Items[]> {
      return this.ItemsService.findAllItems();
    }
  
    // Get a single Item by ID with validation
    @Get(':id')
    async findItemById(@Param('id', ParseIntPipe) id: number): Promise<Items> {
      const Item = await this.ItemsService.findItems(id);
      if (!Item) {
        throw new NotFoundException(`Item with ID ${id} not found`);
      }
      return Item;
    }
  
    // Update Item by ID
    @Put(':id')
    async updateItem(
      @Param('id', ParseIntPipe) id: number, 
      @Body() ItemsDTO: UpdateItemDTO
    ): Promise<Items> {
      try {
        return await this.ItemsService.updateItem(id, ItemsDTO);
      } catch (error) {
        throw new BadRequestException(error);
      }
    }
  
    // Delete Item by ID
    @Delete(':id')
    async deleteItem(@Param('id', ParseIntPipe) id: number): Promise<{ message: string }> {
      try {
        await this.ItemsService.deleteItem(id);
        return { message: `Item with ID ${id} deleted successfully` };
      } catch (error) {
        throw new NotFoundException(error);
      }
    }
  }
  