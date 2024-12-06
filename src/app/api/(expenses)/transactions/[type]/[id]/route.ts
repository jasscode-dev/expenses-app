import { NextResponse } from "next/server";
import prisma from "@/libs/prisma";
import { getServerSession } from "next-auth";
import { nextAuthOptions } from "@/app/api/auth/[...nextauth]/route";
import { validateTransactionType } from "@/utils/transactionTypeValidator";
import { transactionService } from "@/services/database";

export async function DELETE(
  request: Request,
  { params }: { params: { id: string; type: string } }
) {
  const session = await getServerSession(nextAuthOptions);

  if (!session || !session.user) {
    return NextResponse.json({ error: "Not authenticated", status: 401 });
  }

  try {
    const { id } = params;
    const idNumber = parseInt(id);
    const { type } = params;
    const transactionType = validateTransactionType(type);
    if (isNaN(idNumber)) {
      return NextResponse.json({ error: "ID deve ser um numero", status: 400 });
    }

   const  response =await transactionService.deleteTransaction(
      idNumber,
      parseInt(session.user.id),
      transactionType
    );
console.log(response)
    return NextResponse.json({
      message: "Expense excluida com sucesso",
      status: 200,
    });
  } catch (error) {
    return NextResponse.json(error);
  }
}

export async function GET(
  request: Request,
  { params }: { params: { id: string; type: string } }
) {
  const session = await getServerSession(nextAuthOptions);

  if (!session || !session.user) {
    return NextResponse.json({ error: "Not authenticated", status: 401 });
  }

  try {
    const { id } = params;

    const idNumber = parseInt(id);
    const { type } = params;
    const transactionType = validateTransactionType(type);
    if (isNaN(idNumber)) {
      return NextResponse.json({ error: "ID deve ser um numero", status: 400 });
    }
    const expense = await prisma.transaction.findUnique({
      where: {
        id: idNumber,
        type: transactionType,
      },
    });

    if (
      expense &&
      expense.userId === parseInt(session.user.id) &&
      transactionType === expense.type
    ) {
      return NextResponse.json(expense);
    } else {
      return NextResponse.json(
        { error: "Transação não encontrada." },
        { status: 404 }
      );
    }
  } catch (error) {
    return NextResponse.json(error);
  }
}
