import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  Send, 
  Clock, 
  MoreHorizontal, 
  TrendingUp, 
  TrendingDown, 
  User,
  DollarSign,
  Activity,
  Calendar
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

interface Customer {
  id: string
  name: string
  status: "healthy" | "needs-engagement" | "at-risk" | "opportunity"
  usage: { current: number; trend: string }
  lastInteraction: string
  recommendedAction: string
  avatar: string
  revenue: string
  contactName: string
  contactRole: string
  businessUnit: string
  aiReasoning: {
    healthStatus: string
    recommendation: string
  }
}

interface CustomerCardProps {
  customer: Customer
}

const statusConfig = {
  healthy: {
    icon: "🟢",
    label: "Healthy",
    bgClass: "bg-status-healthy-bg",
    textClass: "text-status-healthy",
    borderClass: "border-status-healthy/20"
  },
  "needs-engagement": {
    icon: "🟡",
    label: "Needs Engagement", 
    bgClass: "bg-status-needs-engagement-bg",
    textClass: "text-status-needs-engagement",
    borderClass: "border-status-needs-engagement/20"
  },
  "at-risk": {
    icon: "🔴",
    label: "At Risk",
    bgClass: "bg-status-at-risk-bg", 
    textClass: "text-status-at-risk",
    borderClass: "border-status-at-risk/20"
  },
  opportunity: {
    icon: "🟠",
    label: "Opportunity",
    bgClass: "bg-status-opportunity-bg",
    textClass: "text-status-opportunity", 
    borderClass: "border-status-opportunity/20"
  }
}

export function CustomerCard({ customer }: CustomerCardProps) {
  const [isLoading, setIsLoading] = useState<string | null>(null)
  const { toast } = useToast()
  const statusInfo = statusConfig[customer.status]
  
  const handleAction = async (action: string) => {
    setIsLoading(action)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    toast({
      title: `Action ${action}`,
      description: `${action} action completed for ${customer.name}`,
    })
    
    setIsLoading(null)
  }

  return (
    <TooltipProvider>
      <Card className="p-6 hover:shadow-lg transition-all duration-200 border-l-4 border-l-primary/20 bg-card/60 backdrop-blur-sm">
        <div className="flex items-start gap-6">
          
          {/* Customer Avatar & Basic Info */}
          <div className="flex items-center gap-4 min-w-0 flex-1">
            <div className="w-12 h-12 rounded-xl bg-gradient-primary flex items-center justify-center text-primary-foreground font-semibold text-lg shadow-md">
              {customer.avatar}
            </div>
            
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h3 className="text-lg font-semibold text-foreground truncate">
                  {customer.name}
                </h3>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Badge 
                      className={`${statusInfo.bgClass} ${statusInfo.textClass} ${statusInfo.borderClass} border cursor-help`}
                      variant="outline"
                    >
                      <span className="mr-1">{statusInfo.icon}</span>
                      {statusInfo.label}
                    </Badge>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="text-sm">{customer.aiReasoning.healthStatus}</p>
                  </TooltipContent>
                </Tooltip>
              </div>
            
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <User className="h-3 w-3" />
                  <span>{customer.contactName} • {customer.contactRole}</span>
                </div>
                <div className="flex items-center gap-1">
                  <DollarSign className="h-3 w-3" />
                  <span className="font-medium">{customer.revenue}</span>
                </div>
                <div className="flex items-center gap-1 text-xs">
                  <span className="px-2 py-1 rounded-md bg-muted">{customer.businessUnit}</span>
                </div>
              </div>
          </div>
        </div>

        {/* Usage & Metrics */}
        <div className="flex items-center gap-6">
          <div className="text-center">
            <div className="flex items-center gap-2 mb-1">
              <Activity className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium text-foreground">Usage</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-lg font-semibold text-foreground">{customer.usage.current}%</span>
              <div className={`flex items-center gap-1 text-xs ${
                customer.usage.trend.startsWith('+') ? 'text-success' : 'text-destructive'
              }`}>
                {customer.usage.trend.startsWith('+') ? (
                  <TrendingUp className="h-3 w-3" />
                ) : (
                  <TrendingDown className="h-3 w-3" />
                )}
                {customer.usage.trend}
              </div>
            </div>
          </div>

          <div className="text-center">
            <div className="flex items-center gap-2 mb-1">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium text-foreground">Last Contact</span>
            </div>
            <span className="text-sm text-muted-foreground">{customer.lastInteraction}</span>
          </div>
        </div>

          {/* Recommended Action */}
          <div className="flex-1 max-w-md">
            <div className="mb-3">
              <h4 className="text-sm font-medium text-foreground mb-2">AI Recommendation</h4>
              <Tooltip>
                <TooltipTrigger asChild>
                  <p className="text-sm text-muted-foreground leading-relaxed cursor-help">
                    {customer.recommendedAction}
                  </p>
                </TooltipTrigger>
                <TooltipContent>
                  <p className="text-sm max-w-xs">{customer.aiReasoning.recommendation}</p>
                </TooltipContent>
              </Tooltip>
            </div>
          </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <Button
            variant="accept"
            size="sm"
            onClick={() => handleAction("Accept & Send")}
            disabled={isLoading !== null}
            className="gap-2"
          >
            <Send className="h-3 w-3" />
            {isLoading === "Accept & Send" ? "Sending..." : "Accept & Send"}
          </Button>
          
          <Button
            variant="soft"
            size="sm"
            onClick={() => handleAction("Snooze")}
            disabled={isLoading !== null}
            className="gap-2"
          >
            <Clock className="h-3 w-3" />
            {isLoading === "Snooze" ? "Snoozing..." : "Snooze"}
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleAction("Reassign")}
            disabled={isLoading !== null}
          >
            {isLoading === "Reassign" ? "Reassigning..." : "Reassign"}
          </Button>
          
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
          </div>
        </div>
      </Card>
    </TooltipProvider>
  )
}