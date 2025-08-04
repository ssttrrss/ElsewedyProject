"use client"

import { useState, useEffect } from "react"
import { Header } from "@/components/layout/header"
import { Sidebar } from "@/components/layout/sidebar"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { AnimatedSection } from "@/components/animated-section"
import { ScrollToTop } from "@/components/scroll-to-top"
import { GrantForm } from "@/components/admin/grant-form"
import { useView } from "@/contexts/view-context"
import { supabase } from "@/lib/supabase"
import { Award, Plus, Edit, Trash2, ChevronLeft, ChevronRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { cn } from "@/lib/utils"
import type { Database } from "@/lib/supabase"

type Grant = Database["public"]["Tables"]["grants"]["Row"]

export default function GrantsPage() {
  const { isAdmin } = useView()
  const [grants, setGrants] = useState<Grant[]>([])
  const [loading, setLoading] = useState(true)
  const [showGrantForm, setShowGrantForm] = useState(false)
  const [editingGrant, setEditingGrant] = useState<Grant | null>(null)

  useEffect(() => {
    fetchGrants()
  }, [])

  const fetchGrants = async () => {
    setLoading(true)
    try {
      const { data, error } = await supabase.from("grants").select("*").order("created_at", { ascending: false })

      if (data && !error) {
        setGrants(data)
      }
    } catch (error) {
      console.error("Error fetching grants:", error)
    } finally {
      setLoading(false)
    }
  }

  const deleteGrant = async (id: string) => {
    if (confirm("Are you sure you want to delete this grant?")) {
      const { error } = await supabase.from("grants").delete().eq("id", id)
      if (!error) {
        setGrants(grants.filter((g) => g.id !== id))
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
      <Header searchPlaceholder="Search your Grants here..." />

      <div className="flex">
        <Sidebar />

        <main className="flex-1 p-6">
          {/* Hero Section */}
          <AnimatedSection className="mb-8">
            <div className="bg-gradient-to-r from-red-500 to-red-600 rounded-2xl p-8 text-white relative overflow-hidden">
              <div className="relative z-10">
                <h1 className="text-3xl font-bold mb-4">Boost your potential with inspiring Scholarships</h1>
                <Button
                  variant="secondary"
                  className="bg-black text-white hover:bg-gray-800 transition-all duration-200"
                >
                  More Scholarships
                  <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
              <div className="absolute top-4 right-8 opacity-20">
                <div className="w-32 h-32 bg-white rounded-full"></div>
              </div>
            </div>
          </AnimatedSection>

          {/* Scholarships Grid */}
          <AnimatedSection>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-red-500 flex items-center">
                <Award className="w-5 h-5 mr-2" />
                Scholarships
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

                {/* Only show Add Grant button in Admin mode */}
                {isAdmin && (
                  <div className="ml-4">
                    <Button
                      onClick={() => setShowGrantForm(true)}
                      className={cn(
                        "bg-red-500 hover:bg-red-600 text-white transition-all duration-200 transform hover:scale-105",
                        "animate-in slide-in-from-right-5 duration-300",
                      )}
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      New Grant
                    </Button>
                  </div>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {grants.map((grant, index) => (
                <AnimatedSection key={grant.id} delay={index * 100} animation="zoomIn">
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
                            alt="Grant Author"
                            width={60}
                            height={60}
                            className="rounded-full border-2 border-white object-cover"
                          />
                        </div>
                        <div className="absolute top-2 left-2">
                          <Badge className="bg-red-500 text-white">Scholarship</Badge>
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
                                setEditingGrant(grant)
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
                                deleteGrant(grant.id)
                              }}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      )}
                    </div>

                    <CardContent className="p-4">
                      <Link href={`/grants/${grant.id}`}>
                        <h3 className="font-semibold text-gray-900 mb-2 hover:text-red-600 transition-colors cursor-pointer">
                          {grant.title}
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
                          <p className="text-gray-600">Software Developer</p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <Badge variant="outline">{grant.category}</Badge>
                        <Badge className="bg-green-600 text-white">${grant.amount.toLocaleString()}</Badge>
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
            <Badge className="bg-red-500 mb-4">Scholarship One</Badge>
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
                <span className="text-sm text-gray-600">Grant 1</span>
              </div>
              <span className="text-sm font-medium">5 days left</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                <span className="text-sm text-gray-600">Grant 2</span>
              </div>
              <span className="text-sm font-medium">7 days left</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-red-300 rounded-full"></div>
                <span className="text-sm text-gray-600">Grant 3</span>
              </div>
              <span className="text-sm font-medium">15 days left</span>
            </div>
          </div>

          {/* Only show New Grants button in Admin mode */}
          {isAdmin && (
            <Button
              className={cn(
                "w-full bg-red-500 hover:bg-red-600 text-white transition-all duration-200",
                "animate-in slide-in-from-bottom-5 duration-300",
              )}
            >
              New Grants
            </Button>
          )}
        </aside>
      </div>

      <ScrollToTop />

      {/* Grant Form Modal - Only accessible in admin mode */}
      {isAdmin && showGrantForm && (
        <GrantForm
          onClose={() => setShowGrantForm(false)}
          onSuccess={() => {
            setShowGrantForm(false)
            fetchGrants()
          }}
        />
      )}

      {isAdmin && editingGrant && (
        <GrantForm
          grant={editingGrant}
          onClose={() => setEditingGrant(null)}
          onSuccess={() => {
            setEditingGrant(null)
            fetchGrants()
          }}
        />
      )}
    </div>
  )
}
