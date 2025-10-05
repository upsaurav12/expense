import { Link } from "react-router-dom";
import { Wallet } from "lucide-react";

const Navbar = () => {
  return (
    <nav className="border-b bg-card shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-xl font-bold text-primary hover:text-accent transition-colors">
            <Wallet className="h-6 w-6" />
            <span>SplitEasy</span>
          </Link>
          <div className="text-sm text-muted-foreground">
            Split expenses, settle debts
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
