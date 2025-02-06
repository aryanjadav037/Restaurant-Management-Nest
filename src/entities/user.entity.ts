/* eslint-disable prettier/prettier */
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, OneToMany ,OneToOne } from "typeorm";
import { IsEmail } from "class-validator";
import { Restaurants } from "./restaurant.entity";
import { Orders } from "./order.entity";
import { Images } from "../Image/image.entity";

@Entity()
export class Users {
    @PrimaryGeneratedColumn()
    id: number

    @Column("varchar", { length: 30 })
    name: string

    @Column("varchar", { length: 10, unique: true })
    mobileno: string

    @Column()
    @IsEmail()
    email: string

    @Column("varchar", { length: 50 })
    address: string

    @ManyToMany(() => Restaurants, (restaurants) => restaurants.users)
    restaurants: Restaurants[]

    @OneToMany(() => Orders, (orders) => orders.user)
    orders: Orders[]

    @OneToOne(() => Images, (images) => images.user)
    images: Images
}