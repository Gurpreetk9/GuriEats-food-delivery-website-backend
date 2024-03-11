import express from "express";
import multer from "multer";
import myRestaurantController from "../controllers/myRestaurantController";
import { jwtCheck, jwtParse } from "../middlewares/auth";
import { validateRestaurantRequest } from "../middlewares/validation";

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});

router.get("/", jwtCheck, jwtParse, myRestaurantController.getMyRestaurant);
router.post(
  "/",
  upload.single("imageFile"),
  validateRestaurantRequest,
  jwtCheck,
  jwtParse,
  myRestaurantController.createMyRestaurant
);

router.put(
  "/",
  upload.single("imageFile"),
  validateRestaurantRequest,
  jwtCheck,
  jwtParse,
  myRestaurantController.updateMyRestaurant
);

export default router;
