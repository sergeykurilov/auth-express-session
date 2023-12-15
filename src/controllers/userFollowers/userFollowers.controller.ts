import { Request, Response } from "express";
import { UserFollowersService } from "../../services/userFollowers/userFollowers.service";

const userFollowersService = new UserFollowersService();

export const followUser = async (req: Request, res: Response) => {
  try {
    const { followerId, followingId } = req.body;
    const result = await userFollowersService.followUser(
      followerId,
      followingId,
    );
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "error?.message" });
  }
};

export const unfollowUser = async (req: Request, res: Response) => {
  try {
    const { followerId, followingId } = req.body;
    await userFollowersService.unfollowUser(followerId, followingId);
    res.status(200).send({ message: "Unfollowed successfully" });
  } catch (error) {
    res.status(500).send({ message: "error" });
  }
};

export const getUserFollowers = async (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.params.userId);
    const followers = await userFollowersService.getUserFollowers(userId);
    res.status(200).json(followers);
  } catch (error) {
    res.status(500).send({ message: "error" });
  }
};

export const getUserFollowing = async (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.params.userId);
    const following = await userFollowersService.getUserFollowing(userId);
    res.status(200).json(following);
  } catch (error) {
    res.status(500).send({ message: "error" });
  }
};
