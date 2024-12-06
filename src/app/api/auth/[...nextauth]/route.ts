import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

import bcrypt from "bcrypt";  // Importando bcrypt para comparar a senha
import { AuthUser } from "@/types/AuthUser";
import { userService } from "@/services/database";

const nextAuthOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "E-mail", type: "text" },
        password: { label: "Senha", type: "password" },
      },
      async authorize(credentials, req) {
        if (credentials && credentials.email && credentials.password) {
          // Obtendo o usuário com base no email
          const user = await userService.getUserFromEmail(credentials.email);
          
          if (user && user.password) {
            // Comparando a senha fornecida com a senha criptografada no banco de dados
            const isPasswordValid = await bcrypt.compare(credentials.password, user.password);
            
            if (isPasswordValid) {
              // Retornar os dados do usuário, se a senha for válida
              return {
                id: user.id.toString(),
                name: user.name,
                email: user.email,
              };
            } else {
              // Se a senha não for válida, retornar null
              return null;
            }
          }
        }
        return null; // Retorna null se o usuário não for encontrado ou credenciais forem inválidas
      },
    }),
  ],
  callbacks: {
    jwt: async ({ token, user }) => {  // Gera um token de login
      if (user) {
        token.user = user;
      }
      return token;
    },
    session: async ({ session, token }) => {
      if (token) {
        session.user = token.user as any;
      }
      return session;
    },
  },
  pages: {
    signIn: '/login', // Página de login personalizada
  },
};

const handler = NextAuth(nextAuthOptions);

export { handler as GET, handler as POST, nextAuthOptions };
