import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import UserInput from "@/components/comp-32";
import { Link } from "react-router-dom";
import PasswordInput from "@/components/comp-51";
import RegisterFormSchema from "@/validation/RegisterSchema";
import { useRegister } from "@/hooks/useRegister";

const Signup = () => {
  const form = useForm<z.infer<typeof RegisterFormSchema>>({
    resolver: zodResolver(RegisterFormSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });
  const registerMutation = useRegister();

  function onSubmit(data: z.infer<typeof RegisterFormSchema>) {
    registerMutation.mutate(data);
  }

  return (
    <>
      {registerMutation.isError && (
        <p className="text-red-500">
          {registerMutation.error?.response?.data?.message ||
            registerMutation.error.message}
        </p>
      )}
      <h1 className="text-[#232323] font-bold text-3xl">Sign Up </h1>
      <p>Sign up to enjoy the feature of Revolutie</p>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <UserInput
                    label={"Username"}
                    type="text"
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
                  <PasswordInput {...field} />
                </FormControl>
              </FormItem>
            )}
          />

          <Button
            type="submit"
            disabled={registerMutation.isPending}
            className="w-[100%] sm:w-[440px] md:w-[440px] lg:w-[285px] xl:w-[400px] cursor-pointer"
          >
            {registerMutation.isPending ? "Loading..." : "Register"}
          </Button>
          <p className="text-[#6C6C6C] text-sm">
            Already have an account?{" "}
            <Link className="text-blue-800 underline font-medium" to={"/login"}>
              Sign in
            </Link>
          </p>
        </form>
      </Form>
    </>
  );
};

export default Signup;
