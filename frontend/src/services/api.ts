import axios from 'axios'
import { Student, DashboardStats, MatchResult, OpportunityRequirements } from '../types'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

export const fetchStudents = async (): Promise<Student[]> => {
  try {
    const response = await api.get('/students')
    return response.data
  } catch (error) {
    console.error('Error fetching students:', error)
    // إرجاع بيانات تجريبية في حالة فشل الاتصال
    return mockStudents
  }
}

export const fetchDashboardStats = async (): Promise<DashboardStats> => {
  try {
    const response = await api.get('/stats')
    return response.data
  } catch (error) {
    console.error('Error fetching stats:', error)
    // إرجاع إحصائيات تجريبية في حالة فشل الاتصال
    return mockStats
  }
}

export const fetchTopCandidates = async (opportunityId?: string): Promise<Student[]> => {
  try {
    const url = opportunityId 
      ? `/candidates/${opportunityId}` 
      : '/candidates/top'
    const response = await api.get(url)
    return response.data
  } catch (error) {
    console.error('Error fetching candidates:', error)
    return []
  }
}

export const uploadOpportunityDocument = async (
  file: File,
  requirements: OpportunityRequirements
): Promise<void> => {
  try {
    const formData = new FormData()
    formData.append('file', file)
    formData.append('requirements', JSON.stringify(requirements))
    
    await api.post('/opportunities/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
  } catch (error) {
    console.error('Error uploading document:', error)
    throw error
  }
}

export const findMatches = async (
  requirements: OpportunityRequirements,
  students: Student[]
): Promise<MatchResult[]> => {
  try {
    const response = await api.post('/opportunities/match', { requirements })
    return response.data
  } catch (error) {
    console.error('Error finding matches:', error)
    // في حالة عدم توفر API، نقوم بحساب المطابقة محلياً
    return calculateMatchesLocally(requirements, students)
  }
}

// حساب المطابقة محلياً (fallback)
const calculateMatchesLocally = (
  requirements: OpportunityRequirements,
  students: Student[]
): MatchResult[] => {
  const matches: MatchResult[] = students.map(student => {
    let score = 0
    const matchedSkills: string[] = []
    const matchedCourses: string[] = []
    const reasons: string[] = []

    // مطابقة المهارات (40% من النتيجة)
    if (requirements.requiredSkills && requirements.requiredSkills.length > 0) {
      const studentSkills = student.skills || []
      const matched = requirements.requiredSkills.filter(skill =>
        studentSkills.some(s => s.toLowerCase().includes(skill.toLowerCase()) || skill.toLowerCase().includes(s.toLowerCase()))
      )
      matchedSkills.push(...matched)
      const skillsScore = (matched.length / requirements.requiredSkills.length) * 40
      score += skillsScore
      if (matched.length > 0) {
        reasons.push(`يطابق ${matched.length} من ${requirements.requiredSkills.length} مهارة مطلوبة`)
      }
    }

    // مطابقة التخصص (20% من النتيجة)
    if (requirements.requiredMajor) {
      if (student.major?.toLowerCase().includes(requirements.requiredMajor.toLowerCase()) ||
          requirements.requiredMajor.toLowerCase().includes(student.major?.toLowerCase() || '')) {
        score += 20
        reasons.push('التخصص مطابق')
      }
    }

    // المعدل التراكمي (20% من النتيجة)
    if (requirements.minGPA) {
      const studentGPA = parseFloat(student.gpa) || 0
      if (studentGPA >= requirements.minGPA) {
        score += 20
        reasons.push(`المعدل التراكمي ${student.gpa} يلبي المتطلبات`)
      } else {
        const gpaScore = (studentGPA / requirements.minGPA) * 20
        score += gpaScore
      }
    }

    // المقررات (10% من النتيجة)
    if (requirements.requiredCourses && requirements.requiredCourses.length > 0) {
      const studentCourses = student.courses || []
      const matched = requirements.requiredCourses.filter(course =>
        studentCourses.some(c => c.toLowerCase().includes(course.toLowerCase()) || course.toLowerCase().includes(c.toLowerCase()))
      )
      matchedCourses.push(...matched)
      const coursesScore = (matched.length / requirements.requiredCourses.length) * 10
      score += coursesScore
      if (matched.length > 0) {
        reasons.push(`أكمل ${matched.length} من المقررات المطلوبة`)
      }
    }

    // برامج التدريب (5% من النتيجة)
    if (requirements.minTraining) {
      if ((student.training || 0) >= requirements.minTraining) {
        score += 5
        reasons.push(`لديه ${student.training} برنامج تدريبي`)
      }
    }

    // ساعات الدراسة (5% من النتيجة)
    if (requirements.minStudyingHours) {
      if ((student.studying_hours || 0) >= requirements.minStudyingHours) {
        score += 5
        reasons.push(`يدرس ${student.studying_hours} ساعة أسبوعياً`)
      }
    }

    return {
      student,
      matchScore: Math.min(100, Math.round(score)),
      matchedSkills,
      matchedCourses,
      reasons: reasons.length > 0 ? reasons : ['مطابقة أساسية'],
    }
  })

  // ترتيب حسب نسبة المطابقة
  return matches
    .sort((a, b) => b.matchScore - a.matchScore)
    .slice(0, 5)
}

// بيانات تجريبية للاختبار
const mockStudents: Student[] = [
  {
    id: 1,
    full_name: 'أحمد محمد',
    email: 'ahmed@student.najah.edu',
    gpa: '3.8',
    major: 'هندسة البرمجيات',
    skills: ['Java', 'Python', 'React', 'Node.js'],
    courses: ['قواعد البيانات', 'هندسة البرمجيات', 'الذكاء الاصطناعي'],
    studying_hours: 25,
    training: 2,
    created_at: '2024-01-15',
    updated_at: '2024-12-10',
  },
  {
    id: 2,
    full_name: 'سارة علي',
    email: 'sara@student.najah.edu',
    gpa: '3.9',
    major: 'علوم الحاسوب',
    skills: ['Python', 'Machine Learning', 'TensorFlow'],
    courses: ['تعلم الآلة', 'البيانات الضخمة', 'الذكاء الاصطناعي'],
    studying_hours: 30,
    training: 3,
    created_at: '2024-02-20',
    updated_at: '2024-12-12',
  },
]

const mockStats: DashboardStats = {
  totalStudents: 1250,
  totalOpportunities: 45,
  averageGPA: 3.65,
  topMajors: [
    { major: 'هندسة البرمجيات', count: 320 },
    { major: 'علوم الحاسوب', count: 280 },
    { major: 'هندسة الشبكات', count: 195 },
    { major: 'نظم المعلومات', count: 180 },
  ],
  topSkills: [
    { skill: 'Python', count: 450 },
    { skill: 'Java', count: 380 },
    { skill: 'React', count: 320 },
    { skill: 'Node.js', count: 290 },
  ],
  studentsByMajor: [
    { major: 'هندسة البرمجيات', count: 320 },
    { major: 'علوم الحاسوب', count: 280 },
    { major: 'هندسة الشبكات', count: 195 },
    { major: 'نظم المعلومات', count: 180 },
    { major: 'الأمن السيبراني', count: 150 },
    { major: 'الذكاء الاصطناعي', count: 125 },
  ],
  recentStudents: 45,
}

