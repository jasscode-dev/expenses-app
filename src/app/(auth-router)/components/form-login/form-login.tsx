"use client"

import Link from "next/link";
import { useFormLogin } from "@/app/(auth-router)/components/form-login/useFormLogin";



export const FormLogin = ()=>{
    const { register, handleSubmit, errors, onSubmit } = useFormLogin();
    return (
        <div className="text-white space-x-4 flex flex-col h-screen justify-center items-center">
          <form onSubmit={handleSubmit(onSubmit)} className="text-black">
            <div>
              <input type="text" {...register("email")} />
              {errors.email && <p>{errors.email.message as string}</p>}
            </div>
    
            <div>
              <input type="password"  {...register("password")} />
              {errors.password && <p>{errors.password.message as string}</p>}
            </div>
    
            <button type="submit" className="text-white">Entrar</button>
          </form>
    
          <Link href={"/signup"}>Cadastrar</Link>
        </div>
      );
}