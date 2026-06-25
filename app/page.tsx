import { Navbar } from '@/components/navbar'
import { Hero } from '@/components/hero'
import { About } from '@/components/about'
import { ProjectsDynamic } from '@/components/projects-dynamic'
import { Experience } from '@/components/experience'
import { Skills } from '@/components/skills'
import { Contact } from '@/components/contact'
import { Footer } from '@/components/footer'
import { getSetting } from '@/app/actions/portfolio'

export default async function Page() {
  const heroImage = await getSetting('hero_image')
  const resumeFile = await getSetting('resume_file')

  return (
    <main className="w-full bg-background">
      <Navbar />
      <Hero heroImage={heroImage} resumeFile={resumeFile} />
      <About />
      <ProjectsDynamic />
      <Experience />
      <Skills />
      <Contact />
      <Footer />
    </main>
  )
}
