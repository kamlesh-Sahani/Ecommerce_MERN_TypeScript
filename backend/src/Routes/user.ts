import express from "express";
import { deleteUser, getAllUser, getUser, register, userLogin } from "../Controllers/user.js";
import { isAdmin } from "../middlewares/isAdmin.js";

const router  =express.Router();

// register user
router.post('/register',register);
router.post('/login',userLogin);
//get All users
router.get('/all',isAdmin,getAllUser);
// get single routes
router.get('/:id',getUser);
// delte user
router.delete('/:id',isAdmin,deleteUser);
export default router;