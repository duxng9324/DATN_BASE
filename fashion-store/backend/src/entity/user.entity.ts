import { Column, Entity, ManyToMany, OneToMany, OneToOne, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { Role } from "./role.entity";
import { Cart } from "./cart.entity";
import { Order } from "./order.entity";
import { Review } from "./review.entity";
import { Conversation } from "./conversation.entity";

@Entity()
export class User {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column({ unique: true })
    email!: string;

    @Column({ unique: true })
    phone!: string;

    @Column()
    name!: string;

    @Column()
    password!: string;

    @ManyToMany(() => Role, role => role.users)
    roles!: Role[];

    @OneToOne(() => Cart, cart => cart.user, { eager: false })
    cart?: Cart

    @OneToMany(() => Order, order => order.user, { eager: false })
    orders?: Order[]

    @OneToMany(() => Review, review => review.user, { eager: false })
    reviews?: Review[]

    @OneToOne(() => Conversation, conversation => conversation.user, { eager: false })
    conversation?: Conversation

    @CreateDateColumn()
    createdAt!: Date

    @UpdateDateColumn()
    updatedAt!: Date
}