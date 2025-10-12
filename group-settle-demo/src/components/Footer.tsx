// import Link from "next/link"

export function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 py-8 md:flex-row">
        <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} SplitEasy. All rights reserved.</p>
        <div className="flex items-center gap-5 text-sm">
          <a href="#about" className="text-muted-foreground hover:text-foreground">
            About
          </a>
          <a href="mailto:hello@spliteasy.app" className="text-muted-foreground hover:text-foreground">
            Contact
          </a>
          <div className="flex items-center gap-3">
            <a aria-label="Twitter" href="#" className="text-muted-foreground hover:text-foreground">
              Twitter
            </a>
            <a aria-label="GitHub" href="#" className="text-muted-foreground hover:text-foreground">
              GitHub
            </a>
            <a aria-label="LinkedIn" href="#" className="text-muted-foreground hover:text-foreground">
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
