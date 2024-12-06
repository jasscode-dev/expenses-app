
import { Prisma, TransactionType } from "@prisma/client";



export  type CreeateTransaction ={
    name:string
    amount: number,
    type: TransactionType,
    description?: string,
    category: string,
    payMethod: string
}

