import { Link } from "wouter";
import { Mail, Phone, Facebook, Twitter, Linkedin, Instagram } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    "الروابط الرئيسية": [
      { label: "الرئيسية", href: "/" },
      { label: "الأسعار", href: "/pricing" },
      { label: "الأسئلة الشائعة", href: "/faq" },
      { label: "المدونة", href: "/blog" },
    ],
    "المعلومات القانونية": [
      { label: "سياسة الخصوصية", href: "/privacy" },
      { label: "شروط الخدمة", href: "/terms" },
      { label: "سياسة الملفات", href: "/cookies" },
    ],
    "المنتجات": [
      { label: "لوحة التحكم", href: "/dashboard" },
      { label: "ربط الحسابات", href: "/link-account" },
      { label: "الدفع والاشتراكات", href: "/checkout" },
      { label: "التحليلات", href: "/analytics" },
    ],
  };

  const socialLinks = [
    { icon: Facebook, href: "https://facebook.com", label: "فيسبوك" },
    { icon: Twitter, href: "https://twitter.com", label: "تويتر" },
    { icon: Linkedin, href: "https://linkedin.com", label: "لينكدإن" },
    { icon: Instagram, href: "https://instagram.com", label: "إنستجرام" },
  ];

  return (
    <footer className="bg-gray-50 dark:bg-slate-900 border-t border-gray-200 dark:border-slate-800 mt-20">
      <div className="container mx-auto px-4 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-lg flex items-center justify-center text-white font-bold">
                OT
              </div>
              <h3 className="font-bold text-lg text-gray-900 dark:text-white">OptionTech</h3>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              منصة متقدمة لحماية حملات Google Ads من الاحتيال والنقرات المريبة.
            </p>
            <div className="space-y-3 text-sm text-gray-600 dark:text-gray-400">
              <div className="flex items-start gap-2">
                <Mail className="w-4 h-4 mt-0.5 flex-shrink-0 text-cyan-500" />
                <a href="mailto:info@optiontechos.com" className="hover:text-cyan-500 transition-colors">
                  info@optiontechos.com
                </a>
              </div>
              <div className="flex items-start gap-2">
                <Phone className="w-4 h-4 mt-0.5 flex-shrink-0 text-cyan-500" />
                <a href="tel:+201000000000" className="hover:text-cyan-500 transition-colors">
                  +20 (100) 000-0000
                </a>
              </div>
            </div>
          </div>

          {/* Footer Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-4 text-sm">
                {category}
              </h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-gray-600 dark:text-gray-400 hover:text-cyan-500 dark:hover:text-cyan-400 transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-4 text-sm">
              تواصل معنا
            </h4>
            <div className="space-y-3 text-sm text-gray-600 dark:text-gray-400">
              <div>
                <p className="font-medium text-gray-900 dark:text-white mb-1">البريد العام</p>
                <a href="mailto:info@optiontechos.com" className="hover:text-cyan-500 transition-colors">
                  info@optiontechos.com
                </a>
              </div>
              <div>
                <p className="font-medium text-gray-900 dark:text-white mb-1">دعم العملاء</p>
                <a href="mailto:support@optiontechos.com" className="hover:text-cyan-500 transition-colors">
                  support@optiontechos.com
                </a>
              </div>
              <div>
                <p className="font-medium text-gray-900 dark:text-white mb-1">المبيعات</p>
                <a href="mailto:sales@optiontechos.com" className="hover:text-cyan-500 transition-colors">
                  sales@optiontechos.com
                </a>
              </div>
              <div>
                <p className="font-medium text-gray-900 dark:text-white mb-1">الخصوصية</p>
                <a href="mailto:privacy@optiontechos.com" className="hover:text-cyan-500 transition-colors">
                  privacy@optiontechos.com
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-200 dark:border-slate-800 my-8"></div>

        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Copyright */}
          <div className="text-sm text-gray-600 dark:text-gray-400 text-center md:text-left">
            <p>
              جميع الحقوق محفوظة © {currentYear} <span className="font-semibold">Option للتسويق الإلكتروني</span>
            </p>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            {socialLinks.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-slate-800 transition-colors text-gray-600 dark:text-gray-400 hover:text-cyan-500"
                aria-label={label}
              >
                <Icon className="w-5 h-5" />
              </a>
            ))}
          </div>

          {/* Quick Actions */}
          <div className="flex items-center gap-2 text-sm">
            <Link
              href="/"
              className="px-3 py-1 rounded-lg hover:bg-gray-200 dark:hover:bg-slate-800 transition-colors text-gray-600 dark:text-gray-400 hover:text-cyan-500"
            >
              العودة للأعلى
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
