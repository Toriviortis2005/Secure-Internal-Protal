import { SetMetadata } from '@nestjs/common';

export const ROLES_KEY = 'roles';
export type AppRole = "ADMIN" | "HR" | "IT" | "EMPLOYEE";

export const Roles = (...roles: AppRole[]) => SetMetadata(ROLES_KEY, roles);