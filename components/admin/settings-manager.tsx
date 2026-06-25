'use client'

import { useState, useEffect } from 'react'
import { getSetting, updateSetting } from '@/app/actions/portfolio'
import { changePassword } from '@/lib/auth-client'

export function SettingsManager() {
  const [heroImage, setHeroImage] = useState('')
  const [resumeFile, setResumeFile] = useState('')
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')

  // Password state
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [passLoading, setPassLoading] = useState(false)
  const [passMessage, setPassMessage] = useState('')

  useEffect(() => {
    async function loadSettings() {
      const img = await getSetting('hero_image')
      if (img) setHeroImage(img)
      const res = await getSetting('resume_file')
      if (res) setResumeFile(res)
      setLoading(false)
    }
    loadSettings()
  }, [])

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => setHeroImage(reader.result as string)
      reader.readAsDataURL(file)
    }
  }

  const handleResumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => setResumeFile(reader.result as string)
      reader.readAsDataURL(file)
    }
  }

  const handleSave = async () => {
    setSaving(true)
    setMessage('')
    
    try {
      const res1 = await updateSetting('hero_image', heroImage)
      const res2 = await updateSetting('resume_file', resumeFile)

      if (res1.success && res2.success) {
        setMessage('Settings saved successfully!')
      } else {
        setMessage(res2.error || res1.error || 'Failed to save some settings.')
      }
    } catch (err: any) {
      console.error('Error saving settings:', err)
      setMessage(err?.message || 'Failed to save settings. Payload may be too large.')
    }
    setSaving(false)
  }

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault()
    setPassMessage('')
    
    if (newPassword !== confirmPassword) {
      setPassMessage('New passwords do not match.')
      return
    }

    setPassLoading(true)
    const { data, error } = await changePassword({
      newPassword,
      currentPassword,
      revokeOtherSessions: true
    })

    if (error) {
      setPassMessage(error.message || 'Failed to change password.')
    } else {
      setPassMessage('Password changed successfully!')
      setCurrentPassword('')
      setNewPassword('')
      setConfirmPassword('')
    }
    setPassLoading(false)
  }

  if (loading) {
    return <div className="text-muted-foreground">Loading settings...</div>
  }

  return (
    <div className="space-y-8">
      {/* Website Settings */}
      <div className="space-y-6">
        <h3 className="text-xl font-bold text-foreground">Website Settings</h3>
        
        <div className="rounded-lg border border-primary/20 bg-card/50 backdrop-blur-sm p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Hero Section Image
            </label>
            <div className="flex flex-col gap-4">
              {heroImage && (
                <img 
                  src={heroImage} 
                  alt="Hero preview" 
                  className="w-48 h-48 object-cover rounded-lg border-2 border-primary/20" 
                />
              )}
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="w-full max-w-md px-4 py-2 rounded-lg bg-background border border-primary/20 text-foreground"
              />
              <p className="text-xs text-muted-foreground">
                Select an image to display in the main Hero section on your homepage.
              </p>
            </div>
          </div>

          <div className="pt-4 border-t border-primary/10">
            <label className="block text-sm font-medium text-foreground mb-2">
              Resume PDF
            </label>
            <div className="flex flex-col gap-4">
              {resumeFile && (
                <div className="px-4 py-2 bg-primary/10 text-primary rounded-lg border border-primary/20 inline-block w-fit">
                  ✓ Resume uploaded
                </div>
              )}
              <input
                type="file"
                accept="application/pdf"
                onChange={handleResumeChange}
                className="w-full max-w-md px-4 py-2 rounded-lg bg-background border border-primary/20 text-foreground"
              />
              <p className="text-xs text-muted-foreground">
                Upload your latest resume PDF here. The download button will automatically use this file.
              </p>
            </div>
          </div>

          <button 
            onClick={handleSave} 
            disabled={saving}
            className="px-6 py-2 rounded-lg bg-primary text-primary-foreground font-medium hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            {saving ? 'Saving...' : 'Save Settings'}
          </button>

          {message && (
            <p className={`text-sm ${message.includes('success') ? 'text-green-500' : 'text-red-500'}`}>
              {message}
            </p>
          )}
        </div>
      </div>

      {/* Admin Account Settings */}
      <div className="space-y-6">
        <h3 className="text-xl font-bold text-foreground">Account Security</h3>
        
        <form onSubmit={handlePasswordChange} className="rounded-lg border border-primary/20 bg-card/50 backdrop-blur-sm p-6 space-y-4 max-w-md">
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">Current Password</label>
            <input
              type="password"
              required
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-background border border-primary/20 text-foreground"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">New Password</label>
            <input
              type="password"
              required
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-background border border-primary/20 text-foreground"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">Confirm New Password</label>
            <input
              type="password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-background border border-primary/20 text-foreground"
            />
          </div>
          
          <button 
            type="submit" 
            disabled={passLoading}
            className="w-full px-6 py-2 rounded-lg bg-primary text-primary-foreground font-medium hover:opacity-90 transition-opacity disabled:opacity-50 mt-2"
          >
            {passLoading ? 'Updating...' : 'Change Password'}
          </button>

          {passMessage && (
            <p className={`text-sm text-center ${passMessage.includes('success') ? 'text-green-500' : 'text-red-500'}`}>
              {passMessage}
            </p>
          )}
        </form>
      </div>
    </div>
  )
}
