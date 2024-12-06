
"use client"





import { useDeleteTransaction } from "@/services/api/mutations"
import { useTransactions } from "@/services/api/queries"
import { TransactionType } from "@/utils/transactionTypeValidator"
import { useSessionInfo } from "@/utils/useSessionInfo"
import axios from "axios"
import { useSession } from "next-auth/react"
import { useEffect, useState, useTransition } from "react"

export const ExpenseList = ()=>{
  const { session, status} = useSessionInfo();
  const deleteTransaction = useDeleteTransaction()
 const {data:transactions} = useTransactions(status==='authenticated',session?.user.id)
  if(transactions?.length === 0){
    return <p>nenhuma expense</p>
  }

const handleDelete= async(id:number,type:TransactionType)=>{
 if(id){
  deleteTransaction.mutate({id,type})
 }
}
   return (
     <div>

   {transactions?.map((item)=>(
      <div key={item.id}>{item.name}
      <button onClick={()=>handleDelete(item.id,item.type)}>Delete</button>
      </div>
     ))} 
    
     </div>
   );
}