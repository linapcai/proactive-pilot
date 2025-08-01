import { useState } from "react"
import { SidebarProvider } from "@/components/ui/sidebar"
import { DashboardSidebar } from "./DashboardSidebar"
import { CustomerList } from "./CustomerList"
import { DashboardHeader } from "./DashboardHeader"

export function CustomerDashboard() {
  const [selectedFilters, setSelectedFilters] = useState<string[]>([])
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gradient-subtle">
        <DashboardSidebar 
          selectedFilters={selectedFilters}
          onFiltersChange={setSelectedFilters}
        />
        
        <main className="flex-1 flex flex-col">
          <DashboardHeader 
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
          />
          
          <div className="flex-1 p-6">
            <CustomerList 
              filters={selectedFilters}
              searchQuery={searchQuery}
            />
          </div>
        </main>
      </div>
    </SidebarProvider>
  )
}