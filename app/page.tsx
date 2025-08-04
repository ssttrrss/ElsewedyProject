"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { AnimatedSection } from "@/components/animated-section"
import { ScrollToTop } from "@/components/scroll-to-top"
import { CompetitionForm } from "@/components/admin/competition-form"
import { GrantForm } from "@/components/admin/grant-form"
import { ModeSwitch } from "@/components/ui/mode-switch"
import { useView } from "@/contexts/view-context"
import { supabase } from "@/lib/supabase"
import { Trophy, DollarSign, Search, Award, Target, Bell, Mail, Plus } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { cn } from "@/lib/utils"
import type { Database } from "@/lib/supabase"

type Competition = Database["public"]["Tables"]["competitions"]["Row"]
type Grant = Database["public"]["Tables"]["grants"]["Row"]

export default function HomePage() {
  const { viewMode, setViewMode, isAdmin } = useView()
  const [competitions, setCompetitions] = useState<Competition[]>([])
  const [grants, setGrants] = useState<Grant[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [showCompetitionForm, setShowCompetitionForm] = useState(false)
  const [showGrantForm, setShowGrantForm] = useState(false)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    setLoading(true)
    try {
      const [competitionsResponse, grantsResponse] = await Promise.all([
        supabase.from("competitions").select("*").order("created_at", { ascending: false }),
        supabase.from("grants").select("*").order("created_at", { ascending: false }),
      ])

      if (competitionsResponse.data) setCompetitions(competitionsResponse.data)
      if (grantsResponse.data) setGrants(grantsResponse.data)
    } catch (error) {
      console.error("Error fetching data:", error)
    } finally {
      setLoading(false)
    }
  }

  const allCategories = Array.from(new Set([...competitions.map((c) => c.category), ...grants.map((g) => g.category)]))

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-orange-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-red-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-50 backdrop-blur-sm bg-white/95">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 relative">
                <Image
                  src="/school-logo.png"
                  alt="Elsewedy School"
                  width={32}
                  height={32}
                  className="rounded-full object-cover"
                  priority
                />
              </div>
              <span className="text-xl font-semibold text-gray-900">Elsewedy School</span>
            </div>

            <div className="flex-1 max-w-2xl mx-8">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  placeholder="Search your Competition here..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-gray-50 border-gray-200 focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-200"
                />
              </div>
            </div>

            {/* Profile Section */}
            <div className="flex items-center space-x-6">
              {/* Mode Switch */}
              <ModeSwitch isAdmin={isAdmin} onModeChange={(checked) => setViewMode(checked ? "admin" : "user")} />

              {/* Profile Display */}
              <div className="flex items-center space-x-3">
                <div className="relative group">
                  <Image
                    src="/profile.jpeg"
                    alt="Profile"
                    width={40}
                    height={40}
                    className="rounded-full object-cover border-2 border-red-200 group-hover:border-red-400 transition-all duration-200"
                  />
                  <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white animate-pulse"></div>
                </div>
                <div className="text-sm">
                  <p className="font-medium text-gray-900">Mahmoud Ibrahem</p>
                  <p className="text-gray-600 text-xs">Continue Your Journey And Achieve Your Target</p>
                </div>
                <div className="flex space-x-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 hover:bg-red-50 hover:text-red-600 transition-colors"
                  >
                    <Bell className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 hover:bg-red-50 hover:text-red-600 transition-colors"
                  >
                    <Mail className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <AnimatedSection className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Discover Amazing Opportunities</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Explore competitions and grants designed to help you excel in your academic journey
          </p>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card className="glass hover-lift">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Competitions</CardTitle>
                <Trophy className="h-4 w-4 text-red-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {competitions.filter((c) => new Date(c.deadline) > new Date()).length}
                </div>
              </CardContent>
            </Card>

            <Card className="glass hover-lift">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Available Grants</CardTitle>
                <DollarSign className="h-4 w-4 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {grants.filter((g) => new Date(g.deadline) > new Date()).length}
                </div>
              </CardContent>
            </Card>

            <Card className="glass hover-lift">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Value</CardTitle>
                <Award className="h-4 w-4 text-blue-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  ${grants.reduce((sum, grant) => sum + grant.amount, 0).toLocaleString()}
                </div>
              </CardContent>
            </Card>

            <Card className="glass hover-lift">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Categories</CardTitle>
                <Target className="h-4 w-4 text-purple-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{allCategories.length}</div>
              </CardContent>
            </Card>
          </div>
        </AnimatedSection>

        {/* Quick Navigation */}
        <AnimatedSection className="mb-8">
          <div className="flex justify-center space-x-4">
            <Link href="/competitions">
              <Button
                size="lg"
                className="bg-red-500 hover:bg-red-600 transition-all duration-200 transform hover:scale-105"
              >
                <Trophy className="w-5 h-5 mr-2" />
                View All Competitions
              </Button>
            </Link>
            <Link href="/grants">
              <Button
                size="lg"
                variant="outline"
                className="hover:bg-red-50 hover:border-red-300 transition-all duration-200 transform hover:scale-105 bg-transparent"
              >
                <DollarSign className="w-5 h-5 mr-2" />
                View All Grants
              </Button>
            </Link>

            {/* Admin Quick Actions - Only visible in admin mode */}
            {isAdmin && (
              <div className={cn("flex space-x-2 ml-4", "animate-in slide-in-from-right-5 duration-300")}>
                <Button
                  onClick={() => setShowCompetitionForm(true)}
                  variant="secondary"
                  className="transition-all duration-200 transform hover:scale-105"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Competition
                </Button>
                <Button
                  onClick={() => setShowGrantForm(true)}
                  variant="secondary"
                  className="transition-all duration-200 transform hover:scale-105"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Grant
                </Button>
              </div>
            )}
          </div>
        </AnimatedSection>

        {/* Recent Activity */}
        <AnimatedSection className="mb-12" animation="slideUp">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-8">Recent Opportunities</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card className="glass hover-lift">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Trophy className="w-5 h-5 mr-2 text-red-600" />
                    Latest Competitions
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">{competitions.length} competitions available</p>
                  <Link href="/competitions">
                    <Button className="w-full transition-all duration-200 transform hover:scale-105">
                      Explore Competitions
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              <Card className="glass hover-lift">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <DollarSign className="w-5 h-5 mr-2 text-green-600" />
                    Latest Grants
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">{grants.length} grants available</p>
                  <Link href="/grants">
                    <Button
                      className="w-full bg-transparent transition-all duration-200 transform hover:scale-105"
                      variant="outline"
                    >
                      Explore Grants
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        </AnimatedSection>
      </div>

      <ScrollToTop />

      {/* Forms - Only accessible in admin mode */}
      {isAdmin && showCompetitionForm && (
        <CompetitionForm
          onClose={() => setShowCompetitionForm(false)}
          onSuccess={() => {
            setShowCompetitionForm(false)
            fetchData()
          }}
        />
      )}

      {isAdmin && showGrantForm && (
        <GrantForm
          onClose={() => setShowGrantForm(false)}
          onSuccess={() => {
            setShowGrantForm(false)
            fetchData()
          }}
        />
      )}
    </div>
  )
}
