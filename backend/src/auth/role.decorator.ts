import { SetMetadata } from "@nestjs/common";
import { UserRole } from "src/users/entities/user.entity";

export type AllowRoles = keyof typeof UserRole | "Any";

export const Role = (roles: AllowRoles[]) => SetMetadata("roles", roles);
