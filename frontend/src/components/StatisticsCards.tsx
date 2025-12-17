import { DashboardStats } from '../types'
import { Users, Briefcase, Award, TrendingUp } from 'lucide-react'

interface StatisticsCardsProps {
  stats: DashboardStats
}

export default function StatisticsCards({ stats }: StatisticsCardsProps) {
  const cards = [
    {
      title: 'إجمالي الطلاب',
      value: stats.totalStudents.toLocaleString('ar-EG'),
      icon: Users,
      color: 'from-blue-500 to-blue-600',
      change: `+${stats.recentStudents} جديد`,
    },
    {
      title: 'الفرص المتاحة',
      value: stats.totalOpportunities.toString(),
      icon: Briefcase,
      color: 'from-green-500 to-green-600',
      change: 'نشط',
    },
    {
      title: 'متوسط المعدل التراكمي',
      value: stats.averageGPA.toFixed(2),
      icon: Award,
      color: 'from-purple-500 to-purple-600',
      change: 'ممتاز',
    },
    {
      title: 'نسبة المطابقة',
      value: '87%',
      icon: TrendingUp,
      color: 'from-orange-500 to-orange-600',
      change: '+5% هذا الشهر',
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {cards.map((card, index) => {
        const Icon = card.icon
        return (
          <div
            key={index}
            className={`bg-gradient-to-br ${card.color} text-white rounded-xl shadow-lg p-6 transform transition-transform hover:scale-105`}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="bg-white/20 p-3 rounded-lg">
                <Icon className="w-6 h-6" />
              </div>
            </div>
            <h3 className="text-sm font-medium text-white/90 mb-1">{card.title}</h3>
            <p className="text-3xl font-bold mb-2">{card.value}</p>
            <p className="text-xs text-white/80">{card.change}</p>
          </div>
        )
      })}
    </div>
  )
}

