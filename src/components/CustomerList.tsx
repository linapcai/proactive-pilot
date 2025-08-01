import { useState } from "react"
import { CustomerCard } from "./CustomerCard"
import { Button } from "@/components/ui/button"
import { RefreshCw, SortAsc, Filter } from "lucide-react"

// Mock customer data
const mockCustomers = [
  {
    id: "1",
    name: "Acme Corp",
    status: "healthy" as const,
    usage: { current: 85, trend: "+12%" },
    lastInteraction: "2 hours ago",
    recommendedAction: "Schedule quarterly review to discuss expansion opportunities",
    avatar: "AC",
    revenue: "$24,500/mo",
    contactName: "Sarah Johnson",
    contactRole: "VP of Operations"
  },
  {
    id: "2", 
    name: "TechFlow Solutions",
    status: "needs-engagement" as const,
    usage: { current: 34, trend: "-8%" },
    lastInteraction: "5 days ago",
    recommendedAction: "Low usage detected. Send onboarding resources and schedule check-in",
    avatar: "TS",
    revenue: "$12,200/mo",
    contactName: "Mike Chen",
    contactRole: "CTO"
  },
  {
    id: "3",
    name: "Global Dynamics", 
    status: "at-risk" as const,
    usage: { current: 12, trend: "-23%" },
    lastInteraction: "12 days ago",
    recommendedAction: "Urgent: Customer hasn't logged in for 12 days. Schedule immediate call",
    avatar: "GD",
    revenue: "$8,900/mo",
    contactName: "Elena Rodriguez",
    contactRole: "Operations Manager"
  },
  {
    id: "4",
    name: "InnovateLab",
    status: "opportunity" as const,
    usage: { current: 96, trend: "+34%" },
    lastInteraction: "1 hour ago",
    recommendedAction: "High engagement! Present premium features and expansion options",
    avatar: "IL",
    revenue: "$18,600/mo",
    contactName: "David Park",
    contactRole: "Head of Product"
  },
  {
    id: "5",
    name: "StartupVenture",
    status: "healthy" as const,
    usage: { current: 67, trend: "+5%" },
    lastInteraction: "4 hours ago", 
    recommendedAction: "Consistent usage. Share best practices and case studies",
    avatar: "SV",
    revenue: "$5,400/mo",
    contactName: "Jessica Wu",
    contactRole: "Founder"
  },
  {
    id: "6",
    name: "Enterprise Plus",
    status: "opportunity" as const,
    usage: { current: 88, trend: "+18%" },
    lastInteraction: "30 minutes ago",
    recommendedAction: "Perfect timing for upsell conversation. Usage trending up significantly",
    avatar: "EP",
    revenue: "$45,200/mo",
    contactName: "Robert Thompson",
    contactRole: "Director of IT"
  }
]

interface CustomerListProps {
  filters: string[]
  searchQuery: string
}

export function CustomerList({ filters, searchQuery }: CustomerListProps) {
  const [sortBy, setSortBy] = useState<"name" | "status" | "usage" | "revenue">("status")
  const [isRefreshing, setIsRefreshing] = useState(false)

  const filteredCustomers = mockCustomers.filter(customer => {
    const matchesFilter = filters.length === 0 || filters.includes(customer.status)
    const matchesSearch = searchQuery === "" || 
      customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.contactName.toLowerCase().includes(searchQuery.toLowerCase())
    
    return matchesFilter && matchesSearch
  })

  const handleRefresh = async () => {
    setIsRefreshing(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    setIsRefreshing(false)
  }

  const getStatusPriority = (status: string) => {
    const priority = { "at-risk": 4, "needs-engagement": 3, "opportunity": 2, "healthy": 1 }
    return priority[status as keyof typeof priority] || 0
  }

  const sortedCustomers = [...filteredCustomers].sort((a, b) => {
    switch (sortBy) {
      case "status":
        return getStatusPriority(b.status) - getStatusPriority(a.status)
      case "name":
        return a.name.localeCompare(b.name)
      case "usage":
        return b.usage.current - a.usage.current
      case "revenue":
        return parseFloat(b.revenue.replace(/[$,\/mo]/g, "")) - parseFloat(a.revenue.replace(/[$,\/mo]/g, ""))
      default:
        return 0
    }
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-foreground">Customer Accounts</h2>
          <p className="text-muted-foreground">
            {filteredCustomers.length} customers • {filters.length > 0 ? `Filtered by ${filters.join(", ")}` : "All accounts"}
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="gap-2"
          >
            <RefreshCw className={`h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`} />
            Refresh
          </Button>
          
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="h-9 px-3 rounded-lg border border-input bg-background text-sm focus:border-primary/60 focus:outline-none"
          >
            <option value="status">Sort by Priority</option>
            <option value="name">Sort by Name</option>
            <option value="usage">Sort by Usage</option>
            <option value="revenue">Sort by Revenue</option>
          </select>
        </div>
      </div>

      {/* Customer Cards */}
      <div className="space-y-4">
        {sortedCustomers.map((customer) => (
          <CustomerCard key={customer.id} customer={customer} />
        ))}
        
        {filteredCustomers.length === 0 && (
          <div className="text-center py-12">
            <Filter className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-2">No customers found</h3>
            <p className="text-muted-foreground">
              {searchQuery ? "Try adjusting your search terms" : "Try changing your filters"}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}