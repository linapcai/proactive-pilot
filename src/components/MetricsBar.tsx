import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Users, AlertTriangle, Heart, Clock } from "lucide-react"

interface Metrics {
  totalAccounts: number
  percentAtRisk: number
  percentHealthy: number
  avgDaysSinceLastInteraction: number
}

interface MetricsBarProps {
  metrics: Metrics
}

export function MetricsBar({ metrics }: MetricsBarProps) {
  const metricCards = [
    {
      icon: Users,
      label: "Total Accounts",
      value: metrics.totalAccounts.toLocaleString(),
      color: "text-primary",
      bgColor: "bg-primary/10"
    },
    {
      icon: AlertTriangle,
      label: "% At Risk",
      value: `${metrics.percentAtRisk.toFixed(1)}%`,
      color: "text-status-at-risk",
      bgColor: "bg-status-at-risk-bg"
    },
    {
      icon: Heart,
      label: "% Healthy", 
      value: `${metrics.percentHealthy.toFixed(1)}%`,
      color: "text-status-healthy",
      bgColor: "bg-status-healthy-bg"
    },
    {
      icon: Clock,
      label: "Avg. Days Since Last Interaction",
      value: `${metrics.avgDaysSinceLastInteraction.toFixed(1)}`,
      color: "text-muted-foreground",
      bgColor: "bg-muted/50"
    }
  ]

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {metricCards.map((metric) => (
        <Card key={metric.label} className="p-4 border border-border/60 bg-card/60 backdrop-blur-sm">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-lg ${metric.bgColor}`}>
              <metric.icon className={`h-4 w-4 ${metric.color}`} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs text-muted-foreground truncate">{metric.label}</p>
              <p className={`text-lg font-semibold ${metric.color}`}>{metric.value}</p>
            </div>
          </div>
        </Card>
      ))}
    </div>
  )
}