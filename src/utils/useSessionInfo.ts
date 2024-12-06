import { useSession } from "next-auth/react";

// Hook que retorna os dados da sessão
export const useSessionInfo = () => {
  const { data: session, status } = useSession();
  return { session, status}; // status pode ser 'loading', 'authenticated', 'unauthenticated'
}