/*
 * Comparison Section - OptionTech vs Competitors
 * Showing advantages over Lunio, ClickCease, and others
 */

const ComparisonSection = () => {
  const competitors = [
    { name: 'Lunio', logo: '🔵' },
    { name: 'ClickCease', logo: '🔴' },
    { name: 'ClickGUARD', logo: '🟡' },
  ];

  const features = [
    {
      category: 'الحماية',
      items: [
        { name: 'حماية من النقرات الوهمية', optiontech: true, others: [true, true, true] },
        { name: 'حماية متعددة المستويات (4 مستويات)', optiontech: true, others: [false, false, false] },
        { name: 'حماية نووية (99.7%)', optiontech: true, others: [false, false, false] },
        { name: 'تعلم من 500+ حساب', optiontech: true, others: [false, false, false] },
      ],
    },
    {
      category: 'الإدارة',
      items: [
        { name: 'إنشاء حملات تلقائي', optiontech: true, others: [false, false, false] },
        { name: 'تحسين العروض الذكي', optiontech: true, others: [false, false, false] },
        { name: 'نظام الموجة (بدلاً من الإيقاف)', optiontech: true, others: [false, false, false] },
        { name: 'إدارة MCC (500+ حساب)', optiontech: true, others: [false, false, false] },
      ],
    },
    {
      category: 'التحليل',
      items: [
        { name: 'تحليل قيمة العميل', optiontech: true, others: [false, false, false] },
        { name: 'تقسيم حسب القطاع', optiontech: true, others: [false, false, false] },
        { name: 'تحليل جغرافي متقدم', optiontech: true, others: [true, true, false] },
        { name: 'تقارير بالعربية', optiontech: true, others: [false, false, false] },
      ],
    },
    {
      category: 'التسعير',
      items: [
        { name: 'نسخة مجانية فعالة', optiontech: true, others: [false, true, false] },
        { name: 'بدون عقود طويلة', optiontech: true, others: [false, false, false] },
        { name: 'دعم بالعربية', optiontech: true, others: [false, false, false] },
        { name: 'تخصيص حسب الاحتياج', optiontech: true, others: [false, false, false] },
      ],
    },
  ];

  const advantages = [
    {
      icon: '🎯',
      title: 'مصمم للسوق السعودي',
      description: 'فهم عميق لطبيعة الأعمال المحلية والقطاعات الخدمية',
    },
    {
      icon: '🧠',
      title: 'ذكاء جماعي',
      description: 'التعلم من 500+ حساب لتحسين أداء الجميع',
    },
    {
      icon: '⚡',
      title: 'نظام الموجة',
      description: 'تعديل العروض بدلاً من إيقاف الحملات',
    },
    {
      icon: '🛡️',
      title: 'حماية متدرجة',
      description: '4 مستويات حماية تناسب كل ميزانية',
    },
  ];

  return (
    <section id="comparison" className="relative py-24 bg-[#0a0f1a]">
      {/* Background */}
      <div className="absolute inset-0 cyber-grid opacity-20" />

      <div className="relative container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 rounded-full border border-[#00D4FF]/30 bg-[#00D4FF]/5 text-[#00D4FF] text-sm font-medium mb-6">
            لماذا نحن؟
          </span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
            مقارنة مع <span className="text-gradient-cyber">المنافسين</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            نتفوق على الحلول العالمية بميزات مصممة خصيصاً للسوق العربي
          </p>
        </div>

        {/* Comparison Table */}
        <div className="overflow-x-auto mb-16">
          <div className="min-w-[800px]">
            {/* Table Header */}
            <div className="grid grid-cols-5 gap-4 mb-4 px-6">
              <div className="col-span-1"></div>
              <div className="text-center">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-l from-[#00FF88] to-[#00D4FF]">
                  <span className="font-display font-bold text-[#0a0f1a]">OptionTech OS</span>
                </div>
              </div>
              {competitors.map((comp) => (
                <div key={comp.name} className="text-center">
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#1a1f2e] border border-gray-700">
                    <span className="text-xl">{comp.logo}</span>
                    <span className="text-gray-400">{comp.name}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Table Body */}
            {features.map((category) => (
              <div key={category.category} className="mb-6">
                <div className="px-6 py-3 bg-[#0a0f1a] border-r-4 border-[#00FF88] mb-2">
                  <span className="font-bold text-white">{category.category}</span>
                </div>
                {category.items.map((item, index) => (
                  <div
                    key={index}
                    className="grid grid-cols-5 gap-4 px-6 py-4 bg-[#0f1420] hover:bg-[#141925] transition-colors border-b border-gray-800/50"
                  >
                    <div className="text-gray-300">{item.name}</div>
                    <div className="text-center">
                      {item.optiontech ? (
                        <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-[#00FF88]/20">
                          <svg className="w-5 h-5 text-[#00FF88]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        </span>
                      ) : (
                        <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-red-500/20">
                          <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </span>
                      )}
                    </div>
                    {item.others.map((hasFeature, i) => (
                      <div key={i} className="text-center">
                        {hasFeature ? (
                          <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-gray-600/20">
                            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          </span>
                        ) : (
                          <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-red-500/10">
                            <svg className="w-5 h-5 text-red-400/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Advantages Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {advantages.map((adv, index) => (
            <div
              key={index}
              className="group p-6 rounded-xl bg-[#0f1420] border border-[#00FF88]/10 hover:border-[#00FF88]/30 transition-all duration-300"
            >
              <div className="text-4xl mb-4">{adv.icon}</div>
              <h4 className="font-display text-xl font-bold text-white mb-2">{adv.title}</h4>
              <p className="text-gray-400">{adv.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ComparisonSection;
