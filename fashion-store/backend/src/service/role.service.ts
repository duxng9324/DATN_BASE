import { Repository } from "typeorm";
import { Role } from "../entity/role.entity";
import { AppDataSource } from "../AppDataSource/data-source";
import { RoleType } from "../types/RoleType.enum";
import { User } from "../entity/user.entity";
import { AppError } from "../common/errors/AppError";

export class RoleServices {
  private roleRepo: Repository<Role>;
  private userRepo: Repository<User>;

  constructor() {
    this.roleRepo = AppDataSource.getRepository(Role);
    this.userRepo = AppDataSource.getRepository(User);
  }

  async createRole(role: RoleType): Promise<Role> {
    const existed = await this.roleRepo.findOne({
      where: { role },
    });

    if (existed) {
      throw new AppError(`Role ${role} already exists`, 409);
    }

    const newRole = this.roleRepo.create({ role });
    return await this.roleRepo.save(newRole);
  }

  async deleteRole(id: string): Promise<void> {
    const result = await this.roleRepo.delete(id);

    if (result.affected === 0) {
      throw new AppError("Role not found", 404);
    }
  }

  async getAllRole(): Promise<Role[]> {
    return await this.roleRepo.find();
  }

  async getRoleByUser_Id(userId: string): Promise<Role[]> {
    const user = await this.userRepo.findOne({
      where: { id: userId },
      relations: ["roles"], // ⚠️ bắt buộc
    });

    if (!user) {
      throw new AppError("User not found", 404);
    }

    return user.roles;
  }
}
