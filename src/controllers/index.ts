import { Request, Response } from "express";
import { registerController } from "./auth/register.controller";
import { loginController } from "./auth/login.controller";
import { authenticate } from "../middlewares/authenticate.middleware";
import { userController } from "./user/user.controller";
import { Router } from "express";

export const router = Router();

router.post("/login", loginController);
router.post("/register", registerController);
router.get("/user", authenticate, userController);
router.get("/healthcheck", (req: Request, res: Response) => {
  res.status(200).json({ status: "ok", timestamp: new Date().toISOString() });
});
router.get("/logout", (req: Request, res: Response) => {
  req.session.destroy((err) => {
    if (err) {
      console.error("Session destruction error:", err);
      return res.status(500).send({ message: "Failed to log out." });
    }
    console.log("Session destroyed.");
    res.redirect("/");
  });
});

export default router;
