/*
 * Units Section - The Four Core Modules
 * Architect, Shield, Mastermind, Command Center
 */

import { useState } from 'react';

const UnitsSection = () => {
  const [activeUnit, setActiveUnit] = useState(0);

  const units = [
    {
      id: 'architect',
      title: 'المهندس المعماري',
      subtitle: 'Campaign Architect',
      description: 'إنشاء حملات إعلانية ذكية تلقائياً بناءً على نوع النشاط التجاري والقطاع والمنطقة الجغرافية.',
      image: '/images/architect-unit.png',
      color: '#00FF88',
      features: [
        'إنشاء حملات مخصصة لكل قطاع (طوارئ، استشارات، خدمات)',
        'اختيار الكلمات المفتاحية الذكية تلقائياً',
        'تحديد الميزانية المثلى بناءً على المنافسة',
        'إعداد التحويلات (مكالمات + واتساب)',
      ],
      stats: { campaigns: '1,200+', keywords: '50K+', accuracy: '94%' },
    },
    {
      id: 'shield',
      title: 'الدرع النووي',
      subtitle: 'Nuclear Shield',
      description: 'حماية متعددة المستويات ضد النقرات الوهمية والمنافسين والروبوتات بدقة 99.7%.',
      image: '/images/shield-unit.png',
      color: '#00D4FF',
      features: [
        'حماية سريعة (مجانية) - الحد الأدنى للجميع',
        'حماية متوسطة - تصفية 70% من التهديدات',
        'حماية قوية - تصفية 90% من التهديدات',
        'حماية نووية - تصفية 99.7% من التهديدات',
      ],
      stats: { blocked: '2.5M+', saved: '$850K+', threats: '99.7%' },
    },
    {
      id: 'mastermind',
      title: 'العقل المدبر',
      subtitle: 'Value Maestro',
      description: 'تحسين العروض والميزانيات تلقائياً بناءً على قيمة العميل ووقت الذروة ونوع الجهاز.',
      image: '/images/brain-unit.png',
      color: '#00FF88',
      features: [
        'نظام الموجة - تعديل العروض بدلاً من الإيقاف',
        'تحليل قيمة العميل (مكالمة 100% / واتساب 90%)',
        'تحسين حسب الوقت (ذروة +50% / هدوء -50%)',
        'التعلم من 500+ حساب لتحسين الجميع',
      ],
      stats: { optimized: '500+', roi: '+40%', decisions: '1M+' },
    },
    {
      id: 'command',
      title: 'مركز القيادة',
      subtitle: 'Command Center',
      description: 'لوحة تحكم موحدة لمراقبة وإدارة جميع الحسابات والحملات من مكان واحد.',
      image: '/images/dashboard-unit.png',
      color: '#00D4FF',
      features: [
        'عرض موحد لجميع الحسابات الـ 500+',
        'تنبيهات فورية للتهديدات والفرص',
        'تقارير أداء تفصيلية بالقطاع والمنطقة',
        'تحكم كامل في جميع الإعدادات',
      ],
      stats: { accounts: '500+', alerts: 'Real-time', reports: '24/7' },
    },
  ];

  return (
    <section id="units" className="relative py-24 bg-[#050810]">
      {/* Background Pattern */}
      <div className="absolute inset-0 hex-pattern opacity-50" />

      <div className="relative container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 rounded-full border border-[#00FF88]/30 bg-[#00FF88]/5 text-[#00FF88] text-sm font-medium mb-6">
            الوحدات الأساسية
          </span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
            أربع وحدات <span className="text-gradient-cyber">متكاملة</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            نظام متكامل يغطي كل جوانب إدارة الإعلانات من الإنشاء إلى الحماية إلى التحسين
          </p>
        </div>

        {/* Units Navigation */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {units.map((unit, index) => (
            <button
              key={unit.id}
              onClick={() => setActiveUnit(index)}
              className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                activeUnit === index
                  ? 'bg-gradient-to-l from-[#00FF88] to-[#00D4FF] text-[#0a0f1a]'
                  : 'bg-[#0a0f1a] border border-[#00FF88]/20 text-gray-300 hover:border-[#00FF88]/50'
              }`}
            >
              {unit.title}
            </button>
          ))}
        </div>

        {/* Active Unit Display */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Image Side */}
          <div className="relative order-2 lg:order-1">
            <div className="relative rounded-2xl overflow-hidden border border-[#00FF88]/20 bg-[#0a0f1a]/50 backdrop-blur-sm">
              <img
                src={units[activeUnit].image}
                alt={units[activeUnit].title}
                className="w-full h-auto object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f1a] via-transparent to-transparent" />
              
              {/* Stats Overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <div className="grid grid-cols-3 gap-4">
                  {Object.entries(units[activeUnit].stats).map(([key, value]) => (
                    <div key={key} className="text-center">
                      <div className="font-display text-2xl font-bold" style={{ color: units[activeUnit].color }}>
                        {value}
                      </div>
                      <div className="text-gray-500 text-xs uppercase">{key}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Decorative Elements */}
            <div
              className="absolute -top-4 -right-4 w-24 h-24 rounded-full blur-3xl opacity-30"
              style={{ backgroundColor: units[activeUnit].color }}
            />
            <div
              className="absolute -bottom-4 -left-4 w-32 h-32 rounded-full blur-3xl opacity-20"
              style={{ backgroundColor: units[activeUnit].color }}
            />
          </div>

          {/* Content Side */}
          <div className="order-1 lg:order-2">
            <div className="inline-flex items-center gap-2 mb-4">
              <span
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: units[activeUnit].color }}
              />
              <span className="text-gray-400 font-mono text-sm">{units[activeUnit].subtitle}</span>
            </div>

            <h3 className="font-display text-3xl sm:text-4xl font-bold text-white mb-4">
              {units[activeUnit].title}
            </h3>

            <p className="text-gray-300 text-lg mb-8 leading-relaxed">
              {units[activeUnit].description}
            </p>

            {/* Features List */}
            <ul className="space-y-4 mb-8">
              {units[activeUnit].features.map((feature, index) => (
                <li key={index} className="flex items-start gap-3">
                  <div
                    className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                    style={{ backgroundColor: `${units[activeUnit].color}20` }}
                  >
                    <svg
                      className="w-4 h-4"
                      style={{ color: units[activeUnit].color }}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-gray-300">{feature}</span>
                </li>
              ))}
            </ul>

            {/* CTA */}
            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all duration-300 hover:scale-105"
              style={{
                backgroundColor: units[activeUnit].color,
                color: '#0a0f1a',
              }}
            >
              <span>اطلب هذه الوحدة</span>
              <svg className="w-5 h-5 rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>
        </div>

        {/* All Units Grid (Mobile) */}
        <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:hidden">
          {units.map((unit, index) => (
            <div
              key={unit.id}
              onClick={() => setActiveUnit(index)}
              className={`p-6 rounded-xl cursor-pointer transition-all duration-300 ${
                activeUnit === index
                  ? 'bg-[#0a0f1a] border-2'
                  : 'bg-[#0a0f1a]/50 border border-[#00FF88]/10 hover:border-[#00FF88]/30'
              }`}
              style={{
                borderColor: activeUnit === index ? unit.color : undefined,
              }}
            >
              <div
                className="w-12 h-12 rounded-lg flex items-center justify-center mb-4"
                style={{ backgroundColor: `${unit.color}20` }}
              >
                <img src={unit.image} alt={unit.title} className="w-8 h-8 object-contain" />
              </div>
              <h4 className="font-display text-lg font-bold text-white mb-2">{unit.title}</h4>
              <p className="text-gray-500 text-sm">{unit.subtitle}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UnitsSection;
