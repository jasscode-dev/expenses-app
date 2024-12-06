import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {  schemaLogin } from "@/schemas";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FormDataLogin } from "@/types";

export const useFormLogin = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormDataLogin>({
    resolver: zodResolver(schemaLogin),
  });
  const router = useRouter();

  const onSubmit = async (data: FormDataLogin) => {
    const { email, password } = data;
    const newUser = {
      email,
      password,
    };
    const request = await signIn("credentials", newUser);
    if (request) {
      console.log(request);
    }

    console.log(data);
  };

  return { register, handleSubmit, reset, errors, onSubmit };
};
