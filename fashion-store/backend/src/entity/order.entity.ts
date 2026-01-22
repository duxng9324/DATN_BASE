import { Column, Entity, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { User } from "./user.entity";
import { OrderStatus } from "../types/orderStatus.enum";
import { Payment } from "./payment.entity";
import { OrderItem } from "./orderItem.entity";

@Entity() 
export class Order {
    @PrimaryGeneratedColumn('uuid')
    id!: string

    @ManyToOne(() => User, user => user.orders, { onDelete: 'CASCADE' })
    user!: User

    @Column({
        type: 'decimal',
        precision: 15,
        scale: 2
    })
    totalAmount!: string

    @Column({
        type: 'enum',
        enum: OrderStatus,
        default: OrderStatus.PENDING
    })
    status!: OrderStatus

    @OneToOne(() => Payment, payment => payment.order, { cascade: true, onDelete: 'CASCADE' })
    payment?: Payment

    @OneToMany(() => OrderItem, orderItem => orderItem.order, { cascade: true })
    orderItems?: OrderItem[]

    @CreateDateColumn()
    createdAt!: Date

    @UpdateDateColumn()
    updatedAt!: Date
}