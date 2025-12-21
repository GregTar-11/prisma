import { prisma } from "../prisma/client";
import type { CreateUser } from "./user.types";

export async function userCreate(data: CreateUser) {
    return prisma.user.create({ data })
}

export async function findUserByEmail(email: string) {
    return prisma.user.findUnique({ where: { email } })
}

export async function findUserByPhone(phone: string) {
    return prisma.user.findUnique({ where: { phone } })
}

export async function findAllUsers() {
    return prisma.user.findMany()
}