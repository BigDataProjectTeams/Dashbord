import { useState } from 'react'
import { Student, MatchResult, OpportunityRequirements } from '../types'
import Header from './Header'
import OpportunityUpload from './OpportunityUpload'
import OpportunityMatches from './OpportunityMatches'
import { uploadOpportunityDocument, findMatches } from '../services/api'

interface DashboardProps {
  students: Student[]
  stats: any
  onRefresh: () => void
}

export default function Dashboard({ students }: DashboardProps) {
  const [matches, setMatches] = useState<MatchResult[]>([])
  const [currentRequirements, setCurrentRequirements] = useState<OpportunityRequirements | undefined>()

  const handleFileUpload = async (file: File, requirements: OpportunityRequirements) => {
    try {
      // رفع الملف إلى الـ API
      await uploadOpportunityDocument(file, requirements)
      setCurrentRequirements(requirements)
    } catch (error) {
      // في حالة فشل الرفع، نستمر في العمل محلياً
      console.log('Using local matching...')
      setCurrentRequirements(requirements)
    }
  }

  const handleMatch = async () => {
    if (!currentRequirements) return
    
    try {
      const results = await findMatches(currentRequirements, students)
      setMatches(results)
    } catch (error) {
      console.error('Error finding matches:', error)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Opportunity Upload Section */}
        <OpportunityUpload 
          onFileUpload={handleFileUpload}
          onMatch={handleMatch}
        />

        {/* Opportunity Matches Section */}
        <OpportunityMatches 
          matches={matches}
          requirements={currentRequirements}
        />
      </main>
    </div>
  )
}

