import { Link } from "react-router-dom";
import { Users, ChevronRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface Group {
  id: string;
  name: string;
  members: string[];
  totalExpenses: number;
}

interface GroupListProps {
  groups: Group[];
}

const GroupList = ({ groups }: GroupListProps) => {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {groups.map((group) => (
        <Link key={group.id} to={`/group/${group.id}`}>
          <Card className="hover:shadow-md transition-shadow cursor-pointer border-border">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <Users className="h-5 w-5 text-primary" />
                    <h3 className="font-semibold text-lg text-card-foreground">{group.name}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">
                    {group.members.length} members
                  </p>
                  <div className="text-sm">
                    <span className="text-muted-foreground">Total: </span>
                    <span className="font-semibold text-primary">₹{group.totalExpenses.toLocaleString()}</span>
                  </div>
                </div>
                <ChevronRight className="h-5 w-5 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
};

export default GroupList;
