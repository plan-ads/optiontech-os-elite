/*
 * Blog/Knowledge Base Page - OptionTech OS Elite Intelligence
 * المقالات والمعرفة
 */

import { useState } from 'react';
import { Calendar, User, ArrowRight } from 'lucide-react';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  category: string;
  readTime: number;
  image?: string;
}

const blogPosts: BlogPost[] = [
  {
    id: 'blog-1',
    title: 'دليل شامل: كيفية حماية ميزانية Google Ads من النقرات الوهمية',
    excerpt: 'تعرف على أنواع النقرات الوهمية وكيفية كشفها ومنعها بفعالية',
    content: `
النقرات الوهمية تكلف الشركات ملايين الدولارات سنوياً. في هذا الدليل الشامل، سنشرح كل ما تحتاج معرفته عن حماية ميزانيتك الإعلانية.

## ما هي النقرات الوهمية؟

النقرات الوهمية (Invalid Clicks) هي نقرات على إعلاناتك لا تأتي من عملاء حقيقيين. قد تأتي من:
- برامج آلية (Bots)
- منافسين يحاولون استنزاف ميزانيتك
- أشخاص يحاولون الربح من برنامج Google AdSense
- أجهزة مريبة أو مشبوهة

## أنواع النقرات الوهمية

### 1. النقرات الآلية (Automated Clicks)
برامج تقوم بالنقر على الإعلانات تلقائياً. يمكن التعرف عليها من خلال:
- نمط النقر المتكرر والسريع
- نفس IP Address
- نفس Device Fingerprint
- نفس Referrer

### 2. النقرات من المنافسين (Competitor Clicks)
منافسوك قد يحاولون استنزاف ميزانيتك بالنقر على إعلاناتك. مؤشرات:
- نقرات من نطاقات جغرافية معينة
- نقرات في أوقات محددة
- عدم وجود تحويلات
- معدل ارتداد عالي جداً

### 3. النقرات من البرامج الضارة (Malware Clicks)
أجهزة مصابة ببرامج ضارة قد تنقر على الإعلانات تلقائياً.

### 4. النقرات من الأشخاص المهتمين بـ AdSense
أشخاص يحاولون الربح من AdSense بالنقر على الإعلانات.

## كيفية كشف النقرات الوهمية

### المؤشرات الرئيسية:
1. **معدل التحويل المنخفض جداً** - إذا كان لديك آلاف النقرات لكن تحويلات قليلة جداً
2. **معدل الارتداد العالي** - زوار ينقرون ثم يغادرون فوراً
3. **عدم تطابق الجغرافيا** - نقرات من دول لا تستهدفها
4. **أنماط غريبة** - نقرات في أوقات محددة أو من نفس الأجهزة
5. **تكلفة النقرة المرتفعة** - دون زيادة في التحويلات

## كيفية الحماية

### 1. استخدام Google's Built-in Protection
Google توفر حماية أساسية، لكنها ليست كافية. تقدر تقلل النقرات الوهمية بـ 5-10% فقط.

### 2. استخدام أدوات متخصصة
أدوات مثل OptionTech OS توفر حماية متقدمة بـ 90%+ دقة.

### 3. مراقبة الإحصائيات بانتظام
راجع التقارير يومياً وابحث عن أي أنماط غريبة.

### 4. تحديث الكلمات المفتاحية
أضف كلمات مفتاحية سلبية للدول والأجهزة المريبة.

### 5. استخدام الجدولة الزمنية
قلل عرض الإعلانات في الأوقات التي تحدث فيها نقرات وهمية.

## الخلاصة

حماية ميزانيتك من النقرات الوهمية ليست اختيارية - هي ضرورية. استثمر في أداة حماية موثوقة وراقب إحصائياتك بانتظام.
    `,
    author: 'فريق OptionTech',
    date: '2026-01-27',
    category: 'الحماية',
    readTime: 8,
  },
  {
    id: 'blog-2',
    title: 'كيف تعمل خوارزميات كشف الاحتيال المتقدمة؟',
    excerpt: 'اكتشف التقنيات والخوارزميات التي تستخدمها OptionTech لكشف النقرات الوهمية',
    content: `
خوارزميات كشف الاحتيال الحديثة تستخدم تقنيات متقدمة جداً. دعنا نشرح كيف تعمل.

## المعايير الأساسية

### 1. IP Address Analysis
- تحليل جودة IP
- كشف VPN والبروكسيات
- تتبع سجل IP السابق
- كشف Data Centers

### 2. Device Fingerprinting
- معرف الجهاز الفريد
- نوع الجهاز والنظام
- إصدار المتصفح
- الدقة والخطوط المثبتة

### 3. Behavioral Analysis
- سرعة النقر
- الفاصل الزمني بين النقرات
- نمط التمرير والحركة
- وقت البقاء على الصفحة

### 4. Geographic Analysis
- موقع IP
- منطقة زمنية
- موقع الجهاز
- مطابقة مع الموقع المستهدف

## الخوارزميات المتقدمة

### Machine Learning Models
نستخدم نماذج تعلم آلي مدربة على ملايين النقرات لكشف الأنماط.

### Pattern Recognition
كشف الأنماط المريبة والمتكررة.

### Real-time Analysis
تحليل فوري لكل نقرة قبل احتسابها.

## النتيجة

دقة 95%+ في كشف النقرات الوهمية مع معدل خطأ منخفض جداً.
    `,
    author: 'د. أحمد محمود',
    date: '2026-01-25',
    category: 'التقنية',
    readTime: 6,
  },
  {
    id: 'blog-3',
    title: 'دراسة حالة: كيف وفرنا 50,000 دولار لعميل في 3 أشهر',
    excerpt: 'قصة حقيقية عن عميل تعرض لاحتيال كبير وكيف ساعدناه',
    content: `
أحد عملائنا في مجال التجارة الإلكترونية كان يعاني من مشكلة كبيرة: نقرات وهمية تستنزف ميزانيته.

## الوضع الأولي

- ميزانية شهرية: 100,000 دولار
- عدد النقرات: 50,000 نقرة
- عدد التحويلات: 200 تحويل فقط
- معدل التحويل: 0.4% (منخفض جداً)
- تكلفة التحويل: 500 دولار (مرتفع جداً)

## التشخيص

بعد تحليل البيانات، وجدنا أن:
- 40% من النقرات وهمية
- معظمها من أجهزة مريبة
- نمط متكرر من نفس IPs
- معدل ارتداد 85%

## الحل

تطبيق OptionTech OS Elite Intelligence:
1. حجب النقرات الوهمية تلقائياً
2. تحسين استهداف الإعلانات
3. تحديث الكلمات المفتاحية السلبية

## النتائج (بعد 3 أشهر)

- عدد النقرات: 30,000 (تقليل 40%)
- عدد التحويلات: 400 (زيادة 100%)
- معدل التحويل: 1.3% (تحسن 225%)
- تكلفة التحويل: 250 دولار (توفير 50%)
- **التوفير الشهري: 50,000 دولار**

## الدرس المستفاد

الاستثمار في حماية ميزانيتك يعود بفوائد ضخمة على المدى الطويل.
    `,
    author: 'فريق OptionTech',
    date: '2026-01-20',
    category: 'دراسات الحالة',
    readTime: 5,
  },
  {
    id: 'blog-4',
    title: 'أفضل الممارسات: كيفية تحسين ROI في Google Ads',
    excerpt: 'نصائح عملية لتحسين العائد على الاستثمار في حملاتك الإعلانية',
    content: `
تحسين ROI في Google Ads ليس صعباً إذا اتبعت الخطوات الصحيحة.

## 1. استهداف صحيح

- حدد جمهورك بدقة
- استخدم الكلمات المفتاحية الصحيحة
- استبعد الكلمات غير الملائمة

## 2. تحسين الإعلانات

- اكتب عناوين جذابة
- استخدم صور عالية الجودة
- أضف CTA واضح

## 3. حماية الميزانية

- استخدم أداة حماية موثوقة
- راقب الإحصائيات يومياً
- حدد حد أقصى للنقرات الوهمية

## 4. تحسين الصفحة المقصودة

- سرعة تحميل سريعة
- تصميم محسّن للهاتف
- CTA واضح ومرئي

## 5. اختبار والتحسين

- A/B Testing
- تحليل البيانات
- التحسين المستمر

## النتيجة

متابعة هذه الخطوات ستحسن ROI بـ 50-100%.
    `,
    author: 'سارة علي',
    date: '2026-01-15',
    category: 'نصائح',
    readTime: 4,
  },
];

interface BlogCategory {
  name: string;
  count: number;
}

const Blog = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [expandedPostId, setExpandedPostId] = useState<string | null>(null);

  // Get unique categories
  const categories: BlogCategory[] = [
    { name: 'الكل', count: blogPosts.length },
    ...Array.from(new Set(blogPosts.map(post => post.category))).map(cat => ({
      name: cat,
      count: blogPosts.filter(post => post.category === cat).length,
    })),
  ];

  // Filter posts
  const filteredPosts = selectedCategory && selectedCategory !== 'الكل'
    ? blogPosts.filter(post => post.category === selectedCategory)
    : blogPosts;

  return (
    <div className="min-h-screen bg-white dark:bg-[#050810] text-gray-900 dark:text-gray-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-50 to-green-50 dark:from-[#0a0f1a] dark:to-[#0f1520] py-12 px-6">
        <div className="container mx-auto max-w-5xl">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            مدونة OptionTech
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            مقالات وأدلة شاملة عن حماية Google Ads والتسويق الرقمي
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto max-w-5xl py-12 px-6">
        {/* Categories */}
        <div className="mb-12 flex flex-wrap gap-3">
          {categories.map((category) => (
            <button
              key={category.name}
              onClick={() => setSelectedCategory(category.name === 'الكل' ? null : category.name)}
              className={`px-4 py-2 rounded-full font-semibold transition-colors ${
                (selectedCategory === category.name || (!selectedCategory && category.name === 'الكل'))
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
            >
              {category.name} ({category.count})
            </button>
          ))}
        </div>

        {/* Blog Posts */}
        <div className="space-y-6">
          {filteredPosts.map((post) => (
            <div
              key={post.id}
              className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow"
            >
              {/* Post Header */}
              <button
                onClick={() => setExpandedPostId(expandedPostId === post.id ? null : post.id)}
                className="w-full text-right p-6 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                      {post.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                      {post.excerpt}
                    </p>

                    {/* Meta Information */}
                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span>{new Date(post.date).toLocaleDateString('ar-EG')}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <User className="w-4 h-4" />
                        <span>{post.author}</span>
                      </div>
                      <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-3 py-1 rounded-full text-xs">
                        {post.category}
                      </span>
                      <span className="text-gray-500 dark:text-gray-400">
                        وقت القراءة: {post.readTime} دقائق
                      </span>
                    </div>
                  </div>

                  <ArrowRight
                    className={`w-5 h-5 text-gray-600 dark:text-gray-400 flex-shrink-0 transition-transform ${
                      expandedPostId === post.id ? 'transform rotate-180' : ''
                    }`}
                  />
                </div>
              </button>

              {/* Post Content */}
              {expandedPostId === post.id && (
                <div className="px-6 pb-6 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50">
                  <div className="prose dark:prose-invert max-w-none">
                    {post.content.split('\n').map((paragraph, idx) => {
                      if (paragraph.startsWith('## ')) {
                        return (
                          <h2 key={idx} className="text-xl font-bold mt-6 mb-3 text-gray-900 dark:text-white">
                            {paragraph.replace('## ', '')}
                          </h2>
                        );
                      }
                      if (paragraph.startsWith('### ')) {
                        return (
                          <h3 key={idx} className="text-lg font-semibold mt-4 mb-2 text-gray-800 dark:text-gray-200">
                            {paragraph.replace('### ', '')}
                          </h3>
                        );
                      }
                      if (paragraph.startsWith('- ')) {
                        return (
                          <li key={idx} className="text-gray-700 dark:text-gray-300 ml-4">
                            {paragraph.replace('- ', '')}
                          </li>
                        );
                      }
                      if (paragraph.trim()) {
                        return (
                          <p key={idx} className="text-gray-700 dark:text-gray-300 mb-3 leading-relaxed">
                            {paragraph}
                          </p>
                        );
                      }
                      return null;
                    })}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-16 bg-gradient-to-r from-blue-50 to-green-50 dark:from-blue-900/20 dark:to-green-900/20 p-8 rounded-lg text-center">
          <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
            هل تريد مزيد من المعلومات؟
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            اشترك في نشرتنا البريدية للحصول على أحدث المقالات والنصائح
          </p>
          <form className="flex gap-2 max-w-md mx-auto">
            <input
              type="email"
              placeholder="بريدك الإلكتروني"
              className="flex-1 px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            />
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
            >
              اشترك
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Blog;
