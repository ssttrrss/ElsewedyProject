"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { X, Upload, Calendar } from "lucide-react"
import { toast } from "sonner"

interface CompetitionFormProps {
  competition?: any
  onClose: () => void
  onSuccess: () => void
}

export function CompetitionForm({ competition, onClose, onSuccess }: CompetitionFormProps) {
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    title: competition?.title || "",
    description: competition?.description || "",
    category: competition?.category || "",
    type: competition?.type || "local",
    deadline: competition?.deadline || "",
    registration_link: competition?.registration_link || "",
    allow_teams: competition?.allow_teams || false,
    team_size_limit: competition?.team_size_limit || 1,
    image_url: competition?.image_url || "",
  })

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      // Validate required fields
      if (!formData.title.trim()) {
        toast.error("Title is required")
        setLoading(false)
        return
      }
      if (!formData.description.trim()) {
        toast.error("Description is required")
        setLoading(false)
        return
      }
      if (!formData.category.trim()) {
        toast.error("Category is required")
        setLoading(false)
        return
      }
      if (!formData.deadline) {
        toast.error("Deadline is required")
        setLoading(false)
        return
      }

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const competitionData = {
        id: competition?.id || Date.now(),
        title: formData.title.trim(),
        description: formData.description.trim(),
        category: formData.category.trim(),
        type: formData.type,
        deadline: formData.deadline,
        registration_link: formData.registration_link.trim() || null,
        allow_teams: formData.allow_teams,
        team_size_limit: formData.allow_teams ? formData.team_size_limit : 1,
        image_url: formData.image_url || "/placeholder.svg?height=200&width=400",
        author: "Mahmoud Ibrahem",
        role: "Student",
        created_at: competition?.created_at || new Date().toISOString(),
        updated_at: new Date().toISOString(),
      }

      console.log("Competition saved:", competitionData)
      toast.success(competition ? "Competition updated successfully!" : "Competition created successfully!")
      onSuccess()
    } catch (error) {
      console.error("Error saving competition:", error)
      toast.error("Failed to save competition. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    try {
      // Simulate image upload
      const imageUrl = URL.createObjectURL(file)
      handleInputChange("image_url", imageUrl)
      toast.success("Image uploaded successfully!")
    } catch (error) {
      console.error("Error uploading image:", error)
      toast.error("Failed to upload image")
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>{competition ? "Edit Competition" : "Create New Competition"}</CardTitle>
          <Button variant="ghost" size="icon" onClick={onClose} disabled={loading}>
            <X className="w-4 h-4" />
          </Button>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">Title *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => handleInputChange("title", e.target.value)}
                placeholder="Enter competition title"
                disabled={loading}
                required
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description *</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => handleInputChange("description", e.target.value)}
                placeholder="Enter competition description"
                rows={4}
                disabled={loading}
                required
                className="w-full resize-none"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="category">Category *</Label>
                <Input
                  id="category"
                  value={formData.category}
                  onChange={(e) => handleInputChange("category", e.target.value)}
                  placeholder="e.g., Academic, Sports, Arts"
                  disabled={loading}
                  required
                  className="w-full"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="type">Type *</Label>
                <Select
                  value={formData.type}
                  onValueChange={(value) => handleInputChange("type", value)}
                  disabled={loading}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="local">Local</SelectItem>
                    <SelectItem value="international">International</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="deadline">Deadline *</Label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
                <Input
                  id="deadline"
                  type="datetime-local"
                  value={formData.deadline}
                  onChange={(e) => handleInputChange("deadline", e.target.value)}
                  className="pl-10 w-full"
                  disabled={loading}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="registration_link">Registration Link</Label>
              <Input
                id="registration_link"
                type="url"
                value={formData.registration_link}
                onChange={(e) => handleInputChange("registration_link", e.target.value)}
                placeholder="https://example.com/register"
                disabled={loading}
                className="w-full"
              />
            </div>

            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Switch
                  id="allow_teams"
                  checked={formData.allow_teams}
                  onCheckedChange={(checked) => handleInputChange("allow_teams", checked)}
                  disabled={loading}
                />
                <Label htmlFor="allow_teams">Allow Teams</Label>
              </div>

              {formData.allow_teams && (
                <div className="space-y-2">
                  <Label htmlFor="team_size_limit">Team Size Limit</Label>
                  <Input
                    id="team_size_limit"
                    type="number"
                    min="1"
                    max="10"
                    value={formData.team_size_limit}
                    onChange={(e) => handleInputChange("team_size_limit", Number.parseInt(e.target.value) || 1)}
                    disabled={loading}
                    className="w-full"
                  />
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="image">Competition Image</Label>
              <div className="flex items-center space-x-4">
                <Input
                  id="image"
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="flex-1"
                  disabled={loading}
                />
                <Button type="button" variant="outline" size="icon" disabled={loading}>
                  <Upload className="w-4 h-4" />
                </Button>
              </div>
              {formData.image_url && (
                <div className="mt-2">
                  <img
                    src={formData.image_url || "/placeholder.svg"}
                    alt="Preview"
                    className="w-32 h-20 object-cover rounded border"
                  />
                </div>
              )}
            </div>

            <div className="flex justify-end space-x-2 pt-4 border-t">
              <Button type="button" variant="outline" onClick={onClose} disabled={loading}>
                Cancel
              </Button>
              <Button type="submit" disabled={loading}>
                {loading ? "Saving..." : competition ? "Update Competition" : "Create Competition"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
