/*
 * Analytics Page - OptionTech OS Elite Intelligence
 * صفحة التحليلات المتقدمة
 */

import { useState } from 'react';
import { BarChart3, TrendingUp, Shield, DollarSign, AlertCircle, Download } from 'lucide-react';

interface AnalyticsStats {
  totalClicks: number;
  fraudulentClicks: number;
  fraudRate: number;
  monthlySavings: number;
  blockedBots: number;
  protectedAccounts: number;
  avgResponseTime: number;
}

interface ChartData {
  date: string;
  totalClicks: number;
  fraudClicks: number;
  savings: number;
}

interface FraudType {
  name: string;
  count: number;
  percentage: number;
}

const Analytics = () => {
  // Mock data - في التطبيق الحقيقي ستأتي من API
  const [stats] = useState<AnalyticsStats>({
    totalClicks: 125430,
    fraudulentClicks: 18815,
    fraudRate: 15,
    monthlySavings: 47250,
    blockedBots: 12450,
    protectedAccounts: 3,
    avgResponseTime: 45,
  });

  const [chartData] = useState<ChartData[]>([
    { date: '1 يناير', totalClicks: 4200, fraudClicks: 630, savings: 1575 },
    { date: '5 يناير', totalClicks: 4500, fraudClicks: 675, savings: 1687 },
    { date: '10 يناير', totalClicks: 5100, fraudClicks: 765, savings: 1912 },
    { date: '15 يناير', totalClicks: 4800, fraudClicks: 720, savings: 1800 },
    { date: '20 يناير', totalClicks: 5300, fraudClicks: 795, savings: 1987 },
    { date: '25 يناير', totalClicks: 5200, fraudClicks: 780, savings: 1950 },
    { date: '27 يناير', totalClicks: 5330, fraudClicks: 800, savings: 2000 },
  ]);

  const [fraudTypes] = useState<FraudType[]>([
    { name: 'Bots/برامج آلية', count: 8500, percentage: 45 },
    { name: 'Competitor Clicks/نقرات المنافسين', count: 5600, percentage: 30 },
    { name: 'Invalid Devices/أجهزة مريبة', count: 3200, percentage: 17 },
    { name: 'Other/أخرى', count: 1515, percentage: 8 },
  ]);

  const maxClicks = Math.max(...chartData.map(d => d.totalClicks));

  return (
    <div className="min-h-screen bg-white dark:bg-[#050810] text-gray-900 dark:text-gray-100 p-6">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">التحليلات المتقدمة</h1>
          <p className="text-gray-600 dark:text-gray-400">
            إحصائيات شاملة وتفصيلية عن حماية حسابات Google Ads الخاصة بك
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Total Clicks */}
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-lg p-6 border border-blue-200 dark:border-blue-700">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-gray-700 dark:text-gray-300 font-semibold">إجمالي النقرات</h3>
              <BarChart3 className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>
            <p className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">
              {stats.totalClicks.toLocaleString('ar-EG')}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">هذا الشهر</p>
          </div>

          {/* Fraudulent Clicks */}
          <div className="bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20 rounded-lg p-6 border border-red-200 dark:border-red-700">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-gray-700 dark:text-gray-300 font-semibold">نقرات وهمية</h3>
              <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400" />
            </div>
            <p className="text-3xl font-bold text-red-600 dark:text-red-400 mb-2">
              {stats.fraudulentClicks.toLocaleString('ar-EG')}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {stats.fraudRate}% من إجمالي النقرات
            </p>
          </div>

          {/* Monthly Savings */}
          <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-lg p-6 border border-green-200 dark:border-green-700">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-gray-700 dark:text-gray-300 font-semibold">التوفير الشهري</h3>
              <DollarSign className="w-5 h-5 text-green-600 dark:text-green-400" />
            </div>
            <p className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">
              ${stats.monthlySavings.toLocaleString('en-US')}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">من خلال حجب النقرات الوهمية</p>
          </div>

          {/* Protection Status */}
          <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 rounded-lg p-6 border border-purple-200 dark:border-purple-700">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-gray-700 dark:text-gray-300 font-semibold">الحسابات المحمية</h3>
              <Shield className="w-5 h-5 text-purple-600 dark:text-purple-400" />
            </div>
            <p className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2">
              {stats.protectedAccounts}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">حسابات نشطة</p>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Clicks Trend Chart */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-bold mb-6 text-gray-900 dark:text-white">
              اتجاه النقرات والاحتيال
            </h3>
            <div className="space-y-4">
              {chartData.map((data, idx) => (
                <div key={idx}>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-600 dark:text-gray-400">{data.date}</span>
                    <span className="font-semibold text-gray-900 dark:text-white">
                      {data.totalClicks.toLocaleString('ar-EG')} نقرة
                    </span>
                  </div>
                  <div className="flex gap-1">
                    {/* Valid Clicks Bar */}
                    <div
                      className="bg-blue-500 rounded-full h-2"
                      style={{
                        width: `${((data.totalClicks - data.fraudClicks) / maxClicks) * 100}%`,
                      }}
                    />
                    {/* Fraudulent Clicks Bar */}
                    <div
                      className="bg-red-500 rounded-full h-2"
                      style={{
                        width: `${(data.fraudClicks / maxClicks) * 100}%`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
            <div className="flex gap-4 mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-blue-500 rounded-full" />
                <span className="text-sm text-gray-600 dark:text-gray-400">نقرات حقيقية</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-red-500 rounded-full" />
                <span className="text-sm text-gray-600 dark:text-gray-400">نقرات وهمية</span>
              </div>
            </div>
          </div>

          {/* Fraud Types Distribution */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-bold mb-6 text-gray-900 dark:text-white">
              توزيع أنواع الاحتيال
            </h3>
            <div className="space-y-4">
              {fraudTypes.map((type, idx) => (
                <div key={idx}>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-600 dark:text-gray-400">{type.name}</span>
                    <span className="font-semibold text-gray-900 dark:text-white">
                      {type.count.toLocaleString('ar-EG')} ({type.percentage}%)
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full transition-all ${
                        idx === 0
                          ? 'bg-red-500'
                          : idx === 1
                          ? 'bg-orange-500'
                          : idx === 2
                          ? 'bg-yellow-500'
                          : 'bg-gray-500'
                      }`}
                      style={{ width: `${type.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Additional Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Blocked Bots */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-gray-700 dark:text-gray-300 font-semibold">Bots المحجوبة</h3>
              <TrendingUp className="w-5 h-5 text-orange-600 dark:text-orange-400" />
            </div>
            <p className="text-2xl font-bold text-orange-600 dark:text-orange-400">
              {stats.blockedBots.toLocaleString('ar-EG')}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">برنامج آلي محجوب</p>
          </div>

          {/* Response Time */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-gray-700 dark:text-gray-300 font-semibold">وقت الاستجابة</h3>
              <BarChart3 className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            </div>
            <p className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
              {stats.avgResponseTime}ms
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">متوسط وقت الكشف</p>
          </div>

          {/* Fraud Prevention Rate */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-gray-700 dark:text-gray-300 font-semibold">معدل الحماية</h3>
              <Shield className="w-5 h-5 text-teal-600 dark:text-teal-400" />
            </div>
            <p className="text-2xl font-bold text-teal-600 dark:text-teal-400">
              95%
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">دقة الكشف</p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-wrap gap-4">
          <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors">
            <Download className="w-5 h-5" />
            تحميل التقرير
          </button>
          <button className="flex items-center gap-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-900 dark:text-white font-semibold py-3 px-6 rounded-lg transition-colors">
            <BarChart3 className="w-5 h-5" />
            عرض التفاصيل
          </button>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
