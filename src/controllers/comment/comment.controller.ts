import { Request, Response } from "express";
import { CommentService } from "../../services/comment/comment.service";

const commentService = new CommentService();

export const getCommentsByPost = async (req: Request, res: Response) => {
  try {
    const postId = parseInt(req.params.postId);
    const comments = await commentService.getCommentsByPost(postId);
    res.json(comments);
  } catch (error) {
    res.status(500).send({ message: "Error retrieving comments." });
  }
};

export const createComment = async (req: Request, res: Response) => {
  try {
    const { postId, userId, text } = req.body;
    if (!postId || !userId || !text) {
      return res
        .status(400)
        .send({ message: "PostId, UserId, and text are required." });
    }

    const newComment = await commentService.createComment(postId, userId, text);
    res.status(201).json(newComment);
  } catch (error) {
    res.status(500).send({ message: "Error creating comment." });
  }
};
