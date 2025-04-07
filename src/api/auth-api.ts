import { LoginFormSchema } from "@/components/auth/schema/login.schema";
import { SignupFormSchema } from "@/components/auth/schema/signup.schema";
import { z } from "zod";

const API_BASE_URL = "http://localhost:8000/api/apps/authenticate/";

export interface LoginResponse {
  id: string;
  email: string;
  role?: string;
  access_token: string;
  refresh_token: string;
}

export interface SignupResponse {
  id: string;
  email: string;
  access_token: string;
  refresh_token: string;
  role?: string;
}

export const login = async (data: z.infer<typeof LoginFormSchema>): Promise<LoginResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}login/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Error response from server:", errorData);
      throw new Error(errorData.message || "Failed to login.");
    }

    const responseData: LoginResponse = await response.json();
    return responseData;
  } catch (error) {
    console.error("Login API error:", error);
    throw error;
  }
};

export const signup = async (data: z.infer<typeof SignupFormSchema>): Promise<SignupResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}register/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    
    // Check content type before trying to parse as JSON
    const contentType = response.headers.get('content-type');
    if (!response.ok) {
      if (contentType && contentType.includes('application/json')) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Signup failed');
      } else {
        // Handle non-JSON error responses
        const textError = await response.text();
        throw new Error(`Signup failed: Server returned ${response.status} ${response.statusText}`);
      }
    }
    
    const responseData: SignupResponse = await response.json();
    return responseData;
  } catch (error) {
    throw error;
  }
}
