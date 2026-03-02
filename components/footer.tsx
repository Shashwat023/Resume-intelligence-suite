import Link from "next/link"
import { FileText } from "lucide-react"

export function Footer() {
  return (
    <footer className="px-4 py-12 border-t border-border">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <div className="size-8 rounded-xl bg-primary flex items-center justify-center">
              <FileText className="size-4 text-primary-foreground" />
            </div>
            <span className="font-semibold text-foreground">ResumeIQ</span>
          </div>
          <nav className="flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
            <Link href="/resume" className="hover:text-foreground transition-colors">
              Resume
            </Link>
            <Link href="/docs" className="hover:text-foreground transition-colors">
              Docs
            </Link>
            <Link href="/image" className="hover:text-foreground transition-colors">
              chatbot
            </Link>
            <Link href="/image" className="hover:text-foreground transition-colors">
              Interview Prep
            </Link>
            <Link href="/alerts" className="hover:text-foreground transition-colors">
              Alerts
            </Link>
            <Link href="/about" className="hover:text-foreground transition-colors">
              About
            </Link>
          </nav>
          <p className="text-sm text-muted-foreground">© 2025 ResumeIQ. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
