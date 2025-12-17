import { useState } from 'react'
import { Student } from '../types'
import { Search, Mail, GraduationCap, Award, BookOpen } from 'lucide-react'

interface StudentsTableProps {
  students: Student[]
}

export default function StudentsTable({ students }: StudentsTableProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterMajor, setFilterMajor] = useState('')
  const [sortBy, setSortBy] = useState<'gpa' | 'name' | 'major'>('gpa')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc')

  // استخراج التخصصات الفريدة
  const majors = Array.from(new Set(students.map(s => s.major))).filter(Boolean)

  // تصفية وترتيب الطلاب
  const filteredAndSorted = [...students]
    .filter(student => {
      const matchesSearch = 
        student.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.major?.toLowerCase().includes(searchTerm.toLowerCase())
      
      const matchesMajor = !filterMajor || student.major === filterMajor
      
      return matchesSearch && matchesMajor
    })
    .sort((a, b) => {
      let comparison = 0
      
      if (sortBy === 'gpa') {
        const gpaA = parseFloat(a.gpa) || 0
        const gpaB = parseFloat(b.gpa) || 0
        comparison = gpaB - gpaA
      } else if (sortBy === 'name') {
        comparison = (a.full_name || '').localeCompare(b.full_name || '', 'ar')
      } else if (sortBy === 'major') {
        comparison = (a.major || '').localeCompare(b.major || '', 'ar')
      }
      
      return sortOrder === 'asc' ? -comparison : comparison
    })
    .slice(0, 50) // عرض أول 50 طالب فقط

  const handleSort = (field: 'gpa' | 'name' | 'major') => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
    } else {
      setSortBy(field)
      setSortOrder('desc')
    }
  }

  return (
    <div className="card">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">قائمة الطلاب</h2>
          <p className="text-sm text-gray-600">عرض وإدارة بيانات الطلاب المسجلين</p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3">
          {/* Search */}
          <div className="relative">
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="بحث..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent w-full sm:w-64"
            />
          </div>
          
          {/* Filter by Major */}
          <select
            value={filterMajor}
            onChange={(e) => setFilterMajor(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            <option value="">جميع التخصصات</option>
            {majors.map(major => (
              <option key={major} value={major}>{major}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50">
              <th 
                className="text-right py-3 px-4 text-sm font-semibold text-gray-700 cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('name')}
              >
                الاسم {sortBy === 'name' && (sortOrder === 'asc' ? '↑' : '↓')}
              </th>
              <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700">البريد الإلكتروني</th>
              <th 
                className="text-right py-3 px-4 text-sm font-semibold text-gray-700 cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('major')}
              >
                التخصص {sortBy === 'major' && (sortOrder === 'asc' ? '↑' : '↓')}
              </th>
              <th 
                className="text-right py-3 px-4 text-sm font-semibold text-gray-700 cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('gpa')}
              >
                المعدل التراكمي {sortBy === 'gpa' && (sortOrder === 'asc' ? '↑' : '↓')}
              </th>
              <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700">المهارات</th>
              <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700">المقررات</th>
              <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700">ساعات الدراسة</th>
            </tr>
          </thead>
          <tbody>
            {filteredAndSorted.length === 0 ? (
              <tr>
                <td colSpan={7} className="text-center py-8 text-gray-500">
                  لا توجد نتائج
                </td>
              </tr>
            ) : (
              filteredAndSorted.map((student) => (
                <tr
                  key={student.id}
                  className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                >
                  <td className="py-4 px-4">
                    <div className="flex items-center justify-end gap-2">
                      <GraduationCap className="w-4 h-4 text-primary-600" />
                      <span className="font-medium text-gray-800">{student.full_name}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center justify-end gap-2 text-sm text-gray-600">
                      <Mail className="w-4 h-4" />
                      {student.email}
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span className="text-sm text-gray-700">{student.major}</span>
                  </td>
                  <td className="py-4 px-4">
                    <span className="inline-flex items-center gap-1 px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm font-semibold">
                      <Award className="w-4 h-4" />
                      {student.gpa}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex flex-wrap gap-1 justify-end max-w-xs">
                      {student.skills?.slice(0, 3).map((skill, i) => (
                        <span
                          key={i}
                          className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded"
                        >
                          {skill}
                        </span>
                      ))}
                      {student.skills && student.skills.length > 3 && (
                        <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                          +{student.skills.length - 3}
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center justify-end gap-1 text-sm text-gray-600">
                      <BookOpen className="w-4 h-4" />
                      <span>{student.courses?.length || 0}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span className="text-sm text-gray-700">{student.studying_hours || 0} ساعة/أسبوع</span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {filteredAndSorted.length > 0 && (
        <div className="mt-4 text-sm text-gray-600 text-center">
          عرض {filteredAndSorted.length} من {students.length} طالب
        </div>
      )}
    </div>
  )
}

