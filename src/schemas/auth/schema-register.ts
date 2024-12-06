
import z from 'zod'

export const  schemaRegister= z.object({
  name:z.string().min(3,'Nome deve ter pelo menos 3 caracteres'),
  email: z.string().min(1,'O e-mail é obrigatório').email('Informe um e-mail válido'),
  password:z.string().min(3,"A senha deve ter pelo menos 3 caracteres")
})
