import { Column, Entity, OneToOne, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { ProductVariant } from "./productVariant.entity";

@Entity()
export class Inventory {
    @PrimaryGeneratedColumn('uuid')
    id!: string

    @Column()
    quantity!: number

    @OneToOne(() => ProductVariant, productVariant => productVariant.inventory, { onDelete: 'CASCADE' })
    productVariant!: ProductVariant

    @CreateDateColumn()
    createdAt!: Date

    @UpdateDateColumn()
    updatedAt!: Date
}