import { Router } from "express";
import { countriesController } from "./countries.controller";

const router = Router();

router.post("/", countriesController.createCountry);
router.get("/", countriesController.getAllCountries);
router.get("/:id", countriesController.getSingleCountry);
router.patch("/:id", countriesController.updateCountry);
router.delete("/:id", countriesController.deleteCountry);

export const countriesRoute = router;
