import express, {
  type Application,
  type Request,
  type Response,
} from "express";
import logger from "./middleware/logger";
import { productTypesRoute } from "./modules/product-type/product-type.route";
import { countriesRoute } from "./modules/countries/countries.route";
import { leaguesRoute } from "./modules/leagues/leagues.route";
import { clubsRoute, leagueClubsRoute } from "./modules/clubs/clubs.route";

const app: Application = express();
app.use(express.json());

app.use(logger);

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    message: "Jersey Ecommerce Server",
    author: "Ashraf",
    version: "1.0.0",
  });
});

app.use("/api/product-types", productTypesRoute);
app.use("/api/countries", countriesRoute);
app.use("/api/leagues", leaguesRoute);
app.use("/api/leagues", leagueClubsRoute);
app.use("/api/clubs", clubsRoute);

export default app;
