import NextAuth, { AuthOptions, Session } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import  prisma  from '@/libs/prisma'
import { Adapter } from 'next-auth/adapters'

export const authOptions: AuthOptions = {
 
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],

  adapter: PrismaAdapter(prisma),
  callbacks: {
    async signIn({ user, account, profile }) {
      // Verifica se o e-mail está presente
      if (!profile?.email) return false;

      // Procura o usuário no banco de dados
      const existingUser = await prisma.user.findUnique({
        where: { email: profile.email },
      });

      // Se o usuário já existir, retorna true para continuar
      if (existingUser) return true;

      // Se o usuário não existir, cria um novo
      await prisma.user.create({
        data: {
          name: profile.name || "Usuário do Google",
          email: profile.email,
          image: profile.email || null,
        },
      });

      return true;
    },
    async session({ session, user }) {
      // Inclui informações extras no objeto da sessão
      session.user.id = user.id;
      return session;
    },
  },
    
}

// Criação do handler para Next.js
const handler = NextAuth(authOptions)

// Exportando o handler para os métodos GET e POST
export { handler as GET, handler as POST }