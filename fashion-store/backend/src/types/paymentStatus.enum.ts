export enum PaymentStatus {
  PENDING = 'PENDING',     // Đã tạo payment, chưa thanh toán
  PROCESSING = 'PROCESSING', // Đang xử lý (redirect cổng thanh toán)
  PAID = 'PAID',           // Thanh toán thành công
  FAILED = 'FAILED',       // Thanh toán thất bại
  CANCELLED = 'CANCELLED', // Người dùng hủy
  REFUNDED = 'REFUNDED',   // Đã hoàn tiền
}
