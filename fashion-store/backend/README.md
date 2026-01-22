# 🛒 Fashion Store – Backend (NodeJS + Express + TypeORM + TS)

## 1. Giới thiệu
Fashion Store Backend là hệ thống API cho ứng dụng thương mại điện tử, ban đầu tập trung vào bán quần áo / thời trang, được thiết kế theo hướng mở rộng để có thể bán nhiều loại sản phẩm khác trong tương lai.

## 2. Công nghệ sử dụng
- NodeJS
- ExpressJS
- TypeScript
- TypeORM
- MySQL
- JWT Authentication
- Docker / Docker Compose
- NextJS (Frontend)

## 3. Kiến trúc hệ thống
Client (NextJS) -> Express API -> Service -> Repository (TypeORM) -> MySQL

## 4. Cấu trúc thư mục
(src structure như đã mô tả)

## 5. Actor & Role
ADMIN = 'ADMIN',
CUSTOMER = 'CUSTOMER',
MANAGER = 'MANAGER',
STAFF = 'STAFF',
STORE_OWNER = 'STORE_OWNER'

## 6. Use Case
Customer: xem sản phẩm, mua hàng, thanh toán  
Admin: quản lý sản phẩm, đơn hàng, người dùng

## 7. Database Design
User, Role, Category, Product, ProductVariant, Inventory, Cart, Order, Payment

## 8. API Design
RESTful API cho Auth, Product, Cart, Order

## 9. Roadmap
Phase 1: Core
Phase 2: Payment & Inventory
Phase 3: Scale & Optimize
