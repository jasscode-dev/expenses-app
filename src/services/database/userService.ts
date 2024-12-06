import prisma from "@/libs/prisma";

export const userService = {
    addUser: async (name: string, email: string, password: string) => {
      return await prisma.user.create({
        data: { name, email, password },
      });
    },
  
    getUserFromEmail: async (email: string) => {
      return await prisma.user.findUnique({ where: { email } });
    },
  };