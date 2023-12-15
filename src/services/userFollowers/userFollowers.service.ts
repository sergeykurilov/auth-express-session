import { prisma } from "../../repositories/user/user.repository";

export class UserFollowersService {
  async followUser(followerId: number, followingId: number) {
    return prisma.userFollowers.create({
      data: {
        followerId,
        followingId,
      },
    });
  }

  async unfollowUser(followerId: number, followingId: number) {
    return prisma.userFollowers.deleteMany({
      where: {
        followerId,
        followingId,
      },
    });
  }

  async getUserFollowers(userId: number) {
    return prisma.user.findUnique({
      where: { id: userId },
      select: {
        followers: {
          select: {
            follower: {
              select: { id: true, email: true },
            },
          },
        },
      },
    });
  }

  async getUserFollowing(userId: number) {
    return prisma.user.findUnique({
      where: { id: userId },
      select: {
        following: {
          select: {
            following: {
              select: { id: true, email: true },
            },
          },
        },
      },
    });
  }
}
