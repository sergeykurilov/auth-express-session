import { Request, Response } from "express";
import { TagService } from "../../services/tag/tag.service";

const tagService = new TagService();

export const getAllTags = async (req: Request, res: Response) => {
  try {
    const tags = await tagService.getAllTags();
    res.json(tags);
  } catch (error) {
    res.status(500).send({ message: "Error retrieving tags." });
  }
};

export const createTag = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(400).send({ message: "Tag name is required." });
    }

    const tag = await tagService.createTag(name);
    res.status(201).json(tag);
  } catch (error) {
    res.status(500).send({ message: "Error creating tag." });
  }
};
