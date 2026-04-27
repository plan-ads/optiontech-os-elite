/*
 * Contact Section - Get in Touch Form
 * Professional contact form with cyber styling
 */

import { useState } from 'react';


const ContactSection = () => {
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    accounts: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500));

    alert('تم إرسال رسالتك بنجاح! سنتواصل معك خلال 24 ساعة');

    setFormData({
      name: '',
      email: '',
      phone: '',
      company: '',
      accounts: '',
      message: '',
    });
    setIsSubmitting(false);
  };

  const contactInfo = [
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      label: 'البريد الإلكتروني',
      value: 'info@optiontech-os.com',
      href: 'mailto:info@optiontech-os.com',
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
      ),
      label: 'الهاتف',
      value: '+966 50 000 0000',
      href: 'tel:+966500000000',
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      ),
      label: 'واتساب',
      value: '+966 50 000 0000',
      href: 'https://wa.me/966500000000',
    },
  ];

  return (
    <section id="contact" className="relative py-24 bg-[#0a0f1a]">
      {/* Background */}
      <div className="absolute inset-0 cyber-grid opacity-20" />

      <div className="relative container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 rounded-full border border-[#00FF88]/30 bg-[#00FF88]/5 text-[#00FF88] text-sm font-medium mb-6">
            تواصل معنا
          </span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
            ابدأ رحلتك <span className="text-gradient-cyber">الآن</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            فريقنا جاهز لمساعدتك في تحسين حملاتك الإعلانية وحمايتها
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Form */}
          <div className="bg-[#0f1420] rounded-2xl p-8 border border-[#00FF88]/10">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-300 mb-2 text-sm">الاسم الكامل *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg bg-[#0a0f1a] border border-gray-700 text-white placeholder-gray-500 focus:border-[#00FF88] focus:outline-none focus:ring-1 focus:ring-[#00FF88] transition-colors"
                    placeholder="أدخل اسمك"
                  />
                </div>
                <div>
                  <label className="block text-gray-300 mb-2 text-sm">البريد الإلكتروني *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg bg-[#0a0f1a] border border-gray-700 text-white placeholder-gray-500 focus:border-[#00FF88] focus:outline-none focus:ring-1 focus:ring-[#00FF88] transition-colors"
                    placeholder="example@email.com"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-300 mb-2 text-sm">رقم الهاتف</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg bg-[#0a0f1a] border border-gray-700 text-white placeholder-gray-500 focus:border-[#00FF88] focus:outline-none focus:ring-1 focus:ring-[#00FF88] transition-colors"
                    placeholder="+966 5X XXX XXXX"
                  />
                </div>
                <div>
                  <label className="block text-gray-300 mb-2 text-sm">اسم الشركة</label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg bg-[#0a0f1a] border border-gray-700 text-white placeholder-gray-500 focus:border-[#00FF88] focus:outline-none focus:ring-1 focus:ring-[#00FF88] transition-colors"
                    placeholder="اسم شركتك"
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-300 mb-2 text-sm">عدد الحسابات الإعلانية</label>
                <select
                  name="accounts"
                  value={formData.accounts}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg bg-[#0a0f1a] border border-gray-700 text-white focus:border-[#00FF88] focus:outline-none focus:ring-1 focus:ring-[#00FF88] transition-colors"
                >
                  <option value="">اختر...</option>
                  <option value="1-5">1-5 حسابات</option>
                  <option value="6-20">6-20 حساب</option>
                  <option value="21-50">21-50 حساب</option>
                  <option value="51-100">51-100 حساب</option>
                  <option value="100+">أكثر من 100 حساب</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-300 mb-2 text-sm">رسالتك *</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="w-full px-4 py-3 rounded-lg bg-[#0a0f1a] border border-gray-700 text-white placeholder-gray-500 focus:border-[#00FF88] focus:outline-none focus:ring-1 focus:ring-[#00FF88] transition-colors resize-none"
                  placeholder="أخبرنا عن احتياجاتك..."
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 rounded-lg bg-gradient-to-l from-[#00FF88] to-[#00D4FF] text-[#0a0f1a] font-bold text-lg hover:shadow-[0_0_30px_rgba(0,255,136,0.4)] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    جاري الإرسال...
                  </span>
                ) : (
                  'إرسال الرسالة'
                )}
              </button>
            </form>
          </div>

          {/* Contact Info */}
          <div className="flex flex-col justify-center">
            <div className="space-y-8">
              {contactInfo.map((info, index) => (
                <a
                  key={index}
                  href={info.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-4 p-6 rounded-xl bg-[#0f1420] border border-[#00FF88]/10 hover:border-[#00FF88]/30 transition-all duration-300"
                >
                  <div className="w-14 h-14 rounded-lg bg-[#00FF88]/10 flex items-center justify-center text-[#00FF88] group-hover:bg-[#00FF88] group-hover:text-[#0a0f1a] transition-colors">
                    {info.icon}
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm">{info.label}</p>
                    <p className="text-white font-semibold">{info.value}</p>
                  </div>
                </a>
              ))}
            </div>

            {/* Additional Info */}
            <div className="mt-12 p-6 rounded-xl bg-gradient-to-l from-[#00FF88]/10 to-[#00D4FF]/10 border border-[#00FF88]/20">
              <h4 className="font-display text-xl font-bold text-white mb-4">لماذا تختارنا؟</h4>
              <ul className="space-y-3">
                <li className="flex items-center gap-2 text-gray-300">
                  <svg className="w-5 h-5 text-[#00FF88]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  استشارة مجانية لتحليل حساباتك
                </li>
                <li className="flex items-center gap-2 text-gray-300">
                  <svg className="w-5 h-5 text-[#00FF88]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  تجربة مجانية لمدة 14 يوم
                </li>
                <li className="flex items-center gap-2 text-gray-300">
                  <svg className="w-5 h-5 text-[#00FF88]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  دعم فني بالعربية على مدار الساعة
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
