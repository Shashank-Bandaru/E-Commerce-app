import express from "express";
import {
  createProductController,
  deleteProductController,
  getProductController,
  getSingleProductController,
  productImageController,
  updateProductController,
  productFiltersController,
  productCountController,
  productPageListController,
  searchProductController,
  relatedProductController,
  productCategoryController,
  braintreeTokenController,
  brainTreePaymentController,
} from "../controllers/productController.js";
import {
  isAdmin,
  requiresSignIn,
} from "../middlewares/authenticatonMiddleware.js";
import formidable from "express-formidable";

const router = express.Router();

//routes
router.post(
  "/create-product",
  requiresSignIn,
  isAdmin,
  formidable(),
  createProductController
);
//routes
router.put(
  "/update-product/:pid",
  requiresSignIn,
  isAdmin,
  formidable(),
  updateProductController
);

//fetch all  products
router.get("/list", getProductController);

//fetch a single product
router.get("/single-product/:slug", getSingleProductController);

//get image
router.get("/product-image/:pid", productImageController);

//delete product
router.delete(
  "/delete-product/:pid",
  requiresSignIn,
  isAdmin,
  formidable(),
  deleteProductController
);

//filter product
router.post("/product-filters", productFiltersController);

// product count
router.get("/product-count", productCountController);

//product per page
router.get("/product-list/:page", productPageListController);

// product search
router.get('/search/:keyword',searchProductController)

//similar product

router.get('/related-product/:pid/:cid',relatedProductController)

//category wise product
router.get("/product-category/:slug", productCategoryController);

//payments routes
//token
router.get("/braintree/token", braintreeTokenController);

//payments
router.post("/braintree/payment", requiresSignIn, brainTreePaymentController);

export default router;
