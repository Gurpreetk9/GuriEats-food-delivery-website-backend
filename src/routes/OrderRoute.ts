import express from "express";
import OrderController from "../controllers/OrderController";
import { jwtCheck, jwtParse } from "../middlewares/auth";

const router = express.Router();

router.get("/", jwtCheck, jwtParse, OrderController.getMyOrders);
router.post(
  "/checkout/create-checkout-session",
  jwtCheck,
  jwtParse,
  OrderController.createCheckoutSession
);

router.post("/checkout/webhook", OrderController.stripeWebhookHandler);

export default router;
