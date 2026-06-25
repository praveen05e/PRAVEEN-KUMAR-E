'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { 
  Globe, 
  BookOpen, 
  FileText, 
  ArrowUpRight 
} from 'lucide-react'

// Perfectly scaled inline SVG icons matching Lucide's stroke profile
const GithubIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
)

const LinkedinIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
)

const XTwitterIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
)

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.06 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: 'easeOut' },
  },
}

export function Footer() {
  const currentYear = new Date().getFullYear()

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Projects', href: '#projects' },
    { name: 'About', href: '#about' },
    { name: 'Contact', href: '#contact' },
  ]

  const resourceLinks = [
   
    { name: 'GitHub Profile', href: 'https://github.com/praveen05e', icon: GithubIcon, isExternal: true },
    { name: 'LinkedIn', href: 'https://www.linkedin.com/in/praveen05e/', icon: LinkedinIcon, isExternal: true },
  ]

  const socialLinks = [
    { icon: GithubIcon, href: 'https://github.com/praveen05e', label: 'GitHub' },
    { icon: LinkedinIcon, href: 'https://www.linkedin.com/in/praveen05e/', label: 'LinkedIn' },
    { icon: XTwitterIcon, href: 'https://x.com/praveen05e', label: 'Twitter' },
   
  ]

  return (
    <footer className="relative border-t border-primary/5 bg-background/95 backdrop-blur-md">
      <div className="container mx-auto px-6 py-14 sm:px-8 lg:px-12 max-w-7xl">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
        >
          {/* Main Layout Grid */}
          <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-4 mb-14">
            
            {/* Brand/Identity Column (Spans 2 blocks on desktop for structural balance) */}
            <motion.div 
              variants={itemVariants} 
              className="flex flex-col items-center text-center sm:items-start sm:text-left md:col-span-2 space-y-4"
            >
              <div className="flex flex-col items-center sm:items-start gap-2">
                <span className="text-xl font-bold tracking-tight text-foreground">
                  Praveen kumar <span className="text-primary font-medium">E</span>
                </span>
                {/* Modern Status Badge */}
                <span className="flex w-fit items-center gap-1.5 rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-[11px] font-medium text-emerald-500 border border-emerald-500/20">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Available for work
                </span>
              </div>
              
              <p className="text-sm leading-relaxed text-muted-foreground max-w-sm">
                Crafting performant, visually stunning, and user-centric digital experiences using engineering excellence and modern web technologies.
              </p>

              {/* Social Icon Rack */}
              <div className="flex items-center gap-2.5 pt-2 justify-center sm:justify-start">
                {socialLinks.map((social, idx) => (
                  <a
                    key={idx}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="p-2 rounded-xl bg-secondary/40 text-muted-foreground hover:text-primary hover:bg-primary/10 hover:scale-105 transition-all duration-200"
                  >
                    <social.icon className="h-4 w-4" />
                  </a>
                ))}
              </div>
            </motion.div>

            {/* Navigation Column */}
            <motion.div 
              variants={itemVariants} 
              className="flex flex-col items-center text-center sm:items-start sm:text-left space-y-4"
            >
              <h4 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground/80">
                Navigation
              </h4>
              <ul className="space-y-3 w-full">
                {navLinks.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors duration-150 block py-0.5"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Resources Column */}
            <motion.div 
              variants={itemVariants} 
              className="flex flex-col items-center text-center sm:items-start sm:text-left space-y-4"
            >
              <h4 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground/80">
                Resources
              </h4>
              <ul className="space-y-3 w-full">
                {resourceLinks.map((item) => {
                  const Icon = item.icon
                  const isExt = item.isExternal
                  const linkClass = "text-sm text-muted-foreground hover:text-primary transition-colors duration-150 flex items-center gap-2.5 group justify-center sm:justify-start py-0.5"
                  
                  return (
                    <li key={item.name}>
                      {isExt ? (
                        <a href={item.href} target="_blank" rel="noopener noreferrer" className={linkClass}>
                          <Icon className="h-4 w-4 stroke-[1.5] text-muted-foreground/70 group-hover:text-primary transition-colors" />
                          <span>{item.name}</span>
                          <ArrowUpRight className="h-3 w-3 opacity-0 -translate-y-0.5 group-hover:opacity-100 transition-all duration-150 text-primary" />
                        </a>
                      ) : (
                        <Link href={item.href} className={linkClass}>
                          <Icon className="h-4 w-4 stroke-[1.5] text-muted-foreground/70 group-hover:text-primary transition-colors" />
                          <span>{item.name}</span>
                        </Link>
                      )}
                    </li>
                  )
                })}
              </ul>
            </motion.div>
          </div>

          {/* Clean Thin Divider */}
          <motion.div variants={itemVariants} className="h-px bg-border/40 mb-8" />

          {/* Bottom Metabar Row */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between items-center"
          >
            <p className="text-xs text-muted-foreground/80 text-center order-2 sm:order-1">
              &copy; {currentYear} Praveen Kumar E. All rights reserved. Designed & developed with engineering excellence.
            </p>
            
            
          </motion.div>
        </motion.div>
      </div>
    </footer>
  )
}