import { Request, Response } from "express";
import { PostService } from "../../services/post/post.service";

const postService = new PostService();

export const getPostsByUser = async (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.params.userId);
    const posts = await postService.getPostsByUser(userId);
    res.json(posts);
  } catch (error) {
    res.status(500).send({ message: "Error retrieving posts." });
  }
};

export const createPost = async (req: Request, res: Response) => {
  try {
    const { userId, title, content } = req.body;
    if (!userId || !title || !content) {
      return res
        .status(400)
        .send({ message: "UserId, title, and content are required." });
    }

    const newPost = await postService.createPost(userId, title, content);
    res.status(201).json(newPost);
  } catch (error) {
    res.status(500).send({ message: "Error creating post." });
  }
};
