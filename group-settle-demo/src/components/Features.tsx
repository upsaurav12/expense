import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const features = [
  {
    title: "Smart Group Tracking",
    desc: "Create and manage multiple groups for trips, households, or clubs.",
  },
  {
    title: "Instant Balance Calculation",
    desc: "Always know who owes whom with automatic, accurate balances.",
  },
  {
    title: "Expense Insights",
    desc: "Visual summaries and breakdowns make spending crystal clear.",
  },
  {
    title: "Real-Time Sync",
    desc: "Collaborate live with others across devices—no refresh required.",
  },
]

export function Features() {
  return (
    <section id="features" className="mx-auto max-w-6xl px-4 py-14 md:py-20">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-semibold md:text-4xl">Why SplitEasy?</h2>
        <p className="mt-3 text-muted-foreground">
          Built for modern groups who want a clear, fair way to share expenses.
        </p>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {features.map((f) => (
          <Card
            key={f.title}
            className="rounded-xl border border-border bg-card shadow-sm transition-transform hover:scale-[1.01]"
          >
            <CardHeader>
              <CardTitle className="text-lg">{f.title}</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">{f.desc}</CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}
