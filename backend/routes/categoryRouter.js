import express from "express";
import {isAdmin,requireSignIn} from  "../middleware/authMiddleware.js";
import{createCategoryController,categorycontroller, updateCategoryController, sinlgeCategoryController, delteCategoryConstroller} from "./../controller/categorycontroller.js";
const router =express.Router();

router.post("/create-category",requireSignIn,isAdmin,createCategoryController);

router.get("/get-category",categorycontroller);
router.put("/update-category/:id",requireSignIn,isAdmin,updateCategoryController);

router.get("/single-category/:slug",sinlgeCategoryController);
router.delete("/delete-category/:id",requireSignIn,isAdmin,delteCategoryConstroller);


export default router;
