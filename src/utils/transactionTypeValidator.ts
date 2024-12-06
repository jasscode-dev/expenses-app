// utils/transactionTypeValidator.ts

// Defina o tipo literal "expense" | "income" para ser usado posteriormente
export type TransactionType = "expenses" | "incomes";

// Função para validar e retornar um tipo correto ou lançar erro
export function validateTransactionType(type: string): TransactionType {
  const validTypes: TransactionType[] = ["expenses", "incomes"];

  // Verifica se o tipo é válido
  if (!validTypes.includes(type as TransactionType)) {
    throw new Error("Informe um tipo válido (expense ou income)");
  }

  return type as TransactionType; // Converte para o tipo correto, agora seguro
}