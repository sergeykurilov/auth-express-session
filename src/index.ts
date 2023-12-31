import express, { Request, Response, NextFunction, Application } from "express";
import session from "express-session";
import cors from "cors";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import { RateLimiterMemory } from "rate-limiter-flexible";
const SQLiteStore = require("connect-sqlite3")(session);

import controllers from "./controllers";
import logger from "./utils/logger";

export const app: Application = express();

const port: string | number = process.env.PORT || 3000;

const rateLimiter: RateLimiterMemory = new RateLimiterMemory({
  points: 10,
  duration: 1,
});

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:4020",
    credentials: true,
  }),
);
app.use(helmet());
app.use(express.json());

app.use(
  session({
    store: new SQLiteStore({
      db: "dev.db",
      dir: "./var/db",
    }),
    secret: process.env.SESSION_SECRET || "default_secret",
    resave: false,
    saveUninitialized: false,
    cookie: { httpOnly: false, secure: false, maxAge: 60 * 1000 },
  }),
);
app.use("/api/v1/", controllers);

app.use((req: Request, res: Response, next: NextFunction) => {
  if (process.env.NODE_ENV === "production") {
    const ip: string = req.ip || "0.0.0.0";
    rateLimiter
      .consume(ip)
      .then(() => {
        next();
      })
      .catch(() => {
        res.status(429).send("Too many requests");
      });
  } else {
    next();
  }
});

app.use((req: Request, res: Response, next: NextFunction) => {
  logger.info(`Request received: ${req.method} ${req.url}`);
  next();
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
