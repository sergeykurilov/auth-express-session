import { prisma } from "../../repositories/user/user.repository";

export class TagService {
  async getAllTags() {
    return prisma.tag.findMany();
  }

  async createTag(name: string) {
    return prisma.tag.create({
      data: {
        name,
      },
    });
  }
}
