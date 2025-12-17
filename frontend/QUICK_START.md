# دليل البدء السريع

## خطوات التشغيل السريعة

### 1. تثبيت المكتبات
```bash
cd frontend
npm install
```

### 2. تشغيل المشروع
```bash
npm run dev
```

### 3. فتح المتصفح
افتح المتصفح على العنوان: `http://localhost:3000`

## ملاحظات مهمة

### API Backend
يحتاج Dashboard إلى API backend للعمل بشكل كامل. حالياً يستخدم بيانات تجريبية (mock data) في حالة عدم توفر API.

### إعداد API
1. أنشئ ملف `.env` في مجلد `frontend`
2. أضف السطر التالي:
```
VITE_API_URL=http://localhost:5000/api
```

### API Endpoints المطلوبة

يجب أن يوفر Backend الـ endpoints التالية:

#### 1. جلب الطلاب
```
GET /api/students
Response: Student[]
```

#### 2. جلب الإحصائيات
```
GET /api/stats
Response: {
  totalStudents: number,
  totalOpportunities: number,
  averageGPA: number,
  topMajors: { major: string, count: number }[],
  topSkills: { skill: string, count: number }[],
  studentsByMajor: { major: string, count: number }[],
  recentStudents: number
}
```

#### 3. جلب أفضل المرشحين
```
GET /api/candidates/top
Response: Student[]
```

## البناء للإنتاج

```bash
npm run build
```

الملفات المبنية ستكون في مجلد `dist` ويمكن نشرها على أي خادم ويب.

## استكشاف الأخطاء

### المشكلة: لا تظهر البيانات
- تأكد من تشغيل API backend
- تحقق من إعدادات CORS في الـ backend
- راجع console في المتصفح للأخطاء

### المشكلة: الأخطاء في TypeScript
```bash
npm run build
```
سيظهر الأخطاء إن وجدت.

### المشكلة: Tailwind CSS لا يعمل
```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

