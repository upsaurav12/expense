import { useState , useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Users as UsersIcon, Calculator, CheckCircle } from "lucide-react";
import AddExpenseModal from "@/components/AddExpenseModal";
import ExpenseCard from "@/components/ExpenseCard";
import BalanceCard from "@/components/BalanceCard";
import { toast } from "sonner";
import type { Group } from "./Index";


const Group = () => {
  const { id } = useParams();
  const navigate = useNavigate();
const [group, setGroup] = useState<Group | null>(null);

useEffect(() => {
  const saved = localStorage.getItem("groups");
  if (saved) {
    const groups: Group[] = JSON.parse(saved);
    const foundGroup = groups.find((g) => g.id === id);
    if (foundGroup) {
      setGroup(foundGroup);
    }
  }
}, [id]);



  const [expenses, setExpenses] = useState(group?.expenses || []);
  const [showSimplified, setShowSimplified] = useState(false);

if (!group) {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-foreground mb-2">Group not found</h2>
        <Button onClick={() => navigate("/")} variant="outline">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Home
        </Button>
      </div>
    </div>
  );
}

  

  const calculateBalances = () => {
    const memberBalances: Record<string, number> = {};
    group.members.forEach((member) => {
      memberBalances[member] = 0;
    });

    expenses.forEach((expense) => {
      const perPersonAmount = expense.amount / expense.participants.length;
      expense.participants.forEach((participant) => {
        if (participant === expense.paidBy) {
          memberBalances[participant] += expense.amount - perPersonAmount;
        } else {
          memberBalances[participant] -= perPersonAmount;
        }
      });
    });

    const balances: Array<{ from: string; to: string; amount: number }> = [];
    const debtors = Object.entries(memberBalances)
      .filter(([_, balance]) => balance < 0)
      .map(([name, balance]) => ({ name, balance: Math.abs(balance) }));
    const creditors = Object.entries(memberBalances)
      .filter(([_, balance]) => balance > 0)
      .map(([name, balance]) => ({ name, balance }));

    debtors.forEach((debtor) => {
      creditors.forEach((creditor) => {
        if (debtor.balance > 0 && creditor.balance > 0) {
          const amount = Math.min(debtor.balance, creditor.balance);
          balances.push({
            from: debtor.name,
            to: creditor.name,
            amount: Math.round(amount * 100) / 100,
          });
          debtor.balance -= amount;
          creditor.balance -= amount;
        }
      });
    });

    return balances;
  };

  const balances = calculateBalances();

  const handleAddExpense = (expense: {
    title: string;
    amount: number;
    paidBy: string;
    participants: string[];
  }) => {
    const newExpense = {
      id: `e${Date.now()}`,
      ...expense,
      date: new Date().toISOString().split("T")[0],
    };
    setExpenses([...expenses, newExpense]);
  };

  const handleSimplifyDebts = () => {
    setShowSimplified(!showSimplified);
    toast.info(showSimplified ? "Showing all balances" : "Showing simplified debts");
  };

  const handleMarkSettled = () => {
    toast.success("All debts marked as settled!");
  };

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <Button
          variant="ghost"
          onClick={() => navigate("/")}
          className="mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Groups
        </Button>

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">{group.name}</h1>
          <div className="flex items-center gap-2 text-muted-foreground">
            <UsersIcon className="h-4 w-4" />
            <span>{group.members.join(", ")}</span>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Expenses</CardTitle>
                    <CardDescription>Add and track group expenses</CardDescription>
                  </div>
                  <AddExpenseModal
                    members={group.members}
                    onAddExpense={handleAddExpense}
                  />
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                {expenses.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    No expenses yet. Add one to get started!
                  </div>
                ) : (
                  expenses.map((expense) => (
                    <ExpenseCard key={expense.id} expense={expense} />
                  ))
                )}
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calculator className="h-5 w-5 text-primary" />
                  Balances
                </CardTitle>
                <CardDescription>Who owes whom</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {balances.length === 0 ? (
                  <div className="text-center py-6 text-muted-foreground text-sm">
                    All settled up! 🎉
                  </div>
                ) : (
                  <>
                    {balances.map((balance, index) => (
                      <BalanceCard key={index} balance={balance} />
                    ))}
                    <div className="pt-4 space-y-2">
                      <Button
                        variant="outline"
                        className="w-full"
                        onClick={handleSimplifyDebts}
                      >
                        <Calculator className="h-4 w-4 mr-2" />
                        {showSimplified ? "Show All" : "Simplify Debts"}
                      </Button>
                      <Button
                        variant="default"
                        className="w-full"
                        onClick={handleMarkSettled}
                      >
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Mark as Settled
                      </Button>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>

            <Card className="bg-primary/5 border-primary/20">
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="text-sm text-muted-foreground mb-1">Total Expenses</div>
                  <div className="text-3xl font-bold text-primary">
                    ₹{expenses.reduce((sum, exp) => sum + exp.amount, 0).toLocaleString()}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Group;
