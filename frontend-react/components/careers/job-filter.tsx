"use client"

import type React from "react"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Search, ChevronDown } from "lucide-react"
import type { JobPosition } from "./job-card"

interface JobFilterProps {
  jobs: JobPosition[]
  onFilter: (filteredJobs: JobPosition[]) => void
}

export function JobFilter({ jobs, onFilter }: JobFilterProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedDepartment, setSelectedDepartment] = useState<string | null>(null)
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null)
  const [selectedType, setSelectedType] = useState<string | null>(null)

  // Extract unique departments, locations, and types
  const departments = Array.from(new Set(jobs.map((job) => job.department)))
  const locations = Array.from(new Set(jobs.map((job) => job.location)))
  const types = Array.from(new Set(jobs.map((job) => job.type)))

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearchTerm(value)
    applyFilters(value, selectedDepartment, selectedLocation, selectedType)
  }

  const handleDepartmentChange = (department: string | null) => {
    setSelectedDepartment(department)
    applyFilters(searchTerm, department, selectedLocation, selectedType)
  }

  const handleLocationChange = (location: string | null) => {
    setSelectedLocation(location)
    applyFilters(searchTerm, selectedDepartment, location, selectedType)
  }

  const handleTypeChange = (type: string | null) => {
    setSelectedType(type)
    applyFilters(searchTerm, selectedDepartment, selectedLocation, type)
  }

  const applyFilters = (search: string, department: string | null, location: string | null, type: string | null) => {
    let filteredJobs = [...jobs]

    if (search) {
      filteredJobs = filteredJobs.filter(
        (job) =>
          job.title.toLowerCase().includes(search.toLowerCase()) ||
          job.description.toLowerCase().includes(search.toLowerCase()),
      )
    }

    if (department) {
      filteredJobs = filteredJobs.filter((job) => job.department === department)
    }

    if (location) {
      filteredJobs = filteredJobs.filter((job) => job.location === location)
    }

    if (type) {
      filteredJobs = filteredJobs.filter((job) => job.type === type)
    }

    onFilter(filteredJobs)
  }

  const FilterDropdown = ({
    label,
    options,
    selected,
    onChange,
  }: {
    label: string
    options: string[]
    selected: string | null
    onChange: (value: string | null) => void
  }) => (
    <div className="relative group">
      <button className="flex items-center justify-between w-full px-4 py-2 bg-gray-100 rounded-md text-gray-700 hover:bg-gray-200 transition-colors">
        <span>{selected || label}</span>
        <ChevronDown className="h-4 w-4 ml-2" />
      </button>
      <div className="absolute z-10 w-full mt-1 hidden group-hover:block hover:block">
        <div className="bg-white rounded-md shadow-lg py-1 max-h-60 overflow-auto">
          <button
            className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-purple-light/10"
            onClick={() => onChange(null)}
          >
            All {label}s
          </button>
          {options.map((option) => (
            <button
              key={option}
              className={`w-full text-left px-4 py-2 text-sm ${
                selected === option ? "bg-purple-light/20 text-purple-dark" : "text-gray-700 hover:bg-purple-light/10"
              }`}
              onClick={() => onChange(option)}
            >
              {option}
            </button>
          ))}
        </div>
      </div>
    </div>
  )

  return (
    <div className="mb-12">
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <Input
          type="text"
          placeholder="Search jobs..."
          className="pl-10 py-6 rounded-lg border-gray-300"
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <FilterDropdown
          label="Department"
          options={departments}
          selected={selectedDepartment}
          onChange={handleDepartmentChange}
        />
        <FilterDropdown
          label="Location"
          options={locations}
          selected={selectedLocation}
          onChange={handleLocationChange}
        />
        <FilterDropdown label="Work type" options={types} selected={selectedType} onChange={handleTypeChange} />
      </div>
    </div>
  )
}

