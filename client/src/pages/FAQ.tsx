/*
 * FAQ Page - OptionTech OS Elite Intelligence
 * الأسئلة الشائعة
 */

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface FAQItem {
  id: string;
  category: string;
  question: string;
  answer: string;
}

const faqItems: FAQItem[] = [
  // عام
  {
    id: 'general-1',
    category: 'عام',
    question: 'ما هي خدمة OptionTech OS Elite Intelligence؟',
    answer: 'OptionTech OS Elite Intelligence هي منصة ذكية متقدمة لحماية حسابات Google Ads من النقرات الوهمية والاحتيالية. تستخدم تقنيات AI وتحليل بيانات متقدمة لكشف وحجب النقرات المريبة تلقائياً، مما يوفر ميزانيتك الإعلانية.'
  },
  {
    id: 'general-2',
    category: 'عام',
    question: 'كيف تعمل المنصة؟',
    answer: 'المنصة تتصل بحسابك في Google Ads وتراقب جميع النقرات بشكل فوري. تحلل كل نقرة بناءً على عشرات المعايير (IP، Device، Location، Behavior، إلخ) وتحدد ما إذا كانت نقرة حقيقية أم وهمية. النقرات الوهمية يتم حجبها تلقائياً قبل احتسابها في الفاتورة.'
  },
  {
    id: 'general-3',
    category: 'عام',
    question: 'هل المنصة آمنة؟',
    answer: 'نعم، المنصة آمنة جداً. نستخدم تشفير SSL/TLS، OAuth 2.0 للمصادقة، وتخزين آمن للبيانات. لا نحفظ كلمات المرور، ولا نشارك بيانات حسابك مع أطراف ثالثة. جميع البيانات محمية بموجب سياسة الخصوصية.'
  },
  {
    id: 'general-4',
    category: 'عام',
    question: 'هل تدعمون جميع دول العالم؟',
    answer: 'نعم، المنصة متاحة لجميع دول العالم. ندعم جميع عملات Google Ads والأسواق العالمية. الواجهة متاحة بالعربية والإنجليزية.'
  },

  // الأسعار
  {
    id: 'pricing-1',
    category: 'الأسعار',
    question: 'ما هي خطط الأسعار المتاحة؟',
    answer: 'نقدم 3 خطط: Starter (للشركات الصغيرة)، Professional (للشركات المتوسطة)، و Enterprise (للشركات الكبيرة). كل خطة توفر ميزات مختلفة وحدود نقرات مختلفة. يمكنك الاطلاع على جميع الخطط وتفاصيلها في صفحة الأسعار.'
  },
  {
    id: 'pricing-2',
    category: 'الأسعار',
    question: 'هل هناك نسخة تجريبية مجانية؟',
    answer: 'نعم، نقدم نسخة تجريبية مجانية لمدة 14 يوم. يمكنك تجربة جميع الميزات بدون الحاجة لإدخال بيانات بطاقة ائتمان. بعد انتهاء الفترة التجريبية، يمكنك اختيار الخطة المناسبة.'
  },
  {
    id: 'pricing-3',
    category: 'الأسعار',
    question: 'هل يمكن تغيير الخطة في أي وقت؟',
    answer: 'نعم، يمكنك تغيير الخطة في أي وقت. إذا ترقيت إلى خطة أعلى، سيتم احتساب الفرق بشكل متناسب. إذا خفضت إلى خطة أقل، سيتم استرجاع الفرق في الفاتورة التالية.'
  },
  {
    id: 'pricing-4',
    category: 'الأسعار',
    question: 'هل هناك خصومات للعقود السنوية؟',
    answer: 'نعم، نقدم خصم 20% على العقود السنوية و 10% على العقود نصف السنوية. كلما طالت مدة العقد، كلما زاد الخصم.'
  },

  // الحماية والأمان
  {
    id: 'security-1',
    category: 'الحماية والأمان',
    question: 'كيف تكتشفون النقرات الوهمية؟',
    answer: 'نستخدم خوارزميات AI متقدمة تحلل أكثر من 50 معيار لكل نقرة: IP Address، Device Type، Browser، Operating System، Location، Behavior Pattern، Click Timing، User Agent، Referrer، إلخ. النقرات التي تطابق أنماط احتيالية معروفة يتم حجبها فوراً.'
  },
  {
    id: 'security-2',
    category: 'الحماية والأمان',
    question: 'هل يمكن للمنصة أن تحجب نقرات حقيقية بالخطأ؟',
    answer: 'نعم، احتمالية صغيرة جداً موجودة. لكننا نستخدم تقنيات متقدمة لتقليل False Positives. كل نقرة يتم تحليلها بدقة عالية. إذا حدث خطأ، يمكنك الاستئناف وسنراجع الحالة يدوياً.'
  },
  {
    id: 'security-3',
    category: 'الحماية والأمان',
    question: 'ما هي نسبة النقرات الوهمية التي تكتشفونها؟',
    answer: 'المتوسط العام هو 15-25% من النقرات الكلية، لكن هذا يختلف حسب نوع الصناعة والمنافسة. بعض الصناعات تتعرض لنسب أعلى (حتى 50%)، وأخرى أقل. سترى إحصائيات دقيقة في لوحة التحكم.'
  },
  {
    id: 'security-4',
    category: 'الحماية والأمان',
    question: 'هل تحمون من جميع أنواع الاحتيال؟',
    answer: 'نحمي من: النقرات الآلية (Bots)، النقرات من المنافسين، النقرات من الدول المستبعدة، النقرات من أجهزة مريبة، النقرات المتكررة من نفس IP، إلخ. لكن لا يمكن حماية 100% من جميع الحالات.'
  },

  // الربط والتكامل
  {
    id: 'integration-1',
    category: 'الربط والتكامل',
    question: 'كيف أربط حسابي في Google Ads؟',
    answer: 'الربط سهل جداً: 1) انقر على "ربط حسابك" 2) سجل دخول بحسابك في Google 3) وافق على الأذونات 4) تم! سيبدأ التحليل فوراً. لا تحتاج لإدخال كلمة المرور.'
  },
  {
    id: 'integration-2',
    category: 'الربط والتكامل',
    question: 'هل يمكن ربط عدة حسابات Google Ads؟',
    answer: 'نعم، يمكنك ربط عدة حسابات. كل حساب سيكون له لوحة تحكم منفصلة. يمكنك الانتقال بينها بسهولة من القائمة الجانبية.'
  },
  {
    id: 'integration-3',
    category: 'الربط والتكامل',
    question: 'هل يمكن فصل حسابي في أي وقت؟',
    answer: 'نعم، يمكنك فصل حسابك في أي وقت من الإعدادات. سيتم إيقاف الحماية فوراً. لن نحتفظ ببيانات حسابك بعد الفصل.'
  },

  // الإحصائيات والتقارير
  {
    id: 'analytics-1',
    category: 'الإحصائيات والتقارير',
    question: 'ما هي الإحصائيات المتاحة؟',
    answer: 'لوحة التحكم توفر: عدد النقرات الكلية، النقرات الوهمية المكتشفة، نسبة الاحتيال، التوفير المالي، أنواع الاحتيال الأكثر شيوعاً، توزيع النقرات حسب الدول والأجهزة، الرسوم البيانية والتقارير المفصلة.'
  },
  {
    id: 'analytics-2',
    category: 'الإحصائيات والتقارير',
    question: 'هل يمكن تحميل التقارير؟',
    answer: 'نعم، يمكنك تحميل التقارير بصيغة PDF أو CSV. التقارير تتضمن جميع الإحصائيات والتفاصيل. يمكنك اختيار نطاق التاريخ المطلوب.'
  },
  {
    id: 'analytics-3',
    category: 'الإحصائيات والتقارير',
    question: 'هل هناك تنبيهات فورية؟',
    answer: 'نعم، يمكنك تفعيل التنبيهات البريدية. ستتلقى إشعارات عند: اكتشاف موجة احتيال، تجاوز حد معين من النقرات الوهمية، أي نشاط مريب. يمكنك تخصيص التنبيهات من الإعدادات.'
  },

  // الدعم والمساعدة
  {
    id: 'support-1',
    category: 'الدعم والمساعدة',
    question: 'كيف يمكنني الاتصال بفريق الدعم؟',
    answer: 'يمكنك التواصل معنا عبر: البريد الإلكتروني (support@optiontechos.com)، الدردشة الحية (متاحة 24/7)، أو ملء نموذج الاتصال. فريق الدعم يرد خلال ساعة واحدة.'
  },
  {
    id: 'support-2',
    category: 'الدعم والمساعدة',
    question: 'هل هناك دليل استخدام أو فيديوهات تعليمية؟',
    answer: 'نعم، لدينا: مقالات تعليمية شاملة، فيديوهات توضيحية، ويبينارات مباشرة، وقسم FAQ كامل. كل شيء متاح في قسم المساعدة.'
  },
  {
    id: 'support-3',
    category: 'الدعم والمساعدة',
    question: 'هل هناك ضمان رضا العملاء؟',
    answer: 'نعم، نقدم ضمان 30 يوم لاسترجاع الأموال بدون أسئلة. إذا لم تكن راضياً عن الخدمة، يمكنك استرجاع كامل المبلغ.'
  },
];

interface FAQCategory {
  name: string;
  items: FAQItem[];
}

const FAQ = () => {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  // Group items by category
  const categories: FAQCategory[] = [
    { name: 'عام', items: faqItems.filter(item => item.category === 'عام') },
    { name: 'الأسعار', items: faqItems.filter(item => item.category === 'الأسعار') },
    { name: 'الحماية والأمان', items: faqItems.filter(item => item.category === 'الحماية والأمان') },
    { name: 'الربط والتكامل', items: faqItems.filter(item => item.category === 'الربط والتكامل') },
    { name: 'الإحصائيات والتقارير', items: faqItems.filter(item => item.category === 'الإحصائيات والتقارير') },
    { name: 'الدعم والمساعدة', items: faqItems.filter(item => item.category === 'الدعم والمساعدة') },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-[#050810] text-gray-900 dark:text-gray-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-50 to-green-50 dark:from-[#0a0f1a] dark:to-[#0f1520] py-12 px-6">
        <div className="container mx-auto max-w-4xl">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            الأسئلة الشائعة
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            إجابات على أكثر الأسئلة التي يطرحها عملاؤنا
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto max-w-4xl py-12 px-6">
        {categories.map((category) => (
          <div key={category.name} className="mb-12">
            <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
              {category.name}
            </h2>

            <div className="space-y-3">
              {category.items.map((item) => (
                <div
                  key={item.id}
                  className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden hover:shadow-md transition-shadow"
                >
                  <button
                    onClick={() => setExpandedId(expandedId === item.id ? null : item.id)}
                    className="w-full px-6 py-4 text-right flex items-center justify-between bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  >
                    <span className="text-lg font-semibold text-gray-900 dark:text-white">
                      {item.question}
                    </span>
                    <ChevronDown
                      className={`w-5 h-5 text-gray-600 dark:text-gray-400 transition-transform ${
                        expandedId === item.id ? 'transform rotate-180' : ''
                      }`}
                    />
                  </button>

                  {expandedId === item.id && (
                    <div className="px-6 py-4 bg-white dark:bg-gray-900/50 border-t border-gray-200 dark:border-gray-700">
                      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                        {item.answer}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* CTA Section */}
        <div className="mt-16 bg-gradient-to-r from-blue-50 to-green-50 dark:from-blue-900/20 dark:to-green-900/20 p-8 rounded-lg text-center">
          <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
            لم تجد الإجابة التي تبحث عنها؟
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            فريق الدعم الخاص بنا متاح 24/7 للإجابة على جميع أسئلتك
          </p>
          <a
            href="mailto:support@optiontechos.com"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors"
          >
            تواصل معنا
          </a>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
