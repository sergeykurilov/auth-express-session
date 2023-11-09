import { Request, Response, NextFunction } from "express";

export function authenticate(req: Request, res: Response, next: NextFunction) {
  if (!req.session || !(req.session as { userId?: number })?.userId) {
    res.status(401).send({ message: "Unauthorized" });
  } else {
    next();
  }
}
