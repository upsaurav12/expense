import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export interface Expense {
  id: number;
  user_id: number;
  amount: number;
  category: string;
  description: string;
  created_at: string;
  updated_at: string;
}


interface ExpenseCardProps {
  expense: Expense;
  onDelete: (id: number) => void;
}

export const ExpenseCard = ({ expense, onDelete }: ExpenseCardProps) => {
  return (
    <Card className="p-4 shadow-sm border-border hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <Badge variant="secondary" className="text-xs">
              {expense.category}
            </Badge>
            <span className="text-xs text-muted-foreground">{expense.created_at}</span>
          </div>
          <p className="text-sm text-foreground mb-1">{expense.description}</p>
          <p className="text-xl font-semibold text-primary">
            ${expense.amount.toFixed(2)}
          </p>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => onDelete(expense.id)}
          className="text-destructive hover:text-destructive hover:bg-destructive/10"
        >
          <Trash2 className="w-4 h-4" />
        </Button>
      </div>
    </Card>
  );
};
