import { prisma } from "../../lib/prisma.js";
import { Role } from "../../generated/prisma/enums.js";
export class UserService {
    static async findAll() {
        return prisma.user.findMany({
            where: { role: Role.customer },
            select: {
                id: true,
                name: true,
                email: true,
            }
        });
    }
    static async findById(id) {
        return prisma.user.findUnique({
            where: { id: id },
            select: {
                id: true,
                name: true,
                email: true,
                role: true,
                transactions: true
            },
        });
    }
}
