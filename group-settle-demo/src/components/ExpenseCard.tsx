import { Card, CardContent } from "@/components/ui/card";
import { Receipt } from "lucide-react";

interface Expense {
  id: string;
  title: string;
  amount: number;
  paidBy: string;
  participants: string[];
  date: string;
}

interface ExpenseCardProps {
  expense: Expense;
}

const ExpenseCard = ({ expense }: ExpenseCardProps) => {
  return (
    <Card className="border-border">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-start gap-3 flex-1">
            <div className="bg-primary/10 p-2 rounded-lg">
              <Receipt className="h-4 w-4 text-primary" />
            </div>
            <div className="flex-1">
              <h4 className="font-semibold text-card-foreground">{expense.title}</h4>
              <p className="text-sm text-muted-foreground mt-1">
                Paid by <span className="font-medium text-foreground">{expense.paidBy}</span>
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Split between {expense.participants.length} {expense.participants.length === 1 ? 'person' : 'people'}
              </p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-lg font-bold text-primary">₹{expense.amount.toLocaleString()}</div>
            <div className="text-xs text-muted-foreground">{expense.date}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ExpenseCard;
