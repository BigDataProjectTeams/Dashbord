import { Student } from '../types'
import { Star, Mail, GraduationCap, Award } from 'lucide-react'

interface TopCandidatesProps {
  students: Student[]
}

export default function TopCandidates({ students }: TopCandidatesProps) {
  // ترتيب الطلاب حسب المعدل التراكمي والمهارات
  const topCandidates = [...students]
    .sort((a, b) => {
      const gpaA = parseFloat(a.gpa) || 0
      const gpaB = parseFloat(b.gpa) || 0
      if (gpaB !== gpaA) return gpaB - gpaA
      return (b.skills?.length || 0) - (a.skills?.length || 0)
    })
    .slice(0, 10)

  const getScoreColor = (gpa: string) => {
    const numGpa = parseFloat(gpa) || 0
    if (numGpa >= 3.7) return 'text-green-600 bg-green-100'
    if (numGpa >= 3.0) return 'text-blue-600 bg-blue-100'
    return 'text-gray-600 bg-gray-100'
  }

  return (
    <div className="card mb-8">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="bg-primary-100 p-2 rounded-lg">
            <Star className="w-6 h-6 text-primary-600" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-800">أفضل المرشحين</h2>
            <p className="text-sm text-gray-600">الطلاب الأكثر تأهيلاً للفرص المتاحة</p>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700">الترتيب</th>
              <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700">الاسم</th>
              <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700">البريد الإلكتروني</th>
              <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700">التخصص</th>
              <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700">المعدل التراكمي</th>
              <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700">المهارات</th>
              <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700">التدريب</th>
            </tr>
          </thead>
          <tbody>
            {topCandidates.length === 0 ? (
              <tr>
                <td colSpan={7} className="text-center py-8 text-gray-500">
                  لا توجد بيانات متاحة
                </td>
              </tr>
            ) : (
              topCandidates.map((student, index) => (
                <tr
                  key={student.id}
                  className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                >
                  <td className="py-4 px-4">
                    <div className="flex items-center justify-end gap-2">
                      {index < 3 && (
                        <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                      )}
                      <span className="font-semibold text-gray-700">#{index + 1}</span>
                    </div>
                  </td>
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
                    <span
                      className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-semibold ${getScoreColor(
                        student.gpa
                      )}`}
                    >
                      <Award className="w-4 h-4" />
                      {student.gpa}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex flex-wrap gap-1 justify-end">
                      {student.skills?.slice(0, 3).map((skill, i) => (
                        <span
                          key={i}
                          className="px-2 py-1 bg-primary-100 text-primary-700 text-xs rounded"
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
                    <span className="text-sm text-gray-700">{student.training || 0} برنامج</span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

