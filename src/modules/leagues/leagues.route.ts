import { Router } from "express";
import { leaguesController } from "./leagues.controller";

const router = Router();

router.post("/", leaguesController.createLeague);
router.get("/", leaguesController.getAllLeagues);
router.get("/:id", leaguesController.getSingleLeague);
router.patch("/:id", leaguesController.updateLeague);
router.delete("/:id", leaguesController.deleteLeague);

export const leaguesRoute = router;
