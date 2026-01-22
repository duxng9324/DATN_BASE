export enum ConversationStatus {
  ACTIVE = 'ACTIVE',       // Đang chat bình thường
  CLOSED = 'CLOSED',       // Đã kết thúc (xong việc / đơn hàng xong)
  BLOCKED = 'BLOCKED',     // Một bên chặn bên kia
  ARCHIVED = 'ARCHIVED',   // Ẩn / lưu trữ (không xóa)
}