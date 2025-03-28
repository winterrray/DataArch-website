"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { JobCard, type JobPosition } from "@/components/careers/job-card"
import { JobFilter } from "@/components/careers/job-filter"

// Sample job data - in a real app, this would come from an API
const jobListings: JobPosition[] = [
  {
    id: "data-engineer",
    title: "Senior Data Engineer",
    location: "Remote",
    department: "Engineering",
    type: "Full-time",
    postedAt: "2 days ago",
    description:
      "We're looking for a Senior Data Engineer to design and implement data pipelines, optimize data storage solutions, and ensure data quality and accessibility across the organization.",
  },
  {
    id: "data-scientist",
    title: "Data Scientist",
    location: "New York, USA",
    department: "Data Science",
    type: "Full-time",
    postedAt: "1 week ago",
    description:
      "Join our data science team to develop machine learning models, analyze complex datasets, and deliver actionable insights that drive business decisions.",
  },
  {
    id: "cloud-architect",
    title: "Cloud Solutions Architect",
    location: "London, UK",
    department: "Engineering",
    type: "Full-time",
    postedAt: "3 days ago",
    description:
      "Design and implement cloud-based data architectures, optimize cloud resources, and lead migration projects for our enterprise clients.",
  },
  {
    id: "data-analyst",
    title: "Data Analyst",
    location: "Berlin, Germany",
    department: "Analytics",
    type: "Full-time",
    postedAt: "2 weeks ago",
    description:
      "Analyze data to identify trends, create reports and dashboards, and provide insights to support business decision-making.",
  },
  {
    id: "product-manager",
    title: "Product Manager - Data Solutions",
    location: "San Francisco, USA",
    department: "Product",
    type: "Full-time",
    postedAt: "5 days ago",
    description:
      "Lead the development of our data products, work with cross-functional teams, and ensure our solutions meet customer needs and market demands.",
  },
  {
    id: "sales-executive",
    title: "Sales Executive - Enterprise",
    location: "Mumbai, India",
    department: "Sales",
    type: "Full-time",
    postedAt: "1 month ago",
    description:
      "Drive sales of our data solutions to enterprise clients, build relationships with key stakeholders, and exceed revenue targets.",
  },
  {
    id: "marketing-specialist",
    title: "Marketing Specialist - Tech",
    location: "Remote",
    department: "Marketing",
    type: "Part-time",
    postedAt: "3 weeks ago",
    description:
      "Create compelling content, manage digital marketing campaigns, and help position DataArch as a leader in the data solutions market.",
  },
  {
    id: "ux-designer",
    title: "UX Designer - Data Visualization",
    location: "Toronto, Canada",
    department: "Design",
    type: "Contract",
    postedAt: "4 days ago",
    description:
      "Design intuitive interfaces for data visualization tools, conduct user research, and create prototypes that enhance the user experience.",
  },
]

export default function CareersPage() {
  const [filteredJobs, setFilteredJobs] = useState<JobPosition[]>(jobListings)

  return (
    <main className="min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-purple-light/20 to-blue-light/20">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center max-w-3xl mx-auto"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Join Our <span className="gradient-text">Team</span>
            </h1>
            <p className="text-lg text-gray-700 mb-8">
              Find your next career opportunity at DataArch and help us transform how businesses leverage their data
            </p>
          </motion.div>
        </div>
      </section>

      {/* Job Listings Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <JobFilter jobs={jobListings} onFilter={setFilteredJobs} />

          {filteredJobs.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredJobs.map((job, index) => (
                <JobCard key={job.id} job={job} index={index} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-lg text-gray-600">No job openings match your criteria.</p>
              <p className="text-gray-500 mt-2">
                Try adjusting your filters or check back later for new opportunities.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Why Join Us Section */}
      <section className="py-16 bg-white/80">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Why Join <span className="gradient-text">DataArch</span>?
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We offer more than just a job. Join us and be part of a team that's shaping the future of data.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              className="card-gradient p-6 rounded-lg shadow-md"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="text-xl font-bold text-gray-800 mb-3">Innovative Work</h3>
              <p className="text-gray-600">
                Work on cutting-edge data solutions that solve real-world problems for leading organizations across
                industries.
              </p>
            </motion.div>

            <motion.div
              className="card-gradient p-6 rounded-lg shadow-md"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <h3 className="text-xl font-bold text-gray-800 mb-3">Growth & Development</h3>
              <p className="text-gray-600">
                Continuous learning opportunities, mentorship programs, and a clear path for career advancement.
              </p>
            </motion.div>

            <motion.div
              className="card-gradient p-6 rounded-lg shadow-md"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h3 className="text-xl font-bold text-gray-800 mb-3">Inclusive Culture</h3>
              <p className="text-gray-600">
                A diverse and supportive environment where every voice is heard and all perspectives are valued.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}

