

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { schemaRegister } from '@/schemas';
import axios from "axios";
import { FormDataRegister } from "@/types";






export const useFormRegister =()=>{

    const {register, handleSubmit,reset,formState:{errors} } = useForm< FormDataRegister>({
        resolver: zodResolver(schemaRegister)
    })
    const router = useRouter();
 
  const onSubmit = async(data:FormDataRegister) =>{
   
      const {name,email,password} = data
    
      const newUser ={
        name,
        email,
        password,
      }
     const response = await axios.post('/api/auth/register',newUser)
     if(response){
       console.log(response.data.message)
     }
     reset()
 }



 return {register, handleSubmit ,reset, errors,onSubmit} 
}