'use server'

import { db } from '@/lib/db'
import {
  projects,
  experiences,
  skills,
  achievements,
  certificates,
  messages,
  analytics,
  settings,
} from '@/lib/db/schema'
import { eq } from 'drizzle-orm'

// Fetch all projects
export async function getProjects() {
  try {
    const result = await db
      .select()
      .from(projects)
      .orderBy(projects.order)
    return result
  } catch (error) {
    console.error('Error fetching projects:', error)
    return []
  }
}

// Fetch featured projects
export async function getFeaturedProjects() {
  try {
    const result = await db
      .select()
      .from(projects)
      .where(eq(projects.featured, true))
      .orderBy(projects.order)
    return result
  } catch (error) {
    console.error('Error fetching featured projects:', error)
    return []
  }
}

// Fetch all experiences
export async function getExperiences() {
  try {
    const result = await db
      .select()
      .from(experiences)
      .orderBy(experiences.order)
    return result
  } catch (error) {
    console.error('Error fetching experiences:', error)
    return []
  }
}

// Fetch all skills
export async function getSkills() {
  try {
    const result = await db
      .select()
      .from(skills)
      .orderBy(skills.order)
    return result
  } catch (error) {
    console.error('Error fetching skills:', error)
    return []
  }
}

// Get skills grouped by category
export async function getSkillsByCategory() {
  try {
    const allSkills = await getSkills()
    const grouped = allSkills.reduce(
      (acc, skill) => {
        if (!acc[skill.category]) {
          acc[skill.category] = []
        }
        acc[skill.category].push(skill)
        return acc
      },
      {} as Record<string, typeof allSkills>
    )
    return grouped
  } catch (error) {
    console.error('Error grouping skills:', error)
    return {}
  }
}

// Fetch all achievements
export async function getAchievements() {
  try {
    const result = await db
      .select()
      .from(achievements)
      .orderBy(achievements.order)
    return result
  } catch (error) {
    console.error('Error fetching achievements:', error)
    return []
  }
}

// Fetch all certificates
export async function getCertificates() {
  try {
    const result = await db
      .select()
      .from(certificates)
      .orderBy(certificates.order)
    return result
  } catch (error) {
    console.error('Error fetching certificates:', error)
    return []
  }
}

// Submit contact message
export async function submitMessage(data: {
  name: string
  email: string
  subject: string
  message: string
}) {
  try {
    const result = await db.insert(messages).values({
      id: `msg_${Date.now()}`,
      name: data.name,
      email: data.email,
      subject: data.subject,
      message: data.message,
      read: false,
      createdAt: new Date(),
    })
    return { success: true }
  } catch (error) {
    console.error('Error submitting message:', error)
    return { success: false, error: 'Failed to submit message' }
  }
}

// Fetch messages
export async function getMessages() {
  try {
    const result = await db
      .select()
      .from(messages)
      .orderBy(messages.createdAt)
    return result.reverse() // latest first
  } catch (error) {
    console.error('Error fetching messages:', error)
    return []
  }
}

// Track page view
export async function trackPageView(pageView: string) {
  try {
    await db.insert(analytics).values({
      id: `analytics_${Date.now()}`,
      pageView,
      timestamp: new Date(),
      userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : null,
    })
    return { success: true }
  } catch (error) {
    console.error('Error tracking page view:', error)
    return { success: false }
  }
}

// Get a setting by key
export async function getSetting(key: string) {
  try {
    const result = await db
      .select()
      .from(settings)
      .where(eq(settings.key, key))
      .limit(1)
    return result[0]?.value || null
  } catch (error: any) {
    console.error(`Error fetching setting ${key}:`, error?.message, error?.code)
    return null
  }
}

// Update a setting
export async function updateSetting(key: string, value: string) {
  try {
    await db.insert(settings).values({
      id: `set_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      key,
      value,
      updatedAt: new Date()
    }).onConflictDoUpdate({
      target: settings.key,
      set: { value, updatedAt: new Date() }
    })
    return { success: true }
  } catch (error: any) {
    const msg = error?.message || ''
    const cleanMsg = msg.length > 500 ? msg.slice(0, 150) + ' ... ' + msg.slice(-300) : msg
    console.error(`Error updating setting ${key}:`, error?.code, error?.detail, error?.hint, error?.cause, error?.name, cleanMsg)
    return { success: false, error: error?.code ? `DB Error: ${error.code} ${error.detail || ''} ${cleanMsg}` : `Failed to update setting: ${cleanMsg}` }
  }
}
