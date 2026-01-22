import { Column, Entity, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { Product } from "./product.entity";
import { Size } from "./size.entity";
import { Color } from "./color.entity";
import { Media } from "./media.entity";
import { Inventory } from "./inventory.entity";
import { CartItem } from "./cartItem.entity";
import { OrderItem } from "./orderItem.entity";

@Entity()
export class ProductVariant {
    @PrimaryGeneratedColumn("uuid")
    id!: string

    @Column({ unique: true })
    sku!: string

    @Column({
        type: 'decimal',
        precision: 15,
        scale: 2
    })
    price!: string

    @ManyToOne(() => Product, product => product.productVariants, { onDelete: 'CASCADE' })
    product!: Product

    @ManyToOne(() => Size, size => size.productVariants, { onDelete: 'CASCADE' })
    size?: Size
    
    @ManyToOne(() => Color, color => color.productVariants, { onDelete: 'CASCADE' })
    color?: Color

    @OneToMany(() => Media, media => media.productVariant, { cascade: true })
    media?: Media[]

    @OneToOne(() => Inventory, inventory => inventory.productVariant, { cascade: true })
    inventory!: Inventory

    @OneToOne(() => CartItem, cartItem => cartItem.productVariant, { nullable: true })
    cartItem?: CartItem

    @OneToMany(() => OrderItem, orderItem => orderItem.productVariant)
    orderItems?: OrderItem[]

    @CreateDateColumn()
    createdAt!: Date

    @UpdateDateColumn()
    updatedAt!: Date
}