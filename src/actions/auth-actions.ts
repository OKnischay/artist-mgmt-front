"use server";

import { login, signup } from "@/api/auth-api";
import { setCookie } from "@/actions/cookie";
import { LoginFormSchema } from "@/components/auth/schema/login.schema";
import { z } from "zod";
import { SignupFormSchema } from "@/components/auth/schema/signup.schema";
import { accessExpiryDate, refreshExpiryDate } from "@/constant/expiry";
export async function handleLogin(values: z.infer<typeof LoginFormSchema>) {
  try {
    console.log("hI");
    const response = await login(values);
    console.log("Login response received:", response);
    
    if (!response?.id || !response.access_token || !response.refresh_token) {
      return { success: false, error: "Invalid response from server" };
    }
    
    await setCookie("access_token", response.access_token, accessExpiryDate);
    await setCookie("refresh_token", response.refresh_token, refreshExpiryDate);
    await setCookie("user", 
      JSON.stringify(
        { 
          id: response?.id, 
          email: response?.email, 
          role: response?.role,
       } 
      ),
      accessExpiryDate);
    return { success: true };
  } catch (error) {
    console.error("Login error:", error);
    return { 
      success: false, 
      error: "Authentication failed. Please check your credentials." 
    };
  }
}

export async function handleSignup(values: z.infer<typeof SignupFormSchema>) {
  try {
    console.log("Attempting signup with values:", JSON.stringify(values));
    
    const response = await signup({
      email: values.email,
      password: values.password,
      confirm_password: values.confirm_password,
      role: values.role
    });
    
    console.log("Signup response received:", JSON.stringify(response));
    
    if (!response?.access_token || !response?.refresh_token) {
      console.error("Invalid response structure:", response);
      return { 
        success: false, 
        error: "Invalid response from server" 
      };
    }
    
    await setCookie("access_token", response.access_token, accessExpiryDate);
    await setCookie("refresh_token", response.refresh_token, refreshExpiryDate);
    
    return { success: true };
  } catch (error) {
    console.error("Signup error:", error);

    const errorMessage = error instanceof Error ? error.message : "Registration failed. Please try again.";
    
    return {
      success: false,
      error: errorMessage
    };
  }
}
