
import z from'zod'
import { schemaRegister } from '@/schemas';


export type FormDataRegister = z.infer<typeof schemaRegister>;