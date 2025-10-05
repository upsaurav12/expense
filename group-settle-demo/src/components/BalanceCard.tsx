import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Check } from "lucide-react";

interface Balance {
  from: string;
  to: string;
  amount: number;
}

interface BalanceCardProps {
  balance: Balance;
}

const BalanceCard = ({ balance }: BalanceCardProps) => {
  const isSettled = balance.amount === 0;

  return (
    <Card className={`border-border ${isSettled ? 'bg-muted/30' : ''}`}>
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 flex-1">
            {isSettled ? (
              <div className="bg-success/10 p-2 rounded-full">
                <Check className="h-4 w-4 text-success" />
              </div>
            ) : (
              <div className="bg-warning/10 p-2 rounded-full">
                <ArrowRight className="h-4 w-4 text-warning" />
              </div>
            )}
            <div>
              <p className="text-sm">
                <span className="font-semibold text-foreground">{balance.from}</span>
                <span className="text-muted-foreground"> owes </span>
                <span className="font-semibold text-foreground">{balance.to}</span>
              </p>
            </div>
          </div>
          <div className={`text-lg font-bold ${isSettled ? 'text-success' : 'text-warning'}`}>
            {isSettled ? 'Settled' : `₹${balance.amount.toLocaleString()}`}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BalanceCard;
