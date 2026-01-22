import { Entity, OneToMany, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToOne } from "typeorm";
import { User } from "./user.entity";
import { CartItem } from "./cartItem.entity";

@Entity()
export class Cart {
    @PrimaryGeneratedColumn('uuid')
    id!: string

    @OneToOne(() => User, user => user.cart)
    user!: User

    @OneToMany(() => CartItem, cartItem => cartItem.cart, { cascade: true, onDelete: 'CASCADE' })
    cartItems?: CartItem[]

    @CreateDateColumn()
    createdAt!: Date

    @UpdateDateColumn()
    updatedAt!: Date
}