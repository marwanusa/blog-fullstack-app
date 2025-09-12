import Header from "@/components/comp-307";
import Navbar from "@/components/comp-588";
import Footer from "@/components/Footer";
import { useState } from "react";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  const [registerd, isRegisterd] = useState(true);
  const [admin, setAdmin] = useState(true);
  return (
    <div className="min-h-screen flex flex-col  ">
      {!registerd && <Header />}
      <Navbar registerd={registerd} admin={admin} />
      <div className="wrapper flex-1 px-[80px] bg-[#FFFFFF]">
        <Outlet/>
      </div>
      <Footer />
    </div>
  );
};

export default MainLayout;
