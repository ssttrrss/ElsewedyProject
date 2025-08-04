"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { Header } from "@/components/layout/header"
import { Sidebar } from "@/components/layout/sidebar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { AnimatedSection } from "@/components/animated-section"
import { ScrollToTop } from "@/components/scroll-to-top"
import { useView } from "@/contexts/view-context"
import { supabase } from "@/lib/supabase"
import { ArrowLeft } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import type { Database } from "@/lib/supabase"

type Grant = Database["public"]["Tables"]["grants"]["Row"]

export default function GrantDetailsPage() {
  const params = useParams()
  const router = useRouter()
  const { isAdmin } = useView()
  const [grant, setGrant] = useState<Grant | null>(null)
  const [loading, setLoading] = useState(true)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    type: "",
    registrationLink: "",
    deadline: "",
    allowTeams: "",
    teamSizeLimit: "",
  })

  useEffect(() => {
    if (params.id) {
      fetchGrant(params.id as string)
    }
  }, [params.id])

  const fetchGrant = async (id: string) => {
    setLoading(true)
    try {
      const { data, error } = await supabase.from("grants").select("*").eq("id", id).single()

      if (data && !error) {
        setGrant(data)
        setFormData({
          title: data.title,
          description: data.description,
          type: "Local Competition",
          registrationLink: "https://FanniMobtaker.com",
          deadline: new Date(data.deadline).toLocaleDateString(),
          allowTeams: data.allow_teams ? "Yes" : "No",
          teamSizeLimit: "4 members",
        })
      }
    } catch (error) {
      console.error("Error fetching grant:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleUpdate = async () => {
    if (!grant) return

    try {
      const { error } = await supabase
        .from("grants")
        .update({
          title: formData.title,
          description: formData.description,
          updated_at: new Date().toISOString(),
        })
        .eq("id", grant.id)

      if (!error) {
        alert("Grant updated successfully!")
      }
    } catch (error) {
      console.error("Error updating grant:", error)
      alert("Error updating grant")
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-red-600"></div>
      </div>
    )
  }

  if (!grant) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Grant not found</h2>
          <Link href="/grants">
            <Button>Back to Grants</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="flex">
        <Sidebar />

        <main className="flex-1 p-6">
          {/* Breadcrumb */}
          <div className="mb-6">
            <div className="flex items-center space-x-2 text-sm text-gray-600 mb-4">
              <Link href="/grants" className="hover:text-red-600">
                Scholarships
              </Link>
              <span>{">"}</span>
              <span className="text-red-500">Scholarship Details</span>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/grants">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back
                </Button>
              </Link>
              <h1 className="text-2xl font-bold text-gray-900">Scholarship Details</h1>
            </div>
          </div>

          {/* Header */}
          <AnimatedSection className="mb-6">
            <div className="bg-red-500 text-white p-6 rounded-t-lg">
              <h2 className="text-xl font-semibold text-center">Scholarship Details</h2>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Form */}
            <AnimatedSection animation="slideRight">
              <div className="space-y-6">
                <div>
                  <Label className="block text-sm font-medium text-gray-900 mb-2">Title</Label>
                  <Input
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full"
                    disabled={!isAdmin}
                  />
                </div>

                <div>
                  <Label className="block text-sm font-medium text-gray-900 mb-2">Description</Label>
                  <Textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full h-24"
                    disabled={!isAdmin}
                  />
                </div>

                <div>
                  <Label className="block text-sm font-medium text-gray-900 mb-2">Type</Label>
                  <Input
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                    className="w-full"
                    disabled={!isAdmin}
                  />
                </div>

                <div>
                  <Label className="block text-sm font-medium text-gray-900 mb-2">Registration Link</Label>
                  <Input
                    value={formData.registrationLink}
                    onChange={(e) => setFormData({ ...formData, registrationLink: e.target.value })}
                    className="w-full"
                    disabled={!isAdmin}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="block text-sm font-medium text-gray-900 mb-2">Deadline</Label>
                    <Input
                      value={formData.deadline}
                      onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                      className="w-full"
                      disabled={!isAdmin}
                    />
                  </div>
                  <div>
                    <Label className="block text-sm font-medium text-gray-900 mb-2">Allow Teams</Label>
                    <Input
                      value={formData.allowTeams}
                      onChange={(e) => setFormData({ ...formData, allowTeams: e.target.value })}
                      className="w-full"
                      disabled={!isAdmin}
                    />
                  </div>
                </div>

                <div>
                  <Label className="block text-sm font-medium text-gray-900 mb-2">Team Size Limit</Label>
                  <Input
                    value={formData.teamSizeLimit}
                    onChange={(e) => setFormData({ ...formData, teamSizeLimit: e.target.value })}
                    className="w-full"
                    disabled={!isAdmin}
                  />
                </div>

                {isAdmin && (
                  <Button onClick={handleUpdate} className="w-full bg-red-500 hover:bg-red-600">
                    Update Grant
                  </Button>
                )}
              </div>
            </AnimatedSection>

            {/* Right Side - Images */}
            <AnimatedSection animation="slideLeft">
              <div className="space-y-6">
                <div className="bg-gray-100 rounded-lg p-8 flex items-center justify-center h-64">
                  <div className="text-center">
                    <div className="w-32 h-32 mx-auto mb-4 bg-gradient-to-br from-green-400 to-blue-500 rounded-lg flex items-center justify-center">
                      <div className="text-white text-4xl font-bold">💰</div>
                    </div>
                    <p className="text-gray-600">Scholarship Illustration</p>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="bg-gray-100 rounded-lg p-4 h-20 flex items-center justify-center">
                      <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-blue-500 rounded flex items-center justify-center">
                        <span className="text-white text-xs font-bold">IMG</span>
                      </div>
                    </div>
                  ))}
                </div>

                <Button className="w-full bg-red-500 hover:bg-red-600" onClick={() => router.back()}>
                  BACK
                </Button>
              </div>
            </AnimatedSection>
          </div>
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
            <Badge className="bg-red-500 mb-4">Fanni Mobtaker</Badge>
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

          <Button className="w-full bg-red-500 hover:bg-red-600 text-white">Update Grant</Button>
        </aside>
      </div>

      <ScrollToTop />
    </div>
  )
}
