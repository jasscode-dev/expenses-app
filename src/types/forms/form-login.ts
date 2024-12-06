import { schemaLogin } from "@/schemas";
import z from 'zod'
export type FormDataLogin = z.infer<typeof schemaLogin>;