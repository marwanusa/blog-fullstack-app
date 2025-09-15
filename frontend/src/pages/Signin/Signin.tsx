import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import UserInput from "@/components/comp-32";
import GoogleSignin from "@/components/comp-122";
import { Link } from "react-router-dom";
import FormSchema from "@/validation/LoginSchema";
import useLogin from "@/hooks/useLogin";

const Signin = () => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const loginMutation = useLogin();
  function onSubmit(data: z.infer<typeof FormSchema>) {
    loginMutation.mutate(data);
  }

  return (
    <>
      {loginMutation.isError && (
        <p className="text-red-500">
          {loginMutation.error?.response?.data?.message ||
            loginMutation.error.message}
        </p>
      )}
      <h1 className="text-[#232323] font-bold text-3xl">Sign in</h1>
      <p>Please login to continue to your account.</p>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-2/3 space-y-6"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <UserInput
                    label={"Email"}
                    type="email"
                    styles={
                      "w-[100%] sm:w-[440px] md:w-[440px] lg:w-[285px] xl:w-[400px]"
                    }
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <UserInput
                    label={"Password"}
                    type="password"
                    styles={
                      "w-[100%] sm:w-[440px] md:w-[440px] lg:w-[285px] xl:w-[400px]"
                    }
                    placeholder="••••••••"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex items-center gap-2">
            <input type="checkbox" title="Keep me logged in" />
            <p className="text-sm">Keep me logged in</p>
          </div>
          <Button
            type="submit"
            className="w-[100%] sm:w-[440px] md:w-[440px] lg:w-[285px] xl:w-[400px] cursor-pointer"
            disabled={loginMutation.isPending}
          >
            {loginMutation.isPending ? "Loading..." : "Sign In"}
          </Button>
          <GoogleSignin />

          <p className="text-[#6C6C6C] text-sm self-start">
            Need an account?{" "}
            <Link
              className="text-blue-800 underline font-medium"
              to={"/register"}
            >
              Create one
            </Link>
          </p>
        </form>
      </Form>
    </>
  );
};

export default Signin;
