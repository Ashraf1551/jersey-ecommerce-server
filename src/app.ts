import express, {
  type Application,
  type Request,
  type Response,
} from "express";
import logger from "./middleware/logger";
import { productTypesRoute } from "./modules/product-type/product-type.route";

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

export default app;
