import express from "express"
import { createUser, deleteUser, getUserById, getUsers, updateUser, userLogin } from "./userController"

const router = express.Router()

router.get('/', getUsers)
router.get('/:id', getUserById)
router.post('/', createUser)
router.put('/:id', updateUser)
router.delete('/:id', deleteUser)
router.post('/login', userLogin)

export default router