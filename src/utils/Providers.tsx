"use client"
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactNode } from "react";
import { queryClient } from "@/libs/queryClient";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { SessionProvider } from "next-auth/react";

export const Providers = ({children}:{children:ReactNode})=>{
 
    return(
       
        <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools
        initialIsOpen={false}
      
        />
         <SessionProvider>
         {children}
         </SessionProvider>
        </QueryClientProvider>
        
    )
}