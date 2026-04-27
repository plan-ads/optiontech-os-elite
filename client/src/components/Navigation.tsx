/*
 * Navigation Component - Cyber Command Center Style
 * Sticky header with neon glow effects and smooth transitions
 */

import { useState, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import { useAuth } from "@/_core/hooks/useAuth";
import { getLoginUrl } from "@/const";

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, isAuthenticated, loading, logout } = useAuth();
  const [location] = useLocation();
  const isHomePage = location === '/';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '#home', label: 'الرئيسية', isAnchor: true },
    { href: '#units', label: 'الوحدات', isAnchor: true },
    { href: '#comparison', label: 'المقارنة', isAnchor: true },
    { href: '/pricing', label: 'الأسعار', isAnchor: false },
    { href: '#contact', label: 'تواصل معنا', isAnchor: true },
  ];

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    if (!isHomePage) {
      window.location.href = '/' + href;
      return;
    }
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  const handleLogin = () => {
    window.location.href = getLoginUrl();
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-[#0a0f1a]/95 backdrop-blur-md border-b border-[#00FF88]/20 shadow-[0_0_30px_rgba(0,255,136,0.1)]'
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#00FF88] to-[#00D4FF] p-[2px]">
                <div className="w-full h-full rounded-lg bg-[#0a0f1a] flex items-center justify-center">
                  <span className="font-display text-xl font-bold text-[#00FF88]">OT</span>
                </div>
              </div>
              <div className="absolute inset-0 rounded-lg bg-[#00FF88]/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
            <div className="hidden sm:block">
              <span className="font-display text-lg font-bold text-white">OptionTech</span>
              <span className="font-display text-lg font-bold text-[#00FF88] mr-1">OS</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              link.isAnchor ? (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => scrollToSection(e, link.href)}
                  className="relative text-gray-300 hover:text-[#00FF88] transition-colors duration-300 py-2 group"
                >
                  {link.label}
                  <span className="absolute bottom-0 right-0 w-0 h-[2px] bg-gradient-to-l from-[#00FF88] to-[#00D4FF] group-hover:w-full transition-all duration-300" />
                </a>
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  className="relative text-gray-300 hover:text-[#00FF88] transition-colors duration-300 py-2 group"
                >
                  {link.label}
                  <span className="absolute bottom-0 right-0 w-0 h-[2px] bg-gradient-to-l from-[#00FF88] to-[#00D4FF] group-hover:w-full transition-all duration-300" />
                </Link>
              )
            ))}
          </div>

          {/* Auth Buttons */}
          <div className="hidden lg:flex items-center gap-4">
            {loading ? (
              <div className="w-8 h-8 border-2 border-[#00FF88] border-t-transparent rounded-full animate-spin"></div>
            ) : isAuthenticated ? (
              <>
                <Link
                  href="/dashboard"
                  className="relative inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-l from-[#00FF88] to-[#00D4FF] text-[#0a0f1a] rounded-lg font-semibold hover:shadow-lg hover:shadow-[#00FF88]/20 transition-all"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                  </svg>
                  <span>لوحة التحكم</span>
                </Link>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#00FF88] to-[#00D4FF] p-[2px]">
                    <div className="w-full h-full rounded-full bg-[#0a0f1a] flex items-center justify-center">
                      <span className="text-[#00FF88] font-bold text-sm">
                        {user?.name?.charAt(0) || 'U'}
                      </span>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <>
                <button
                  onClick={handleLogin}
                  className="text-gray-300 hover:text-[#00FF88] transition-colors duration-300 py-2"
                >
                  تسجيل الدخول
                </button>
                <Link
                  href="/pricing"
                  className="relative inline-flex items-center gap-2 px-6 py-3 bg-transparent border border-[#00FF88] text-[#00FF88] rounded-lg font-semibold overflow-hidden group hover:text-[#0a0f1a] transition-colors duration-300"
                >
                  <span className="relative z-10">ابدأ الآن</span>
                  <svg className="w-5 h-5 relative z-10 rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                  <div className="absolute inset-0 bg-gradient-to-l from-[#00FF88] to-[#00D4FF] transform translate-x-full group-hover:translate-x-0 transition-transform duration-300" />
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden relative w-10 h-10 flex flex-col items-center justify-center gap-1.5 group"
          >
            <span
              className={`w-6 h-0.5 bg-[#00FF88] transition-all duration-300 ${
                isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''
              }`}
            />
            <span
              className={`w-6 h-0.5 bg-[#00FF88] transition-all duration-300 ${
                isMobileMenuOpen ? 'opacity-0' : ''
              }`}
            />
            <span
              className={`w-6 h-0.5 bg-[#00FF88] transition-all duration-300 ${
                isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''
              }`}
            />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden absolute top-full left-0 right-0 bg-[#0a0f1a]/98 backdrop-blur-lg border-b border-[#00FF88]/20 transition-all duration-500 ${
          isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
      >
        <div className="container mx-auto px-6 py-6">
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              link.isAnchor ? (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => scrollToSection(e, link.href)}
                  className="text-gray-300 hover:text-[#00FF88] transition-colors duration-300 py-3 border-b border-[#00FF88]/10"
                >
                  {link.label}
                </a>
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-gray-300 hover:text-[#00FF88] transition-colors duration-300 py-3 border-b border-[#00FF88]/10"
                >
                  {link.label}
                </Link>
              )
            ))}
            {isAuthenticated ? (
              <>
                <Link
                  href="/dashboard"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="mt-4 inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-l from-[#00FF88] to-[#00D4FF] text-[#0a0f1a] rounded-lg font-semibold"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                  </svg>
                  لوحة التحكم
                </Link>
                <button
                  onClick={() => { logout(); setIsMobileMenuOpen(false); }}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-gray-700 text-gray-400 rounded-lg hover:border-red-500 hover:text-red-500 transition-all"
                >
                  تسجيل الخروج
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => { handleLogin(); setIsMobileMenuOpen(false); }}
                  className="text-gray-300 hover:text-[#00FF88] transition-colors duration-300 py-3 border-b border-[#00FF88]/10"
                >
                  تسجيل الدخول
                </button>
                <Link
                  href="/pricing"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="mt-4 inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-l from-[#00FF88] to-[#00D4FF] text-[#0a0f1a] rounded-lg font-semibold"
                >
                  ابدأ الآن
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
