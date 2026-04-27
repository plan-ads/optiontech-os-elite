/*
 * Login Page - OptionTech OS Elite Intelligence
 * تسجيل الدخول بـ Google OAuth
 * تصميم محسّن مع معلومات الأمان والخصوصية
 */

import { useAuth } from "@/_core/hooks/useAuth";
import { getLoginUrl } from "@/const";
import { useLocation } from "wouter";
import { useEffect, useState } from "react";
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

const Login = () => {
  const { isAuthenticated, loading } = useAuth();
  const [, setLocation] = useLocation();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isAuthenticated && !loading) {
      setLocation("/dashboard");
    }
  }, [isAuthenticated, loading, setLocation]);

  const handleLogin = () => {
    setIsLoading(true);
    const loginUrl = getLoginUrl();
    window.location.href = loginUrl;
  };

  return (
    <div className="min-h-screen bg-[#050810]">
      <Navigation />
      <main className="pt-20 pb-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Side - Information */}
            <div className="hidden lg:block space-y-8">
              <div>
                <h2 className="text-4xl font-bold text-white mb-4">
                  مرحباً بك في
                  <br />
                  <span className="bg-gradient-to-r from-[#00FF88] to-[#00D4FF] bg-clip-text text-transparent">
                    OptionTech OS
                  </span>
                </h2>
                <p className="text-gray-400 text-lg leading-relaxed">
                  منصة متكاملة لحماية حملات Google Ads الخاصة بك من النقرات الوهمية باستخدام الذكاء الاصطناعي
                </p>
              </div>

              {/* Benefits */}
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-[#00FF88]/10 flex items-center justify-center flex-shrink-0 mt-1">
                    <svg className="w-6 h-6 text-[#00FF88]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-white font-semibold mb-1">حماية فورية</h3>
                    <p className="text-gray-400 text-sm">تحليل فوري للنقرات والكشف عن الأنشطة المريبة</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-[#00D4FF]/10 flex items-center justify-center flex-shrink-0 mt-1">
                    <svg className="w-6 h-6 text-[#00D4FF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-white font-semibold mb-1">تقارير مفصلة</h3>
                    <p className="text-gray-400 text-sm">إحصائيات شاملة وتقارير يومية عن أداء حملاتك</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-[#FF6B35]/10 flex items-center justify-center flex-shrink-0 mt-1">
                    <svg className="w-6 h-6 text-[#FF6B35]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-white font-semibold mb-1">آمان عالي</h3>
                    <p className="text-gray-400 text-sm">تشفير كامل وحماية بيانات من الدرجة الأولى</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - Login Card */}
            <div className="flex justify-center">
              <div className="w-full max-w-md">
                <div className="relative">
                  {/* Glow Effect */}
                  <div className="absolute -inset-1 bg-gradient-to-r from-[#00FF88] via-[#00D4FF] to-[#FF6B35] rounded-2xl blur-xl opacity-30"></div>
                  
                  <div className="relative bg-[#0a0f1a]/95 backdrop-blur-xl border border-[#00FF88]/20 rounded-2xl p-8 space-y-6">
                    {/* Header */}
                    <div className="text-center space-y-3">
                      <div className="w-16 h-16 mx-auto relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-[#00FF88] to-[#00D4FF] rounded-xl blur-lg opacity-50"></div>
                        <div className="relative w-full h-full bg-[#0a0f1a] rounded-xl flex items-center justify-center border border-[#00FF88]/30">
                          <svg className="w-8 h-8 text-[#00FF88]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                          </svg>
                        </div>
                      </div>
                      <h1 className="font-display text-2xl font-bold text-white">
                        مرحباً بك
                      </h1>
                      <p className="text-gray-400 text-sm">
                        سجل دخولك للوصول إلى لوحة التحكم
                      </p>
                    </div>

                    {/* Google Login Button */}
                    <button
                      onClick={handleLogin}
                      disabled={loading || isLoading}
                      className="w-full flex items-center justify-center gap-3 px-6 py-3 bg-white hover:bg-gray-100 text-gray-800 rounded-xl font-bold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {loading || isLoading ? (
                        <>
                          <div className="w-5 h-5 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
                          <span>جاري التوجيه...</span>
                        </>
                      ) : (
                        <>
                          <svg className="w-5 h-5" viewBox="0 0 24 24">
                            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                          </svg>
                          <span>تسجيل الدخول بـ Google</span>
                        </>
                      )}
                    </button>

                    {/* Divider */}
                    <div className="relative">
                      <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-700"></div>
                      </div>
                      <div className="relative flex justify-center text-sm">
                        <span className="px-3 bg-[#0a0f1a] text-gray-500">أو</span>
                      </div>
                    </div>

                    {/* Info Box */}
                    <div className="bg-[#00FF88]/5 border border-[#00FF88]/20 rounded-lg p-4 space-y-3">
                      <div className="flex items-start gap-2">
                        <svg className="w-5 h-5 text-[#00FF88] flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                        </svg>
                        <p className="text-xs text-gray-400">
                          نحن نستخدم حسابك في Google للمصادقة الآمنة وربط حسابات Google Ads الخاصة بك
                        </p>
                      </div>
                    </div>

                    {/* Trust Indicators */}
                    <div className="grid grid-cols-3 gap-3 pt-2">
                      <div className="text-center">
                        <div className="flex justify-center mb-2">
                          <svg className="w-5 h-5 text-[#00FF88]" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 3.062v6.050A3.066 3.066 0 0117.853 16a3.066 3.066 0 01-2.812 3.062v-7.007a9.213 9.213 0 00-1.814.363c.201.896.666 1.61 1.342 2.001V16a3.066 3.066 0 01-3.066-3.066v-7.007a9.213 9.213 0 00-1.814.363c.201.896.666 1.61 1.342 2.001V16a3.066 3.066 0 01-3.066-3.066V6.517a3.066 3.066 0 012.812-3.062zm7.958 5.28a.75.75 0 00-1.5 0v3.75a.75.75 0 001.5 0v-3.75z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <p className="text-xs text-gray-400">آمان SSL</p>
                      </div>
                      <div className="text-center">
                        <div className="flex justify-center mb-2">
                          <svg className="w-5 h-5 text-[#00D4FF]" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5.951-1.429 5.951 1.429a1 1 0 001.169-1.409l-7-14z" />
                          </svg>
                        </div>
                        <p className="text-xs text-gray-400">معتمد</p>
                      </div>
                      <div className="text-center">
                        <div className="flex justify-center mb-2">
                          <svg className="w-5 h-5 text-[#FF6B35]" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <p className="text-xs text-gray-400">محمي</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Footer Note */}
                <p className="text-center text-xs text-gray-500 mt-6">
                  بتسجيل الدخول، أنت توافق على
                  <br />
                  <a href="#" className="text-[#00FF88] hover:text-[#00FF88]/80 transition">شروط الخدمة</a>
                  {" و "}
                  <a href="#" className="text-[#00FF88] hover:text-[#00FF88]/80 transition">سياسة الخصوصية</a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Login;
