'use client'

import { motion } from 'framer-motion'
import { ContactForm } from './contact-form'

// Custom SVGs matching Lucide's aesthetic perfectly
const ArrowIcon = () => (
  <svg className="h-4 w-4 ml-1 transform group-hover:translate-x-1 transition-transform duration-200" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12"></line>
    <polyline points="12 5 19 12 12 19"></polyline>
  </svg>
)

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
}

export function Contact() {
  return (
    <section id="contact" className="relative py-24 sm:py-32 overflow-hidden border-t border-border/20 bg-background">
      {/* Decorative Professional Radial Glow */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_bottom_left,rgba(var(--primary-rgb),0.03),transparent_45%)]" />
      <div className="absolute top-12 right-0 w-[400px] h-[400px] bg-primary/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-6 sm:px-8 lg:px-12 max-w-7xl relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start"
        >
          {/* Left Block: Sleek Context & Dynamic Callouts */}
          <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-32 text-center sm:text-left">
            <div className="inline-flex w-fit items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary border border-primary/20">
              <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
              Contact
            </div>
            
            <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-foreground leading-[1.1]">
              Let&apos;s build something exceptional.
            </h2>
            
            <p className="text-base sm:text-lg leading-relaxed text-muted-foreground/90 max-w-md mx-auto sm:mx-0">
              Have an impending software build, dynamic product strategy, or general contract consultation? Fill out the details here, or reach out to me directly.
            </p>

            <div className="pt-4 block">
              <a 
                href="mailto:praveenkumar.work.contact@gmail.com"
                className="inline-flex items-center group text-sm font-semibold text-primary hover:opacity-85 transition-opacity"
              >
                <span>Direct email channel</span>
                <ArrowIcon />
              </a>
            </div>
          </div>

          {/* Right Block: Pure Form Component Container */}
          <motion.div 
            variants={itemVariants} 
            className="lg:col-span-7 w-full max-w-xl mx-auto lg:max-w-none"
          >
            <ContactForm />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}