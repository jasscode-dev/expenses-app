
import prisma from "@/libs/prisma";
import { TransactionType } from "@/utils/transactionTypeValidator";
import { Prisma } from "@prisma/client";


export const transactionService = {
    addTransaction: async (data:Prisma.TransactionUncheckedCreateInput) => {
      return await prisma.transaction.create({data });
    },
  deleteTransaction:async(id:number,userId:number,type:TransactionType)=>{
    return await prisma.transaction.delete({where:{  id,userId,type  } })
  }
  
  };