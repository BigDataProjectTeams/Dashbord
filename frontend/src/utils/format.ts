/**
 * دوال مساعدة للتنسيق
 */

export const formatDate = (dateString: string): string => {
  if (!dateString) return '-'
  try {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat('ar-EG', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(date)
  } catch {
    return dateString
  }
}

export const formatNumber = (num: number): string => {
  return new Intl.NumberFormat('ar-EG').format(num)
}

export const formatGPA = (gpa: string | number): string => {
  const num = typeof gpa === 'string' ? parseFloat(gpa) : gpa
  if (isNaN(num)) return '-'
  return num.toFixed(2)
}

export const getGPAColor = (gpa: string): string => {
  const num = parseFloat(gpa) || 0
  if (num >= 3.7) return 'text-green-600 bg-green-100'
  if (num >= 3.0) return 'text-blue-600 bg-blue-100'
  if (num >= 2.5) return 'text-yellow-600 bg-yellow-100'
  return 'text-red-600 bg-red-100'
}

export const getGPALabel = (gpa: string): string => {
  const num = parseFloat(gpa) || 0
  if (num >= 3.7) return 'ممتاز'
  if (num >= 3.0) return 'جيد جداً'
  if (num >= 2.5) return 'جيد'
  return 'مقبول'
}

