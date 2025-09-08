import Header from "@/components/comp-307";
import Navbar from "@/components/comp-588";
import { useState } from "react";

const MainLayout = () => {
    const [registerd, isRegisterd] = useState(true);
  const [admin, setAdmin] = useState(true);
  return (
    <div className="min-h-screen flex flex-col  ">
      {
        !registerd && <Header/>
      }
        <Navbar registerd={registerd} admin={admin}/>
      <div className="wrapper flex-1 px-[80px] bg-[#FFFFFF]">Content</div>
      <footer className="flex w-full justify-center">footer</footer>
    </div>
  );
};

export default MainLayout;
