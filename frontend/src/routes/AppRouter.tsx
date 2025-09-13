import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Lottie from "lottie-react";
import UnexpectedError from "../lotties/error.json";
import Home from "../pages/Home/Home";
import PostDetails from "@/pages/PostDetails/PostDetails";
import Signin from "@/pages/Signin/Signin";
import Signup from "@/pages/Signup/Signup";
import AuthLayout from "@/layouts/AuthLayout";
import ProtectedRoute from "./ProtectedRoute";
import ProfilePage from "@/pages/Profile/ProfilePage";

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
      {
        path: "/post/:id",
        element: <PostDetails />,
      },
      {
        path: "/profile/:id",
        element: (
          <ProtectedRoute requireAuth={true}>
            <ProfilePage />
          </ProtectedRoute>
        ),
      },
    ],
  },
  {
    path: "/",
    element: <AuthLayout />,
    children: [
      {
        path: "login",
        element: (
          <ProtectedRoute requireAuth={false}>
            <Signin />
          </ProtectedRoute>
        ),
      },
      {
        path: "register",
        element: <Signup />,
      },
    ],
  },
]);

const AppRouter = () => {
  return <RouterProvider router={router} />;
};

export default AppRouter;
