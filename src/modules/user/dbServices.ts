import userInterface from "./userInterface";
import userModel from "./userModel";
import bcrypt from 'bcrypt'
export const createUserToDb = async (user: userInterface) => {
    const res = await userModel.create(user)
    return res
}
export const getAllUserToDb = async () => {
    const res = await userModel.find({}, { password: 0 }).sort({ _id: -1 })
    return res
}

export const getUserByIdToDb = async (id: string) => {
    const res = await userModel.findOne({ _id: id }, { password: 0 })
    return res
}

export const updateUserByIdToDb = async (id: string, user: userInterface) => {
    const res = await userModel.findByIdAndUpdate({ _id: id }, user)
    return res

}

export const deleteUserToDb = async (id: string) => {
    const res = await userModel.findByIdAndDelete({ _id: id })
    return res
}

export const userLoginToDb = async (userName: string, password: string) => {
    const findUserByUserName = await userModel.findOne({ name: userName })
    if (!findUserByUserName) {
        return {
            status: 'fail',
            message: "user not found"
        }
    }
    else {
        const matchPass = await bcrypt.compare(password, findUserByUserName?.password)
        if (matchPass) {
            const randomString = 'fjsahfjakshfjdsahfjsafjsahfjsahfjsaf333@@####'
            const token = await bcrypt.hash(randomString, 10)
            const newUser = {
                token: token
            }
            try {
                const res = await userModel.updateOne({ name: findUserByUserName.name }, newUser)
                return {
                    name: findUserByUserName?.name,
                    email: findUserByUserName?.email,
                    token: token
                }
            } catch (error) {
                return error
            }


        }
        else {
            return {
                status: 'fail',
                message: "password not match"
            }
        }
    }

}