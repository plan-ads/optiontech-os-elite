/*
 * Hero Section - Cyber Command Center Style
 * Full-screen hero with animated background and powerful CTA
 */

import { useEffect, useState } from 'react';

const HeroSection = () => {
  const [typedText, setTypedText] = useState('');
  const fullText = 'نظام الذكاء الإعلاني المتكامل';

  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      if (index <= fullText.length) {
        setTypedText(fullText.slice(0, index));
        index++;
      } else {
        clearInterval(timer);
      }
    }, 80);
    return () => clearInterval(timer);
  }, []);

  const stats = [
    { value: '500+', label: 'حساب إعلاني', icon: '📊' },
    { value: '99.7%', label: 'دقة الحماية', icon: '🛡️' },
    { value: '24/7', label: 'مراقبة مستمرة', icon: '⚡' },
    { value: '40%', label: 'توفير في الميزانية', icon: '💰' },
  ];

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden" aria-label="الصفحة الرئيسية - حماية إعلانات جوجل من النقرات الوهمية">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img
          src="/images/hero-bg.png"
          alt="مركز التحكم الذكي لحماية إعلانات جوجل من النقرات الاحتيالية والوهمية"
          className="w-full h-full object-cover"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#050810]/80 via-[#0a0f1a]/70 to-[#0a0f1a]" />
      </div>

      {/* Animated Grid Overlay */}
      <div className="absolute inset-0 cyber-grid opacity-30" />

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-[#00FF88] rounded-full opacity-60"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${5 + Math.random() * 5}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 pt-24">
        <div className="max-w-5xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#00FF88]/30 bg-[#00FF88]/5 mb-8 backdrop-blur-sm">
            <span className="w-2 h-2 rounded-full bg-[#00FF88] animate-pulse" />
            <span className="text-[#00FF88] text-sm font-medium">الجيل الجديد من إدارة الإعلانات</span>
          </div>

          {/* Main Heading */}
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            <span className="text-white">OptionTech</span>
            <span className="text-gradient-cyber mr-3">OS</span>
            <br />
            <span className="text-white text-3xl sm:text-4xl md:text-5xl">Elite Intelligence</span>
            <span className="sr-only"> - نظام حماية إعلانات جوجل من النقرات الوهمية والاحتيالية</span>
          </h1>

          {/* Typed Subtitle */}
          <div className="h-12 mb-8">
            <p className="text-xl sm:text-2xl md:text-3xl text-gray-300">
              {typedText}
              <span className="typing-cursor" />
            </p>
          </div>

          {/* Description */}
          <p className="text-lg sm:text-xl text-gray-400 max-w-3xl mx-auto mb-12 leading-relaxed">
            ربط حسابك الإعلاني وابدأ التحسن الفوري. <span className="text-[#00FF88]">بدون خطوات معقدة</span>,
            بدون رسوم مختفية. <span className="text-[#00D4FF]">ربط سريع وآمن</span> والباقي علينا.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <a
              href="/pricing"
              className="group relative inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-l from-[#00FF88] to-[#00D4FF] text-[#0a0f1a] rounded-lg font-bold text-lg overflow-hidden transition-transform hover:scale-105"
            >
              <span className="relative z-10">ابدأ الآن</span>
              <svg className="w-6 h-6 relative z-10 rotate-180 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
              <div className="absolute inset-0 bg-white/20 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            </a>
            <a
              href="#units"
              className="inline-flex items-center gap-3 px-8 py-4 border border-[#00FF88]/50 text-[#00FF88] rounded-lg font-semibold text-lg hover:bg-[#00FF88]/10 transition-colors"
            >
              <span>اكتشف الوحدات</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </a>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="relative group p-6 rounded-xl bg-[#0a0f1a]/50 border border-[#00FF88]/10 backdrop-blur-sm hover:border-[#00FF88]/30 transition-all duration-300"
              >
                <div className="absolute inset-0 rounded-xl bg-gradient-to-b from-[#00FF88]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative">
                  <span className="text-2xl mb-2 block">{stat.icon}</span>
                  <div className="font-display text-3xl sm:text-4xl font-bold text-[#00FF88] mb-1">{stat.value}</div>
                  <div className="text-gray-400 text-sm">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
        <span className="text-gray-500 text-sm">اكتشف المزيد</span>
        <svg className="w-6 h-6 text-[#00FF88]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  );
};

export default HeroSection;
