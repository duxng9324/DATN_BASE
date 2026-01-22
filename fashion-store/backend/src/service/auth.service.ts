import bcrypt from "bcrypt";
import { Repository } from "typeorm";
import { User } from "../entity/user.entity";
import { Role } from "../entity/role.entity";
import { AppDataSource } from "../AppDataSource/data-source";
import { RegisterDto } from "../dto/registerRequest";
import { RoleType } from "../types/RoleType.enum";
import { LoginDto } from "../dto/loginRequest";
import jwt, { SignOptions } from "jsonwebtoken";
import { AppError } from "../common/errors/AppError";
import { Cart } from "../entity/cart.entity";

export class AuthService {
  private userRepo: Repository<User>;
  private roleRepo: Repository<Role>;
  private JWT_SECRET: string;
  private JWT_EXPIRES_IN: SignOptions["expiresIn"];


  constructor() {
    this.userRepo = AppDataSource.getRepository(User);
    this.roleRepo = AppDataSource.getRepository(Role);

    if (!process.env.JWT_SECRET || !process.env.JWT_EXPIRES_IN) {
      throw new AppError("JWT env variables are missing");
    }

    this.JWT_SECRET = process.env.JWT_SECRET;
    this.JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN as SignOptions["expiresIn"];
  }

  async register(registerDto: RegisterDto): Promise<User> {
    const exists = await this.userRepo.findOneBy({
      email: registerDto.email,
    });

    if (exists) {
      throw new AppError("Email already exists", 400);
    }

    const userRole = await this.roleRepo.findOneBy({
      role: RoleType.CUSTOMER,
    });

    if (!userRole) {
      throw new AppError("Default role USER not found", 404);
    }

    const user = new User();
    user.name = registerDto.name;
    user.email = registerDto.email;
    user.phone = registerDto.phone;
    user.password = await bcrypt.hash(registerDto.password, 10);
    user.roles = [userRole];

    return this.userRepo.save(user);
  }

  async login(loginDto: LoginDto) {
    const user = await this.userRepo
      .createQueryBuilder("user")
      .addSelect("user.password")
      .leftJoinAndSelect("user.roles", "role")
      .where("user.email = :identifier", { identifier: loginDto.identifier })
      .orWhere("user.phone = :identifier", { identifier: loginDto.identifier })
      .getOne();

    if (!user || !user.password) {
      throw new AppError("Invalid credentials", 400);
    }

    const isMatch = await bcrypt.compare(String(loginDto.password), user.password);
    if (!isMatch) {
      throw new AppError("Password not correct", 400);
    }

    const payload = {
      sub: user.id,
      email: user.email,
      roles: user.roles.map((r) => r.role),
    };

    const token = jwt.sign(payload, this.JWT_SECRET, {expiresIn: this.JWT_EXPIRES_IN || "1d"});

    return {
      accessToken: token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        roles: payload.roles,
      },
    };
  }
}
