import { UserButton } from "@clerk/nextjs"
import { ModeToggle } from "./mode-toggle"

export function DashboardHeader() {
  return (
    <header className="flex justify-between items-center mb-8">
      <h1 className="text-3xl font-bold">SchoolOS Dashboard</h1>
      <div className="flex items-center space-x-4">
        <ModeToggle />
        <UserButton afterSignOutUrl="/" />
      </div>
    </header>
  )
}

