import type { Request, Response } from "express";
import { getAllUsersService, registerUserService } from "./user.service";
import { errors } from "../config/errorCodes";

export async function registerUserController(req: Request, res: Response) {
    try {
        const { firstName, lastName, email, phone, password, avatar } = req.body

        const user = await registerUserService({
            email,
            password,
            firstName,
            lastName,
            phone,
            avatar
        })

        res.status(200).json(user)
    }
    catch (err: any) {
        if (err.message === errors.P1001) {
            res.status(400).json({
                code: "P1001",
                error: err.message
            })
            return
        } else if (err.message === errors.P1003) {
            res.status(400).json({
                code: "P1003",
                error: err.message
            })
            return
        } else if (err.message === errors.P1005) {
            res.status(500).json({
                code: "P1005",
                error: err.message
            })
            return
        }
    }
}

export async function getAllUsersController(req: Request, res: Response) {
    try {
        const users = await getAllUsersService()
        res.status(200).json(users)
    }
    catch (err: any) {
        if (err.message === errors.P1005) {
            res.status(500).json({
                code: "P1005",
                error: err.message
            })
            return
        }
    }
}