import type { LucideIcon } from "lucide-react"

interface FeatureCardProps {
  title: string
  description: string
  icon: LucideIcon
  stats?: string
}

export function FeatureCard({ title, description, icon: Icon, stats }: FeatureCardProps) {
  return (
    <div className="group relative rounded-2xl bg-card border border-border p-6 hover:border-primary/50 transition-all">
      <div className="flex items-start gap-4">
        <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
          <Icon className="size-6 text-primary" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-foreground mb-1">{title}</h3>
          <p className="text-sm text-muted-foreground">{description}</p>
          {stats && (
            <div className="mt-3 inline-flex items-center px-3 py-1 rounded-full bg-secondary text-xs text-muted-foreground">
              {stats}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
