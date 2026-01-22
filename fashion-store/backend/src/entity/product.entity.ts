import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { Category } from "./category.entity";
import { ProductVariant } from "./productVariant.entity";
import { Media } from "./media.entity";
import { Review } from "./review.entity";

@Entity()
export class Product{
    @PrimaryGeneratedColumn("uuid")
    id!: string

    @Column()
    name!: string

    @Column({
        type: 'decimal',
        precision: 15,
        scale: 2
    })
    price!: string

    @Column({ default: 0 })
    avgRating!: number

    @ManyToMany(() => Category, category => category.products)
    @JoinTable()
    categories!: Category[]

    @OneToMany(()=> ProductVariant, productVariant => productVariant.product, { cascade: true })
    productVariants!: ProductVariant[]

    @OneToMany(() => Media, media => media.product, { cascade: true })
    media?: Media[]

    @OneToMany(() => Review, review => review.product, { cascade: true })
    reviews?: Review[]

    @CreateDateColumn()
    createdAt!: Date

    @UpdateDateColumn()
    updatedAt!: Date
}