import { Request, Response, NextFunction } from "express";

export function authenticate(req: Request, res: Response, next: NextFunction) {
  // @ts-ignore
  if (req.session && req.session.userId) {
    next(); // The user is logged in, continue to the next middleware/route handler
  } else {
    res.status(401).send({ message: "Unauthorized" }); // The user is not logged in, block the request
  }
}
