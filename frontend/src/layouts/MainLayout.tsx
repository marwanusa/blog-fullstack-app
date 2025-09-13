import Header from "@/components/comp-307";
import Navbar from "@/components/comp-588";
import Footer from "@/components/Footer";
import useAuth from "@/hooks/useAuth";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  const { user } = useAuth();
  return (
    <div className="min-h-screen flex flex-col  ">
      {!user && <Header />}
      <Navbar />
      <div className="wrapper flex-1 px-[80px] bg-[#FFFFFF]">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default MainLayout;
