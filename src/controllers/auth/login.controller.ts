import { Request, Response } from "express";
import { UserService } from "../../services/user/user.service";

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

    req.session.userId = user.id;
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
