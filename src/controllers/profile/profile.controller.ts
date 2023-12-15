import { Request, Response } from "express";
import { ProfileService } from "../../services/profile/profile.service";

const profileService = new ProfileService();

export const getProfile = async (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.params.userId);
    const profile = await profileService.getProfile(userId);
    res.json(profile);
  } catch (error) {
    res.status(500).send({ message: "Error retrieving profile." });
  }
};

export const createProfile = async (req: Request, res: Response) => {
  try {
    const { userId, bio } = req.body;
    if (!userId || !bio) {
      return res.status(400).send({ message: "UserId and bio are required." });
    }

    const profile = await profileService.createProfile(userId, bio);
    res.status(201).json(profile);
  } catch (error) {
    res.status(500).send({ message: "Error creating profile." });
  }
};

export const updateProfile = async (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.params.userId);
    const { bio } = req.body;
    if (!bio) {
      return res.status(400).send({ message: "Bio is required." });
    }

    const updatedProfile = await profileService.updateProfile(userId, bio);
    res.json(updatedProfile);
  } catch (error) {
    res.status(500).send({ message: "Error updating profile." });
  }
};
