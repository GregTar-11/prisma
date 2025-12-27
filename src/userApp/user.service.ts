import { error } from "node:console";
import type { CreateUser } from "./user.types";
import { findAllUsers, findUserByEmail, findUserByPhone, userCreate } from "./user.repository";
import bcrypt from 'bcrypt'
import { errors } from "../config/errorCodes";
import jwt from 'jsonwebtoken'
import { SECRET_KEY } from "../config/token";

export async function registerUserService(data: CreateUser) {
    const { firstName, lastName, email, phone, password, avatar } = data

    if (!firstName || !lastName || !email || !phone || !password || !avatar) {
        throw new Error(errors.P1002)
    }

    const existingByEmail = await findUserByEmail(email)
    const existingByPhone = await findUserByPhone(phone)


    if (existingByEmail && existingByPhone) throw new Error(errors.P1003)

    const hashedPassword = await bcrypt.hash(password, 10)

    const userData: CreateUser = {
        email,
        password: hashedPassword,
        firstName,
        lastName,
        phone,
        avatar
    }
    try {
        const user = await userCreate(userData)
        const { password, ...safeUser } = user
        return safeUser
    }
    catch (err: any) {
        throw new Error(errors.P1005)
    }
}

export async function getAllUsersService() {
    try {
        const users = await findAllUsers()
        return users.map(({ password, ...safeUser }) => safeUser)
    }
    catch (err: any) {
        throw new Error(errors.P1005)
    }
}

export async function loginUserService(email: string, password: string) {
    if (!email || !password) {
        throw new Error(errors.P1004)
    }

    const user = await findUserByEmail(email)
    if (!user) {
        throw new Error(errors.P1004)
    }

    const isMatch = await bcrypt.compare(password, user.password)
    const { password: _password, ...safeUser } = user

    const token = jwt.sign({
        id: safeUser.id,
        email: safeUser.email
    },
    SECRET_KEY,
    {expiresIn:'1h'}
    )

    return {user:safeUser,token}
}