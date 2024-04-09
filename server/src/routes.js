import { Router } from "express";
import { SearchProduct, addProduct, deleteProduct, getProduct } from "./controller.js";

const router = Router();

router.route("/addProduct").post(addProduct);
router.route("/getproduct").post(getProduct);
router.route("/productsearch/search").get(SearchProduct);
router.route("/deleteproduct/:id").delete(deleteProduct);


export default router;
