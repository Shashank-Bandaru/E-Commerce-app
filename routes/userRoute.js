import { deleteUserController, getAllUserController } from "../controllers/userController.js";
import express from "express";
import {
    isAdmin,
    requiresSignIn,
} from "../middlewares/authenticatonMiddleware.js";

const router = express.Router();

router.get("/user-list", getAllUserController);

router.delete('/delete-user/:id',requiresSignIn,isAdmin,deleteUserController)

export default router;
