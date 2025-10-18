import { Link } from "react-router-dom";
import { Wallet } from "lucide-react";
import { Button } from "./ui/button";

const Navbar = () => {
  return (
    <nav className="border-b bg-card shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-xl font-bold text-primary hover:text-accent transition-colors">
            <Wallet className="h-6 w-6" />
            <span>SplitEasy</span>
          </Link>
          <div className="flex flex-col gap-3 sm:flex-row">
            <a href="/login">
              <Button className="h-11 rounded-lg bg-primary px-6 text-primary-foreground shadow-sm transition-transform hover:scale-[1.01] hover:bg-primary/90">
                Login
              </Button>
            </a>
            <a href="/signup">
              <Button variant="outline" className="h-11 rounded-lg bg-transparent">
                Sign Up
              </Button>
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
