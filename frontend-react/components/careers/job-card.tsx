"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { MapPin, Calendar, Briefcase } from "lucide-react"
import Link from "next/link"

export interface JobPosition {
  id: string
  title: string
  location: string
  department: string
  type: string
  postedAt: string
  description: string
}

interface JobCardProps {
  job: JobPosition
  index: number
}

export function JobCard({ job, index }: JobCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="card-gradient rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300"
    >
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-3">{job.title}</h3>

        <div className="flex flex-wrap gap-4 mb-4 text-sm text-gray-600">
          <div className="flex items-center">
            <MapPin className="h-4 w-4 mr-1 text-purple-DEFAULT" />
            <span>{job.location}</span>
          </div>
          <div className="flex items-center">
            <Briefcase className="h-4 w-4 mr-1 text-blue-DEFAULT" />
            <span>{job.department}</span>
          </div>
          <div className="flex items-center">
            <Calendar className="h-4 w-4 mr-1 text-purple-DEFAULT" />
            <span>{job.postedAt}</span>
          </div>
        </div>

        <p className="text-gray-600 mb-6 line-clamp-3">{job.description}</p>

        <div className="flex justify-between items-center">
          <span className="inline-block bg-purple-light/20 text-purple-dark text-xs px-3 py-1 rounded-full">
            {job.type}
          </span>
          <Link href={`/careers/${job.id}`}>
            <Button className="bg-purple-DEFAULT hover:bg-purple-dark text-white">View Details</Button>
          </Link>
        </div>
      </div>
    </motion.div>
  )
}

