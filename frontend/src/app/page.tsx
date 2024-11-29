import { auth } from "@/auth";

export default async function Home() {
  const session = await auth();
  const user = session?.user;
  

  return (
    <h1 className='text-4xl'>
      Home
    </h1>
  );
}
