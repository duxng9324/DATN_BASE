// src/menu/menu.controller.ts
import { Request, Response, NextFunction } from "express";
import { MenuService } from "../service/Menu.service";

export class MenuController {
  private menuService = new MenuService();

  /* ================= CREATE ================= */
  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const menu = await this.menuService.create(req.body);
      res.status(201).json(menu);
    } catch (error) {
      next(error);
    }
  };

  /* ================= UPDATE ================= */
  update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = req.params.id as string; // UUID → string
      const menu = await this.menuService.update(id, req.body);
      res.json(menu);
    } catch (error) {
      next(error);
    }
  };

  /* ================= DELETE ================= */
  delete = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params; // UUID
      await this.menuService.delete(id as any); // ⚠️ sẽ fix bên dưới
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  };

  /* ================= GET ALL ================= */
  findAll = async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const menus = await this.menuService.findAll();
      res.json(menus);
    } catch (error) {
      next(error);
    }
  };

  /* ================= GET TREE ================= */
  findTree = async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const menus = await this.menuService.findTree();
      res.json(menus);
    } catch (error) {
      next(error);
    }
  };

  /* ================= GET FULL TREE ================= */
  findFullTree = async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const menus = await this.menuService.findFullTree();
      res.json(menus);
    } catch (error) {
      next(error);
    }
  };

  /* ================= GET BY PATH ================= */
  findByPath = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const path = Array.isArray(req.params.path)
        ? req.params.path.join("/")
        : req.params.path;
        
      const menu = await this.menuService.findByPath(path);

      if (!menu) {
        return res.status(404).json({ message: "Menu not found" });
      }

      res.json(menu);
    } catch (error) {
      next(error);
    }
  };

  /* ================= GET BY SLUG ================= */
  findBySlug = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const slug = req.params.slug as string;
      const menu = await this.menuService.findBySlug(slug);

      if (!menu) {
        return res.status(404).json({ message: "Menu not found" });
      }

      res.json(menu);
    } catch (error) {
      next(error);
    }
  };
}
