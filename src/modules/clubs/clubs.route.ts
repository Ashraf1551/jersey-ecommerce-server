import { Router } from "express";
import { clubsController } from "./clubs.controller";

const router = Router();

router.post("/", clubsController.createClub);
router.get("/", clubsController.getAllClubs);
router.get("/:id", clubsController.getSingleClub);
router.patch("/:id", clubsController.updateClub);
router.delete("/:id", clubsController.deleteClub);

const leagueClubsRouter = Router();
leagueClubsRouter.get("/:leagueId/clubs", clubsController.getClubsByLeague);

export const clubsRoute = router;
export const leagueClubsRoute = leagueClubsRouter;
