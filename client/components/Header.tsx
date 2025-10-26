import { Link, useLocation } from "react-router-dom";
import { Search, LogOut, Menu } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useState } from "react";

export const Header = () => {
  const location = useLocation();
  const { user, logout, isAuthenticated } = useAuth();
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const isActive = (path: string) => {
    return location.pathname === path ? "text-primary font-medium" : "text-foreground hover:text-primary";
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-16 items-center justify-between px-6">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 font-bold text-lg">
          <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center">
            <span className="text-primary-foreground text-sm font-bold">S</span>
          </div>
          <span className="hidden sm:inline">Stellar Explorer</span>
        </Link>

        {/* Navigation */}
        {isAuthenticated && (
          <nav className="hidden md:flex items-center gap-8">
            <Link to="/" className={`transition-colors ${isActive("/")}`}>
              Home
            </Link>
            <Link to="/search" className={`transition-colors ${isActive("/search")}`}>
              Asset Search
            </Link>
            <Link to="/assets" className={`transition-colors ${isActive("/assets")}`}>
              Asset List
            </Link>
            <Link to="/top-assets" className={`transition-colors ${isActive("/top-assets")}`}>
              Top Assets
            </Link>
            <Link to="/submit" className={`transition-colors ${isActive("/submit")}`}>
              Submit Token
            </Link>
          </nav>
        )}

        {/* Search and Auth */}
        <div className="flex items-center gap-4">
          {isAuthenticated && (
            <div className="hidden lg:flex items-center bg-secondary rounded-lg px-4 py-2">
              <Search className="w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search tokens, issuers..."
                className="ml-2 bg-transparent outline-none text-sm w-56 placeholder-muted-foreground"
              />
            </div>
          )}

          {isAuthenticated ? (
            <div className="flex items-center gap-4">
              <div className="hidden sm:flex items-center gap-2">
                <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center">
                  <span className="text-sm font-semibold text-primary">
                    {user?.name?.charAt(0)?.toUpperCase()}
                  </span>
                </div>
                <div className="text-sm">
                  <p className="font-medium text-foreground">{user?.name}</p>
                  <p className="text-xs text-muted-foreground">{user?.email}</p>
                </div>
              </div>
              <button
                onClick={logout}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-foreground hover:bg-secondary rounded-lg transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          ) : (
            <>
              <Link
                to="/login"
                className="hidden sm:inline-block px-4 py-2 text-sm font-medium text-foreground hover:text-primary transition-colors"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="px-6 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};
