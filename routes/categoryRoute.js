import express from "express";
import {
  isAdmin,
  requiresSignIn,
} from "../middlewares/authenticatonMiddleware.js";
import {
  createCategoryController,
  deleteCategoryController,
  getAllCategoryController,
  getSingleCategoryController,
  updateCategoryController,
} from "../controllers/categoryController.js";

const router = express.Router();

//routes

//create category
router.post(
  "/create-category",
  requiresSignIn,
  isAdmin,
  createCategoryController
);

//update category
router.put(
  "/update-category/:id",
  requiresSignIn,
  isAdmin,
  updateCategoryController
);

// fetch all category
router.get("/list", getAllCategoryController);

//fetch a particular category
router.get('/single-category/:slug',getSingleCategoryController)

//delete a category
router.delete('/delete-category/:id',requiresSignIn,isAdmin,deleteCategoryController)

export default router;
