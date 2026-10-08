import app from "./app";
import config from "./config";
import { intiDB } from "./db";

const main = () => {
  intiDB();
  app.listen(config.port, () => {
    console.log(`Example app listening on port ${config.port}`);
  });
};

main();
