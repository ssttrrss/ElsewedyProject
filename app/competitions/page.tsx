"use client"

import { useState, useEffect } from "react"
import { Header } from "@/components/layout/header"
import { Sidebar } from "@/components/layout/sidebar"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { AnimatedSection } from "@/components/animated-section"
import { ScrollToTop } from "@/components/scroll-to-top"
import { CompetitionForm } from "@/components/admin/competition-form"
import { useView } from "@/contexts/view-context"
import { supabase } from "@/lib/supabase"
import { Trophy, Plus, Edit, Trash2, ChevronLeft, ChevronRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { cn } from "@/lib/utils"
import type { Database } from "@/lib/supabase"

type Competition = Database["public"]["Tables"]["competitions"]["Row"]

export default function CompetitionsPage() {
  const { isAdmin } = useView()
  const [competitions, setCompetitions] = useState<Competition[]>([])
  const [loading, setLoading] = useState(true)
  const [showCompetitionForm, setShowCompetitionForm] = useState(false)
  const [editingCompetition, setEditingCompetition] = useState<Competition | null>(null)

  useEffect(() => {
    fetchCompetitions()
  }, [])

  const fetchCompetitions = async () => {
    setLoading(true)
    try {
      const { data, error } = await supabase.from("competitions").select("*").order("created_at", { ascending: false })

      if (data && !error) {
        setCompetitions(data)
      }
    } catch (error) {
      console.error("Error fetching competitions:", error)
    } finally {
      setLoading(false)
    }
  }

  const deleteCompetition = async (id: string) => {
    if (confirm("Are you sure you want to delete this competition?")) {
      const { error } = await supabase.from("competitions").delete().eq("id", id)
      if (!error) {
        setCompetitions(competitions.filter((c) => c.id !== id))
      }
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-red-600"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header searchPlaceholder="Search your Competition here..." />

      <div className="flex">
        <Sidebar />

        <main className="flex-1 p-6">
          {/* Hero Section */}
          <AnimatedSection className="mb-8">
            <div className="bg-gradient-to-r from-red-500 to-red-600 rounded-2xl p-8 text-white relative overflow-hidden">
              <div className="relative z-10">
                <h1 className="text-3xl font-bold mb-4">Boost your potential with inspiring Competitions</h1>
                <Button
                  variant="secondary"
                  className="bg-black text-white hover:bg-gray-800 transition-all duration-200"
                >
                  More Competitions
                  <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
              <div className="absolute top-4 right-8 opacity-20">
                <div className="w-32 h-32 bg-white rounded-full"></div>
              </div>
            </div>
          </AnimatedSection>

          {/* Competitions Grid */}
          <AnimatedSection>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-red-500 flex items-center">
                <Trophy className="w-5 h-5 mr-2" />
                Competitions
              </h2>
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="icon"
                  className="hover:bg-red-50 hover:border-red-300 transition-colors bg-transparent"
                >
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="hover:bg-red-50 hover:border-red-300 transition-colors bg-transparent"
                >
                  <ChevronRight className="w-4 h-4" />
                </Button>

                {/* Only show Add Competition button in Admin mode */}
                {isAdmin && (
                  <div className="ml-4">
                    <Button
                      onClick={() => setShowCompetitionForm(true)}
                      className={cn(
                        "bg-red-500 hover:bg-red-600 text-white transition-all duration-200 transform hover:scale-105",
                        "animate-in slide-in-from-right-5 duration-300",
                      )}
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      New Competition
                    </Button>
                  </div>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {competitions.map((competition, index) => (
                <AnimatedSection key={competition.id} delay={index * 100} animation="zoomIn">
                  <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 group cursor-pointer">
                    <div className="relative">
                      <div className="h-48 bg-gradient-to-br from-blue-600 to-purple-700 relative overflow-hidden">
                        <div className="absolute inset-0 bg-black/20"></div>
                        <div className="absolute top-4 left-4 text-white">
                          <h3 className="text-2xl font-bold">Government</h3>
                          <h4 className="text-xl font-semibold">Grants</h4>
                          <p className="text-sm opacity-90">2024 Update</p>
                        </div>
                        <div className="absolute top-4 right-4">
                          <Image
                            src="/profile.jpeg"
                            alt="Competition Author"
                            width={60}
                            height={60}
                            className="rounded-full border-2 border-white object-cover"
                          />
                        </div>
                        <div className="absolute top-2 left-2">
                          <Badge className="bg-red-500 text-white">Fanni Mobtaker</Badge>
                        </div>
                      </div>

                      {/* Admin Controls - Only visible in admin mode */}
                      {isAdmin && (
                        <div
                          className={cn(
                            "absolute top-2 right-2 transition-all duration-300",
                            "opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0",
                          )}
                        >
                          <div className="flex space-x-1">
                            <Button
                              size="icon"
                              variant="secondary"
                              className="h-8 w-8 bg-white/90 hover:bg-white transition-all duration-200"
                              onClick={(e) => {
                                e.preventDefault()
                                setEditingCompetition(competition)
                              }}
                            >
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button
                              size="icon"
                              variant="destructive"
                              className="h-8 w-8 transition-all duration-200"
                              onClick={(e) => {
                                e.preventDefault()
                                deleteCompetition(competition.id)
                              }}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      )}
                    </div>

                    <CardContent className="p-4">
                      <Link href={`/competitions/${competition.id}`}>
                        <h3 className="font-semibold text-gray-900 mb-2 hover:text-red-600 transition-colors cursor-pointer">
                          {competition.title}
                        </h3>
                      </Link>

                      <div className="flex items-center space-x-2 mb-3">
                        <Image
                          src="/profile.jpeg"
                          alt="Author"
                          width={24}
                          height={24}
                          className="rounded-full object-cover"
                        />
                        <div className="text-sm">
                          <p className="font-medium text-gray-900">Mahmoud Ibrahem</p>
                          <p className="text-gray-600">{competition.role}</p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <Badge variant="outline">{competition.category}</Badge>
                        <Badge variant={competition.type === "international" ? "default" : "secondary"}>
                          {competition.type}
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                </AnimatedSection>
              ))}
            </div>
          </AnimatedSection>
        </main>

        {/* Right Sidebar - Profile Stats */}
        <aside className="w-80 bg-white border-l border-gray-200 p-6">
          <div className="text-center mb-6">
            <div className="relative inline-block">
              <Image
                src="/profile.jpeg"
                alt="Profile"
                width={80}
                height={80}
                className="rounded-full object-cover border-4 border-red-200"
              />
              <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-red-500 rounded-full border-2 border-white"></div>
            </div>
            <h3 className="font-semibold text-gray-900 mt-4">Mahmoud Ibrahem</h3>
            <p className="text-sm text-gray-500 mb-4">Continue Your Journey And Achieve Your Target</p>
          </div>

          <div className="mb-6">
            <Badge className="bg-red-500 mb-4">Fanni mobtaker</Badge>
            <div className="flex justify-end mb-4">
              <div className="flex space-x-1">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="w-6 bg-red-400 rounded-sm" style={{ height: `${30 + i * 8}px` }} />
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-4 mb-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                <span className="text-sm text-gray-600">Fanni mobtaker</span>
              </div>
              <span className="text-sm font-medium">21 Team</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                <span className="text-sm text-gray-600">Competition 2</span>
              </div>
              <span className="text-sm font-medium">10 Team</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-red-300 rounded-full"></div>
                <span className="text-sm text-gray-600">Competition 3</span>
              </div>
              <span className="text-sm font-medium">0 Team</span>
            </div>
          </div>

          {/* Only show New Competition button in Admin mode */}
          {isAdmin && (
            <Button
              className={cn(
                "w-full bg-red-500 hover:bg-red-600 text-white transition-all duration-200",
                "animate-in slide-in-from-bottom-5 duration-300",
              )}
            >
              New Competition
            </Button>
          )}
        </aside>
      </div>

      <ScrollToTop />

      {/* Competition Form Modal - Only accessible in admin mode */}
      {isAdmin && showCompetitionForm && (
        <CompetitionForm
          onClose={() => setShowCompetitionForm(false)}
          onSuccess={() => {
            setShowCompetitionForm(false)
            fetchCompetitions()
          }}
        />
      )}

      {isAdmin && editingCompetition && (
        <CompetitionForm
          competition={editingCompetition}
          onClose={() => setEditingCompetition(null)}
          onSuccess={() => {
            setEditingCompetition(null)
            fetchCompetitions()
          }}
        />
      )}
    </div>
  )
}
