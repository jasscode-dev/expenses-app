import prisma from "@/libs/prisma";
import { DebtType } from "@/utils/validateDebtType";

export const debtService = {
  getDebts: async (userId: number) => {
    return await prisma.debt.findMany({ where: { userId } });
  },

  addDebt: async (
    name: string,
    dueDate: Date,
    amount: number,
    userId: number,
    type: DebtType
  ) => {
    return await prisma.debt.create({
      data: { name, dueDate, amount, userId, type },
    });
  },
};