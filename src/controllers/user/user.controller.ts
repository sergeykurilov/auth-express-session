import { Request, Response } from "express";
import { UserService } from "../../services/user/user.service";

const userService = new UserService();

export async function userController(req: Request, res: Response) {
  try {
    const users = await userService.findAllUsers();
    res.json(users);
  } catch (error) {
    res.status(500).send({ message: "Internal server error" });
  }
}
