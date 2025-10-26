import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export interface User {
  id: string;
  email: string;
  name: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load user from localStorage on mount
  useEffect(() => {
    // Initialize demo account if users list doesn't exist
    const usersData = localStorage.getItem("auth_users");
    if (!usersData) {
      const demoUser = {
        id: "demo_user_001",
        email: "demo@example.com",
        name: "Demo User",
        password: "demo123",
      };
      localStorage.setItem("auth_users", JSON.stringify([demoUser]));
    }

    const storedUser = localStorage.getItem("auth_user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Failed to parse stored user:", error);
        localStorage.removeItem("auth_user");
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 500));

      // Get all registered users from localStorage
      const usersData = localStorage.getItem("auth_users");
      const users = usersData ? JSON.parse(usersData) : [];

      // Find user with matching email and password
      const foundUser = users.find(
        (u: any) => u.email === email && u.password === password
      );

      if (!foundUser) {
        throw new Error("Invalid email or password");
      }

      // Create user object (without password)
      const loggedInUser: User = {
        id: foundUser.id,
        email: foundUser.email,
        name: foundUser.name,
      };

      setUser(loggedInUser);
      localStorage.setItem("auth_user", JSON.stringify(loggedInUser));
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (name: string, email: string, password: string) => {
    setIsLoading(true);
    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 500));

      // Get all registered users from localStorage
      const usersData = localStorage.getItem("auth_users");
      const users = usersData ? JSON.parse(usersData) : [];

      // Check if user already exists
      if (users.some((u: any) => u.email === email)) {
        throw new Error("Email already registered");
      }

      // Create new user
      const newUser = {
        id: `user_${Date.now()}`,
        email,
        name,
        password, // In production, this would be hashed
      };

      users.push(newUser);
      localStorage.setItem("auth_users", JSON.stringify(users));

      // Log in the new user
      const loggedInUser: User = {
        id: newUser.id,
        email: newUser.email,
        name: newUser.name,
      };

      setUser(loggedInUser);
      localStorage.setItem("auth_user", JSON.stringify(loggedInUser));
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("auth_user");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        login,
        signup,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
