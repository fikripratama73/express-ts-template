import { prisma } from "../../lib/prisma.js";
import { hashPassword, comparePassword } from "../../lib/bcrypt.js";
import { generateToken } from "../../lib/jwt.js";
import { Role } from "../../generated/prisma/enums.js";
export class AuthService {
    static async registerService(data) {
        const exists = await prisma.user.findUnique({
            where: { email: data.email }
        });
        if (exists)
            throw new Error("Email already in use");
        const hashed = await hashPassword(data.password);
        const user = await prisma.user.create({
            data: {
                name: data.name,
                email: data.email,
                password: hashed,
                role: Role.customer,
            },
            select: {
                id: true,
                name: true,
                email: true,
                role: true,
            }
        });
        return { user };
    }
    static async loginService(data) {
        const user = await prisma.user.findUnique({
            where: { email: data.email },
        });
        if (!user)
            throw new Error("Invalid email or password");
        const isValid = await comparePassword(data.password, user.password);
        if (!isValid)
            throw new Error("Invalid email or password");
        const token = generateToken({
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
        });
        return {
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
            },
        };
    }
}
