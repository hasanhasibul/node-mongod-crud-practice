import { Request, Response } from "express";
import userInterface from "./userInterface";
import bcrypt from 'bcrypt'
import { createUserToDb, deleteUserToDb, getAllUserToDb, getUserByIdToDb, updateUserByIdToDb, userLoginToDb } from "./dbServices";

export const createUser = async (req: Request, res: Response) => {

    const passHass = await bcrypt.hash(req.body.password, 10)
    const reqBody: userInterface = {
        name: req.body.name,
        email: req.body.email,
        password: passHass
    }
    try {
        const data = await createUserToDb(reqBody)
        res.send({
            status: 'succes',
            message: 'user created succesfull'
        })
    } catch (error) {
        res.send({
            status: 'fail',
            data: error,
            message: 'fail to creat user'
        })
    }
}

export const getUsers = async (req: Request, res: Response) => {
    try {
        const data = await getAllUserToDb()
        res.send({
            status: 'succes',
            data: data?.map((item) => {
                return {
                    id: item?.id,
                    name: item?.name,
                    email: item?.email,
                }
            }),
            message: 'user fatch succesfull'
        })
    } catch (error) {
        res.send({
            status: 'fail',
            data: error,
            message: 'fail to fetch user'
        })
    }
}

export const getUserById = async (req: Request, res: Response) => {
    const { id } = req.params
    try {
        const data = await getUserByIdToDb(id)
        res.send({
            status: 'success',
            data: {
                id: data?._id,
                name: data?.name,
                email: data?.email,
            },
            message: 'user fetch succesfullu'
        })
    } catch (error) {
        res.send({
            status: 'fail',
            data: error,
            message: 'user fetch fail'
        })
    }
}

export const updateUser = async (req: Request, res: Response) => {
    const { id } = req.params
    const reqBody: userInterface = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    }
    try {
        const data = await updateUserByIdToDb(id, reqBody)
        res.send({
            status: 'success',
            // data: data,
            message: 'user updated succesfull'
        })
    } catch (error) {
        res.send({
            status: 'fail',
            data: error,
            message: 'fail to create user'
        })
    }
}
export const deleteUser = async (req: Request, res: Response) => {
    const { id } = req.params
    try {
        const data = await deleteUserToDb(id)
        res.send({
            status: 'success',
            // data: data,
            message: 'user deleted succesfull'
        })
    } catch (error) {
        res.send({
            status: 'fail',
            data: error,
            message: 'fail to delete user'
        })
    }
}

export const userLogin = async (req: Request, res: Response) => {

    try {
        const data = await userLoginToDb(req.body.name, req.body.password)
        res.send({
            status: 'success',
            data: data,
            message: 'user deleted succesfull'
        })
    } catch (error) {

    }

}