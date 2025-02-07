/* eslint-disable prettier/prettier */
import * as AWS from 'aws-sdk';
import { Injectable } from '@nestjs/common';
import { Multer } from 'Multer';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Images } from '../entities/image.entity';
import { Users } from '../entities/user.entity';
import { Orders } from '../entities/order.entity';

@Injectable()
export class ImageService {
    private s3 = new AWS.S3({
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        region: process.env.AWS_REGION,
    });

    constructor(
        @InjectRepository(Images) private readonly imageRepository: Repository<Images>,
        @InjectRepository(Users) private readonly userRepository: Repository<Users>,
        @InjectRepository(Orders) private readonly orderRepository: Repository<Orders>,
    ) {}
    async uploadUserImage(file: Multer.File, userId: number): Promise<Images> {
    async uploadUserImage(file: Express.Multer.File, userId: number): Promise<Images> {
        const uploadResult = await this.s3.upload({
            Bucket: process.env.AWS_S3_BUCKET_NAME,
            Key: `users/${userId}/${Date.now()}-${file.originalname}`,
            Body: file.buffer,
            ContentType: file.mimetype,
        }).promise();

        const user = await this.userRepository.findOne({ where: { id: userId } });
        if (!user) throw new Error("User not found");

        const image = this.imageRepository.create({
            url: uploadResult.Location,
            filename: file.originalname,
            user,
        });

        return await this.imageRepository.save(image);
    }
    async uploadOrderImage(file: Multer.File, orderId: number): Promise<Image> {
    async uploadOrderImage(file: Express.Multer.File, orderId: number): Promise<Image> {
        const uploadResult = await this.s3.upload({
            Bucket: process.env.AWS_S3_BUCKET_NAME,
            Key: `orders/${orderId}/${Date.now()}-${file.originalname}`,
            Body: file.buffer,
            ContentType: file.mimetype,
        }).promise();

        const order = await this.orderRepository.findOne({ where: { id: orderId } });
        if (!order) throw new Error("Order not found");

        const image = this.imageRepository.create({
            url: uploadResult.Location,
            filename: file.originalname,
            order,
        });

        return await this.imageRepository.save(image);
    }
}
