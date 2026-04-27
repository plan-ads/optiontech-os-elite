/*
 * Pricing Page - OptionTech OS Elite Intelligence
 * صفحة الباقات الديناميكية
 */

import { useState } from 'react';
import { useAuth } from "@/_core/hooks/useAuth";
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

const plans = [
  {
    id: 'free',
    name: 'مجاني',
    nameEn: 'Free',
    price: 0,
    priceYearly: 0,
    description: 'للبدء والتجربة',
    color: '#00FF88',
    features: [
      'حماية سريعة أساسية',
      'حساب إعلاني واحد',
      'تقارير أسبوعية',
      'دعم عبر البريد',
    ],
    limitations: [
      'بدون حماية نووية',
      'بدون تحليلات متقدمة',
    ],
  },
  {
    id: 'pro',
    name: 'احترافي',
    nameEn: 'Professional',
    price: 99,
    priceYearly: 79,
    description: 'للأعمال المتوسطة',
    color: '#00D4FF',
    popular: true,
    features: [
      'حماية قوية متقدمة',
      'حتى 5 حسابات إعلانية',
      'تقارير يومية',
      'دعم أولوية',
      'تحليلات متقدمة',
      'إشعارات فورية',
    ],
    limitations: [],
  },
  {
    id: 'nuclear',
    name: 'نووي',
    nameEn: 'Nuclear',
    price: 299,
    priceYearly: 249,
    description: 'للشركات الكبرى',
    color: '#FF6B35',
    features: [
      'حماية نووية كاملة',
      'حسابات غير محدودة',
      'تقارير لحظية',
      'دعم VIP 24/7',
      'تحليلات AI متقدمة',
      'مدير حساب مخصص',
      'API كامل',
      'تخصيص كامل',
    ],
    limitations: [],
  },
];

const Pricing = () => {
  const [isYearly, setIsYearly] = useState(false);
  const { isAuthenticated } = useAuth();

  const handleSelectPlan = (planId: string) => {
    if (!isAuthenticated) {
      window.location.href = '/login';
      return;
    }
    // TODO: Implement plan selection
    alert(`تم اختيار الباقة: ${planId}`);
  };

  return (
    <div className="min-h-screen bg-[#050810]">
      <Navigation />
      <main className="pt-32 pb-20">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#00FF88]/10 border border-[#00FF88]/30 rounded-full mb-6">
              <span className="w-2 h-2 bg-[#00FF88] rounded-full animate-pulse"></span>
              <span className="text-[#00FF88] text-sm font-medium">اختر الباقة المناسبة</span>
            </div>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
              خطط <span className="text-transparent bg-clip-text bg-gradient-to-l from-[#00FF88] to-[#00D4FF]">مرنة</span> لكل احتياج
            </h1>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-8">
              ابدأ مجاناً وترقّى عندما تحتاج. جميع الباقات تشمل الحماية الأساسية.
            </p>

            {/* Billing Toggle */}
            <div className="inline-flex items-center gap-4 p-1 bg-[#0a0f1a] border border-gray-800 rounded-full">
              <button
                onClick={() => setIsYearly(false)}
                className={`px-6 py-2 rounded-full font-medium transition-all ${
                  !isYearly
                    ? 'bg-gradient-to-l from-[#00FF88] to-[#00D4FF] text-[#0a0f1a]'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                شهري
              </button>
              <button
                onClick={() => setIsYearly(true)}
                className={`px-6 py-2 rounded-full font-medium transition-all flex items-center gap-2 ${
                  isYearly
                    ? 'bg-gradient-to-l from-[#00FF88] to-[#00D4FF] text-[#0a0f1a]'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                سنوي
                <span className="text-xs bg-[#FF6B35] text-white px-2 py-0.5 rounded-full">
                  وفّر 20%
                </span>
              </button>
            </div>
          </div>

          {/* Plans Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {plans.map((plan) => (
              <div key={plan.id} className="relative group">
                {/* Popular Badge */}
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
                    <div className="px-4 py-1 bg-gradient-to-l from-[#00FF88] to-[#00D4FF] text-[#0a0f1a] text-sm font-bold rounded-full">
                      الأكثر شعبية
                    </div>
                  </div>
                )}

                {/* Glow Effect */}
                <div
                  className={`absolute -inset-0.5 rounded-2xl blur opacity-20 group-hover:opacity-40 transition-opacity`}
                  style={{ background: `linear-gradient(to right, ${plan.color}, ${plan.color}80)` }}
                ></div>

                {/* Card */}
                <div
                  className={`relative bg-[#0a0f1a] rounded-2xl p-8 h-full flex flex-col ${
                    plan.popular ? 'border-2' : 'border'
                  }`}
                  style={{ borderColor: `${plan.color}40` }}
                >
                  {/* Plan Header */}
                  <div className="mb-6">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                      style={{ backgroundColor: `${plan.color}20` }}
                    >
                      <svg
                        className="w-6 h-6"
                        style={{ color: plan.color }}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                        />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-1">{plan.name}</h3>
                    <p className="text-gray-400 text-sm">{plan.description}</p>
                  </div>

                  {/* Price */}
                  <div className="mb-6">
                    <div className="flex items-baseline gap-1">
                      <span className="text-4xl font-bold text-white">
                        ${isYearly ? plan.priceYearly : plan.price}
                      </span>
                      {plan.price > 0 && (
                        <span className="text-gray-400">/شهر</span>
                      )}
                    </div>
                    {isYearly && plan.price > 0 && (
                      <p className="text-sm text-gray-500 mt-1">
                        يُدفع ${plan.priceYearly * 12} سنوياً
                      </p>
                    )}
                  </div>

                  {/* Features */}
                  <div className="flex-1 mb-6">
                    <ul className="space-y-3">
                      {plan.features.map((feature, index) => (
                        <li key={index} className="flex items-center gap-3 text-gray-300">
                          <svg
                            className="w-5 h-5 flex-shrink-0"
                            style={{ color: plan.color }}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                      {plan.limitations.map((limitation, index) => (
                        <li key={index} className="flex items-center gap-3 text-gray-500">
                          <svg
                            className="w-5 h-5 flex-shrink-0"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M6 18L18 6M6 6l12 12"
                            />
                          </svg>
                          <span className="text-sm">{limitation}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* CTA Button */}
                  <button
                    onClick={() => handleSelectPlan(plan.id)}
                    className={`w-full py-3 rounded-xl font-bold transition-all ${
                      plan.popular
                        ? 'bg-gradient-to-l from-[#00FF88] to-[#00D4FF] text-[#0a0f1a] hover:shadow-lg hover:shadow-[#00FF88]/20'
                        : 'border text-white hover:bg-white/5'
                    }`}
                    style={!plan.popular ? { borderColor: `${plan.color}40` } : {}}
                  >
                    {plan.price === 0 ? 'ابدأ مجاناً' : 'اشترك الآن'}
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* FAQ Link */}
          <div className="text-center mt-16">
            <p className="text-gray-400">
              لديك أسئلة؟{' '}
              <a href="/#contact" className="text-[#00FF88] hover:underline">
                تواصل معنا
              </a>
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Pricing;
