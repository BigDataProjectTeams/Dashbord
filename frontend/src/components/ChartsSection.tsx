import { DashboardStats, Student } from '../types'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'

interface ChartsSectionProps {
  stats: DashboardStats
  students: Student[]
}

const COLORS = ['#0ea5e9', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899']

export default function ChartsSection({ stats, students }: ChartsSectionProps) {
  // إعداد بيانات التخصصات
  const majorData = stats.studentsByMajor.map((item, index) => ({
    name: item.major,
    value: item.count,
    color: COLORS[index % COLORS.length],
  }))

  // إعداد بيانات المهارات
  const skillsData = stats.topSkills.map((item, index) => ({
    name: item.skill,
    value: item.count,
    color: COLORS[index % COLORS.length],
  }))

  // إعداد بيانات توزيع المعدل التراكمي
  const gpaDistribution = students.reduce((acc, student) => {
    const gpa = parseFloat(student.gpa) || 0
    let range = ''
    if (gpa >= 3.5) range = '3.5 - 4.0'
    else if (gpa >= 3.0) range = '3.0 - 3.5'
    else if (gpa >= 2.5) range = '2.5 - 3.0'
    else range = 'أقل من 2.5'
    
    acc[range] = (acc[range] || 0) + 1
    return acc
  }, {} as Record<string, number>)

  const gpaData = Object.entries(gpaDistribution).map(([name, value]) => ({
    name,
    value,
  }))

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
      {/* توزيع الطلاب حسب التخصص */}
      <div className="card">
        <h3 className="text-xl font-bold text-gray-800 mb-6">توزيع الطلاب حسب التخصص</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={stats.studentsByMajor} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="number" />
            <YAxis dataKey="major" type="category" width={120} />
            <Tooltip />
            <Legend />
            <Bar dataKey="count" fill="#0ea5e9" name="عدد الطلاب" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* المهارات الأكثر طلباً */}
      <div className="card">
        <h3 className="text-xl font-bold text-gray-800 mb-6">المهارات الأكثر طلباً</h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={skillsData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
            >
              {skillsData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* توزيع المعدل التراكمي */}
      <div className="card">
        <h3 className="text-xl font-bold text-gray-800 mb-6">توزيع المعدل التراكمي</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={gpaData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="value" fill="#10b981" name="عدد الطلاب" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* أفضل التخصصات */}
      <div className="card">
        <h3 className="text-xl font-bold text-gray-800 mb-6">أفضل التخصصات</h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={majorData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
            >
              {majorData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

