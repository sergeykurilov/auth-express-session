import { prisma } from "../../repositories/user/user.repository";

export class CommentService {
  async getCommentsByPost(postId: number) {
    return prisma.comment.findMany({
      where: { postId },
    });
  }

  async createComment(postId: number, userId: number, text: string) {
    return prisma.comment.create({
      data: {
        postId,
        userId,
        text,
      },
    });
  }
}
