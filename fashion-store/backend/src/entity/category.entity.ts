import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { Product } from "./product.entity";

@Entity()
export class Category {
    @PrimaryGeneratedColumn("uuid")
    id!: string

    @Column({unique: true})
    name!: string

    @ManyToMany(() => Product, product => product.categories)
    @JoinTable()
    products?: Product[]

    @CreateDateColumn()
    createdAt!: Date

    @UpdateDateColumn()
    updatedAt!: Date
}