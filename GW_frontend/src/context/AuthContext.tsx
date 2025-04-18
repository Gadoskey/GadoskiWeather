import React, { createContext, useContext, useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";



import axios from "axios";

interface User {
  id: string;
  email: string;
  name: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signupWithEmail: (email: string, password: string, name: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>; // will implement later
  loginWithApple: () => Promise<void>;  // will implement later
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);


export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  // Fetch user details using the token
  useEffect(() => {
    const token = localStorage.getItem("current_user_token");
    if (token) {
      fetchUserDetails(token);
    } else {
      setIsLoading(false);
    }
  }, []);

  // Function to fetch user details using the token
  const fetchUserDetails = async (token: string) => {
    try {
      const response = await axios.get("http://localhost:3000/users/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const userDetails = response.data.user;
      setUser(userDetails);
    } catch (error) {
      console.error("Failed to fetch user details:", error);
      setUser(null); // Ensure we handle errors gracefully
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const response = await axios.post("http://localhost:3000/users/login", {
        email,
        password,
      });
      const token = response.data.token;
      await fetchUserDetails(token);

      if (response.status === 400) {
        toast({
          title: "Invalid Password",
          description: "The password you entered is incorrect. Please try again.",
          variant: "destructive",
        });
      }
      if (response.status === 404) {
        toast({
          title: "User not found",
          description: "No account matches those details. You might want to sign up first.",
          variant: "destructive",
        });
      }
      if (response.status === 200) {
        const token = response.data.token;
        localStorage.setItem("current_user_token", token);

        // Fetch user details after storing the token
        fetchUserDetails(token);
        toast({
          title: "Login Successful",
          description: "Welcome back! You are now logged in.",
          variant: "success",
        });
      }
    } catch (error: any) {
      toast({
        title: "Invalid Email or  Password",
        description: "Failed to log in. Please check your credentials.",
        variant: "destructive",
      });
      console.error("Login error:", error.response?.data || error.message);
      throw new Error(error.response?.data?.message || "Login failed");
      // change to backend error not usesrs incorrect creds. backend not reachable
    }
    finally {
      setIsLoading(false);
    }
  };

  const signupWithEmail = async (email: string, password: string, name: string) => {
    setIsLoading(true);
    try {
      const response = await axios.post("http://localhost:5000/api/users/signup", {
        email,
        password,
        name,
      });

      const token = response.data.token;
      localStorage.setItem("current_user_token", token);

      // Fetch user details after storing the token
      fetchUserDetails(token);
    } catch (error: any) {
      console.error("Signup error:", error.response?.data || error.message);
      throw new Error(error.response?.data?.message || "Signup failed");
    }
  };

  const loginWithGoogle = async () => {
    // Implement Google login later
    console.log("Google login not implemented yet");
  };

  const loginWithApple = async () => {
    // Implement Apple login later
    console.log("Apple login not implemented yet");
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("current_user_token");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        login,
        signupWithEmail,
        loginWithGoogle,
        loginWithApple,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
