import { Column, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { Cart } from "./cart.entity";
import { ProductVariant } from "./productVariant.entity";

@Entity()
export class CartItem {
    @PrimaryGeneratedColumn('uuid')
    id!: string

    @Column()
    quantity!: number

    @ManyToOne(() => Cart, cart => cart.cartItems, { onDelete: 'CASCADE' })
    cart!: Cart

    @OneToOne(() => ProductVariant, productVariant => productVariant.cartItem, { onDelete: 'CASCADE' })
    productVariant!: ProductVariant

    @CreateDateColumn()
    createdAt!: Date

    @UpdateDateColumn()
    updatedAt!: Date
}