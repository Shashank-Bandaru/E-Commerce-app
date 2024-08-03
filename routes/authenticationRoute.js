import express from "express";
import {
  regController,
  loginController,
  testController,
  forgotPasswordController,
  updateProfileController,
  getOrdersController,
  orderStatusController,
  getAllOrdersController,
  deleteOrderController,
} from "../controllers/authenticationController.js";
import {
  isAdmin,
  requiresSignIn,
} from "../middlewares/authenticatonMiddleware.js";

//creating a router object
const router = express.Router();

//routing

// Register : Method Post
router.post("/register", regController);

//Login : Method Post
router.post("/login", loginController);

//Forgot Password : Method Post
router.post("/forgot-password", forgotPasswordController);

//test routes
router.get("/test", requiresSignIn, isAdmin, testController);

//protected user-route
router.get("/user-auth", requiresSignIn, (req, res) => {
  res.status(200).send({ ok: true });
});

//protected admin-route
router.get("/admin-auth", requiresSignIn, isAdmin, (req, res) => {
  res.status(200).send({ ok: true });
});

//update profile
router.put("/profile", requiresSignIn, updateProfileController);

//orders
router.get("/orders", requiresSignIn, getOrdersController);

//all orders
router.get("/all-orders", requiresSignIn, isAdmin, getAllOrdersController);

// order status update
router.put(
  "/order-status/:orderId",
  requiresSignIn,
  isAdmin,
  orderStatusController
);
//order delete
router.delete(
  "/order-delete/:orderId",
  requiresSignIn,
  isAdmin,
  deleteOrderController
);

export default router;
