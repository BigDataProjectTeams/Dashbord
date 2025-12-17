import { Student, MatchResult } from '../types'
import { Star, Mail, GraduationCap, Award, TrendingUp, CheckCircle } from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts'

interface OpportunityMatchesProps {
  matches: MatchResult[]
  requirements?: {
    requiredSkills?: string[]
    requiredMajor?: string
    minGPA?: number
  }
}

export default function OpportunityMatches({ matches, requirements }: OpportunityMatchesProps) {
  if (matches.length === 0) {
    return (
      <div className="card">
        <div className="text-center py-16">
          <TrendingUp className="w-20 h-20 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-600 text-xl font-medium mb-2">لم يتم العثور على مطابقات بعد</p>
          <p className="text-gray-500 text-sm">ارفع مستند الفرصة أعلاه لبدء البحث عن أفضل المرشحين</p>
        </div>
      </div>
    )
  }

  // إعداد بيانات الرسم البياني
  const chartData = matches.slice(0, 5).map((match, index) => ({
    name: match.student.full_name.split(' ')[0] || `طالب ${index + 1}`,
    score: Math.round(match.matchScore),
    gpa: parseFloat(match.student.gpa) || 0,
    skills: match.matchedSkills.length,
    courses: match.matchedCourses.length,
  }))

  // إعداد بيانات الرادار
  const radarData = matches.slice(0, 5).map((match) => ({
    subject: match.student.full_name.split(' ')[0] || 'طالب',
    score: Math.round(match.matchScore),
    fullMark: 100,
  }))

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600 bg-green-100'
    if (score >= 60) return 'text-blue-600 bg-blue-100'
    if (score >= 40) return 'text-yellow-600 bg-yellow-100'
    return 'text-red-600 bg-red-100'
  }

  const getScoreLabel = (score: number) => {
    if (score >= 80) return 'مطابقة ممتازة'
    if (score >= 60) return 'مطابقة جيدة'
    if (score >= 40) return 'مطابقة متوسطة'
    return 'مطابقة ضعيفة'
  }

  return (
    <div className="mb-8">
      {/* Header */}
      <div className="card mb-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="bg-primary-100 p-3 rounded-lg">
            <Star className="w-7 h-7 text-primary-600" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-800">الطلاب المناسبين للفرصة</h2>
            <p className="text-sm text-gray-600">أفضل 5 طلاب مطابقة بناءً على المتطلبات</p>
          </div>
        </div>
        {requirements && (
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-sm font-medium text-gray-700 mb-2">متطلبات الفرصة:</p>
            <div className="flex flex-wrap gap-2">
              {requirements.requiredSkills && requirements.requiredSkills.length > 0 && (
                <>
                  <span className="text-xs text-gray-600 font-medium">المهارات:</span>
                  {requirements.requiredSkills.slice(0, 5).map((skill, i) => (
                    <span key={i} className="px-2 py-1 bg-primary-100 text-primary-700 text-xs rounded">
                      {skill}
                    </span>
                  ))}
                  {requirements.requiredSkills.length > 5 && (
                    <span className="px-2 py-1 bg-gray-200 text-gray-600 text-xs rounded">
                      +{requirements.requiredSkills.length - 5}
                    </span>
                  )}
                </>
              )}
              {requirements.requiredMajor && (
                <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded">
                  التخصص: {requirements.requiredMajor}
                </span>
              )}
              {requirements.minGPA && (
                <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded">
                  الحد الأدنى للمعدل: {requirements.minGPA}
                </span>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Bar Chart - Match Scores */}
        <div className="card">
          <h3 className="text-lg font-bold text-gray-800 mb-4">نسبة المطابقة للمرشحين</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" domain={[0, 100]} />
              <YAxis dataKey="name" type="category" width={100} />
              <Tooltip 
                formatter={(value: number) => [`${value}%`, 'نسبة المطابقة']}
                labelStyle={{ color: '#374151' }}
              />
              <Bar dataKey="score" fill="#0ea5e9" name="نسبة المطابقة %" radius={[0, 8, 8, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Radar Chart */}
        <div className="card">
          <h3 className="text-lg font-bold text-gray-800 mb-4">مقارنة شاملة للمرشحين</h3>
          <ResponsiveContainer width="100%" height={300}>
            <RadarChart data={radarData}>
              <PolarGrid />
              <PolarAngleAxis dataKey="subject" />
              <PolarRadiusAxis angle={90} domain={[0, 100]} />
              <Radar
                name="نسبة المطابقة"
                dataKey="score"
                stroke="#0ea5e9"
                fill="#0ea5e9"
                fillOpacity={0.6}
              />
              <Tooltip 
                formatter={(value: number) => [`${value}%`, 'نسبة المطابقة']}
              />
              <Legend />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Top 5 Candidates Table */}
      <div className="card">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700">الترتيب</th>
                <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700">الاسم</th>
                <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700">البريد الإلكتروني</th>
                <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700">التخصص</th>
                <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700">المعدل التراكمي</th>
                <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700">نسبة المطابقة</th>
                <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700">المهارات المطابقة</th>
                <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700">أسباب المطابقة</th>
              </tr>
            </thead>
            <tbody>
              {matches.slice(0, 5).map((match, index) => (
                <tr
                  key={match.student.id}
                  className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                >
                  <td className="py-4 px-4">
                    <div className="flex items-center justify-end gap-2">
                      {index === 0 && (
                        <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                      )}
                      <span className="font-bold text-lg text-primary-600">#{index + 1}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center justify-end gap-2">
                      <GraduationCap className="w-4 h-4 text-primary-600" />
                      <span className="font-medium text-gray-800">{match.student.full_name}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center justify-end gap-2 text-sm text-gray-600">
                      <Mail className="w-4 h-4" />
                      {match.student.email}
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span className="text-sm text-gray-700">{match.student.major}</span>
                  </td>
                  <td className="py-4 px-4">
                    <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold">
                      <Award className="w-4 h-4" />
                      {match.student.gpa}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex flex-col items-end gap-1">
                      <span
                        className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-bold ${getScoreColor(
                          match.matchScore
                        )}`}
                      >
                        <TrendingUp className="w-4 h-4" />
                        {match.matchScore.toFixed(1)}%
                      </span>
                      <span className="text-xs text-gray-500">{getScoreLabel(match.matchScore)}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex flex-wrap gap-1 justify-end max-w-xs">
                      {match.matchedSkills.slice(0, 3).map((skill, i) => (
                        <span
                          key={i}
                          className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded"
                        >
                          {skill}
                        </span>
                      ))}
                      {match.matchedSkills.length > 3 && (
                        <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                          +{match.matchedSkills.length - 3}
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex flex-col gap-1 text-sm text-gray-600 max-w-xs">
                      {match.reasons.slice(0, 2).map((reason, i) => (
                        <div key={i} className="flex items-center gap-1 text-right">
                          <CheckCircle className="w-3 h-3 text-green-500 flex-shrink-0" />
                          <span className="text-xs">{reason}</span>
                        </div>
                      ))}
                      {match.reasons.length > 2 && (
                        <span className="text-xs text-gray-500">+{match.reasons.length - 2} أسباب أخرى</span>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

