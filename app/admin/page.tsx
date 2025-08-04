"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { ProtectedRoute } from "@/components/auth/protected-route"
import { CompetitionForm } from "@/components/admin/competition-form"
import { GrantForm } from "@/components/admin/grant-form"
import { supabase } from "@/lib/supabase"
import { Plus, Trophy, DollarSign, Users, Calendar, Edit, Trash2 } from "lucide-react"
import Image from "next/image"

interface Competition {
  id: string
  title: string
  description: string
  image_url: string | null
  deadline: string
  category: string
  created_at: string
}

interface Grant {
  id: string
  title: string
  description: string
  image_url: string | null
  deadline: string
  amount: number
  category: string
  created_at: string
}

export default function AdminDashboard() {
  const [competitions, setCompetitions] = useState<Competition[]>([])
  const [grants, setGrants] = useState<Grant[]>([])
  const [loading, setLoading] = useState(true)
  const [showCompetitionForm, setShowCompetitionForm] = useState(false)
  const [showGrantForm, setShowGrantForm] = useState(false)
  const [editingCompetition, setEditingCompetition] = useState<Competition | null>(null)
  const [editingGrant, setEditingGrant] = useState<Grant | null>(null)

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

  const deleteCompetition = async (id: string) => {
    if (confirm("Are you sure you want to delete this competition?")) {
      const { error } = await supabase.from("competitions").delete().eq("id", id)
      if (!error) {
        setCompetitions(competitions.filter((c) => c.id !== id))
      }
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
    <ProtectedRoute requireAdmin>
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
            <p className="text-gray-600">Manage competitions and grants for Elsewedy School</p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Competitions</CardTitle>
                <Trophy className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{competitions.length}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Grants</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{grants.length}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Items</CardTitle>
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {competitions.filter((c) => new Date(c.deadline) > new Date()).length +
                    grants.filter((g) => new Date(g.deadline) > new Date()).length}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Categories</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {new Set([...competitions.map((c) => c.category), ...grants.map((g) => g.category)]).size}
                </div>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="competitions" className="space-y-6">
            <TabsList>
              <TabsTrigger value="competitions">Competitions</TabsTrigger>
              <TabsTrigger value="grants">Grants</TabsTrigger>
            </TabsList>

            <TabsContent value="competitions" className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">Manage Competitions</h2>
                <Button onClick={() => setShowCompetitionForm(true)}>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Competition
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {competitions.map((competition) => (
                  <Card key={competition.id} className="overflow-hidden">
                    {competition.image_url && (
                      <div className="relative h-48">
                        <Image
                          src={competition.image_url || "/placeholder.svg"}
                          alt={competition.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                    )}
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-lg">{competition.title}</CardTitle>
                        <Badge variant="secondary">{competition.category}</Badge>
                      </div>
                      <CardDescription className="line-clamp-2">{competition.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex justify-between items-center mb-4">
                        <span className="text-sm text-gray-600">
                          Deadline: {new Date(competition.deadline).toLocaleDateString()}
                        </span>
                        <Badge variant={new Date(competition.deadline) > new Date() ? "default" : "destructive"}>
                          {new Date(competition.deadline) > new Date() ? "Active" : "Expired"}
                        </Badge>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" onClick={() => setEditingCompetition(competition)}>
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="destructive" onClick={() => deleteCompetition(competition.id)}>
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="grants" className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">Manage Grants</h2>
                <Button onClick={() => setShowGrantForm(true)}>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Grant
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {grants.map((grant) => (
                  <Card key={grant.id} className="overflow-hidden">
                    {grant.image_url && (
                      <div className="relative h-48">
                        <Image
                          src={grant.image_url || "/placeholder.svg"}
                          alt={grant.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                    )}
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-lg">{grant.title}</CardTitle>
                        <Badge variant="secondary">{grant.category}</Badge>
                      </div>
                      <CardDescription className="line-clamp-2">{grant.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-lg font-bold text-green-600">${grant.amount.toLocaleString()}</span>
                        <Badge variant={new Date(grant.deadline) > new Date() ? "default" : "destructive"}>
                          {new Date(grant.deadline) > new Date() ? "Active" : "Expired"}
                        </Badge>
                      </div>
                      <div className="text-sm text-gray-600 mb-4">
                        Deadline: {new Date(grant.deadline).toLocaleDateString()}
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" onClick={() => setEditingGrant(grant)}>
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="destructive" onClick={() => deleteGrant(grant.id)}>
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Forms */}
        {showCompetitionForm && (
          <CompetitionForm
            onClose={() => setShowCompetitionForm(false)}
            onSuccess={() => {
              setShowCompetitionForm(false)
              fetchData()
            }}
          />
        )}

        {showGrantForm && (
          <GrantForm
            onClose={() => setShowGrantForm(false)}
            onSuccess={() => {
              setShowGrantForm(false)
              fetchData()
            }}
          />
        )}

        {editingCompetition && (
          <CompetitionForm
            competition={editingCompetition}
            onClose={() => setEditingCompetition(null)}
            onSuccess={() => {
              setEditingCompetition(null)
              fetchData()
            }}
          />
        )}

        {editingGrant && (
          <GrantForm
            grant={editingGrant}
            onClose={() => setEditingGrant(null)}
            onSuccess={() => {
              setEditingGrant(null)
              fetchData()
            }}
          />
        )}
      </div>
    </ProtectedRoute>
  )
}
