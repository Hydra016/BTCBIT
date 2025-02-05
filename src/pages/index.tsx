import AuthComponent from "./components/Auth";
import Image from "next/image";

export default function Home() {

  return (
    <div className="h-screen w-screen flex">
      <div className="hidden md:block md:w-3/6 h-full bg-[#ffd100]">
        <div className="flex items-center gap-1">
          <Image src="/logo.svg" alt="Logo" objectFit="contain" width={50} height={50} />
        </div>
      </div>
      <AuthComponent />
    </div>
  ); 
}
