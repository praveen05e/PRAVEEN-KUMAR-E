'use server'

import { db } from '@/lib/db'
import { projects } from '@/lib/db/schema'
import { eq } from 'drizzle-orm'
import { revalidatePath } from 'next/cache'

export async function addProject(data: {
  title: string
  description: string
  image: string
  technologies: string
  githubUrl?: string
  liveUrl?: string
  featured?: boolean
  order?: number
}) {
  try {
    await db.insert(projects).values({
      id: `proj_${Date.now()}`,
      title: data.title,
      description: data.description,
      image: data.image,
      technologies: data.technologies, // Store as JSON string or comma-separated
      githubUrl: data.githubUrl || null,
      liveUrl: data.liveUrl || null,
      featured: data.featured || false,
      order: data.order || 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    })
    
    revalidatePath('/')
    revalidatePath('/admin/dashboard/projects')
    return { success: true }
  } catch (error) {
    console.error('Error adding project:', error)
    return { success: false, error: 'Failed to add project' }
  }
}

export async function deleteProject(id: string) {
  try {
    await db.delete(projects).where(eq(projects.id, id))
    revalidatePath('/')
    revalidatePath('/admin/dashboard/projects')
    return { success: true }
  } catch (error) {
    console.error('Error deleting project:', error)
    return { success: false, error: 'Failed to delete project' }
  }
}

export async function updateProject(id: string, data: Partial<{
  title: string
  description: string
  image: string
  technologies: string
  githubUrl: string
  liveUrl: string
  featured: boolean
  order: number
}>) {
  try {
    await db.update(projects)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(projects.id, id))
      
    revalidatePath('/')
    revalidatePath('/admin/dashboard/projects')
    return { success: true }
  } catch (error) {
    console.error('Error updating project:', error)
    return { success: false, error: 'Failed to update project' }
  }
}
