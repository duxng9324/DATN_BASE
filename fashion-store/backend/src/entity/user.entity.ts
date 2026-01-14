import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Role } from "./role.entity";

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
}