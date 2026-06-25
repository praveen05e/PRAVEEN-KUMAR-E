'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, Download, Mail, Code2, Share2, Sparkles } from 'lucide-react'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] },
  },
}

const floatingVariants = {
  animate: {
    y: [0, -15, 0],
    transition: {
      duration: 5,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
}

interface HeroProps {
  heroImage?: string | null
  resumeFile?: string | null
}

export function Hero({ heroImage, resumeFile }: HeroProps) {
  return (
    <section className="relative min-h-[100svh] flex items-center overflow-hidden bg-background pt-24 pb-20">
      {/* Animated background ambient lighting */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute -top-1/4 -left-1/4 h-[600px] w-[600px] rounded-full bg-primary/10 blur-[120px]"
          animate={{ x: [0, 30, 0], y: [0, 40, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute top-1/4 -right-1/4 h-[600px] w-[600px] rounded-full bg-accent/10 blur-[120px]"
          animate={{ x: [0, -30, 0], y: [0, -40, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        />
      </div>

      <motion.div
        className="container mx-auto px-6 sm:px-8 lg:px-12 max-w-7xl relative z-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="grid gap-12 lg:gap-16 lg:grid-cols-12 items-center">
          
          {/* Top/Left Content - Profile Picture Component */}
          <motion.div 
            variants={itemVariants} 
            className="lg:col-span-5 flex items-center justify-center relative"
          >
            <motion.div
              animate="animate"
              variants={floatingVariants}
              className="relative w-full max-w-[420px] aspect-square flex items-center justify-center"
            >
              {/* Outer Decorative Rings */}
              <div className="absolute inset-0 rounded-full border border-primary/20 bg-primary/5 backdrop-blur-3xl scale-105" />
              <div className="absolute inset-4 rounded-full border border-primary/30 border-dashed animate-[spin_60s_linear_infinite]" />
              
              {/* Main Image Container */}
              <div className="relative w-64 h-64 sm:w-80 sm:h-80 xl:w-96 xl:h-96 rounded-full border-4 border-background overflow-hidden shadow-2xl shadow-primary/20 z-10">
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent mix-blend-overlay z-10 pointer-events-none" />
                <img 
                  src={heroImage || "/profile-placeholder.jpg"} 
                  alt="Praveen Kumar" 
                  className="w-full h-full object-cover scale-105 hover:scale-100 transition-transform duration-700 ease-out" 
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = "https://ui-avatars.com/api/?name=Praveen+Kumar&size=512&background=0D0D0D&color=fff";
                  }}
                />
              </div>

              {/* Floating Tech/Status Badge - Moved to the right side */}
              <div className="absolute bottom-0 sm:bottom-10 right-0 sm:-right-6 z-20 px-4 py-3 rounded-2xl bg-background/80 backdrop-blur-md border border-border/50 shadow-xl flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <Sparkles className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs font-bold text-foreground">AI & Data Science</p>
                  <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Full-Stack Focus</p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Bottom/Right Content - Text & CTAs */}
          <div className="lg:col-span-7 space-y-8 text-center lg:text-left">
            {/* Status Badge */}
            <motion.div variants={itemVariants} className="inline-flex justify-center lg:justify-start w-full lg:w-auto">
              <div className="inline-flex items-center gap-2.5 rounded-full bg-card/40 backdrop-blur-sm px-4 py-2 border border-border/50 shadow-sm">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                </span>
                <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Open For Work
                </span>
              </div>
            </motion.div>

            {/* Main Headline */}
            <motion.div variants={itemVariants} className="space-y-5">
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-foreground leading-[1.1]">
                AI Automation &<br className="hidden sm:block" />
                <span className="bg-gradient-to-r from-primary via-primary/80 to-accent bg-clip-text text-transparent">
                Product Developer
                </span>
              </h1>
              <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                I am an AI & Data Science engineer and freelance full-stack developer. I transform complex datasets and business logic into high-performance, scalable web products.
              </p>
            </motion.div>

            {/* CTAs */}
            <motion.div variants={itemVariants} className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
              <Link
                href="#projects"
                className="group relative inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-primary text-primary-foreground font-semibold text-sm transition-all hover:shadow-lg hover:shadow-primary/25 hover:-translate-y-0.5"
              >
                <span>Explore My Work</span>
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              
              <Link
                href={resumeFile || "/resume.pdf"}
                download="Praveen_Kumar_Resume.pdf"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl border border-border bg-card/30 backdrop-blur-sm text-foreground font-semibold text-sm transition-all hover:bg-muted/50 hover:border-primary/30"
              >
                <Download className="h-4 w-4 text-muted-foreground" />
                <span>Download CV</span>
              </Link>
            </motion.div>

            {/* Social Links */}
            <motion.div variants={itemVariants} className="flex items-center justify-center lg:justify-start gap-5 pt-6 border-t border-border/40 max-w-md mx-auto lg:mx-0">
              <span className="text-sm font-medium text-muted-foreground">Connect:</span>
              <div className="flex gap-3">
                {[
                  { icon: Code2, href: 'https://github.com/praveen05e', label: 'GitHub' },
                  { icon: Share2, href: 'https://www.linkedin.com/in/praveen05e/', label: 'LinkedIn' },
                  { icon: Mail, href: 'mailto:praveenkumar.work.praveen700c@gmail.com', label: 'Email' },
                ].map((social, idx) => {
                  const Icon = social.icon
                  return (
                    <a
                      key={idx}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.label}
                      className="p-2.5 rounded-lg border border-border/50 bg-card/30 text-muted-foreground hover:text-primary hover:border-primary/40 hover:bg-primary/5 transition-all"
                    >
                      <Icon className="h-4 w-4" />
                    </a>
                  )
                })}
              </div>
            </motion.div>
          </div>

        </div>

        {/* Scroll Indicator */}
        <motion.div
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 hidden sm:flex"
        >
          <div className="h-7 w-4 border-2 border-muted-foreground/30 rounded-full flex justify-center p-1">
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
              className="h-1.5 w-1.5 rounded-full bg-muted-foreground/60"
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}