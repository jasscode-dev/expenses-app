import { getServerSession } from "next-auth";
import { nextAuthOptions } from "../../auth/[...nextauth]/route";
import prisma from "@/libs/prisma";
import { NextResponse } from "next/server";
import { validateTransactionType } from "@/utils/transactionTypeValidator";
import { transactionService } from "@/services/database";
import { Prisma } from "@prisma/client";

export async function GET(request: Request) {
  const session = await getServerSession(nextAuthOptions);

  if (!session || !session.user) {
    return new Response(JSON.stringify({ error: "Not authenticated" }), {
      status: 401,
    });
  }

  try {
    const userId = parseInt(session.user.id);

    const response = await prisma.transaction.findMany({
      where: { userId: userId },
    });
  
    return NextResponse.json(response);
  } catch (error) {
    return NextResponse.json(error);
  }
}

export async function POST(request: Request) {
  const session = await getServerSession(nextAuthOptions);

  if (!session || !session.user) {
    return new Response(JSON.stringify({ error: "Not authenticated" }), {
      status: 401,
    });
  }
  const body = await request.json();

  try {
    const newTransaction:   Prisma.TransactionUncheckedCreateInput= {
      ...body,
      userId:parseInt(session.user.id)
    };

    const response = await transactionService.addTransaction(newTransaction)
      

    return NextResponse.json(response);
  } catch ( error  ) {

    return NextResponse.json(error)
    
    
  }
   
}
