"use client"
import { nextAuthOptions } from "@/app/api/auth/[...nextauth]/route"
import { getServerSession } from "next-auth"
import { ButtonSignUp } from "../components/ButtonSignUp"
import { ButtonAddExpense } from "../components/ButtonAddExpense"
import { ExpenseList } from "../components/Transactions/expenseList"
import { useSession } from "next-auth/react"




const Dashboard = ()=>{
  
   const{data:session,status}=useSession()
 return(
    <div className="flex flex-col justify-center items-center">oi {session?.user.name}
     <p>id: {session?.user.id}</p>

  
    <ExpenseList/>
    <ButtonSignUp/>
    <ButtonAddExpense/>
    
    </div>
 )
}

export default Dashboard