import { prisma } from "../../lib/prisma";
import { hashPassword, comparePassword } from "../../lib/bcrypt";
import { generateToken } from "../../lib/jwt";
import { RegisterInput, LoginInput } from "./auth.schema";
import { Role } from "../../generated/prisma/enums";

export class AuthService {
    static async registerService(data: RegisterInput) {
        const exists = await prisma.user.findUnique({
            where: { email: data.email }
        });

        if (exists) throw new Error("Email already in use");

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

    static async loginService(data: LoginInput) {
        const user = await prisma.user.findUnique({
            where: { email: data.email },
        });

        if (!user) throw new Error("Invalid email or password");

        const isValid = await comparePassword(data.password, user.password);
        if (!isValid) throw new Error("Invalid email or password");

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
