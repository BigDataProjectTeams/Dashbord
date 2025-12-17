import { GraduationCap } from 'lucide-react'

export default function Header() {
  return (
    <header className="bg-gradient-to-r from-primary-600 to-primary-800 text-white shadow-lg">
      <div className="container mx-auto px-4 py-6 max-w-7xl">
        <div className="flex items-center gap-4">
          <div className="bg-white/20 p-3 rounded-lg">
            <GraduationCap className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">Najah University</h1>
            <p className="text-primary-100">نظام مطابقة الفرص الأكاديمية والمهنية</p>
          </div>
        </div>
      </div>
    </header>
  )
}

