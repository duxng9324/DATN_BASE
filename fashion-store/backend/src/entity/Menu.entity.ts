import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
  Index,
} from "typeorm";
import { MenuType } from "../types/MenuType.enum";

@Entity({ name: "menus" })
export class Menu {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ length: 255 })
  title!: string;

  // slug: ao-thun, nam, sale
  @Index({ unique: true })
  @Column({ length: 255 })
  slug!: string;

  // full path: nam/ao-thun
  @Index()
  @Column({ length: 500 })
  path!: string;

  @Column({
    type: "enum",
    enum: MenuType,
    default: MenuType.PAGE,
  })
  type!: MenuType;

  // dùng cho EXTERNAL
  @Column({ nullable: true })
  externalUrl?: string;

  @Column({ default: 0 })
  order!: number;

  @Column({ default: true })
  isActive!: boolean;

  // SEO
  @Column({ nullable: true })
  metaTitle?: string;

  @Column({ nullable: true })
  metaDescription?: string;

  /* ================= RELATION ================= */

  // Parent menu
  @ManyToOne(() => Menu, (menu) => menu.children, { 
    nullable: true,
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "parent_id" })
  parent?: Menu;

  // Children menu
  @OneToMany(() => Menu, (menu) => menu.parent)
  children?: Menu[];

  /* ================= TIMESTAMP ================= */

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  createdAt!: Date;

  @Column({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP",
    onUpdate: "CURRENT_TIMESTAMP",
  })
  updatedAt!: Date;
}
