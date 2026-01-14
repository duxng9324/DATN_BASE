import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { RoleType } from "../types/RoleType.enum";
import { User } from "./user.entity";

@Entity()
export class Role {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column({ 
        unique: true,
        type: 'enum',
        enum: RoleType
     })
    role!: RoleType;

    @ManyToMany(() => User, user => user.roles)
    @JoinTable()
    users!: User[];
}