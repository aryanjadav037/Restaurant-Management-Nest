/* eslint-disable prettier/prettier */
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, OneToMany } from "typeorm";
import { IsEmail } from "@nestjs/class-validator";
import { Restaurants } from "./restaurant.entity";
import { Orders } from "./order.entity";

@Entity()
export class Users {
    @PrimaryGeneratedColumn()
    id: number

    @Column("varchar", { length: 30 })
    name: string

    @Column("varchar", { length: 10 , unique: true})
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
}