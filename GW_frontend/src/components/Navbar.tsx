
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Button } from "@/components/ui/button";
import { Cloud, Menu, X, LogOut } from "lucide-react";

const Navbar = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Track scroll position for navbar styling
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when changing routes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-md"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <Cloud className="h-8 w-8 text-primary" />
          <span className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            GadokskiWeather
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link
            to="/"
            className={`text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors ${
              location.pathname === "/" ? "text-primary font-medium" : ""
            }`}
          >
            Home
          </Link>
          {user ? (
            <>
              <Link
                to="/dashboard"
                className={`text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors ${
                  location.pathname === "/dashboard" ? "text-primary font-medium" : ""
                }`}
              >
                Dashboard
              </Link>
              <Button
                variant="outline"
                className="flex items-center gap-2"
                onClick={logout}
              >
                <LogOut className="h-4 w-4" />
                Logout
              </Button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className={`text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors ${
                  location.pathname === "/login" ? "text-primary font-medium" : ""
                }`}
              >
                Login
              </Link>
              <Link to="/signup">
                <Button className="bg-primary hover:bg-primary/90">
                  Sign Up
                </Button>
              </Link>
            </>
          )}
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-700 dark:text-gray-300"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 shadow-lg animate-fade-in">
          <div className="container mx-auto px-4 py-3 flex flex-col space-y-4">
            <Link
              to="/"
              className={`text-gray-700 dark:text-gray-300 py-2 ${
                location.pathname === "/" ? "text-primary font-medium" : ""
              }`}
            >
              Home
            </Link>
            {user ? (
              <>
                <Link
                  to="/dashboard"
                  className={`text-gray-700 dark:text-gray-300 py-2 ${
                    location.pathname === "/dashboard" ? "text-primary font-medium" : ""
                  }`}
                >
                  Dashboard
                </Link>
                <Button
                  variant="outline"
                  className="flex items-center justify-center gap-2 w-full"
                  onClick={logout}
                >
                  <LogOut className="h-4 w-4" />
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className={`text-gray-700 dark:text-gray-300 py-2 ${
                    location.pathname === "/login" ? "text-primary font-medium" : ""
                  }`}
                >
                  Login
                </Link>
                <Link to="/signup" className="w-full">
                  <Button className="w-full bg-primary hover:bg-primary/90">
                    Sign Up
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
