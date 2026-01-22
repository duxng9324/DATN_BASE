export enum OrderStatus {
    PENDING = 'PENDING',          // Đơn hàng mới tạo, chưa thanh toán
    PAID = 'PAID',                // Đã thanh toán
    CONFIRMED = 'CONFIRMED',      // Shop xác nhận đơn
    PROCESSING = 'PROCESSING',    // Đang chuẩn bị hàng
    SHIPPING = 'SHIPPING',        // Đang giao hàng
    DELIVERED = 'DELIVERED',      // Giao hàng thành công
    COMPLETED = 'COMPLETED',      // Đơn hoàn tất
    CANCELLED = 'CANCELLED',      // Bị hủy
    REFUNDED = 'REFUNDED',        // Hoàn tiền
}