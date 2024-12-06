import { useQuery } from "@tanstack/react-query";
;
import { queryClient } from "@/libs/queryClient";
import { Transaction } from "@prisma/client";
import { fetchTransactions } from "./trasactionApi";


export const useTransactions = (isAuthenticated: boolean,userId:string|undefined) => {
  return useQuery<Transaction[]>({
    queryKey: ["transactions",userId ],
    queryFn: fetchTransactions,
    enabled: isAuthenticated && !!userId, // A query só é executada se o usuário estiver autenticado e tiver um ID
    staleTime:Infinity
  });
};

export const invalidateExpenses = () => {
   
  queryClient.invalidateQueries({
    queryKey: ["transactions"],
  });
};
