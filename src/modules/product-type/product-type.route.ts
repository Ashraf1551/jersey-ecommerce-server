import { Router } from "express";
import { productTypesController } from "./product-type.controller";

const router = Router();

router.post("/", productTypesController.createProductTypes);
router.get("/", productTypesController.getAllProductTypes);
router.get("/:id", productTypesController.getSingleProductType);
router.patch("/:id", productTypesController.updateProductType);
router.delete("/:id", productTypesController.deleteProductType);

export const productTypesRoute = router;
