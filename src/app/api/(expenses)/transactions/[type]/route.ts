import { getServerSession } from "next-auth";
import prisma from "@/libs/prisma";
import { NextResponse } from "next/server";
import { nextAuthOptions } from "@/app/api/auth/[...nextauth]/route";
import { validateTransactionType } from "@/utils/transactionTypeValidator";

export async function GET(
  request: Request,
  { params }: { params: { type: string } }
) {
  const session = await getServerSession(nextAuthOptions);

  if (!session || !session.user) {
    return new Response(JSON.stringify({ error: "Not authenticated" }), {
      status: 401,
    });
  }

  try {
    const userId = parseInt(session.user.id);
    const { type } = params;
   
  const transactionType = validateTransactionType(type)
    const response = await prisma.transaction.findMany({
      where: {
        type: transactionType,
        userId: userId,
      },
    });
    
    return NextResponse.json(response);
  } catch (error) {
    return NextResponse.json(error);
  }
}
