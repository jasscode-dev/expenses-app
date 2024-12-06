import { getServerSession } from "next-auth"
import { ReactNode } from "react"
import { nextAuthOptions } from "../api/auth/[...nextauth]/route"
import { redirect } from "next/navigation"
import { Providers } from "@/utils/Providers"

type Props={
    children: ReactNode
}

export default async function PrivateLayout({children}:Props) {
    const session = await getServerSession(nextAuthOptions)

    if(!session){
        redirect('/')
    } 

    return <>
    <Providers>
    {children}
    </Providers>
    </>
}
   