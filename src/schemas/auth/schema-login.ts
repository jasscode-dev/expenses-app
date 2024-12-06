

import z from 'zod'

export const  schemaLogin = z.object({
  
  email: z.string().min(1,'O e-mail é obrigatório').email('Informe um e-mail válido'),
  password:z.string().min(1,"A senha é obrigatória")
})
