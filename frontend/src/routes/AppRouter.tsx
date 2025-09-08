import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Lottie from "lottie-react";
import Error404 from "../lotties/404 error.json";
import UnexpectedError from "../lotties/error.json";
import Home from "../pages/Home/Home";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: (
      <div className="flex flex-col  h-[100vh] justify-center items-center">
        <Lottie animationData={UnexpectedError} loop={true} />
        <h1 className="text-3xl font-bold text-center">
          Oops! Something went wrong.
        </h1>
      </div>
    ),
    children: [
      {
        index: true,
        element: <Home />,
      },
    //   {
    //     path: "post/:id",
    //     element: <SearchResults />,
    //   },
      {
        path: "*",
        element: (
          <div className="flex h-[full] justify-center items-center">
            <Lottie animationData={Error404} loop={true} />
          </div>
        ),
      },
    ],
  },
]);

const AppRouter = () => {
  return <RouterProvider router={router} />;
};

export default AppRouter;
