🛒 Fashion Store – Backend (NodeJS + Express + TypeORM + TS)
1. Giới thiệu

Fashion Store Backend là hệ thống API cho ứng dụng thương mại điện tử, ban đầu tập trung vào bán quần áo / sản phẩm thời trang, được thiết kế theo hướng mở rộng để có thể bán nhiều loại sản phẩm khác trong tương lai (điện tử, mỹ phẩm, sách…).

Hệ thống áp dụng kiến trúc Layered Architecture, dễ bảo trì, dễ scale và phù hợp triển khai thực tế.

2. Công nghệ sử dụng

NodeJS

ExpressJS

TypeScript

TypeORM

PostgreSQL (khuyến nghị)

JWT Authentication

Docker / Docker Compose

NextJS (Frontend – dùng API)

3. Kiến trúc hệ thống
Client (NextJS)
      |
      v
REST API (Express)
      |
      v
Controller
      |
      v
Service (Business Logic)
      |
      v
Repository (TypeORM)
      |
      v
PostgreSQL Database

4. Cấu trúc thư mục
src
 ┣ AppDataSource
 ┃ ┗ data-source.ts
 ┣ common
 ┃ ┗ errors
 ┃ ┃ ┗ AppError.ts
 ┣ controller
 ┃ ┣ auth.controller.ts
 ┃ ┣ menu.controller.ts
 ┃ ┣ role.controller.ts
 ┣ dto
 ┃ ┣ loginRequest.ts
 ┃ ┣ registerRequest.ts
 ┃ ┣ menuRequest.ts
 ┣ entity
 ┃ ┣ user.entity.ts
 ┃ ┣ role.entity.ts
 ┃ ┣ menu.entity.ts
 ┣ middleware
 ┃ ┣ auth.middleware.ts
 ┃ ┣ error.middleware.ts
 ┣ router
 ┃ ┣ auth.route.ts
 ┃ ┣ menu.route.ts
 ┃ ┣ role.route.ts
 ┣ service
 ┃ ┣ auth.service.ts
 ┃ ┣ menu.service.ts
 ┃ ┣ role.service.ts
 ┣ types
 ┃ ┣ RoleType.enum.ts
 ┃ ┣ MenuType.enum.ts
 ┃ ┗ env.d.ts
 ┣ app.ts
 ┗ server.ts

5. Actor & Role
Actors

Guest – Người chưa đăng nhập

Customer – Người mua hàng

Admin – Quản trị hệ thống

Staff – Nhân viên xử lý đơn (mở rộng)

Role
ADMIN
CUSTOMER
STAFF

6. Use Case
Customer

Đăng ký / đăng nhập

Xem sản phẩm

Lọc sản phẩm (giá, size, màu, category)

Xem chi tiết sản phẩm

Thêm vào giỏ hàng

Đặt hàng

Thanh toán

Xem lịch sử đơn hàng

Admin

Quản lý người dùng

Quản lý role

CRUD sản phẩm

CRUD danh mục

Quản lý tồn kho

Quản lý đơn hàng

Quản lý menu / banner

Thống kê doanh thu

7. Thiết kế Database (Core)
User
id (uuid)
email
password
fullName
phone
status (ACTIVE | BLOCKED)
createdAt

Role
id
name (ADMIN | CUSTOMER | STAFF)

Category
id
name
slug
parentId (nullable)


Hỗ trợ category đa cấp (Áo → Áo thun → Áo polo)

Product
id
name
slug
description
price
salePrice
brand
status (ACTIVE | INACTIVE)
createdAt

ProductVariant (Size / Màu)
id
productId
size (S, M, L, XL)
color
sku
price

Inventory
id
productVariantId
quantity

Cart
id
userId

CartItem
cartId
productVariantId
quantity

Order
id
userId
totalAmount
status (PENDING | PAID | SHIPPED | COMPLETED | CANCELLED)
createdAt

OrderItem
orderId
productVariantId
price
quantity

Payment
orderId
method (COD | MOMO | VNPAY)
status
paidAt

8. API Design (RESTful)
Auth
POST /api/auth/register
POST /api/auth/login
GET  /api/auth/profile

Product
GET    /api/products
GET    /api/products/:slug
POST   /api/admin/products
PUT    /api/admin/products/:id
DELETE /api/admin/products/:id

Cart
POST   /api/cart
PUT    /api/cart/item
DELETE /api/cart/item/:id
GET    /api/cart

Order
POST /api/orders
GET  /api/orders
GET  /api/orders/:id

9. Error Handling

Sử dụng AppError

Global Error Middleware

Trả về JSON chuẩn

{
  "status": "error",
  "message": "Invalid credentials"
}

10. Authentication & Authorization

JWT

Access Token

Middleware kiểm tra role

API Admin được bảo vệ

11. Roadmap phát triển
Phase 1 – Core

Auth + Role

Product + Category

Cart

Order (COD)

Phase 2 – Nâng cao

Inventory

Payment online

Admin dashboard

Phase 3 – Scale

Redis cache

ElasticSearch

Message Queue (RabbitMQ)

Microservices

12. Khả năng mở rộng

✔ Bán nhiều loại sản phẩm
✔ Review / Rating
✔ Voucher / Coupon
✔ Flash Sale
✔ Tích hợp Payment Gateway
✔ Tách microservice

13. Hướng phát triển tiếp theo

Hoàn thiện Product + Category Entity

Viết Cart & Order Service

Kết nối NextJS Frontend

Docker hóa toàn bộ hệ thống

📌 Ghi chú
Dự án được thiết kế theo hướng production-ready, dễ mở rộng, dễ bảo trì và phù hợp làm đồ án tốt nghiệp hoặc sản phẩm thực tế.