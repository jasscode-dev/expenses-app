
import Link from "next/link";



export default async function Home() {

  return (
    <div>
     <Link href={'/login'}>Login</Link>
     <Link href={'/register'}>Cadastre-se</Link>
    </div>
  );
}
