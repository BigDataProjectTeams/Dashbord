import { useState, useRef } from 'react'
import { Upload, FileText, X, CheckCircle, AlertCircle } from 'lucide-react'

interface OpportunityUploadProps {
  onFileUpload: (file: File, requirements: any) => Promise<void>
  onMatch: () => void
}

export default function OpportunityUpload({ onFileUpload, onMatch }: OpportunityUploadProps) {
  const [file, setFile] = useState<File | null>(null)
  const [requirements, setRequirements] = useState({
    requiredSkills: '',
    requiredMajor: '',
    minGPA: '',
    requiredCourses: '',
    minTraining: '',
    minStudyingHours: '',
  })
  const [isUploading, setIsUploading] = useState(false)
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile) {
      if (selectedFile.type === 'application/pdf' || selectedFile.type.includes('text') || selectedFile.name.endsWith('.txt')) {
        setFile(selectedFile)
        setUploadStatus('idle')
        setErrorMessage('')
      } else {
        setErrorMessage('الرجاء رفع ملف PDF أو ملف نصي (.txt)')
      }
    }
  }

  const handleUpload = async () => {
    if (!file) {
      setErrorMessage('الرجاء اختيار ملف أولاً')
      return
    }

    setIsUploading(true)
    setUploadStatus('idle')
    setErrorMessage('')

    try {
      // تحويل المتطلبات إلى الشكل المطلوب
      const parsedRequirements = {
        requiredSkills: requirements.requiredSkills
          ? requirements.requiredSkills.split(',').map(s => s.trim()).filter(Boolean)
          : [],
        requiredMajor: requirements.requiredMajor || undefined,
        minGPA: requirements.minGPA ? parseFloat(requirements.minGPA) : undefined,
        requiredCourses: requirements.requiredCourses
          ? requirements.requiredCourses.split(',').map(c => c.trim()).filter(Boolean)
          : [],
        minTraining: requirements.minTraining ? parseInt(requirements.minTraining) : undefined,
        minStudyingHours: requirements.minStudyingHours ? parseInt(requirements.minStudyingHours) : undefined,
      }

      await onFileUpload(file, parsedRequirements)
      setUploadStatus('success')
      setTimeout(() => {
        onMatch()
      }, 500)
    } catch (error) {
      setUploadStatus('error')
      setErrorMessage('فشل في رفع الملف. حاول مرة أخرى.')
      console.error('Upload error:', error)
    } finally {
      setIsUploading(false)
    }
  }

  const handleRemoveFile = () => {
    setFile(null)
    setUploadStatus('idle')
    setErrorMessage('')
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  return (
    <div className="card mb-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-primary-100 p-2 rounded-lg">
          <Upload className="w-6 h-6 text-primary-600" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-800">رفع متطلبات الفرصة</h2>
          <p className="text-sm text-gray-600">ارفع مستند يحتوي على متطلبات الفرصة الجديدة</p>
        </div>
      </div>

      {/* File Upload Section */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          الملف (PDF أو TXT)
        </label>
        <div className="flex items-center gap-4">
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf,.txt,.doc,.docx"
            onChange={handleFileSelect}
            className="hidden"
            id="file-upload"
          />
          <label
            htmlFor="file-upload"
            className="flex-1 cursor-pointer border-2 border-dashed border-gray-300 rounded-lg p-6 hover:border-primary-500 transition-colors text-center"
          >
            {file ? (
              <div className="flex items-center justify-center gap-3">
                <FileText className="w-8 h-8 text-primary-600" />
                <div className="text-right">
                  <p className="font-medium text-gray-800">{file.name}</p>
                  <p className="text-sm text-gray-500">
                    {(file.size / 1024).toFixed(2)} KB
                  </p>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    handleRemoveFile()
                  }}
                  className="text-red-500 hover:text-red-700"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-2">
                <Upload className="w-10 h-10 text-gray-400" />
                <p className="text-gray-600">اضغط لاختيار الملف</p>
                <p className="text-sm text-gray-500">PDF, TXT, DOC, DOCX</p>
              </div>
            )}
          </label>
        </div>
      </div>

      {/* Requirements Form */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            المهارات المطلوبة (مفصولة بفواصل)
          </label>
          <input
            type="text"
            value={requirements.requiredSkills}
            onChange={(e) => setRequirements({ ...requirements, requiredSkills: e.target.value })}
            placeholder="مثال: Java, Python, React"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            التخصص المطلوب
          </label>
          <input
            type="text"
            value={requirements.requiredMajor}
            onChange={(e) => setRequirements({ ...requirements, requiredMajor: e.target.value })}
            placeholder="مثال: هندسة البرمجيات"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            الحد الأدنى للمعدل التراكمي
          </label>
          <input
            type="number"
            step="0.1"
            min="0"
            max="4"
            value={requirements.minGPA}
            onChange={(e) => setRequirements({ ...requirements, minGPA: e.target.value })}
            placeholder="مثال: 3.0"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            المقررات المطلوبة (مفصولة بفواصل)
          </label>
          <input
            type="text"
            value={requirements.requiredCourses}
            onChange={(e) => setRequirements({ ...requirements, requiredCourses: e.target.value })}
            placeholder="مثال: قواعد البيانات, الذكاء الاصطناعي"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            الحد الأدنى لبرامج التدريب
          </label>
          <input
            type="number"
            min="0"
            value={requirements.minTraining}
            onChange={(e) => setRequirements({ ...requirements, minTraining: e.target.value })}
            placeholder="مثال: 2"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            الحد الأدنى لساعات الدراسة (أسبوعياً)
          </label>
          <input
            type="number"
            min="0"
            value={requirements.minStudyingHours}
            onChange={(e) => setRequirements({ ...requirements, minStudyingHours: e.target.value })}
            placeholder="مثال: 20"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Status Messages */}
      {errorMessage && (
        <div className="mb-4 flex items-center gap-2 text-red-600 bg-red-50 p-3 rounded-lg">
          <AlertCircle className="w-5 h-5" />
          <p className="text-sm">{errorMessage}</p>
        </div>
      )}

      {uploadStatus === 'success' && (
        <div className="mb-4 flex items-center gap-2 text-green-600 bg-green-50 p-3 rounded-lg">
          <CheckCircle className="w-5 h-5" />
          <p className="text-sm">تم رفع الملف بنجاح! جاري البحث عن أفضل المرشحين...</p>
        </div>
      )}

      {/* Upload Button */}
      <button
        onClick={handleUpload}
        disabled={!file || isUploading}
        className="w-full md:w-auto px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {isUploading ? (
          <>
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
            جاري الرفع...
          </>
        ) : (
          <>
            <Upload className="w-5 h-5" />
            رفع الملف وإيجاد أفضل المرشحين
          </>
        )}
      </button>
    </div>
  )
}

