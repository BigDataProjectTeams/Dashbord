# Najah University - Opportunity Matcher Dashboard

لوحة تحكم احترافية لنظام مطابقة الفرص الأكاديمية والمهنية لطلاب جامعة النجاح.

## المميزات

- 📊 **إحصائيات شاملة**: عرض إحصائيات مفصلة عن الطلاب والفرص المتاحة
- 🏆 **أفضل المرشحين**: قائمة بأفضل الطلاب المؤهلين للفرص
- 📈 **رسوم بيانية تفاعلية**: رسوم بيانية لتوزيع الطلاب والمهارات
- 🔍 **بحث وفلترة متقدمة**: بحث في قائمة الطلاب وفلترة حسب التخصص
- 🎨 **تصميم عصري**: واجهة مستخدم احترافية وسهلة الاستخدام
- 🔄 **تحديث تلقائي**: تحديث البيانات كل 30 ثانية

## التقنيات المستخدمة

- **React 18** - مكتبة JavaScript لبناء واجهات المستخدم
- **TypeScript** - لغة برمجة موثوقة
- **Vite** - أداة بناء سريعة
- **Tailwind CSS** - إطار عمل CSS
- **Recharts** - مكتبة الرسوم البيانية
- **Lucide React** - أيقونات حديثة
- **Axios** - للاتصال بالـ API

## التثبيت والتشغيل

### المتطلبات

- Node.js 18+ 
- npm أو yarn

### خطوات التثبيت

1. الانتقال إلى مجلد frontend:
```bash
cd frontend
```

2. تثبيت المكتبات:
```bash
npm install
```

3. إنشاء ملف `.env` (اختياري):
```bash
VITE_API_URL=http://localhost:5000/api
```

4. تشغيل المشروع:
```bash
npm run dev
```

5. فتح المتصفح على:
```
http://localhost:3000
```

## البنية

```
frontend/
├── src/
│   ├── components/          # مكونات React
│   │   ├── Dashboard.tsx    # المكون الرئيسي
│   │   ├── Header.tsx       # رأس الصفحة
│   │   ├── StatisticsCards.tsx  # بطاقات الإحصائيات
│   │   ├── TopCandidates.tsx    # أفضل المرشحين
│   │   ├── ChartsSection.tsx    # الرسوم البيانية
│   │   └── StudentsTable.tsx    # جدول الطلاب
│   ├── services/
│   │   └── api.ts           # خدمات API
│   ├── types/
│   │   └── index.ts         # تعريفات TypeScript
│   ├── App.tsx              # المكون الرئيسي للتطبيق
│   ├── main.tsx             # نقطة الدخول
│   └── index.css            # الأنماط العامة
├── package.json
├── tsconfig.json
├── vite.config.ts
└── tailwind.config.js
```

## API Endpoints المطلوبة

يحتاج Dashboard إلى API endpoints التالية:

- `GET /api/students` - جلب قائمة الطلاب
- `GET /api/stats` - جلب الإحصائيات
- `GET /api/candidates/top` - جلب أفضل المرشحين
- `GET /api/candidates/:opportunityId` - جلب المرشحين لفرصة محددة

## البناء للإنتاج

```bash
npm run build
```

الملفات المبنية ستكون في مجلد `dist`.

## الترخيص

هذا المشروع جزء من مشروع Najah University Opportunity Matcher.

