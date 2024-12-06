import api from "@/utils/usePrisma";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function POST(request: Request) {
  const body = await request.json();
  const { name, email, password } = body;

  if (!name || !email || !password) {
    return NextResponse.json({
      status: false,
      message: "Todos campos são obrigatorios",
    });
  }

  try {
    const existingUser = await prisma?.user.findUnique({ where: { email } });
    if (existingUser) {
      return NextResponse.json({
        status: false,
        message: "Usuário já cadastrado",
      });
    }
    
    const hashedPassword = await bcrypt.hash(password, 10); //hash pra criptografar a senha do usuario

    const newUser = await api.addUser(name, email, hashedPassword);
    return NextResponse.json({
        status:true,
        message:"Usuário cadastrado com sucesso!!"
    });
  } catch (error) {
    return NextResponse.json(error);
  }
}
