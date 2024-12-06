import { nextAuthOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import prisma from "@/libs/prisma";

export async function GET (request:Request,{ params }: { params: { id: string }}){
    const session = await getServerSession(nextAuthOptions);
    if(!session || !session.user.id){
      return  NextResponse.json({error:'Usuário não autenticado',status:401})
    }

    try {
       const {id} = params
       const idNUmber = parseInt(id) 
       if(isNaN(idNUmber)){
        return  NextResponse.json({error:'ID deve ser um numero',status:400})
       }
       const card = await prisma.card.findUnique({
        where:{
            id: idNUmber
        }

       })

       if(card && card.userId === parseInt(session.user.id)){
        return NextResponse.json(card)
       }else{
        return NextResponse.json({ error: "Cartão não encontrado ou não pertence ao usuário" }, { status: 404 });
       }
    } catch (error) {
        return NextResponse.json(error)
    }


}