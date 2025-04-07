"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { LoginFormSchema } from "./schema/login.schema";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { handleLogin } from "@/actions/auth-actions";

export function LoginForm() {
  const router = useRouter();

  const [isLoading, setIsLoading] = React.useState(false);

  const form = useForm<z.infer<typeof LoginFormSchema>>({
    resolver: zodResolver(LoginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof LoginFormSchema>) => {


  try {
    setIsLoading(true);
    const result = await handleLogin(values);
    
    if (result.success) {
      toast.success("Login successful");
      router.replace("/");
    } else {
      toast.error(result.error || "Something went wrong. Please try again.");
    }
  } catch (error) {
    console.error("Login error:", error);
    toast.error("Something went wrong. Please try again.");
  } finally {
    setIsLoading(false);
  }
};

  return (
    <div className="p-8 md:p-12">
      <div className="mb-8 space-y-2">
        <h2 className="text-3xl font-bold text-gray-800">Welcome</h2>
        <p className="text-gray-600">Enter your details to sign in.</p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="space-y-2 dark:text-gray-800">
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="Enter your email..."
                    {...field}
                    className="border-gray-400"
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
              <FormItem className="space-y-2 dark:text-gray-800">
                <div className="flex items-center justify-between">
                  <FormLabel>Password</FormLabel>
                  <Link
                    href="/forgot-password"
                    className="text-sm dark:text-gray-800"
                  >
                    Forgot password?
                  </Link>
                </div>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="********"
                    {...field}
                    className="border-gray-400"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full bg-zinc-800 text-white dark:hover:bg-gray-500">
            Sign In
          </Button>
          <p className="mt-4 text-center text-sm text-gray-600">
            Don't have an account?{" "}
            <Link href="/signup" className="text-blue-600 hover:text-blue-500 underline">
              Sign up
            </Link>
          </p>
        </form>
      </Form>
    </div>
  );
}
