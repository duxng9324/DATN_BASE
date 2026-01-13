import { MenuType } from "../types/MenuType.enum";

export interface MenuDto {
  title: string;
  slug: string;
  type?: MenuType;
  parentId?: string;
  externalUrl?: string;
  order?: number;
  isActive?: boolean;
  metaTitle?: string;
  metaDescription?: string;
}
