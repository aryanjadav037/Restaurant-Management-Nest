/* eslint-disable prettier/prettier */
import { Controller, Post, Param, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ImageService } from './image.service';

@Controller('images')
export class ImageController {
    constructor(private readonly imageService: ImageService) {}

    @Post('upload/user/:userId')
    @UseInterceptors(FileInterceptor('file'))
    async uploadUserImage(@UploadedFile() file: Express.Multer.File, @Param('userId') userId: number) {
        return this.imageService.uploadUserImage(file, userId);
    }

    @Post('upload/order/:orderId')
    @UseInterceptors(FileInterceptor('file'))
    async uploadOrderImage(@UploadedFile() file: Express.Multer.File, @Param('orderId') orderId: number) {
        return this.imageService.uploadOrderImage(file, orderId);
    }
}
