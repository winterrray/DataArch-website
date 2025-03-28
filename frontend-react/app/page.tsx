"use client"

import { useEffect, Suspense } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Toaster } from "@/components/ui/toaster"
import dynamic from "next/dynamic"

// Import the hero section directly since it's the first thing users see
import { HeroSection } from "@/components/home/hero-section"

// Dynamically import other sections to improve initial load time
const StatsSection = dynamic(
  () => import("@/components/home/stats-section").then((mod) => ({ default: mod.StatsSection })),
  {
    ssr: false,
    loading: () => (
      <div className="h-40 flex items-center justify-center">
        <div className="animate-pulse h-6 w-32 bg-gray-200 rounded"></div>
      </div>
    ),
  },
)

const ClientMarquee = dynamic(
  () => import("@/components/home/client-marquee").then((mod) => ({ default: mod.ClientMarquee })),
  {
    ssr: false,
    loading: () => <div className="h-40"></div>,
  },
)

const ServicesSection = dynamic(
  () => import("@/components/home/services-section").then((mod) => ({ default: mod.ServicesSection })),
  {
    ssr: false,
    loading: () => <div className="h-40"></div>,
  },
)

const ProcessSection = dynamic(
  () => import("@/components/home/process-section").then((mod) => ({ default: mod.ProcessSection })),
  {
    ssr: false,
    loading: () => <div className="h-40"></div>,
  },
)

const TestimonialsSection = dynamic(
  () => import("@/components/home/testimonials-section").then((mod) => ({ default: mod.TestimonialsSection })),
  {
    ssr: false,
    loading: () => <div className="h-40"></div>,
  },
)

const FAQSection = dynamic(() => import("@/components/home/faq-section").then((mod) => ({ default: mod.FAQSection })), {
  ssr: false,
  loading: () => <div className="h-40"></div>,
})

const ContactSection = dynamic(
  () => import("@/components/home/contact-section").then((mod) => ({ default: mod.ContactSection })),
  {
    ssr: false,
    loading: () => <div className="h-40"></div>,
  },
)

export default function Home() {
  useEffect(() => {
    // Add smooth scroll behavior
    document.documentElement.style.scrollBehavior = "smooth"

    // Intersection Observer for animation on scroll
    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.1,
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-fade-in")
          observer.unobserve(entry.target)
        }
      })
    }, observerOptions)

    // Only observe sections after initial load
    setTimeout(() => {
      document.querySelectorAll("section").forEach((section) => {
        observer.observe(section)
      })
    }, 1000)

    return () => {
      document.documentElement.style.scrollBehavior = "auto"
      observer.disconnect()
    }
  }, [])

  return (
    <main className="min-h-screen">
      <Navbar />
      <HeroSection />

      <Suspense fallback={<div className="h-40"></div>}>
        <StatsSection />
      </Suspense>

      <Suspense fallback={<div className="h-40"></div>}>
        <ServicesSection />
      </Suspense>

      <Suspense fallback={<div className="h-40"></div>}>
        <ClientMarquee />
      </Suspense>

      <Suspense fallback={<div className="h-40"></div>}>
        <ProcessSection />
      </Suspense>

      <Suspense fallback={<div className="h-40"></div>}>
        <TestimonialsSection />
      </Suspense>

      <Suspense fallback={<div className="h-40"></div>}>
        <FAQSection />
      </Suspense>

      <Suspense fallback={<div className="h-40"></div>}>
        <ContactSection />
      </Suspense>

      <Footer />
      <Toaster />
    </main>
  )
}

