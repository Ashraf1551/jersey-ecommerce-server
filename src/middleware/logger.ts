import type { NextFunction, Request, Response } from "express";
import fs from "fs";

const logger = (req: Request, res: Response, next: NextFunction) => {
  const log = `[${new Date().toISOString()}] ${req.method} ${req.url}`;
  console.log(log);
  fs.appendFile("logger.txt", log + "\n", (err) => {});
  next();
};

export default logger;
