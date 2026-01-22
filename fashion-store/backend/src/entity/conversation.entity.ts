import { Column, Entity, OneToOne, OneToMany, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, JoinColumn } from "typeorm";
import { ConversationStatus } from "../types/coversationStatus.enum";
import { User } from "./user.entity";
import { Message } from "./message.entity";

@Entity()
export class Conversation {
    @PrimaryGeneratedColumn('uuid')
    id!: string

    @Column({
        type: 'enum',
        enum: ConversationStatus
    })
    status!: ConversationStatus

    @OneToOne(() => User, user => user.conversation, { onDelete: 'CASCADE' })
    @JoinColumn()
    user!: User

    @OneToMany(() => Message, message => message.conversation, { cascade: true })
    messages?: Message[]

    @CreateDateColumn()
    createdAt!: Date

    @UpdateDateColumn()
    updatedAt!: Date
}