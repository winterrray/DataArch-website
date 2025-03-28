"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { ArrowLeft, MapPin, Calendar, Briefcase, Clock } from "lucide-react"
import type { JobPosition } from "@/components/careers/job-card"

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

// Extended job details for the detail page
const jobDetails: Record<
  string,
  {
    responsibilities: string[]
    requirements: string[]
    benefits: string[]
  }
> = {
  "data-engineer": {
    responsibilities: [
      "Design, build, and maintain efficient, reusable, and reliable data pipelines",
      "Optimize data storage solutions and ensure data quality and accessibility",
      "Collaborate with data scientists and analysts to understand data requirements",
      "Implement data security and compliance measures",
      "Monitor and troubleshoot data pipeline issues",
    ],
    requirements: [
      "5+ years of experience in data engineering or similar role",
      "Proficiency in SQL and Python",
      "Experience with cloud platforms (AWS, Azure, or GCP)",
      "Knowledge of big data technologies (Hadoop, Spark, Kafka)",
      "Strong problem-solving skills and attention to detail",
    ],
    benefits: [
      "Competitive salary and equity package",
      "Comprehensive health, dental, and vision insurance",
      "Flexible work arrangements",
      "Professional development budget",
      "Regular team events and activities",
    ],
  },
  "data-scientist": {
    responsibilities: [
      "Develop machine learning models to solve business problems",
      "Analyze complex datasets to extract actionable insights",
      "Collaborate with engineers to deploy models to production",
      "Present findings to stakeholders and business teams",
      "Stay current with the latest research and technologies",
    ],
    requirements: [
      "3+ years of experience in data science or similar role",
      "Strong programming skills in Python and R",
      "Experience with machine learning frameworks (TensorFlow, PyTorch)",
      "Statistical analysis and modeling expertise",
      "Excellent communication and presentation skills",
    ],
    benefits: [
      "Competitive salary and equity package",
      "Comprehensive health, dental, and vision insurance",
      "Flexible work arrangements",
      "Professional development budget",
      "Regular team events and activities",
    ],
  },
  "cloud-architect": {
    responsibilities: [
      "Design and implement cloud-based data architectures",
      "Optimize cloud resources for performance and cost",
      "Lead migration projects from on-premise to cloud",
      "Develop cloud governance and security policies",
      "Provide technical guidance to development teams",
    ],
    requirements: [
      "7+ years of experience in cloud architecture or similar role",
      "Certifications in major cloud platforms (AWS, Azure, or GCP)",
      "Experience with infrastructure as code (Terraform, CloudFormation)",
      "Knowledge of containerization and orchestration (Docker, Kubernetes)",
      "Strong leadership and communication skills",
    ],
    benefits: [
      "Competitive salary and equity package",
      "Comprehensive health, dental, and vision insurance",
      "Flexible work arrangements",
      "Professional development budget",
      "Regular team events and activities",
    ],
  },
  "data-analyst": {
    responsibilities: [
      "Analyze data to identify trends and patterns",
      "Create reports and dashboards for business stakeholders",
      "Develop and maintain data models",
      "Collaborate with teams to understand data needs",
      "Ensure data accuracy and integrity",
    ],
    requirements: [
      "2+ years of experience in data analysis or similar role",
      "Proficiency in SQL and Excel",
      "Experience with BI tools (Tableau, Power BI)",
      "Strong analytical and problem-solving skills",
      "Excellent attention to detail",
    ],
    benefits: [
      "Competitive salary and equity package",
      "Comprehensive health, dental, and vision insurance",
      "Flexible work arrangements",
      "Professional development budget",
      "Regular team events and activities",
    ],
  },
  "product-manager": {
    responsibilities: [
      "Lead the development of data products from conception to launch",
      "Work with cross-functional teams to define product requirements",
      "Conduct market research and competitive analysis",
      "Develop product roadmaps and prioritize features",
      "Gather and analyze user feedback to improve products",
    ],
    requirements: [
      "5+ years of experience in product management",
      "Experience with data products or solutions",
      "Strong understanding of user-centered design principles",
      "Excellent communication and stakeholder management skills",
      "Ability to translate technical concepts for non-technical audiences",
    ],
    benefits: [
      "Competitive salary and equity package",
      "Comprehensive health, dental, and vision insurance",
      "Flexible work arrangements",
      "Professional development budget",
      "Regular team events and activities",
    ],
  },
  "sales-executive": {
    responsibilities: [
      "Drive sales of data solutions to enterprise clients",
      "Build and maintain relationships with key stakeholders",
      "Develop and execute sales strategies to exceed revenue targets",
      "Collaborate with product and marketing teams",
      "Provide feedback on market trends and customer needs",
    ],
    requirements: [
      "5+ years of experience in enterprise software sales",
      "Track record of exceeding sales targets",
      "Experience selling data or analytics solutions",
      "Strong negotiation and relationship-building skills",
      "Excellent communication and presentation abilities",
    ],
    benefits: [
      "Competitive base salary and commission structure",
      "Comprehensive health, dental, and vision insurance",
      "Flexible work arrangements",
      "Professional development budget",
      "Regular team events and activities",
    ],
  },
  "marketing-specialist": {
    responsibilities: [
      "Create compelling content for various channels",
      "Manage digital marketing campaigns",
      "Analyze marketing metrics and optimize strategies",
      "Collaborate with sales and product teams",
      "Help position DataArch as a leader in the data solutions market",
    ],
    requirements: [
      "3+ years of experience in tech marketing",
      "Strong content creation and copywriting skills",
      "Experience with digital marketing tools and analytics",
      "Understanding of B2B marketing strategies",
      "Excellent communication and project management abilities",
    ],
    benefits: [
      "Competitive salary",
      "Comprehensive health, dental, and vision insurance",
      "Flexible work arrangements",
      "Professional development budget",
      "Regular team events and activities",
    ],
  },
  "ux-designer": {
    responsibilities: [
      "Design intuitive interfaces for data visualization tools",
      "Conduct user research and usability testing",
      "Create wireframes, prototypes, and high-fidelity designs",
      "Collaborate with product and engineering teams",
      "Develop and maintain design systems",
    ],
    requirements: [
      "4+ years of experience in UX/UI design",
      "Experience designing data visualization interfaces",
      "Proficiency in design tools (Figma, Sketch)",
      "Understanding of user-centered design principles",
      "Strong portfolio demonstrating relevant work",
    ],
    benefits: [
      "Competitive salary and equity package",
      "Comprehensive health, dental, and vision insurance",
      "Flexible work arrangements",
      "Professional development budget",
      "Regular team events and activities",
    ],
  },
}

export default function JobDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [job, setJob] = useState<JobPosition | null>(null)
  const [jobDetail, setJobDetail] = useState<{
    responsibilities: string[]
    requirements: string[]
    benefits: string[]
  } | null>(null)

  useEffect(() => {
    if (params.id) {
      const jobId = params.id as string
      const foundJob = jobListings.find((j) => j.id === jobId)
      const foundJobDetail = jobDetails[jobId]

      if (foundJob && foundJobDetail) {
        setJob(foundJob)
        setJobDetail(foundJobDetail)
      } else {
        // Job not found, redirect to careers page
        router.push("/careers")
      }
    }
  }, [params.id, router])

  if (!job || !jobDetail) {
    return (
      <main className="min-h-screen">
        <Navbar />
        <div className="container mx-auto px-4 pt-32 pb-16 text-center">
          <p>Loading job details...</p>
        </div>
        <Footer />
      </main>
    )
  }

  return (
    <main className="min-h-screen">
      <Navbar />

      <section className="pt-32 pb-16">
        <div className="container mx-auto px-4">
          <Button variant="outline" className="mb-6 flex items-center" onClick={() => router.push("/careers")}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to all jobs
          </Button>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="card-gradient rounded-lg p-8 shadow-lg"
          >
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">{job.title}</h1>

            <div className="flex flex-wrap gap-6 mb-8 text-sm text-gray-600">
              <div className="flex items-center">
                <MapPin className="h-5 w-5 mr-2 text-purple-DEFAULT" />
                <span>{job.location}</span>
              </div>
              <div className="flex items-center">
                <Briefcase className="h-5 w-5 mr-2 text-blue-DEFAULT" />
                <span>{job.department}</span>
              </div>
              <div className="flex items-center">
                <Clock className="h-5 w-5 mr-2 text-purple-DEFAULT" />
                <span>{job.type}</span>
              </div>
              <div className="flex items-center">
                <Calendar className="h-5 w-5 mr-2 text-blue-DEFAULT" />
                <span>Posted {job.postedAt}</span>
              </div>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Overview</h2>
              <p className="text-gray-700">{job.description}</p>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Responsibilities</h2>
              <ul className="list-disc pl-5 space-y-2 text-gray-700">
                {jobDetail.responsibilities.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Requirements</h2>
              <ul className="list-disc pl-5 space-y-2 text-gray-700">
                {jobDetail.requirements.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Benefits</h2>
              <ul className="list-disc pl-5 space-y-2 text-gray-700">
                {jobDetail.benefits.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>

            <div className="mt-8 text-center">
              <Button className="bg-gradient-to-r from-blue-DEFAULT to-purple-DEFAULT hover:from-blue-dark hover:to-purple-dark text-white px-8 py-6 rounded-md text-lg transition-all duration-300 hover:shadow-lg">
                Apply Now
              </Button>
              <p className="text-sm text-gray-500 mt-2">
                Or email your resume to{" "}
                <a href="mailto:careers@dataarch.co" className="text-purple-DEFAULT hover:underline">
                  careers@dataarch.co
                </a>
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  )
}

