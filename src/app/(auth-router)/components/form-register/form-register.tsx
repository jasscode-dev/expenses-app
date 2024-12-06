"use client"

import Link from "next/link";
import { useFormRegister } from "./useFormRegister";



export const FormRegister = ()=>{
    const { register, handleSubmit, errors, onSubmit } = useFormRegister();
    return (
        <div className="text-white space-x-4 flex flex-col h-screen justify-center items-center">
          <form onSubmit={handleSubmit(onSubmit)} className="text-black">
            <div>
            <input type="text" {...register("name")} />
            {errors.name && <p>{errors.name.message as string}</p>} 
            </div>
            <div>
              <input type="text" {...register("email")} />
              {errors.email && <p>{errors.email.message as string}</p>}
            </div>
    
            <div>
              <input type="password"  {...register("password")} />
              {errors.password && <p>{errors.password.message as string}</p>}
            </div>
    
            <button type="submit" className="text-white">Cadastrar</button>
          </form>
          <Link href={'/'}>
          já tem uma conta ? Entrar
         </Link>
    
        </div>
      );
}