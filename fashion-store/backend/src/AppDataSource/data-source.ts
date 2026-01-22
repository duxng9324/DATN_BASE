import { DataSource } from "typeorm";
import dotenv from "dotenv";
import { Menu } from "../entity/Menu.entity";
import { Role } from "../entity/role.entity";
import { User } from "../entity/user.entity";
import { Category } from "../entity/category.entity";
import { Color } from "../entity/color.entity";
import { Media } from "../entity/media.entity";
import { Product } from "../entity/product.entity";
import { ProductVariant } from "../entity/productVariant.entity";
import { Size } from "../entity/size.entity";
import { Cart } from "../entity/cart.entity";
import { CartItem } from "../entity/cartItem.entity";
import { Conversation } from "../entity/conversation.entity";
import { Inventory } from "../entity/inventory.entity";
import { Message } from "../entity/message.entity";
import { Order } from "../entity/order.entity";
import { OrderItem } from "../entity/orderItem.entity";
import { Payment } from "../entity/payment.entity";
import { Review } from "../entity/review.entity";

dotenv.config();

export const AppDataSource = new DataSource({
  type: "mysql",
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,  
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,  
  synchronize: true,
  logging: false,
  // entities: ["src/entity/**/*.ts"],
  entities: [Menu, Role, User, Category, Color, Media, Product, ProductVariant, Size, Cart, CartItem, Conversation, Inventory, Message, Order, OrderItem, Payment, Review],
  migrations: ["src/migration/**/*.ts"],
  subscribers: ["src/subscriber/**/*.ts"],
})