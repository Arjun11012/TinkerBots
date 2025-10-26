import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Header } from "@/components/Header";
import { Home } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname,
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="flex items-center justify-center min-h-[calc(100vh-64px)]">
        <div className="text-center px-6">
          <div className="text-8xl font-bold text-foreground mb-4">404</div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Page Not Found</h1>
          <p className="text-lg text-muted-foreground mb-8 max-w-md">
            Sorry, the page you're looking for doesn't exist. Please check the URL or navigate back home.
          </p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-8 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors"
          >
            <Home className="w-5 h-5" />
            Go Back Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
