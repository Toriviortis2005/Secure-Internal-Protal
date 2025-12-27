import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { Role } from "@prisma/client";

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  findByEmail(email: string) {
    return this.prisma.user.findUnique({ where: { email } });
  }

  createUser(params: { email: string; password: string; role?: Role }) {
    const { email, password, role } = params;
    return this.prisma.user.create({
      data: {
        email,
        password,
        role: role ?? Role.EMPLOYEE,
      },
    });
  }
}
