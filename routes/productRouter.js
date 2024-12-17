import express from "express";
import {
  AddProduct,
  productList,
  productRemove,
  singleProduct,
} from "../controllers/productController.js";
import upload from "../middleware/multer.js";

const productRouter = express.Router();

productRouter.post(
  "/add",
  upload.fields([
    { name: "image1", maxCount: 1 },
    { name: "image2", maxCount: 1 },
  ]),
  AddProduct
);

productRouter.post("/remove", productRemove);
productRouter.get("/single", singleProduct);
productRouter.get("/list", productList);

export default productRouter;
