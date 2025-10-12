import { Button } from "@/components/ui/button"

export function Hero() {
  return (
    <div className="bg-soft-mint">
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 px-4 py-12 md:grid-cols-2 md:py-20">
        <div className="flex flex-col gap-6">
          <h1 className="text-balance text-4xl font-semibold leading-tight md:text-5xl">
            Split expenses, settle debts easily
          </h1>
          <p className="text-pretty text-muted-foreground md:text-lg">
            Track shared expenses with friends, family, or roommates — all in one place.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <a href="/dashboard">
              <Button className="h-11 rounded-lg bg-primary px-6 text-primary-foreground shadow-sm transition-transform hover:scale-[1.01] hover:bg-primary/90">
                Get Started
              </Button>
            </a>
            <a href="#features">
              <Button variant="outline" className="h-11 rounded-lg bg-transparent">
                See Features
              </Button>
            </a>
          </div>
          <p className="text-xs text-muted-foreground">Free to try. No credit card required.</p>
        </div>

        <div className="relative">
          <div className="rounded-xl border border-border bg-card p-3 shadow-sm">
            <img
              src={"/placeholder.svg?height=480&width=720&query=SplitEasy dashboard mockup"}
              alt="SplitEasy dashboard preview"
              width={720}
              height={480}
              className="h-auto w-full rounded-lg border border-border"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
