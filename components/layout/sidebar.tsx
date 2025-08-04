"use client"

import { Trophy, Award, Users, Settings, BarChart3, Home } from "lucide-react"
import { cn } from "@/lib/utils"
import { useView } from "@/contexts/view-context"
import Link from "next/link"
import { usePathname } from "next/navigation"

export function Sidebar() {
  const { isAdmin } = useView()
  const pathname = usePathname()

  const userNavItems = [
    { href: "/", label: "Dashboard", icon: Home },
    { href: "/competitions", label: "Competitions", icon: Trophy },
    { href: "/grants", label: "Scholarships", icon: Award },
  ]

  const adminNavItems = [
    { href: "/", label: "Dashboard", icon: Home },
    { href: "/competitions", label: "Competitions", icon: Trophy },
    { href: "/grants", label: "Scholarships", icon: Award },
    { href: "/admin", label: "Admin Panel", icon: Settings },
    { href: "/admin/analytics", label: "Analytics", icon: BarChart3 },
    { href: "/admin/users", label: "Users", icon: Users },
  ]

  const navItems = isAdmin ? adminNavItems : userNavItems

  return (
    <aside className="w-64 bg-white border-r border-gray-200 min-h-screen sticky top-16 overflow-y-auto">
      <div className="p-6">
        <div className="space-y-6">
          <div>
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
              {isAdmin ? "ADMIN OVERVIEW" : "OVERVIEW"}
            </h3>
            <nav className="space-y-1">
              {navItems.map((item) => {
                const isActive = pathname === item.href
                const Icon = item.icon

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 group",
                      isActive
                        ? "bg-red-50 text-red-600 border-l-4 border-red-500 shadow-sm"
                        : "text-gray-700 hover:bg-gray-50 hover:text-red-600",
                    )}
                  >
                    <Icon
                      className={cn(
                        "w-5 h-5 transition-all duration-200",
                        isActive ? "text-red-600" : "text-gray-400 group-hover:text-red-500",
                      )}
                    />
                    <span className="transition-all duration-200">{item.label}</span>
                    {isActive && <div className="ml-auto w-2 h-2 bg-red-500 rounded-full animate-pulse" />}
                  </Link>
                )
              })}
            </nav>
          </div>

          {isAdmin && (
            <div className="pt-4 border-t border-gray-200">
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">ADMIN TOOLS</h3>
              <div className="space-y-1">
                <div className="px-3 py-2 text-xs text-gray-500 bg-red-50 rounded-lg border border-red-200">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                    <span>Admin Mode Active</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </aside>
  )
}
