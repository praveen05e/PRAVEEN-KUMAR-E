'use client'

import { useState, useEffect } from 'react'
import { getProjects } from '@/app/actions/portfolio'
import { addProject, deleteProject, updateProject } from '@/app/actions/projects'
import { Trash2, Edit2, Plus, X } from 'lucide-react'

type Project = {
  id: string
  title: string
  description: string
  image: string
  technologies: string
  githubUrl: string | null
  liveUrl: string | null
}

export function ProjectsManager() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    title: '', description: '', image: '', technologies: '', githubUrl: '', liveUrl: ''
  })

  useEffect(() => {
    fetchProjects()
  }, [])

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, image: reader.result as string }))
      }
      reader.readAsDataURL(file)
    }
  }

  const fetchProjects = async () => {
    setLoading(true)
    const data = await getProjects()
    // @ts-ignore
    setProjects(data || [])
    setLoading(false)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    if (editingId) {
      await updateProject(editingId, formData)
    } else {
      await addProject(formData)
    }
    setFormData({ title: '', description: '', image: '', technologies: '', githubUrl: '', liveUrl: '' })
    setEditingId(null)
    setShowForm(false)
    await fetchProjects()
  }

  const handleEdit = (project: Project) => {
    setFormData({
      title: project.title,
      description: project.description,
      image: project.image,
      technologies: project.technologies,
      githubUrl: project.githubUrl || '',
      liveUrl: project.liveUrl || ''
    })
    setEditingId(project.id)
    setShowForm(true)
  }

  const handleCancel = () => {
    setFormData({ title: '', description: '', image: '', technologies: '', githubUrl: '', liveUrl: '' })
    setEditingId(null)
    setShowForm(false)
  }

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this project?')) {
      setLoading(true)
      await deleteProject(id)
      await fetchProjects()
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-bold text-foreground">Manage Projects</h3>
        <button 
          onClick={() => showForm ? handleCancel() : setShowForm(true)}
          className="px-4 py-2 rounded-lg bg-primary text-primary-foreground font-medium hover:opacity-90 transition-opacity flex items-center gap-2"
        >
          {showForm ? <X className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
          {showForm ? 'Cancel' : 'Add Project'}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="rounded-lg border border-primary/20 bg-card/50 backdrop-blur-sm p-6 space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Title</label>
              <input required value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full px-4 py-2 rounded-lg bg-background border border-primary/20" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Project Image</label>
              <input type="file" accept="image/*" onChange={handleImageChange} className="w-full px-4 py-2 rounded-lg bg-background border border-primary/20" />
              {formData.image && <img src={formData.image} alt="Preview" className="mt-2 h-20 w-20 object-cover rounded" />}
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-1">Description</label>
              <textarea required value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full px-4 py-2 rounded-lg bg-background border border-primary/20" rows={3}></textarea>
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-1">Technologies (comma separated)</label>
              <input required value={formData.technologies} onChange={e => setFormData({...formData, technologies: e.target.value})} placeholder="React, Node.js, PHP" className="w-full px-4 py-2 rounded-lg bg-background border border-primary/20" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">GitHub URL</label>
              <input value={formData.githubUrl} onChange={e => setFormData({...formData, githubUrl: e.target.value})} className="w-full px-4 py-2 rounded-lg bg-background border border-primary/20" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Live URL</label>
              <input value={formData.liveUrl} onChange={e => setFormData({...formData, liveUrl: e.target.value})} className="w-full px-4 py-2 rounded-lg bg-background border border-primary/20" />
            </div>
          </div>
          <div className="flex justify-end">
            <button type="submit" disabled={loading} className="px-6 py-2 rounded-lg bg-primary text-primary-foreground font-medium hover:opacity-90">
              {loading ? 'Saving...' : (editingId ? 'Update Project' : 'Save Project')}
            </button>
          </div>
        </form>
      )}

      {loading && !showForm ? (
        <div className="text-center py-10">Loading projects...</div>
      ) : projects.length === 0 ? (
        <div className="rounded-lg border border-primary/20 bg-card/50 backdrop-blur-sm p-6 text-center text-muted-foreground">
          <p>No projects found. Create your first one!</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {projects.map((project) => (
            <div key={project.id} className="flex justify-between items-center rounded-lg border border-primary/20 bg-card/50 p-4">
              <div className="flex items-center gap-4">
                <img src={project.image} alt={project.title} className="w-16 h-16 rounded object-cover" />
                <div>
                  <h4 className="font-bold">{project.title}</h4>
                  <p className="text-sm text-muted-foreground">{project.technologies}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <button onClick={() => handleEdit(project)} className="p-2 text-primary hover:bg-primary/10 rounded-lg">
                  <Edit2 className="w-5 h-5" />
                </button>
                <button onClick={() => handleDelete(project.id)} className="p-2 text-red-500 hover:bg-red-500/10 rounded-lg">
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
