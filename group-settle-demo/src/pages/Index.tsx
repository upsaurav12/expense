import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Axis3DIcon, Plus } from "lucide-react";
import GroupList from "@/components/GroupList";
// import { mockGroups } from "./Group";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import axios from 'axios'

export type Expense = {
  id: string;
  title: string; 
  amount: number,
  paidBy: string,
  participants: string[],
  date: string,
}

export type  Group =  {
  id: string;
  name: string;
  description: string;
  members: string[];
  initial_expense: number;
  expenses: number[];
}

  export const getGroups = () => {
  const saved = localStorage.getItem("groups");
  return saved ? JSON.parse(saved) : [];
};

const Index = () => {
  const [groups, setGroups] = useState<Group[]>(() => {
  const saved = localStorage.getItem("groups");
  return saved ? JSON.parse(saved) : [];
});

const saveGroups = (updatedGroups: Group[]) => {
  localStorage.setItem("groups", JSON.stringify(updatedGroups));
};

  const [open, setOpen] = useState(false);
  const [groupName, setGroupName] = useState("");
  const [groupAmount, setGroupAmount] = useState("");
  const [membersInput, setMembersInput] = useState("");

const handleCreateGroup = async (e: React.FormEvent) => {
  e.preventDefault();

  if (!groupName.trim()) {
    toast.error("Please enter a group name");
    return;
  }

  const groupId = crypto.randomUUID();
  const members = membersInput
    .split(",")
    .map((m) => m.trim())
    .filter((m) => m.length > 0);

  if (members.length === 0) {
    toast.error("Please enter at least one member");
    return;
  }

  const newGroup: Group = {
    id: groupId,
    name: groupName,
    description: "default_description",
    members,
    initial_expense: Number(groupAmount) || 0,
    expenses: [],
  };

  try {
      const res = await axios.post(import.meta.env.BACKEND_URL_FOR_GROUP, newGroup)
      console.log("success: ", res)
  } catch (error) {
    console.error("error", error)
  }
  const updatedGroups = [...groups, newGroup];
  setGroups(updatedGroups);
  saveGroups(updatedGroups);

  toast.success(`Group "${groupName}" created!`);

  setGroupName("");
  setGroupAmount("");
  setMembersInput("");
  setOpen(false);

  window.location.href = `/group/${groupId}`;
};



  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Split expenses,<br />settle debts easily
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Track shared expenses with friends and family. Keep everyone on the same page about who owes what.
            </p>
          </div>

          {/* Create group card */}
          <div className="mb-8">
            <Card className="bg-gradient-to-br from-primary/10 via-accent/10 to-primary/5 border-primary/20">
              <CardContent className="p-8">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                  <div className="flex-1 text-center md:text-left">
                    <h2 className="text-2xl font-bold text-foreground mb-2">
                      Start a new group
                    </h2>
                    <p className="text-muted-foreground">
                      Create a group for your trip, household, or any shared expenses
                    </p>
                  </div>
                  <Dialog open={open} onOpenChange={setOpen}>
                    <DialogTrigger asChild>
                      <Button size="lg" className="shadow-lg">
                        <Plus className="h-5 w-5 mr-2" />
                        Create Group
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Create New Group</DialogTitle>
                      </DialogHeader>

                      <form onSubmit={handleCreateGroup} className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="groupName">Group Name</Label>
                          <Input
                            id="groupName"
                            placeholder="e.g., Goa Trip, Roommates"
                            value={groupName}
                            onChange={(e) => setGroupName(e.target.value)}
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="members">Members</Label>
                          <Input
                            id="members"
                            placeholder="e.g., Rahul, Meena, Arjun"
                            value={membersInput}
                            onChange={(e) => setMembersInput(e.target.value)}
                          />
                          <p className="text-xs text-muted-foreground">
                            Separate names with commas
                          </p>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="amount">Initial Expense (optional)</Label>
                          <Input
                            id="amount"
                            placeholder="e.g., 1000"
                            value={groupAmount}
                            onChange={(e) => setGroupAmount(e.target.value)}
                          />
                        </div>

                        <Button type="submit" className="w-full">
                          Create Group
                        </Button>
                      </form>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Group list */}
          <div>
            <h3 className="text-2xl font-bold text-foreground mb-6">Your Groups</h3>
            {groups.length === 0 ? (
              <Card>
                <CardContent className="p-12 text-center">
                  <p className="text-muted-foreground">
                    No groups yet. Create your first group to get started!
                  </p>
                </CardContent>
              </Card>
            ) : (
              <GroupList groups={groups} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
