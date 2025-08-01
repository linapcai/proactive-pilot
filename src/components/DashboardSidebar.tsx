import { Filter, Users, TrendingUp, AlertTriangle, Target } from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface DashboardSidebarProps {
  selectedFilters: string[]
  onFiltersChange: (filters: string[]) => void
  selectedBusinessUnits: string[]
  onBusinessUnitsChange: (businessUnits: string[]) => void
}

const healthStatuses = [
  { 
    id: "healthy", 
    label: "Healthy", 
    icon: "🟢", 
    count: 156,
    description: "Engaged and growing"
  },
  { 
    id: "needs-engagement", 
    label: "Needs Engagement", 
    icon: "🟡", 
    count: 23,
    description: "Low activity detected"
  },
  { 
    id: "at-risk", 
    label: "At Risk", 
    icon: "🔴", 
    count: 8,
    description: "Requires immediate attention"
  },
  { 
    id: "opportunity", 
    label: "Opportunity", 
    icon: "🟠", 
    count: 34,
    description: "Ready for expansion"
  }
]

const quickActions = [
  { icon: Users, label: "All Customers", count: 221 },
  { icon: TrendingUp, label: "High Value", count: 45 },
  { icon: AlertTriangle, label: "Action Required", count: 31 },
  { icon: Target, label: "Opportunities", count: 34 },
]

const businessUnits = [
  { id: "Risk BU", label: "Risk BU", count: 45 },
  { id: "SPM", label: "SPM", count: 67 },
  { id: "HR", label: "HR", count: 34 },
  { id: "Marketing", label: "Marketing", count: 28 },
  { id: "Finance", label: "Finance", count: 47 }
]

export function DashboardSidebar({ selectedFilters, onFiltersChange, selectedBusinessUnits, onBusinessUnitsChange }: DashboardSidebarProps) {
  const { state } = useSidebar()
  const isCollapsed = state === "collapsed"

  const toggleFilter = (filterId: string) => {
    const newFilters = selectedFilters.includes(filterId)
      ? selectedFilters.filter(f => f !== filterId)
      : [...selectedFilters, filterId]
    onFiltersChange(newFilters)
  }

  const toggleBusinessUnit = (buId: string) => {
    const newBUs = selectedBusinessUnits.includes(buId)
      ? selectedBusinessUnits.filter(f => f !== buId)
      : [...selectedBusinessUnits, buId]
    onBusinessUnitsChange(newBUs)
  }

  return (
    <Sidebar className={isCollapsed ? "w-16" : "w-80"}>
      <SidebarContent className="bg-card/30 backdrop-blur-sm border-r">
        
        {/* Quick Actions */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs font-medium text-muted-foreground">
            <Filter className="h-3 w-3 mr-1" />
            {!isCollapsed && "Quick Filters"}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {quickActions.map((action) => (
                <SidebarMenuItem key={action.label}>
                  <SidebarMenuButton className="group">
                    <action.icon className="h-4 w-4 text-muted-foreground group-hover:text-primary" />
                    {!isCollapsed && (
                      <>
                        <span className="text-sm">{action.label}</span>
                        <Badge variant="secondary" className="ml-auto text-xs">
                          {action.count}
                        </Badge>
                      </>
                    )}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Health Status Filters */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs font-medium text-muted-foreground">
            {!isCollapsed && "Health Status"}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {healthStatuses.map((status) => (
                <SidebarMenuItem key={status.id}>
                  <Button
                    variant={selectedFilters.includes(status.id) ? "default" : "ghost"}
                    size="sm"
                    onClick={() => toggleFilter(status.id)}
                    className={`w-full justify-start gap-3 group ${
                      selectedFilters.includes(status.id) 
                        ? "bg-primary/10 text-primary border border-primary/20" 
                        : "hover:bg-muted/50"
                    }`}
                  >
                    <span className="text-base">{status.icon}</span>
                    {!isCollapsed && (
                      <>
                        <div className="flex-1 text-left">
                          <div className="text-sm font-medium">{status.label}</div>
                          <div className="text-xs text-muted-foreground">
                            {status.description}
                          </div>
                        </div>
                        <Badge 
                          variant="secondary" 
                          className={`text-xs ${
                            selectedFilters.includes(status.id) 
                              ? "bg-primary/20 text-primary" 
                              : ""
                          }`}
                        >
                          {status.count}
                        </Badge>
                      </>
                    )}
                  </Button>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Business Units Filter */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs font-medium text-muted-foreground">
            {!isCollapsed && "Business Units"}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {businessUnits.map((bu) => (
                <SidebarMenuItem key={bu.id}>
                  <Button
                    variant={selectedBusinessUnits.includes(bu.id) ? "default" : "ghost"}
                    size="sm"
                    onClick={() => toggleBusinessUnit(bu.id)}
                    className={`w-full justify-start gap-3 group ${
                      selectedBusinessUnits.includes(bu.id) 
                        ? "bg-primary/10 text-primary border border-primary/20" 
                        : "hover:bg-muted/50"
                    }`}
                  >
                    {!isCollapsed && (
                      <>
                        <div className="flex-1 text-left">
                          <div className="text-sm font-medium">{bu.label}</div>
                        </div>
                        <Badge 
                          variant="secondary" 
                          className={`text-xs ${
                            selectedBusinessUnits.includes(bu.id) 
                              ? "bg-primary/20 text-primary" 
                              : ""
                          }`}
                        >
                          {bu.count}
                        </Badge>
                      </>
                    )}
                  </Button>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* AI Insights */}
        {!isCollapsed && (
          <SidebarGroup>
            <SidebarGroupLabel className="text-xs font-medium text-muted-foreground">
              AI Insights
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <div className="p-4 bg-primary-muted rounded-lg border border-primary/20">
                <div className="text-sm font-medium text-primary mb-2">
                  Weekly Summary
                </div>
                <div className="text-xs text-muted-foreground mb-3">
                  8 accounts need immediate attention. 34 expansion opportunities identified.
                </div>
                <Button variant="outline" size="xs" className="w-full">
                  View Report
                </Button>
              </div>
            </SidebarGroupContent>
          </SidebarGroup>
        )}

      </SidebarContent>
    </Sidebar>
  )
}