import { Request, Response } from "express";
import { AuthService } from "../service/auth.service";

export class AuthController {
  private authService = new AuthService();

  register = async (req: Request, res: Response) => {
    try {
      const user = await this.authService.register(req.body);

      return res.status(201).json({
        message: "Register successfully",
        data: {
          id: user.id,
          name: user.name,
          email: user.email,
          phone: user.phone,
          roles: user.roles.map(r => r.role),
        },
      });
    } catch (error: any) {
      return res.status(400).json({
        message: error.message || "Register failed",
      });
    }
  };

  login = async (req: Request, res: Response) => {
    try {
      const result = await this.authService.login(req.body);

      return res.status(200).json({
        message: "Login successfully",
        data: result,
      });
    } catch (error: any) {
      return res.status(401).json({
        message: error.message || "Login failed",
      });
    }
  };
}
