import { Request, Response, NextFunction } from "express";
import { AppError } from "../common/errors/AppError";

export const errorMiddleware = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(err);

  // Lỗi chủ động (business error)
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      status: "error",
      statusCode: err.statusCode,
      message: err.message,
    });
  }

  // Lỗi từ database (duplicate key)
  if (err.code === "ER_DUP_ENTRY") {
    return res.status(409).json({
      status: "error",
      statusCode: 409,
      message: "Duplicate data",
    });
  }

  // Lỗi không xác định
  return res.status(500).json({
    status: "error",
    statusCode: 500,
    message: "Internal server error",
  });
};
