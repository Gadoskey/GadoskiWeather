
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CloudOff } from "lucide-react";

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center">
        <div className="mb-6 flex justify-center">
          <CloudOff className="h-24 w-24 text-gray-400" />
        </div>
        <h1 className="text-4xl font-bold mb-4">404</h1>
        <h2 className="text-2xl font-semibold mb-6">Page Not Found</h2>
        <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto mb-8">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>
        <Link to="/">
          <Button className="bg-primary hover:bg-primary/90">
            Return Home
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
