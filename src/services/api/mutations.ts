import { useMutation } from "@tanstack/react-query";
import { deleteTransaction, postTransaction } from "./trasactionApi";
import { invalidateExpenses } from "./queries";
import { TransactionType } from "@/utils/transactionTypeValidator";

export const useCreateTransaction =()=>{
  const mutation=useMutation({
  mutationFn:postTransaction,
  onSuccess:()=>{
    invalidateExpenses()
  }
  })
  
  return mutation
}


export const useDeleteTransaction = () => {
  const mutation = useMutation({
    mutationFn:  deleteTransaction,
    onSuccess:()=>{
      invalidateExpenses()
    }
  })
  return mutation;
};



/* 
export const useDeleteTransaction = () => {
  const mutation = useMutation({
    mutationFn: (params: { id: number; type: TransactionType }) =>
      deleteTransaction(params.id, params.type), // Passa id e type para a mutação
    onSuccess: () => {
      invalidateExpenses(); // Invalida a query das despesas
    },
    onError: (error) => {
      console.error("Error deleting transaction:", error);
    },
  });

  return mutation;
};
 */