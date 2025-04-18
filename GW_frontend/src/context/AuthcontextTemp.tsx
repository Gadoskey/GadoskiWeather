import React, { createContext, useContext, useState, useEffect } from "react";

interface User {
  id: string;
  email: string;
  name: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  //login: (email: string, password: string) => Promise<void>;
  //signupWithEmail: (email: string, password: string, name: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  loginWithApple: () => Promise<void>;
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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is stored in localStorage (for demo purposes)
    const storedUser = localStorage.getItem("curent_user_token");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  /* Mock login function
  const login = async (email: string, password: string) => {
    setLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Mock user for demo
    const mockUser = {
      id: "user-123",
      email,
      name: email.split("@")[0]
    };

    setUser(mockUser);
    localStorage.setItem("weatherAppUser", JSON.stringify(mockUser));
    setLoading(false);
  };*/

  /* Mock signup function
  const signupWithEmail = async (email: string, password: string, name: string) => {
    setLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Mock user for demo
    const mockUser = {
      id: "user-" + Math.floor(Math.random() * 1000),
      email,
      name
    };

    setUser(mockUser);
    localStorage.setItem("weatherAppUser", JSON.stringify(mockUser));
    setLoading(false);
  };*/

  // Mock social login functions
  const loginWithGoogle = async () => {
    setLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Mock user for demo
    const mockUser = {
      id: "google-user-123",
      email: "user@gmail.com",
      name: "Google User"
    };

    setUser(mockUser);
    localStorage.setItem("weatherAppUser", JSON.stringify(mockUser));
    setLoading(false);
  };

  const loginWithApple = async () => {
    setLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Mock user for demo
    const mockUser = {
      id: "apple-user-123",
      email: "user@icloud.com",
      name: "Apple User"
    };

    setUser(mockUser);
    localStorage.setItem("weatherAppUser", JSON.stringify(mockUser));
    setLoading(false);
  };

  // Logout function
  const logout = () => {
    setUser(null);
    localStorage.removeItem("weatherAppUser");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        //login,
        //signupWithEmail,
        loginWithGoogle,
        loginWithApple,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
