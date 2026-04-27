/*
 * Pricing Section - Free vs Paid Plans
 * Showing the value proposition of each tier
 */

import { useState } from 'react';

const PricingSection = () => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');

  const plans = [
    {
      name: 'مجاني',
      subtitle: 'مدى الحياة',
      price: { monthly: 0, yearly: 0 },
      description: 'حماية أساسية لجميع الحسابات',
      trial: 'بدون تجربة',
      color: '#6B7280',
      popular: false,
      features: [
        { text: 'حماية سريعة (مستوى 1)', included: true },
        { text: 'مراقبة النقرات المشبوهة', included: true },
        { text: 'تقارير أسبوعية', included: true },
        { text: 'دعم عبر البريد', included: true },
        { text: 'حماية متوسطة', included: false },
        { text: 'تحسين العروض التلقائي', included: false },
        { text: 'إنشاء حملات ذكي', included: false },
        { text: 'دعم أولوية', included: false },
      ],
      cta: 'ابدأ مجاناً',
      ctaStyle: 'outline',
    },
    {
      name: 'احترافي',
      subtitle: 'الأكثر شيوعاً',
      price: { monthly: 499, yearly: 399 },
      description: 'حماية متقدمة + تحسين ذكي',
      trial: 'شهر تجربة مجاني',
      color: '#00FF88',
      popular: true,
      features: [
        { text: 'حماية قوية (مستوى 3)', included: true },
        { text: 'حماية من المنافسين', included: true },
        { text: 'تحسين العروض التلقائي', included: true },
        { text: 'تقارير يومية مفصلة', included: true },
        { text: 'نظام الموجة الذكي', included: true },
        { text: 'تحليل قيمة العميل', included: true },
        { text: 'دعم أولوية 24/7', included: true },
        { text: 'حماية نووية', included: false },
      ],
      cta: 'اشترك الآن',
      ctaStyle: 'primary',
    },
    {
      name: 'نووي',
      subtitle: 'للشركات الكبرى',
      price: { monthly: 999, yearly: 799 },
      description: 'أقصى حماية + إدارة كاملة',
      trial: 'شهر تجربة مجاني',
      color: '#00D4FF',
      popular: false,
      features: [
        { text: 'حماية نووية (99.7%)', included: true },
        { text: 'إنشاء حملات تلقائي', included: true },
        { text: 'إدارة MCC كاملة', included: true },
        { text: 'تقارير لحظية', included: true },
        { text: 'تعلم من 500+ حساب', included: true },
        { text: 'تخصيص حسب القطاع', included: true },
        { text: 'مدير حساب مخصص', included: true },
        { text: 'API كامل', included: true },
      ],
      cta: 'تواصل معنا',
      ctaStyle: 'secondary',
    },
  ];

  return (
    <section id="pricing" className="relative py-24 bg-[#050810]">
      {/* Background */}
      <div className="absolute inset-0 hex-pattern opacity-30" />

      <div className="relative container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 rounded-full border border-[#00FF88]/30 bg-[#00FF88]/5 text-[#00FF88] text-sm font-medium mb-6">
            خطط الأسعار
          </span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
            اختر الخطة <span className="text-gradient-cyber">المناسبة</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-8">
            خطط مرنة تناسب جميع الأحجام - من الحسابات الفردية إلى الشركات الكبرى
          </p>

          {/* Billing Toggle */}
          <div className="inline-flex items-center gap-4 p-2 rounded-lg bg-[#0a0f1a] border border-[#00FF88]/20">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-6 py-2 rounded-md font-medium transition-all ${
                billingCycle === 'monthly'
                  ? 'bg-[#00FF88] text-[#0a0f1a]'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              شهري
            </button>
            <button
              onClick={() => setBillingCycle('yearly')}
              className={`px-6 py-2 rounded-md font-medium transition-all ${
                billingCycle === 'yearly'
                  ? 'bg-[#00FF88] text-[#0a0f1a]'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              سنوي
              <span className="mr-2 text-xs bg-[#00D4FF] text-[#0a0f1a] px-2 py-0.5 rounded-full">
                وفر 20%
              </span>
            </button>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative rounded-2xl p-8 transition-all duration-300 hover:scale-105 ${
                plan.popular
                  ? 'bg-gradient-to-b from-[#0f1420] to-[#0a0f1a] border-2 border-[#00FF88] shadow-[0_0_40px_rgba(0,255,136,0.2)]'
                  : 'bg-[#0f1420] border border-gray-800 hover:border-gray-700'
              }`}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="px-4 py-1 rounded-full bg-gradient-to-l from-[#00FF88] to-[#00D4FF] text-[#0a0f1a] text-sm font-bold">
                    الأكثر شيوعاً
                  </span>
                </div>
              )}

              {/* Plan Header */}
              <div className="text-center mb-8">
                <h3 className="font-display text-2xl font-bold text-white mb-1">{plan.name}</h3>
                <p className="text-gray-500 text-sm">{plan.subtitle}</p>
              </div>

              {/* Price */}
              <div className="text-center mb-8">
                <div className="flex items-baseline justify-center gap-1">
                  <span className="font-display text-5xl font-bold" style={{ color: plan.color }}>
                    {plan.price[billingCycle]}
                  </span>
                  <span className="text-gray-400">ر.س</span>
                </div>
                <p className="text-gray-500 text-sm mt-2">
                  {plan.price[billingCycle] === 0 ? 'مجاناً للأبد' : `/ ${billingCycle === 'monthly' ? 'شهرياً' : 'شهرياً (يدفع سنوياً)'}`}
                </p>
              </div>

              {/* Trial Badge */}
              {plan.trial && (
                <div className="text-center mb-4">
                  <span className="inline-block px-3 py-1 rounded-full bg-[#00FF88]/10 border border-[#00FF88]/30 text-[#00FF88] text-xs font-medium">
                    {plan.trial}
                  </span>
                </div>
              )}

              {/* Description */}
              <p className="text-gray-400 text-center mb-8">{plan.description}</p>

              {/* Features */}
              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-3">
                    {feature.included ? (
                      <svg className="w-5 h-5 text-[#00FF88] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5 text-gray-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    )}
                    <span className={feature.included ? 'text-gray-300' : 'text-gray-600'}>{feature.text}</span>
                  </li>
                ))}
              </ul>

              {/* CTA Button */}
              <a
                href="#contact"
                className={`block w-full py-4 rounded-lg font-bold text-center transition-all duration-300 ${
                  plan.ctaStyle === 'primary'
                    ? 'bg-gradient-to-l from-[#00FF88] to-[#00D4FF] text-[#0a0f1a] hover:shadow-[0_0_30px_rgba(0,255,136,0.4)]'
                    : plan.ctaStyle === 'secondary'
                    ? 'bg-[#00D4FF] text-[#0a0f1a] hover:bg-[#00D4FF]/90'
                    : 'border border-gray-600 text-gray-300 hover:border-[#00FF88] hover:text-[#00FF88]'
                }`}
              >
                {plan.cta}
              </a>
            </div>
          ))}
        </div>

        {/* Bottom Note */}
        <div className="text-center mt-12">
          <p className="text-gray-500">
            جميع الخطط تشمل: تحديثات مجانية • بدون عقود طويلة • إلغاء في أي وقت
          </p>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
