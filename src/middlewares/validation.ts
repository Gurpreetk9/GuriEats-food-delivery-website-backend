import { NextFunction, Request, Response } from "express";
import { body, validationResult } from "express-validator";

function handleValidationErrors(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
}
export const validateUserRequest = [
  body("name").isString().notEmpty().withMessage("Name must be a string"),
  body("addressLine1")
    .isString()
    .notEmpty()
    .withMessage("addressLine1 must be a string"),
  body("city").isString().notEmpty().withMessage("city must be a string"),
  body("country").isString().notEmpty().withMessage("country must be a string"),
  handleValidationErrors,
];

export const validateRestaurantRequest = [
  body("restaurantName")
    .isString()
    .notEmpty()
    .withMessage("Restaurant name is required"),
  body("city").isString().notEmpty().withMessage("City is required"),
  body("country").isString().notEmpty().withMessage("Country is required"),
  body("deliveryPrice")
    .isFloat({ min: 0 })
    .withMessage("Delivery Price is required"),
  body("estimatedDeliveryTime")
    .isInt({ min: 0 })
    .withMessage("Estimated Deliver Time is required"),
  body("cuisines")
    .isArray()
    .withMessage("Cuisines must be array")
    .not()
    .isEmpty()
    .withMessage("Cuisines array cannot be empty"),
  body("menuItems").isArray().withMessage("Menu Item must be array"),
  body("menuItems.*.name").notEmpty().withMessage("Menu Item name is required"),
  body("menuItems.*.price")
    .isFloat({ min: 0 })
    .withMessage("Menu Item price is required and must ne a positive number"),
  handleValidationErrors,
];
