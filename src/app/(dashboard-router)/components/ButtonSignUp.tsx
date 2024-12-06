"use client"


import { signOut } from "next-auth/react"
import { useRouter } from "next/navigation"

export const ButtonSignUp = ()=>{


const router = useRouter()
 const handleSignUp = async()=>{
   await signOut({
    redirect:false
   })
   
   router.replace('/')
 }

    return(
        <button onClick={handleSignUp}>Sair</button>
    )
}