import { Router } from "express";
import { MenuController } from "../controller/Menu.controller";

const menuRouter = Router();
const menuController = new MenuController();

menuRouter.post("/", menuController.create);
menuRouter.put("/:id", menuController.update);
menuRouter.delete("/:id", menuController.delete);
menuRouter.get("/", menuController.findAll);
menuRouter.get("/tree", menuController.findTree);
menuRouter.get("/full-tree", menuController.findFullTree);
menuRouter.get("/slug/:slug", menuController.findBySlug);
menuRouter.get("/:path", menuController.findByPath);

export default menuRouter;
