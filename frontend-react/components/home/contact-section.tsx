"use client"

import type React from "react"

import { useState, useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"
import { Send } from "lucide-react"

export function ContactSection() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500))

    toast({
      title: "Message sent!",
      description: "We'll get back to you as soon as possible.",
    })

    setIsSubmitting(false)
    ;(e.target as HTMLFormElement).reset()
  }

  return (
    <section className="contact-section py-20 text-gray-800" ref={ref} id="contact">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to transform your data strategy?</h2>
          <p className="text-gray-600">Get in touch with our experts now!</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-3xl mx-auto card-gradient p-8 rounded-lg shadow-lg"
        >
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              type="text"
              placeholder="Full name"
              required
              className="bg-white/80 border-gray-300 text-gray-800 placeholder:text-gray-500"
            />
            <Input
              type="email"
              placeholder="Email Address"
              required
              className="bg-white/80 border-gray-300 text-gray-800 placeholder:text-gray-500"
            />
            <Input
              type="text"
              placeholder="Company"
              className="bg-white/80 border-gray-300 text-gray-800 placeholder:text-gray-500"
            />
            <Input
              type="tel"
              placeholder="Phone Number"
              className="bg-white/80 border-gray-300 text-gray-800 placeholder:text-gray-500"
            />
            <Textarea
              placeholder="How can we help you?"
              className="col-span-1 md:col-span-2 min-h-[150px] bg-white/80 border-gray-300 text-gray-800 placeholder:text-gray-500"
              required
            />
            <div className="col-span-1 md:col-span-2 flex justify-center">
              <Button
                type="submit"
                disabled={isSubmitting}
                className="bg-gradient-to-r from-blue-DEFAULT to-purple-DEFAULT hover:from-blue-dark hover:to-purple-dark text-white px-8 py-6 rounded-md text-lg transition-all duration-300 hover:shadow-lg w-full max-w-xs group"
              >
                {isSubmitting ? (
                  "Sending..."
                ) : (
                  <>
                    Send Message
                    <Send className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                  </>
                )}
              </Button>
            </div>
          </form>
        </motion.div>
      </div>
    </section>
  )
}

