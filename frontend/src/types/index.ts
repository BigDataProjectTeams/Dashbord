export interface Student {
  id: number
  full_name: string
  email: string
  gpa: string
  major: string
  skills: string[]
  courses: string[]
  studying_hours: number
  training: number
  created_at: string
  updated_at: string
}

export interface DashboardStats {
  totalStudents: number
  totalOpportunities: number
  averageGPA: number
  topMajors: { major: string; count: number }[]
  topSkills: { skill: string; count: number }[]
  studentsByMajor: { major: string; count: number }[]
  recentStudents: number
}

export interface Opportunity {
  id: string
  title: string
  description: string
  requiredSkills: string[]
  requiredMajor?: string
  minGPA?: number
  deadline: string
  type: 'academic' | 'employment'
}

export interface MatchResult {
  student: Student
  matchScore: number
  matchedSkills: string[]
  matchedCourses: string[]
  reasons: string[]
}

export interface OpportunityRequirements {
  requiredSkills?: string[]
  requiredMajor?: string
  minGPA?: number
  requiredCourses?: string[]
  minTraining?: number
  minStudyingHours?: number
}

