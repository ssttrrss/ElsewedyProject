"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { supabase } from "@/lib/supabase"
import { X, Upload, Calendar, DollarSign } from "lucide-react"
import { toast } from "sonner"
import type { Database } from "@/lib/supabase"

type Grant = Database["public"]["Tables"]["grants"]["Row"]

interface GrantFormProps {
  grant?: Grant | null
  onClose: () => void
  onSuccess: () => void
}

export function GrantForm({ grant, onClose, onSuccess }: GrantFormProps) {
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    title: grant?.title || "",
    description: grant?.description || "",
    category: grant?.category || "",
    amount: grant?.amount || 0,
    deadline: grant?.deadline || "",
    requirements: grant?.requirements || "",
    allow_teams: grant?.allow_teams || false,
    team_size_limit: grant?.team_size_limit || 1,
    image_url: grant?.image_url || "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      if (grant) {
        // Update existing grant
        const { error } = await supabase
          .from("grants")
          .update({
            ...formData,
            updated_at: new Date().toISOString(),
          })
          .eq("id", grant.id)

        if (error) throw error
        toast.success("Grant updated successfully!")
      } else {
        // Create new grant
        const { error } = await supabase.from("grants").insert([
          {
            ...formData,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          },
        ])

        if (error) throw error
        toast.success("Grant created successfully!")
      }

      onSuccess()
    } catch (error) {
      console.error("Error saving grant:", error)
      toast.error("Failed to save grant")
    } finally {
      setLoading(false)
    }
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setLoading(true)
    try {
      const fileExt = file.name.split(".").pop()
      const fileName = `${Math.random()}.${fileExt}`
      const filePath = `grants/${fileName}`

      const { error: uploadError } = await supabase.storage.from("images").upload(filePath, file)

      if (uploadError) throw uploadError

      const {
        data: { publicUrl },
      } = supabase.storage.from("images").getPublicUrl(filePath)

      setFormData((prev) => ({ ...prev, image_url: publicUrl }))
      toast.success("Image uploaded successfully!")
    } catch (error) {
      console.error("Error uploading image:", error)
      toast.error("Failed to upload image")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>{grant ? "Edit Grant" : "Create New Grant"}</CardTitle>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                rows={4}
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Input
                  id="category"
                  value={formData.category}
                  onChange={(e) => setFormData((prev) => ({ ...prev, category: e.target.value }))}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="amount">Amount ($)</Label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    id="amount"
                    type="number"
                    min="0"
                    step="100"
                    value={formData.amount}
                    onChange={(e) => setFormData((prev) => ({ ...prev, amount: Number.parseInt(e.target.value) || 0 }))}
                    className="pl-10"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="deadline">Deadline</Label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  id="deadline"
                  type="datetime-local"
                  value={formData.deadline}
                  onChange={(e) => setFormData((prev) => ({ ...prev, deadline: e.target.value }))}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="requirements">Requirements</Label>
              <Textarea
                id="requirements"
                value={formData.requirements}
                onChange={(e) => setFormData((prev) => ({ ...prev, requirements: e.target.value }))}
                rows={3}
                placeholder="List the requirements for this grant..."
              />
            </div>

            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Switch
                  id="allow_teams"
                  checked={formData.allow_teams}
                  onCheckedChange={(checked) => setFormData((prev) => ({ ...prev, allow_teams: checked }))}
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
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, team_size_limit: Number.parseInt(e.target.value) || 1 }))
                    }
                  />
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="image">Grant Image</Label>
              <div className="flex items-center space-x-4">
                <Input id="image" type="file" accept="image/*" onChange={handleImageUpload} className="flex-1" />
                <Button type="button" variant="outline" size="icon">
                  <Upload className="w-4 h-4" />
                </Button>
              </div>
              {formData.image_url && (
                <div className="mt-2">
                  <img
                    src={formData.image_url || "/placeholder.svg"}
                    alt="Preview"
                    className="w-32 h-20 object-cover rounded"
                  />
                </div>
              )}
            </div>

            <div className="flex justify-end space-x-2 pt-4">
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit" disabled={loading}>
                {loading ? "Saving..." : grant ? "Update Grant" : "Create Grant"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
