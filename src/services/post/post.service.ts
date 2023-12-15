import { prisma } from "../../repositories/user/user.repository";

export class PostService {
  async getPostsByUser(userId: number) {
    return prisma.post.findMany({
      where: { userId },
    });
  }

  async createPost(userId: number, title: string, content: string) {
    return prisma.post.create({
      data: {
        userId,
        title,
        content,
      },
    });
  }
}
