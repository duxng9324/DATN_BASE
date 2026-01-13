import { IsNull, Repository } from "typeorm";
import { AppDataSource } from "../AppDataSource/data-source";
import { MenuDto } from "../dto/MenuRequest";
import { Menu } from "../entity/Menu.entity";

export class MenuService {
  private menuRepo: Repository<Menu>;

  constructor() {
    this.menuRepo = AppDataSource.getRepository(Menu);
  }
  /* ================= CREATE ================= */

  async create(dto: MenuDto): Promise<Menu> {
    const menu = this.menuRepo.create(dto as Menu);

    // set parent + path
    if (dto.parentId) {
      const parent = await this.menuRepo.findOneByOrFail({
        id: dto.parentId,
      });
      menu.parent = parent;
      menu.path = `${parent.path}/${menu.slug}`;
    } else {
      menu.path = menu.slug;
    }

    return this.menuRepo.save(menu);
  }

  /* ================= UPDATE ================= */

  async update(id: string, dto: MenuDto): Promise<Menu> {
    const menu = await this.menuRepo.findOne({
      where: { id },
      relations: ["parent"],
    });

    if (!menu) throw new Error("Menu not found");

    Object.assign(menu, dto);

    // cập nhật lại path nếu đổi slug / parent
    if (dto.slug || dto.parentId !== undefined) {
      let parent: Menu | null = null;

      if (dto.parentId) {
        parent = await this.menuRepo.findOneByOrFail({
          id: dto.parentId,
        });
      }

      menu.parent = parent ?? undefined;
      menu.path = parent ? `${parent.path}/${menu.slug}` : menu.slug;

      await this.updateChildrenPath(menu);
    }

    return this.menuRepo.save(menu);
  }

  /* ================= DELETE ================= */

  async delete(id: string): Promise<void> {
    await this.menuRepo.delete(id);
  }

  /* ================= QUERY ================= */

  async findAll(): Promise<Menu[]> {
    return this.menuRepo.find({
      order: { order: "ASC" },
    });
  }

  async findTree(): Promise<Menu[]> {
    return this.menuRepo.find({
      where: { parent: IsNull(), isActive: true },
      relations: ["children", "children.children"],
      order: { order: "ASC" },
    });
  }

  async findFullTree(): Promise<Menu[]> {
    const menus = await this.menuRepo.find({
      where: { isActive: true },
      order: { order: "ASC" },
      relations: ["parent"],
    });

    const map = new Map<string, Menu>();
    const roots: Menu[] = [];

    // init map
    for (const menu of menus) {
      menu.children = [];
      map.set(menu.id, menu);
    }

    // build tree
    for (const menu of menus) {
      if (menu.parent) {
        const parent = map.get(menu.parent.id);
        if (parent) {
          parent.children!.push(menu);
        }
      } else {
        roots.push(menu);
      }
    }

    return roots;
  }

  async findByPath(path: string): Promise<Menu | null> {
    return this.menuRepo.findOne({
      where: { path, isActive: true },
    });
  }

  async findBySlug(slug: string): Promise<Menu | null> {
    return this.menuRepo.findOne({
      where: { slug },
    });
  }

  /* ================= PRIVATE ================= */

  private async updateChildrenPath(menu: Menu) {
    const children = await this.menuRepo.find({
      where: { parent: { id: menu.id } },
    });

    for (const child of children) {
      child.path = `${menu.path}/${child.slug}`;
      await this.menuRepo.save(child);
      await this.updateChildrenPath(child);
    }
  }
}
