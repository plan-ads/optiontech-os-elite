/*
 * Link Account Page - OptionTech OS Elite Intelligence
 * صفحة ربط حساب Google Ads مع MCC - نظام أوتوماتيكي آمن
 */

import { useState, useEffect } from 'react';
import { useAuth } from "@/_core/hooks/useAuth";
import { getLoginUrl } from "@/const";
import { useLocation } from "wouter";
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";
import { Checkbox } from "@/components/ui/checkbox";

const MCC_ACCOUNT_ID = '890-054-5042';

const LinkAccount = () => {
  const { user, isAuthenticated, loading } = useAuth();
  const [, setLocation] = useLocation();
  const [accountId, setAccountId] = useState('');
  const [accountName, setAccountName] = useState('');
  const [linkedAccounts, setLinkedAccounts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [agreed, setAgreed] = useState(false);
  const [showTerms, setShowTerms] = useState(false);

  const createLinkRequest = trpc.linkRequests.create.useMutation({
    onSuccess: (data) => {
      toast.success(data.message || "تم ربط الحساب بنجاح!");
      setAccountId('');
      setAccountName('');
      setAgreed(false);
      fetchAccounts();
    },
    onError: (error) => {
      toast.error(error.message || "حدث خطأ أثناء ربط الحساب");
    },
  });

  const getAccounts = trpc.adsAccounts.list.useQuery();

  const fetchAccounts = async () => {
    try {
      await getAccounts.refetch();
    } catch (error) {
      console.error("Failed to fetch accounts:", error);
    }
  };

  useEffect(() => {
    if (!isAuthenticated && !loading) {
      window.location.href = getLoginUrl();
    }
  }, [isAuthenticated, loading]);

  const handleLinkAccount = async () => {
    if (!agreed) {
      toast.error("يجب الموافقة على الشروط أولاً");
      return;
    }

    if (!accountId.trim()) {
      toast.error("الرجاء إدخال رقم الحساب");
      return;
    }

    createLinkRequest.mutate({
      accountId: accountId.trim(),
      accountName: accountName.trim(),
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#050810] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#00FF88] mx-auto mb-4"></div>
          <p className="text-gray-400">جاري التحميل...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-[#050810] flex flex-col">
      <Navigation />
      
      <main className="flex-1 py-20 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Page Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              ربط حساب Google Ads
            </h1>
            <p className="text-xl text-gray-400">
              ربط حسابك الإعلاني بأمان وسهولة
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Left: Instructions */}
            <div className="space-y-6">
              <div className="bg-[#0f1420] border border-gray-800 rounded-lg p-6">
                <h2 className="text-2xl font-bold text-[#00FF88] mb-4">خطوات الربط</h2>
                
                <div className="space-y-4">
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-[#00FF88] text-[#0a0f1a] rounded-full flex items-center justify-center font-bold">1</div>
                    <div>
                      <h3 className="text-white font-semibold mb-1">أدخل رقم حسابك</h3>
                      <p className="text-gray-400 text-sm">رقم حساب Google Ads الخاص بك (مثل: 123-456-7890)</p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-[#00FF88] text-[#0a0f1a] rounded-full flex items-center justify-center font-bold">2</div>
                    <div>
                      <h3 className="text-white font-semibold mb-1">وافق على الشروط</h3>
                      <p className="text-gray-400 text-sm">اقرأ وافهم شروط الخدمة قبل الربط</p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-[#00FF88] text-[#0a0f1a] rounded-full flex items-center justify-center font-bold">3</div>
                    <div>
                      <h3 className="text-white font-semibold mb-1">اضغط "ابدأ الآن"</h3>
                      <p className="text-gray-400 text-sm">سيتم ربط حسابك فوراً بعد الموافقة</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* What We Do */}
              <div className="bg-[#0f1420] border border-gray-800 rounded-lg p-6">
                <h3 className="text-xl font-bold text-white mb-4">ماذا سنفعل بحسابك؟</h3>
                <ul className="space-y-3 text-gray-400">
                  <li className="flex items-start gap-3">
                    <span className="text-[#00FF88] mt-1">✓</span>
                    <span>سنضيف حسابك تحت حسابنا الإداري لتوفير الحماية</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[#00FF88] mt-1">✓</span>
                    <span>سنطبق نظام الحماية من النقرات الوهمية</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[#00FF88] mt-1">✓</span>
                    <span>ستحتفظ أنت بالتحكم الكامل في حسابك</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[#00FF88] mt-1">✓</span>
                    <span>يمكنك فصل الحساب في أي وقت</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Right: Form */}
            <div className="bg-[#0f1420] border border-gray-800 rounded-lg p-8">
              <h2 className="text-2xl font-bold text-white mb-6">ربط حسابك</h2>

              <div className="space-y-6">
                {/* Account ID Input */}
                <div>
                  <label className="block text-white font-semibold mb-2">
                    رقم حساب Google Ads
                  </label>
                  <input
                    type="text"
                    placeholder="مثال: 123-456-7890"
                    value={accountId}
                    onChange={(e) => setAccountId(e.target.value)}
                    className="w-full px-4 py-3 bg-[#0a0f1a] border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#00FF88]"
                  />
                </div>

                {/* Account Name Input */}
                <div>
                  <label className="block text-white font-semibold mb-2">
                    اسم الحساب (اختياري)
                  </label>
                  <input
                    type="text"
                    placeholder="مثال: حساب المتجر الإلكتروني"
                    value={accountName}
                    onChange={(e) => setAccountName(e.target.value)}
                    className="w-full px-4 py-3 bg-[#0a0f1a] border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#00FF88]"
                  />
                </div>

                {/* Terms Checkbox */}
                <div className="bg-[#0a0f1a] border border-gray-700 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <Checkbox
                      id="terms"
                      checked={agreed}
                      onCheckedChange={(checked) => setAgreed(checked === true)}
                      className="mt-1"
                    />
                    <label htmlFor="terms" className="text-gray-300 cursor-pointer">
                      أوافق على{' '}
                      <button
                        onClick={() => setShowTerms(!showTerms)}
                        className="text-[#00FF88] hover:underline"
                      >
                        شروط الخدمة والسياسات
                      </button>
                      {' '}وأفهم أن حسابي سيتم ربطه بحسابنا الإداري
                    </label>
                  </div>
                </div>

                {/* Terms Preview */}
                {showTerms && (
                  <div className="bg-[#0a0f1a] border border-gray-700 rounded-lg p-4 max-h-48 overflow-y-auto">
                    <h4 className="text-white font-semibold mb-3">شروط الخدمة</h4>
                    <ul className="space-y-2 text-gray-400 text-sm">
                      <li>• سيتم ربط حسابك بحسابنا الإداري (MCC: {MCC_ACCOUNT_ID})</li>
                      <li>• ستحتفظ بالتحكم الكامل في حسابك وحملاتك</li>
                      <li>• سنطبق نظام الحماية من النقرات الوهمية تلقائياً</li>
                      <li>• يمكنك فصل الحساب في أي وقت بدون رسوم إضافية</li>
                      <li>• نحن ملتزمون بسياسات Google Ads بالكامل</li>
                      <li>• بياناتك محمية وآمنة تماماً</li>
                    </ul>
                  </div>
                )}

                {/* CTA Button */}
                <button
                  onClick={handleLinkAccount}
                  disabled={!agreed || !accountId.trim() || createLinkRequest.isPending}
                  className={`w-full py-3 rounded-lg font-bold text-lg transition-all ${
                    agreed && accountId.trim() && !createLinkRequest.isPending
                      ? 'bg-gradient-to-l from-[#00FF88] to-[#00D4FF] text-[#0a0f1a] hover:scale-105'
                      : 'bg-gray-700 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  {createLinkRequest.isPending ? 'جاري الربط...' : 'ابدأ الآن'}
                </button>

                {/* Info Message */}
                <div className="bg-[#00FF88]/10 border border-[#00FF88]/30 rounded-lg p-4">
                  <p className="text-[#00FF88] text-sm">
                    ✓ الربط آمن وسريع وموثق بالكامل مع سياسات Google
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Linked Accounts */}
          {linkedAccounts.length > 0 && (
            <div className="mt-12">
              <h2 className="text-2xl font-bold text-white mb-6">حساباتك المرتبطة</h2>
              <div className="grid gap-4">
                {linkedAccounts.map((account, index) => (
                  <div key={index} className="bg-[#0f1420] border border-gray-800 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-white font-semibold">{account.accountName || account.accountId}</p>
                        <p className="text-gray-400 text-sm">{account.accountId}</p>
                      </div>
                      <div className="text-right">
                        <span className="inline-block px-3 py-1 rounded-full bg-[#00FF88]/20 text-[#00FF88] text-sm font-semibold">
                          مرتبط
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default LinkAccount;
