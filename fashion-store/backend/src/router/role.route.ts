import { Router } from "express";
import { RoleController } from "../controller/role.controller";

const roleRouter = Router();
const roleController = new RoleController();

roleRouter.get("/getAllRole", roleController.getAllRole);
roleRouter.get("/getRoleByUser_Id/:id", roleController.getRoleByUser_Id);
roleRouter.post("/", roleController.create);
roleRouter.delete("/:userId", roleController.delete)

export default roleRouter;