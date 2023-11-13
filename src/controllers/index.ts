import { Request, Response } from "express";
import { registerController } from "./auth/register.controller";
import { loginController } from "./auth/login.controller";
import { authenticate } from "../middlewares/authenticate.middleware";
import { userController } from "./user/user.controller";
import { Router } from "express";
import { prisma } from "../repositories/user/user.repository";
import { Session, SessionData } from "express-session";

export const router = Router();

router.post("/login", loginController);
router.post("/register", registerController);
router.get("/user", authenticate, userController);
router.get("/healthcheck", (req: Request, res: Response) => {
  res.status(200).json({ status: "ok", timestamp: new Date().toISOString() });
});
router.get("/logout", async (req: Request, res: Response) => {
  const sessionId = (
    req.session as Session & Partial<SessionData> & { sessionId: string }
  ).sessionId;

  const session = await prisma.session.findUnique({
    where: {
      id: sessionId,
    },
  });

  if (
    session &&
    new Date() <
      new Date(
        (
          req.session as Session & Partial<SessionData> & { expiresAt: string }
        ).expiresAt,
      )
  ) {
    await prisma.session.delete({
      where: {
        id: sessionId,
      },
    });
  }

  req.session.destroy((err) => {
    if (err) {
      console.error("Session destruction error:", err);
      return res.status(500).send({ message: "Failed to log out." });
    }
    res.redirect("/");
  });
});

export default router;
