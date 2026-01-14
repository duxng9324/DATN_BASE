import { NextFunction, Request, Response } from "express";
import { RoleServices } from "../service/role.service";
import { RoleType } from "../types/RoleType.enum";

export class RoleController {
  private roleServices = new RoleServices();

  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const role = req.body.role as RoleType;
      const result = await this.roleServices.createRole(role);
      res.status(201).json(result);
    } catch (error) {
      next(error);
    }
  };

  delete = async (req: Request, res: Response, next: NextFunction) => {
    try {
      await this.roleServices.deleteRole(req.params.id as string);
      res.status(200).json({ message: "Deleted" });
    } catch (error) {
      next(error);
    }
  };

  getAllRole = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await this.roleServices.getAllRole();
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  };

  getRoleByUser_Id = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await this.roleServices.getRoleByUser_Id(req.params.userId as string);
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  };
}
