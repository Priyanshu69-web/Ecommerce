import express from "express";
import {
    createProductController, deleteProductController,
    getProductController, getSingleProductController,
    productCountController, productFilterController,
    productListController, productPhotoController,
    updateProductController, braintreePaymentCotroller,
    braintreeTokenCotroller
}
    from "../controller/productController.js";
import { isAdmin, requireSignIn } from '../middleware/authMiddleware.js';

import formidable from "express-formidable";
const router = express.Router();

router.post(
    "/create-product",
    requireSignIn,
    isAdmin,
    formidable(),
    createProductController
);
router.get(
    "/get-product",
    getProductController
);
router.get(
    "/get-product/:slug",
    getSingleProductController
);
router.get(
    "/product-photo/:pid",
    productPhotoController

);

router.delete(
    "/delete-product/:pid",
    deleteProductController
)

router.put(
    "/update-product/:pid",
    requireSignIn,
    formidable(),
    updateProductController,

)

//Filter Product
router.post("/product-filters", productFilterController);

//Product Count
router.get("/product-count", productCountController);

//Product Per Page
router.get("/product-list/:page", productListController);
//Payment Routes
//Token
router.get("/braintree/token", braintreeTokenCotroller);

//Payment
router.post("/braintree/payment", requireSignIn, braintreePaymentCotroller);



export default router;