"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import Image from "next/image"
import Link from "next/link"
import { Search, Calendar, User, Tag, ArrowRight } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

const blogPosts = [
  {
    id: 1,
    title: "The Future of Data Lakes in the AI Era",
    excerpt:
      "Explore how modern data lakes are evolving to support advanced AI and machine learning workloads, and what this means for your organization.",
    image: "/placeholder.svg?height=400&width=600",
    date: "May 15, 2023",
    author: "Alex Johnson",
    category: "Data Architecture",
    tags: ["AI", "Data Lakes", "Machine Learning"],
  },
  {
    id: 2,
    title: "5 Best Practices for Cloud Data Migration",
    excerpt:
      "Learn the key strategies for a successful cloud data migration that minimizes disruption and maximizes value.",
    image: "/placeholder.svg?height=400&width=600",
    date: "April 22, 2023",
    author: "Samantha Chen",
    category: "Cloud",
    tags: ["Cloud Migration", "Best Practices", "Data Strategy"],
  },
  {
    id: 3,
    title: "Real-time Analytics: Architectures that Scale",
    excerpt:
      "Discover the architectural patterns that enable real-time analytics at scale, from stream processing to in-memory computing.",
    image: "/placeholder.svg?height=400&width=600",
    date: "March 10, 2023",
    author: "Michael Rodriguez",
    category: "Analytics",
    tags: ["Real-time", "Scalability", "Architecture"],
  },
  {
    id: 4,
    title: "Data Governance in the Age of AI",
    excerpt:
      "How to maintain data quality, privacy, and compliance while leveraging AI and machine learning technologies.",
    image: "/placeholder.svg?height=400&width=600",
    date: "February 28, 2023",
    author: "Emily Williams",
    category: "Governance",
    tags: ["Compliance", "AI Ethics", "Data Quality"],
  },
  {
    id: 5,
    title: "The Rise of Data Mesh Architecture",
    excerpt:
      "Exploring the data mesh paradigm and how it's changing the way organizations think about data ownership and access.",
    image: "/placeholder.svg?height=400&width=600",
    date: "January 15, 2023",
    author: "Alex Johnson",
    category: "Data Architecture",
    tags: ["Data Mesh", "Domain-Driven Design", "Data Strategy"],
  },
  {
    id: 6,
    title: "Building a Modern Data Platform: Key Components",
    excerpt:
      "A comprehensive guide to the essential components of a modern, cloud-native data platform that drives business value.",
    image: "/placeholder.svg?height=400&width=600",
    date: "December 5, 2022",
    author: "Samantha Chen",
    category: "Data Platforms",
    tags: ["Cloud-Native", "Architecture", "Best Practices"],
  },
]

const categories = ["All", "Data Architecture", "Cloud", "Analytics", "Governance", "Data Platforms"]

export default function BlogsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")

  const filteredPosts = blogPosts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "All" || post.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <main className="min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-16 text-center">
        <div className="container mx-auto px-4">
          <motion.h1
            className="text-4xl md:text-5xl font-bold mb-6"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            DataArch <span className="gradient-text">Blog</span>
          </motion.h1>
          <motion.p
            className="text-lg text-gray-700 max-w-2xl mx-auto mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Insights, best practices, and expert perspectives on data architecture, cloud transformation, and analytics.
          </motion.p>

          <motion.div
            className="max-w-md mx-auto relative"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              type="text"
              placeholder="Search articles..."
              className="pl-10 py-6 rounded-full border-gray-300"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </motion.div>

          <motion.div
            className="flex flex-wrap justify-center gap-2 mt-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {categories.map((category, index) => (
              <Button
                key={index}
                variant={selectedCategory === category ? "default" : "outline"}
                className={`rounded-full px-4 py-2 ${
                  selectedCategory === category
                    ? "bg-gradient-to-r from-blue-DEFAULT to-purple-DEFAULT text-white"
                    : "border-gray-300 text-gray-700"
                }`}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Blog Posts */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.length > 0 ? (
              filteredPosts.map((post, index) => (
                <motion.article
                  key={post.id}
                  className="card-gradient rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className="relative overflow-hidden">
                    <Image
                      src={post.image || "/placeholder.svg"}
                      alt={post.title}
                      width={600}
                      height={400}
                      className="w-full h-48 object-cover transition-transform duration-500 hover:scale-105"
                    />
                    <div className="absolute top-4 right-4 bg-white/90 text-purple-DEFAULT px-3 py-1 rounded-full text-sm font-medium">
                      {post.category}
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center text-sm text-gray-500 mb-3">
                      <Calendar className="h-4 w-4 mr-1" />
                      <span className="mr-4">{post.date}</span>
                      <User className="h-4 w-4 mr-1" />
                      <span>{post.author}</span>
                    </div>
                    <h3 className="text-xl font-bold mb-3 hover:text-purple-DEFAULT transition-colors">
                      <Link href={`/blogs/${post.id}`}>{post.title}</Link>
                    </h3>
                    <p className="text-gray-700 mb-4">{post.excerpt}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {post.tags.map((tag, i) => (
                        <div
                          key={i}
                          className="flex items-center text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full"
                        >
                          <Tag className="h-3 w-3 mr-1" />
                          {tag}
                        </div>
                      ))}
                    </div>
                    <Link
                      href={`/blogs/${post.id}`}
                      className="inline-flex items-center text-purple-DEFAULT hover:text-purple-dark font-medium"
                    >
                      Read More <ArrowRight className="ml-1 h-4 w-4" />
                    </Link>
                  </div>
                </motion.article>
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <p className="text-lg text-gray-600">No articles found matching your search criteria.</p>
                <Button
                  className="mt-4"
                  onClick={() => {
                    setSearchTerm("")
                    setSelectedCategory("All")
                  }}
                >
                  Reset Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 bg-white/80">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="card-gradient p-8 rounded-lg shadow-lg"
            >
              <h2 className="text-2xl md:text-3xl font-bold mb-4">Subscribe to Our Newsletter</h2>
              <p className="text-gray-700 mb-6">
                Stay updated with the latest insights, trends, and best practices in data architecture and analytics.
              </p>
              <div className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
                <Input type="email" placeholder="Your email address" className="flex-1" />
                <Button className="bg-gradient-to-r from-blue-DEFAULT to-purple-DEFAULT text-white">Subscribe</Button>
              </div>
              <p className="text-xs text-gray-500 mt-4">We respect your privacy. Unsubscribe at any time.</p>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}

