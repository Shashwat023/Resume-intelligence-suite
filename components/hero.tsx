import Link from "next/link"
import { ArrowRight, Sparkles } from "lucide-react"

export function Hero() {
  return (
    <section className="relative px-4 py-16 md:py-24">
      <div className="mx-auto max-w-4xl text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm mb-6">
          <Sparkles className="size-4" />
          AI-Powered Career Tools
        </div>
        <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 text-balance leading-tight">
          Optimize Your Resume with <span className="text-primary">Intelligence</span>
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto text-pretty">
          Boost your ATS score, get AI-powered suggestions, and land your dream job faster with our comprehensive career
          suite.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/resume"
            className="group flex items-center gap-2 px-8 py-4 rounded-2xl bg-primary text-primary-foreground font-semibold text-lg hover:opacity-90 transition-all"
          >
            Start Optimizing
            <ArrowRight className="size-5 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            href="/about"
            className="px-8 py-4 rounded-2xl bg-secondary text-secondary-foreground font-semibold text-lg hover:bg-secondary/80 transition-colors"
          >
            Learn More
          </Link>
        </div>
      </div>
    </section>
  )
}
