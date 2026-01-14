import { Router } from "express";
import { MenuController } from "../controller/Menu.controller";
import { authGuard } from "../middleware/auth.middleware";

const menuRouter = Router();
const menuController = new MenuController();

menuRouter.post("/", authGuard, menuController.create);
menuRouter.put("/:id", authGuard, menuController.update);
menuRouter.delete("/:id", authGuard, menuController.delete);
menuRouter.get("/", menuController.findAll);
menuRouter.get("/tree", menuController.findTree);
menuRouter.get("/full-tree", menuController.findFullTree);
menuRouter.get("/slug/:slug", menuController.findBySlug);
menuRouter.get("/:path", menuController.findByPath);

export default menuRouter;
