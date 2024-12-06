

import axios from "axios";
import { Prisma, TransactionType } from "@prisma/client";
import { CreeateTransaction } from "@/types/Transaction";
export const fetchTransactions = async () => {
    const res = await axios.get("/api/transactions");
    return res.data;
  };
  
  export const deleteTransaction = async ({id,type}:{id: number,type:TransactionType}) => {
    const res = await axios.delete(`/api/transactions/${type}/${id}`);
    return res.data;
  };

  export const postTransaction = async(newTransaction:CreeateTransaction)=>{
   const res = await axios.post("/api/transactions", newTransaction);
   return res.data
  }