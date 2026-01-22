import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { ProductVariant } from "./productVariant.entity";
import { Order } from "./order.entity";

@Entity()
export class OrderItem {
    @PrimaryGeneratedColumn('uuid')
    id!: string

    @Column()
    quantity!: number

    @Column({
        type: 'decimal',
        precision: 15,
        scale: 2
    })
    price!: string

    @ManyToOne(() => Order, order => order.orderItems, { onDelete: 'CASCADE' })
    order!: Order

    @ManyToOne(() => ProductVariant, productVariant => productVariant.orderItems)
    productVariant!: ProductVariant

    @CreateDateColumn()
    createdAt!: Date

    @UpdateDateColumn()
    updatedAt!: Date
}