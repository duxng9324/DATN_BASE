import { Column, Entity, OneToMany, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { ProductVariant } from "./productVariant.entity";

@Entity()
export class Size {
    @PrimaryGeneratedColumn('uuid')
    id!: string

    @Column({unique: true})
    name!: string

    @Column()
    type!: string

    @OneToMany(() => ProductVariant, productVariant => productVariant.size, { cascade: true })
    productVariants?: ProductVariant[]

    @CreateDateColumn()
    createdAt!: Date

    @UpdateDateColumn()
    updatedAt!: Date
}