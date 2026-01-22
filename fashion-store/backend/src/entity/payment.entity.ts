import { Column, Entity, OneToOne, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, JoinColumn } from "typeorm";
import { PaymentMethod } from "../types/paymentMethod.enum";
import { PaymentStatus } from "../types/paymentStatus.enum";
import { Order } from "./order.entity";

@Entity()
export class Payment {
    @PrimaryGeneratedColumn('uuid')
    id!: string

    @Column({
        type: 'enum',
        enum: PaymentStatus
    })
    status!: PaymentStatus

    @Column({
        type: 'enum',
        enum: PaymentMethod
    })
    method!: PaymentMethod

    @OneToOne(() => Order, order => order.payment, { onDelete: 'CASCADE' })
    @JoinColumn()
    order!: Order

    @CreateDateColumn()
    createdAt!: Date

    @UpdateDateColumn()
    updatedAt!: Date
}