import { Request, Response } from "express";
import { UserService } from "../../services/user/user.service";
import { addHours } from "date-fns";
import { prisma } from "../../repositories/user/user.repository";
import { Session, SessionData } from "express-session";

export async function loginController(req: Request, res: Response) {
  const { email, password } = req.body;
  const userService = new UserService();

  try {
    if (!email || !password) {
      return res
        .status(400)
        .send({ message: "Email and password are required." });
    }

    const user = await userService.validateUser(email, password);

    const expirationHours = 24; // For example, setting the session to expire after 24 hours
    const expiresAt = addHours(new Date(), expirationHours);

    const session = await prisma.session.create({
      data: {
        userId: user.id,
        userAgent: req.headers["user-agent"] || null,
        ipAddress: req.ip || null,
        expiresAt: expiresAt,
      },
    });

    (
      req.session as Session & Partial<SessionData> & { sessionId: string }
    ).sessionId = session.id;
    req.session.save((err) => {
      if (err) {
        console.error(err);
        return res.status(500).send({ message: "Error saving session." });
      }
      res.status(200).send({ message: "Login successful" });
    });
  } catch (error) {
    console.error(error);
    res.status(401).send({ message: "Invalid credentials" });
  }
}
