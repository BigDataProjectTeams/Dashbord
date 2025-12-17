import { useState, useEffect } from 'react'
import Dashboard from './components/Dashboard'
import { Student } from './types'
import { fetchStudents } from './services/api'

function App() {
  const [students, setStudents] = useState<Student[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      setLoading(true)
      const studentsData = await fetchStudents()
      setStudents(studentsData)
      setError(null)
    } catch (err) {
      setError('فشل في تحميل البيانات. تأكد من تشغيل الخادم.')
      console.error('Error loading data:', err)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">جاري تحميل البيانات...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {error && (
        <div className="bg-red-50 border-r-4 border-red-500 text-red-700 p-4 m-4 rounded">
          <p className="font-bold">خطأ</p>
          <p>{error}</p>
        </div>
      )}
      <Dashboard students={students} stats={null} onRefresh={loadData} />
    </div>
  )
}

export default App

