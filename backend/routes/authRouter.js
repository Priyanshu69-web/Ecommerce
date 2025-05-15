
import express from "express";
import {
    registerController,
    loginController,
    testController,
    forgotpasswordController,
    updateProfileController,
    getOrderController,
    getAllOrdersController,
    orderStatusController
} from '../controller/authcontroller.js';
import { isAdmin, requireSignIn } from "../middleware/authMiddleware.js";
const router = express.Router();
router.post("/register", registerController);

router.post("/login", loginController);
router.post("/forgot", forgotpasswordController);

router.get("/test", requireSignIn, isAdmin, testController);

router.get('/user-auth', requireSignIn, (req, res) => {
    res.status(200).send({ ok: true });
});
router.get('/admin-auth', requireSignIn, isAdmin, (req, res) => {
    res.status(200).send({ ok: true });
});

//Update user profile
router.put("/profile", requireSignIn, updateProfileController);

// orders
router.get("/orders", requireSignIn, getOrderController);
router.get("all-orders", requireSignIn, isAdmin, getAllOrdersController);
router.put(
    "/order-status/:orderId",
    requireSignIn,
    isAdmin,
    orderStatusController
);


export default router;