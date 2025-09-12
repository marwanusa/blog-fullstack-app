import Logo from "@/components/logo";
import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <div className="flex h-screen">

      <div className="flex flex-col lg:basis-[50%] basis-[100%] items-center">
        <div className="self-start p-4">
          <Logo />
        </div>
        <div className="flex flex-col justify-center items-center md:items-start h-full px-4 gap-4 w-[100%] md:w-[80%]">
          <Outlet />
        </div>
      </div>
      <div className="basis-[50%] hidden lg:block">
        <img src="/src/assets/container.png" alt="" className="h-full w-full" />
      </div>
    </div>
  );
};
export default AuthLayout;
