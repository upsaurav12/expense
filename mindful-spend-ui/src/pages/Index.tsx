import { useEffect, useState } from "react";
import { SummaryCard } from "@/components/SummaryCard";
import { ExpenseCard, Expense } from "@/components/ExpenseCard";
import { AddExpenseDialog } from "@/components/AddExpenseDialog";
import { toast } from "sonner";
import axios from 'axios';


const Index = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [user , setUser] = useState<string>("")
  const totalSpent = expenses.reduce((sum, expense) => sum + expense.amount, 0);


  useEffect(() => {

    const createUserIfNotExist = () => {
      const user_id = localStorage.getItem("user_id")

      if (user_id) {
        console.log("user_id: ", user_id)
        setUser(user_id)
      }else {
        axios.post("http://localhost:8080/api/v1/users",{ user_id , name: "Guest",   email: `guest-${Date.now()}@x.com` })
        .then(response => {
          console.log("create user response:", response.data)
          const user_id = response.data.id
          localStorage.setItem("user_id", String(user_id))
          console.log("user_id after creating:", user_id)
          setUser(String(user_id))
        })
        .catch(error => {
          console.error("error", error)
        })

      }
    }
    const fetchExpense = async  ( ) => {
      axios.get("http://localhost:8080/api/v1/expenses")
      .then(response => {
        console.log("success: ", response.data)
        setExpenses(response.data.body)
      })
      .catch(error => {
        console.error("error", error)
      })
    }

    createUserIfNotExist()
    fetchExpense();
  }, [])

  const handleAddExpense = (newExpense: Omit<Expense, "id" | "date">) => {
  axios.post("http://localhost:8080/api/v1/expenses", {
    user_id : 1,
    ...newExpense
  })
  // console.log("new response" , newExpense)
    .then(response => {
      console.log("created successfully", response.data);
      setExpenses([response.data, ...expenses]);  // response already has id, timestamps
      toast.success("Expense added successfully!");
    })
    .catch(error => {
      console.error("error", error);
      toast.error("Failed to add expense");
    });
};


  const handleDeleteExpense = (id: number) => {
    setExpenses(expenses.filter((expense) => expense.id !== id));
    toast.success("Expense deleted!");
  };

  return (
    <div className="min-h-screen bg-background">
     {user ? (
  // ✅ user exists → show expense tracker
  <div className="max-w-4xl mx-auto p-6 space-y-6">
    {/* Header */}
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-3xl font-bold text-foreground">
          Expense Tracker
        </h1>
        <p className="text-muted-foreground mt-1">
          Keep track of your spending
        </p>
      </div>
      <AddExpenseDialog onAddExpense={handleAddExpense} />
    </div>

    {/* Summary */}
    <SummaryCard total={totalSpent} />

    {/* Expenses List */}
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-foreground">
        Recent Expenses
      </h2>
      {expenses.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">
            No expenses yet. Add your first expense to get started!
          </p>
        </div>
      ) : (
        <div className="grid gap-3">
          {expenses.map((expense) => (
            <ExpenseCard
              key={expense.id}
              expense={expense}
              onDelete={handleDeleteExpense}
            />
          ))}
        </div>
      )}
    </div>
  </div>
) : (
  // ❌ no user yet → show fallback UI
  <div className="flex flex-col items-center justify-center min-h-screen text-center space-y-4">
    <h1 className="text-2xl font-bold">Welcome to Expense Tracker</h1>
    <p className="text-muted-foreground">
      Setting up your account... Please wait
    </p>
  </div>
)}

    </div>
  );
};

export default Index;
