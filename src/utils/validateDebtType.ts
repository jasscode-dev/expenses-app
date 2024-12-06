export type DebtType =  "CREDIT_CARD"|"BOLETO"|"PERSONAL_LOAN"|"OTHER"


export function validateDebtType (type:string){
    const validTypes :DebtType [] = ["CREDIT_CARD","BOLETO","PERSONAL_LOAN","OTHER"]

    if(!validTypes.includes(type as DebtType)){
        throw new Error("Informe um tipo válido");
    }
    return type as DebtType
}