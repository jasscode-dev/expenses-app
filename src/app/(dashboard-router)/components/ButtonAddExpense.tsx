import { useCreateTransaction } from "@/services/api/mutations";
import { postTransaction } from "@/services/api/trasactionApi";
import { CreeateTransaction } from "@/types/Transaction";
import axios from "axios";


export const ButtonAddExpense = () => {
  const createTransaction = useCreateTransaction()
  const handleAdd = async () => {
    const duedate = new Date("2024-12-23"); // Exemplo de data de vencimento
    const newTransaction:CreeateTransaction = {
      name: "Compra no supermercado 3",
      amount: 250.0,
      type: "expenses",
      description: "Compra de alimentos",
      category: "Supermercado",
      payMethod: "credit_card",
    };

    try {
      createTransaction.mutate(newTransaction)
    
    } catch (error) {
      console.error("Error adding transaction:", error);
    }
  };

  return <button onClick={handleAdd}>Add</button>;
};
