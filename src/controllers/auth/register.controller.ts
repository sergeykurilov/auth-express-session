import { Request, Response } from "express";
import { UserService } from "../../services/user/user.service";

const userService = new UserService();

export async function registerController(req: Request, res: Response) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .send({ message: "Email and password are required." });
    }

    const newUser = await userService.registerUser(email, password);
    res.status(201).send(newUser);
  } catch (error) {
    res.status(500).send({ message: "Something went wrong." });
  }
}
