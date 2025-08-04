"use client"

import { useState } from "react"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { User, Shield } from "lucide-react"
import { cn } from "@/lib/utils"

interface ModeSwitchProps {
  isAdmin: boolean
  onModeChange: (checked: boolean) => void
}

export function ModeSwitch({ isAdmin, onModeChange }: ModeSwitchProps) {
  const [isTransitioning, setIsTransitioning] = useState(false)

  const handleModeChange = (checked: boolean) => {
    setIsTransitioning(true)
    setTimeout(() => {
      onModeChange(checked)
      setIsTransitioning(false)
    }, 150)
  }

  return (
    <div className="flex items-center space-x-4">
      {/* Mode Switch */}
      <div className="flex items-center space-x-2 bg-gray-50 rounded-full p-2 border">
        <User
          className={cn("w-4 h-4 transition-all duration-200", !isAdmin ? "text-blue-600 scale-110" : "text-gray-400")}
        />
        <Label htmlFor="view-mode" className="text-sm font-medium cursor-pointer">
          User
        </Label>
        <Switch
          id="view-mode"
          checked={isAdmin}
          onCheckedChange={handleModeChange}
          disabled={isTransitioning}
          className="data-[state=checked]:bg-red-500 data-[state=unchecked]:bg-blue-500"
        />
        <Label htmlFor="view-mode" className="text-sm font-medium cursor-pointer">
          Admin
        </Label>
        <Shield
          className={cn("w-4 h-4 transition-all duration-200", isAdmin ? "text-red-600 scale-110" : "text-gray-400")}
        />
      </div>

      {/* Mode Badge */}
      <Badge
        variant={isAdmin ? "destructive" : "default"}
        className={cn(
          "transition-all duration-200 transform",
          isTransitioning ? "scale-95 opacity-70" : "scale-100 opacity-100",
          isAdmin ? "bg-red-500 hover:bg-red-600" : "bg-blue-500 hover:bg-blue-600",
        )}
      >
        {isTransitioning ? (
          <div className="flex items-center space-x-1">
            <div className="w-3 h-3 border border-white border-t-transparent rounded-full animate-spin" />
            <span>Switching...</span>
          </div>
        ) : (
          <div className="flex items-center space-x-1">
            {isAdmin ? <Shield className="w-3 h-3" /> : <User className="w-3 h-3" />}
            <span>{isAdmin ? "Admin Mode" : "User Mode"}</span>
          </div>
        )}
      </Badge>
    </div>
  )
}
