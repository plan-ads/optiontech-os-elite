/*
 * Dashboard Page - OptionTech OS Elite Intelligence
 * لوحة تحكم العميل
 */

import { useAuth } from "@/_core/hooks/useAuth";
import { getLoginUrl } from "@/const";
import { useLocation, Link } from "wouter";
import { useEffect } from "react";
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { trpc } from "@/lib/trpc";

const Dashboard = () => {
  const { user, isAuthenticated, loading, logout } = useAuth();
  const [, setLocation] = useLocation();

  // Fetch dashboard stats
  const { data: stats, isLoading: statsLoading } = trpc.dashboard.stats.useQuery(undefined, {
    enabled: isAuthenticated,
  });

  // Fetch campaign metrics
  const { data: metrics, isLoading: metricsLoading } = trpc.dashboard.allCampaignMetrics.useQuery(undefined, {
    enabled: isAuthenticated,
  });

  // Fetch user's ads accounts
  const { data: accounts, isLoading: accountsLoading } = trpc.adsAccounts.list.useQuery(undefined, {
    enabled: isAuthenticated,
  });

  // Fetch user's link requests
  const { data: linkRequests, isLoading: requestsLoading } = trpc.linkRequests.list.useQuery(undefined, {
    enabled: isAuthenticated,
  });

  useEffect(() => {
    if (!isAuthenticated && !loading) {
      window.location.href = getLoginUrl();
    }
  }, [isAuthenticated, loading]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#050810] flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#00FF88] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-400">جاري التحميل...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'linked':
        return <span className="px-2 py-1 rounded-full text-xs bg-[#00FF88]/20 text-[#00FF88]">مرتبط</span>;
      case 'pending':
        return <span className="px-2 py-1 rounded-full text-xs bg-yellow-500/20 text-yellow-500">قيد الانتظار</span>;
      case 'rejected':
        return <span className="px-2 py-1 rounded-full text-xs bg-red-500/20 text-red-500">مرفوض</span>;
      case 'disconnected':
        return <span className="px-2 py-1 rounded-full text-xs bg-gray-500/20 text-gray-500">غير متصل</span>;
      default:
        return <span className="px-2 py-1 rounded-full text-xs bg-gray-500/20 text-gray-500">{status}</span>;
    }
  };

  return (
    <div className="min-h-screen bg-[#050810]">
      <Navigation />
      <main className="pt-32 pb-20">
        <div className="container mx-auto px-4">
          {/* Welcome Header */}
          <div className="mb-12">
            <h1 className="font-display text-4xl font-bold text-white mb-2">
              مرحباً، {user?.name || 'المستخدم'}
            </h1>
            <p className="text-gray-400">
              مرحباً بك في لوحة التحكم الخاصة بك
            </p>
          </div>

          {/* Stats Grid - KPIs */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-12">
                        {/* Card 1 - Total Spend */}
            <div className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl blur opacity-20 group-hover:opacity-40 transition-opacity"></div>
              <div className="relative bg-[#0a0f1a] border border-green-500/20 rounded-xl p-6">
                <div className="w-12 h-12 rounded-lg bg-green-500/10 flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-white mb-1">
                  {metricsLoading ? '...' : `${(metrics?.totalSpend || 0).toFixed(2)} ر.س`}
                </h3>
                <p className="text-gray-400 text-sm">الإنفاق الإجمالي</p>
              </div>
            </div>

            {/* Card 2 - Total Clicks */}
            <div className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl blur opacity-20 group-hover:opacity-40 transition-opacity"></div>
              <div className="relative bg-[#0a0f1a] border border-blue-500/20 rounded-xl p-6">
                <div className="w-12 h-12 rounded-lg bg-blue-500/10 flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-white mb-1">
                  {metricsLoading ? '...' : (metrics?.totalClicks || 0).toLocaleString('ar-SA')}
                </h3>
                <p className="text-gray-400 text-sm">إجمالي النقرات</p>
              </div>
            </div>

            {/* Card 3 - Impressions */}
            <div className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl blur opacity-20 group-hover:opacity-40 transition-opacity"></div>
              <div className="relative bg-[#0a0f1a] border border-purple-500/20 rounded-xl p-6">
                <div className="w-12 h-12 rounded-lg bg-purple-500/10 flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-white mb-1">
                  {metricsLoading ? '...' : (metrics?.totalImpressions || 0).toLocaleString('ar-SA')}
                </h3>
                <p className="text-gray-400 text-sm">الانطباعات</p>
              </div>
            </div>

            {/* Card 4 - CTR */}
            <div className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl blur opacity-20 group-hover:opacity-40 transition-opacity"></div>
              <div className="relative bg-[#0a0f1a] border border-orange-500/20 rounded-xl p-6">
                <div className="w-12 h-12 rounded-lg bg-orange-500/10 flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-white mb-1">
                  {metricsLoading ? '...' : `${(metrics?.ctr || 0).toFixed(2)}%`}
                </h3>
                <p className="text-gray-400 text-sm">معدل النقر</p>
              </div>
            </div>

            {/* Card 5 - Conversion Rate */}
            <div className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-[#00FF88] to-[#00D4FF] rounded-xl blur opacity-20 group-hover:opacity-40 transition-opacity"></div>
              <div className="relative bg-[#0a0f1a] border border-[#00FF88]/20 rounded-xl p-6">
                <div className="w-12 h-12 rounded-lg bg-[#00FF88]/10 flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-[#00FF88]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-white mb-1">
                  {metricsLoading ? '...' : `${(metrics?.conversionRate || 0).toFixed(2)}%`}
                </h3>
                <p className="text-gray-400 text-sm">معدل التحويل</p>
              </div>
            </div>
          </div>

          {/* Linked Accounts Section */}
          <div className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-white">حساباتك المرتبطة</h2>
              <Link
                href="/link-account"
                className="inline-flex items-center gap-2 px-4 py-2 bg-[#00FF88]/10 border border-[#00FF88]/30 text-[#00FF88] rounded-lg text-sm hover:bg-[#00FF88]/20 transition-all"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                <span>ربط حساب جديد</span>
              </Link>
            </div>

            {accountsLoading ? (
              <div className="text-center py-12">
                <div className="w-8 h-8 border-2 border-[#00FF88] border-t-transparent rounded-full animate-spin mx-auto"></div>
              </div>
            ) : accounts && accounts.length > 0 ? (
              <div className="relative">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-[#00FF88] to-[#00D4FF] rounded-xl blur opacity-10"></div>
                <div className="relative bg-[#0a0f1a] border border-[#00FF88]/20 rounded-xl overflow-hidden">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-800">
                        <th className="text-right py-4 px-6 text-gray-400 font-medium text-sm">اسم الحساب</th>
                        <th className="text-right py-4 px-6 text-gray-400 font-medium text-sm">رقم الحساب</th>
                        <th className="text-right py-4 px-6 text-gray-400 font-medium text-sm">الحالة</th>
                        <th className="text-right py-4 px-6 text-gray-400 font-medium text-sm">الحماية</th>
                      </tr>
                    </thead>
                    <tbody>
                      {accounts.map((account) => (
                        <tr key={account.id} className="border-b border-gray-800/50 hover:bg-white/5 transition-colors">
                          <td className="py-4 px-6 text-white">{account.accountName}</td>
                          <td className="py-4 px-6 text-gray-400 font-mono" dir="ltr">{account.accountId}</td>
                          <td className="py-4 px-6">{getStatusBadge(account.status)}</td>
                          <td className="py-4 px-6">
                            {account.protectionEnabled ? (
                              <span className="text-[#00FF88]">مفعّلة</span>
                            ) : (
                              <span className="text-gray-500">غير مفعّلة</span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ) : (
              <div className="relative">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-[#00FF88] to-[#00D4FF] rounded-xl blur opacity-10"></div>
                <div className="relative bg-[#0a0f1a] border border-[#00FF88]/20 rounded-xl p-12 text-center">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-800 flex items-center justify-center">
                    <svg className="w-8 h-8 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">لا توجد حسابات مرتبطة</h3>
                  <p className="text-gray-400 mb-6">اربط حسابك الإعلاني للبدء في الحماية</p>
                  <Link
                    href="/link-account"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-l from-[#00FF88] to-[#00D4FF] text-[#0a0f1a] rounded-lg font-bold hover:shadow-lg hover:shadow-[#00FF88]/20 transition-all"
                  >
                    <span>ربط حساب الآن</span>
                    <svg className="w-4 h-4 rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {/* Link Account Card */}
            <div className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-[#00FF88] to-[#00D4FF] rounded-xl blur opacity-20 group-hover:opacity-40 transition-opacity"></div>
              <div className="relative bg-[#0a0f1a] border border-[#00FF88]/20 rounded-xl p-8">
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-r from-[#00FF88]/20 to-[#00D4FF]/20 flex items-center justify-center flex-shrink-0">
                    <svg className="w-7 h-7 text-[#00FF88]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white mb-2">ربط حساب Google Ads</h3>
                    <p className="text-gray-400 text-sm mb-4">
                      اربط حسابك الإعلاني للحصول على الحماية الكاملة
                    </p>
                    <Link
                      href="/link-account"
                      className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-l from-[#00FF88] to-[#00D4FF] text-[#0a0f1a] rounded-lg font-bold hover:shadow-lg hover:shadow-[#00FF88]/20 transition-all"
                    >
                      <span>ربط الآن</span>
                      <svg className="w-4 h-4 rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Upgrade Card */}
            <div className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-[#FF6B35] to-purple-500 rounded-xl blur opacity-20 group-hover:opacity-40 transition-opacity"></div>
              <div className="relative bg-[#0a0f1a] border border-[#FF6B35]/20 rounded-xl p-8">
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-r from-[#FF6B35]/20 to-purple-500/20 flex items-center justify-center flex-shrink-0">
                    <svg className="w-7 h-7 text-[#FF6B35]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white mb-2">ترقية الباقة</h3>
                    <p className="text-gray-400 text-sm mb-4">
                      احصل على ميزات أكثر مع الباقات المدفوعة
                    </p>
                    <Link
                      href="/pricing"
                      className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-l from-[#FF6B35] to-purple-500 text-white rounded-lg font-bold hover:shadow-lg hover:shadow-[#FF6B35]/20 transition-all"
                    >
                      <span>عرض الباقات</span>
                      <svg className="w-4 h-4 rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Logout Button */}
          <div className="text-center">
            <button
              onClick={() => logout()}
              className="inline-flex items-center gap-2 px-6 py-3 border border-gray-700 text-gray-400 rounded-lg hover:border-red-500 hover:text-red-500 transition-all"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              <span>تسجيل الخروج</span>
            </button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;
