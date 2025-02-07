/* eslint-disable prettier/prettier */
import { Entity, PrimaryGeneratedColumn, Column, OneToOne, CreateDateColumn } from "typeorm";
import { Users } from "../entities/user.entity";
import { Restaurants } from "../entities/restaurant.entity";
import { Items } from "src/entities/item.entity";

@Entity()
export class Images {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    url: string; // Cloud storage URL

    @Column({ nullable: true })
    filename?: string; // Original filename (optional)

    @OneToOne(() => Users, (user) => user.images, { onDelete: "CASCADE" })
    user: Users; 

    @OneToOne(() => Restaurants, (restaurant) => restaurant.images, { onDelete: "CASCADE" })
    restaurant: Restaurants; 

    @OneToOne(() => Items, (item) => item.images, { onDelete: "CASCADE" })
    item: Items; 

    @CreateDateColumn()
    createdAt: Date;
}

