import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { User } from "./user.entity";
import { Product } from "./product.entity";

@Entity()
export class Review {
    @PrimaryGeneratedColumn('uuid')
    id!: string

    @Column()
    rating!: number

    @Column({ type: 'text' })
    content!: string

    @ManyToOne(() => User, user => user.reviews, { onDelete: 'CASCADE' })
    user!: User

    @ManyToOne(() => Product, product => product.reviews, { onDelete: 'CASCADE' })
    product!: Product

    @CreateDateColumn()
    createdAt!: Date

    @UpdateDateColumn()
    updatedAt!: Date
}