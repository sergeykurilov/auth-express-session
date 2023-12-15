import { prisma } from "../../repositories/user/user.repository";

export class ProfileService {
  async getProfile(userId: number) {
    return prisma.profile.findUnique({
      where: { userId },
    });
  }

  async createProfile(userId: number, bio: string) {
    return prisma.profile.create({
      data: {
        userId,
        bio,
      },
    });
  }

  async updateProfile(userId: number, bio: string) {
    return prisma.profile.update({
      where: { userId },
      data: { bio },
    });
  }
}
