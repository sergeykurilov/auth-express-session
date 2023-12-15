import { Request, Response } from "express";
import { registerController } from "./auth/register.controller";
import { loginController } from "./auth/login.controller";
import { authenticate } from "../middlewares/authenticate.middleware";
import { userController } from "./user/user.controller";
import { Router } from "express";
import { prisma } from "../repositories/user/user.repository";
import { Session, SessionData } from "express-session";
import {
  getProfile,
  updateProfile,
  createProfile,
} from "./profile/profile.controller";
import { createPost, getPostsByUser } from "./post/post.controller";
import { createComment, getCommentsByPost } from "./comment/comment.controller";
import { createTag, getAllTags } from "./tag/tag.controller";
import {
  followUser,
  getUserFollowers,
  getUserFollowing,
  unfollowUser,
} from "./userFollowers/userFollowers.controller";

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

  await prisma.session.delete({
    where: {
      id: sessionId,
    },
  });

  req.session.destroy((err) => {
    if (err) {
      console.error("Session destruction error:", err);
      return res.status(500).send({ message: "Failed to log out." });
    }
    res.redirect("/");
  });
});

router.get("/profile/:userId", getProfile);
router.post("/profile", createProfile);
router.put("/profile/:userId", updateProfile);

router.get("/posts/user/:userId", getPostsByUser);
router.post("/post", createPost);

router.get("/comments/post/:postId", getCommentsByPost);
router.post("/comment", createComment);

router.get("/tags", getAllTags);
router.post("/tag", createTag);

router.post("/follow", followUser);
router.post("/unfollow", unfollowUser);
router.get("/followers/:userId", getUserFollowers);
router.get("/following/:userId", getUserFollowing);

export default router;
