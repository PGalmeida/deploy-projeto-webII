import express from "express";
import {
  deleteProductbyID,
  getProductbyID,
  getProducts,
  newProduct,
  updateProductbyID,
} from "../controllers/productControllers.js";
const router = express.Router();

router.route("/products").get(getProducts);

router.route("/admin/products").post(newProduct);

router.route("/products/:id").get(getProductbyID);

router.route("/products/:id").put(updateProductbyID);

router.route("/products/:id").delete(deleteProductbyID);

export default router;
