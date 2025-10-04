import { Card } from "@/components/ui/card";
import { DollarSign } from "lucide-react";

interface SummaryCardProps {
  total: number;
}

export const SummaryCard = ({ total }: SummaryCardProps) => {
  return (
    <Card className="p-6 shadow-sm border-border">
      <div className="flex items-center gap-4">
        <div className="bg-primary/10 p-3 rounded-full">
          <DollarSign className="w-6 h-6 text-primary" />
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Total Spent</p>
          <h2 className="text-3xl font-bold text-foreground">
            ${total.toFixed(2)}
          </h2>
        </div>
      </div>
    </Card>
  );
};
