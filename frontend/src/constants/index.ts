/**
 * ثوابت التطبيق
 */

export const REFRESH_INTERVAL = 30000 // 30 ثانية

export const TABLE_PAGE_SIZE = 50

export const CHART_COLORS = [
  '#0ea5e9', // primary blue
  '#10b981', // green
  '#f59e0b', // orange
  '#ef4444', // red
  '#8b5cf6', // purple
  '#ec4899', // pink
  '#06b6d4', // cyan
  '#84cc16', // lime
]

export const GPA_RANGES = [
  { min: 3.5, max: 4.0, label: '3.5 - 4.0', color: '#10b981' },
  { min: 3.0, max: 3.5, label: '3.0 - 3.5', color: '#0ea5e9' },
  { min: 2.5, max: 3.0, label: '2.5 - 3.0', color: '#f59e0b' },
  { min: 0, max: 2.5, label: 'أقل من 2.5', color: '#ef4444' },
]

export const MAJOR_NAMES: Record<string, string> = {
  'هندسة البرمجيات': 'Software Engineering',
  'علوم الحاسوب': 'Computer Science',
  'هندسة الشبكات': 'Network Engineering',
  'نظم المعلومات': 'Information Systems',
  'الأمن السيبراني': 'Cybersecurity',
  'الذكاء الاصطناعي': 'Artificial Intelligence',
}

