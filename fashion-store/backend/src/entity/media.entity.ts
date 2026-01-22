import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { TypeMedia } from "../types/typeMedia.enum";
import { ProductVariant } from "./productVariant.entity";
import { Product } from "./product.entity";
import { MediaOwnerType } from "../types/mediaOwnerType.enum";

@Entity()
export class Media {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  mediaUrl!: string;

  @Column({
    type: "enum",
    enum: TypeMedia,
  })
  type!: TypeMedia;

  @ManyToOne(() => ProductVariant, (productVariant) => productVariant.media, {
    onDelete: "CASCADE",
  })
  productVariant?: ProductVariant;

  @ManyToOne(() => Product, (product) => product.media, { onDelete: "CASCADE" })
  product?: Product;

  @Column({
    type: "enum",
    enum: MediaOwnerType,
  })
  ownerType?: MediaOwnerType;

  @Column({ nullable: true })
  ownerId?: string;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
