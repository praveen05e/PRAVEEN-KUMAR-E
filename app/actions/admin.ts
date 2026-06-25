'use server'

import { db } from '@/lib/db'
import { auth } from '@/lib/auth'
import {
  projects,
  experiences,
  skills,
  achievements,
  certificates,
  messages,
} from '@/lib/db/schema'
import { eq, desc } from 'drizzle-orm'
import { headers } from 'next/headers'

// Auth check helper
async function checkAuth() {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session?.user) throw new Error('Unauthorized')
  return session.user
}

// ============ PROJECTS ============

export async function createProject(data: {
  title: string
  description: string
  image: string
  technologies: string[]
  githubUrl?: string
  liveUrl?: string
  featured?: boolean
}) {
  await checkAuth()
  try {
    const result = await db.insert(projects).values({
      id: `proj_${Date.now()}`,
      title: data.title,
      description: data.description,
      image: data.image,
      technologies: JSON.stringify(data.technologies),
      githubUrl: data.githubUrl,
      liveUrl: data.liveUrl,
      featured: data.featured || false,
      order: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    })
    return { success: true }
  } catch (error) {
    console.error('Error creating project:', error)
    throw error
  }
}

export async function updateProject(
  id: string,
  data: Partial<typeof projects.$inferInsert>
) {
  await checkAuth()
  try {
    await db.update(projects).set({ ...data, updatedAt: new Date() }).where(eq(projects.id, id))
    return { success: true }
  } catch (error) {
    console.error('Error updating project:', error)
    throw error
  }
}

export async function deleteProject(id: string) {
  await checkAuth()
  try {
    await db.delete(projects).where(eq(projects.id, id))
    return { success: true }
  } catch (error) {
    console.error('Error deleting project:', error)
    throw error
  }
}

// ============ EXPERIENCES ============

export async function createExperience(data: {
  company: string
  position: string
  description: string
  duration: string
  startDate: Date
  endDate?: Date
  location?: string
}) {
  await checkAuth()
  try {
    await db.insert(experiences).values({
      id: `exp_${Date.now()}`,
      company: data.company,
      position: data.position,
      description: data.description,
      duration: data.duration,
      startDate: data.startDate,
      endDate: data.endDate,
      location: data.location,
      order: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    })
    return { success: true }
  } catch (error) {
    console.error('Error creating experience:', error)
    throw error
  }
}

export async function updateExperience(
  id: string,
  data: Partial<typeof experiences.$inferInsert>
) {
  await checkAuth()
  try {
    await db
      .update(experiences)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(experiences.id, id))
    return { success: true }
  } catch (error) {
    console.error('Error updating experience:', error)
    throw error
  }
}

export async function deleteExperience(id: string) {
  await checkAuth()
  try {
    await db.delete(experiences).where(eq(experiences.id, id))
    return { success: true }
  } catch (error) {
    console.error('Error deleting experience:', error)
    throw error
  }
}

// ============ SKILLS ============

export async function createSkill(data: {
  name: string
  category: string
  proficiency?: number
}) {
  await checkAuth()
  try {
    await db.insert(skills).values({
      id: `skill_${Date.now()}`,
      name: data.name,
      category: data.category,
      proficiency: data.proficiency || 80,
      order: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    })
    return { success: true }
  } catch (error) {
    console.error('Error creating skill:', error)
    throw error
  }
}

export async function updateSkill(
  id: string,
  data: Partial<typeof skills.$inferInsert>
) {
  await checkAuth()
  try {
    await db.update(skills).set({ ...data, updatedAt: new Date() }).where(eq(skills.id, id))
    return { success: true }
  } catch (error) {
    console.error('Error updating skill:', error)
    throw error
  }
}

export async function deleteSkill(id: string) {
  await checkAuth()
  try {
    await db.delete(skills).where(eq(skills.id, id))
    return { success: true }
  } catch (error) {
    console.error('Error deleting skill:', error)
    throw error
  }
}

// ============ MESSAGES ============

export async function getMessages() {
  await checkAuth()
  try {
    const result = await db.select().from(messages).orderBy(desc(messages.createdAt))
    return result
  } catch (error) {
    console.error('Error fetching messages:', error)
    return []
  }
}

export async function markMessageAsRead(id: string) {
  await checkAuth()
  try {
    await db.update(messages).set({ read: true }).where(eq(messages.id, id))
    return { success: true }
  } catch (error) {
    console.error('Error marking message as read:', error)
    throw error
  }
}

export async function deleteMessage(id: string) {
  await checkAuth()
  try {
    await db.delete(messages).where(eq(messages.id, id))
    return { success: true }
  } catch (error) {
    console.error('Error deleting message:', error)
    throw error
  }
}
