import { getServerSession } from "next-auth";
import { nextAuthOptions } from "../../auth/[...nextauth]/route";
import { NextResponse } from "next/server";
import api from "@/utils/usePrisma";

export async function GET(request: Request) {
  const session = await getServerSession(nextAuthOptions);

  if (!session || !session.user) {
    return NextResponse.json({ message: "Usuário não autenticado" });
  }

  try {
    const userId = parseInt(session.user.id);

    const cards = await api.getCards(userId);
    return NextResponse.json(cards);
  

  } catch (error) {
    return NextResponse.json(error);
  }
}

export async function POST(request: Request) {
  const session = await getServerSession(nextAuthOptions);

  if (!session || !session.user) {
    return NextResponse.json({ message: "Usuário não autenticado" });
  }

  try {
    const userId = parseInt(session.user.id);
    const body = await request.json();
    const { name, limit, due } = body;

    console.log(name,limit,due)
    if (!name || !limit || !due) {
      return NextResponse.json({ message: "Campos obrigatios" });
    }
    const newCard = await api.addCard(name, due, limit, userId);
    return NextResponse.json(newCard);
  } catch (error) {
    return NextResponse.json(error);
  }
}
