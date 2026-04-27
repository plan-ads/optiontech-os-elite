import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { trpc } from "@/lib/trpc";
import { Loader2, Users, CreditCard, Link2, TrendingUp, ChevronDown } from "lucide-react";
import { useLocation } from "wouter";

export default function AdminDashboard() {
  const { user, isAuthenticated } = useAuth();
  const [location, setLocation] = useLocation();
  const [expandedTab, setExpandedTab] = useState<"subscriptions" | "accounts" | "payments">("subscriptions");

  // Queries
  const subscriptionsQuery = trpc.subscriptions.current.useQuery(undefined, {
    enabled: isAuthenticated,
  });
  const accountsQuery = trpc.adsAccounts.list.useQuery(undefined, {
    enabled: isAuthenticated,
  });
  const invoicesQuery = trpc.payment.invoices.useQuery(undefined, {
    enabled: isAuthenticated,
  });

  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      setLocation("/");
    }
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    return null;
  }

  const subscription = subscriptionsQuery.data;
  const accounts = accountsQuery.data || [];
  const invoices = invoicesQuery.data || [];

  // Calculate stats
  const totalAccounts = accounts.length;
  const linkedAccounts = accounts.filter((a: any) => a.status === "linked").length;
  const totalInvoices = invoices.length;
  const totalRevenue = invoices.reduce((sum: number, inv: any) => sum + (inv.amount || 0), 0);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card border-b border-border">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold">لوحة تحكم الإدارة</h1>
              <p className="text-gray-500 mt-1">إدارة الاشتراكات والحسابات والدفعات</p>
            </div>
            <Button variant="outline" onClick={() => setLocation("/")}>
              العودة للرئيسية
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-12">
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">إجمالي الحسابات</p>
                <p className="text-3xl font-bold mt-2">{totalAccounts}</p>
              </div>
              <Link2 className="w-8 h-8 text-primary opacity-50" />
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">الحسابات المرتبطة</p>
                <p className="text-3xl font-bold mt-2">{linkedAccounts}</p>
              </div>
              <TrendingUp className="w-8 h-8 text-green-500 opacity-50" />
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">إجمالي الفواتير</p>
                <p className="text-3xl font-bold mt-2">{totalInvoices}</p>
              </div>
              <CreditCard className="w-8 h-8 text-blue-500 opacity-50" />
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">إجمالي الإيرادات</p>
                <p className="text-3xl font-bold mt-2">${(totalRevenue / 100).toFixed(2)}</p>
              </div>
              <Users className="w-8 h-8 text-purple-500 opacity-50" />
            </div>
          </Card>
        </div>

        {/* Tabs */}
        <div className="space-y-6">
          {/* Subscriptions Tab */}
          <Card>
            <button
              onClick={() => setExpandedTab(expandedTab === "subscriptions" ? "accounts" : "subscriptions")}
              className="w-full p-6 flex items-center justify-between hover:bg-gray-50 transition-colors"
            >
              <h2 className="text-xl font-bold flex items-center gap-2">
                <Users className="w-5 h-5" />
                الاشتراكات النشطة
              </h2>
              <ChevronDown
                className={`w-5 h-5 transition-transform ${
                  expandedTab === "subscriptions" ? "rotate-180" : ""
                }`}
              />
            </button>

            {expandedTab === "subscriptions" && (
              <div className="border-t border-border p-6">
                {subscriptionsQuery.isLoading ? (
                  <div className="flex items-center justify-center py-8">
                    <Loader2 className="animate-spin w-6 h-6" />
                  </div>
                ) : subscription ? (
                  <div className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-gray-500 text-sm">اسم الباقة</p>
                        <p className="font-bold text-lg">{(subscription as any).plan?.nameAr}</p>
                      </div>
                      <div>
                        <p className="text-gray-500 text-sm">الحالة</p>
                        <p className="font-bold text-lg">
                          <span className="inline-block px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                            {(subscription as any).status === "active" ? "نشط" : (subscription as any).status}
                          </span>
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-500 text-sm">دورة الفواتير</p>
                        <p className="font-bold text-lg">
                          {(subscription as any).billingCycle === "monthly" ? "شهري" : "سنوي"}
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-500 text-sm">تاريخ البداية</p>
                        <p className="font-bold text-lg">
                          {new Date((subscription as any).startDate).toLocaleDateString("ar-EG")}
                        </p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <p>لا توجد اشتراكات نشطة</p>
                    <Button
                      className="mt-4"
                      onClick={() => setLocation("/checkout")}
                    >
                      اختر باقة
                    </Button>
                  </div>
                )}
              </div>
            )}
          </Card>

          {/* Accounts Tab */}
          <Card>
            <button
              onClick={() => setExpandedTab(expandedTab === "accounts" ? "payments" : "accounts")}
              className="w-full p-6 flex items-center justify-between hover:bg-gray-50 transition-colors"
            >
              <h2 className="text-xl font-bold flex items-center gap-2">
                <Link2 className="w-5 h-5" />
                حسابات Google Ads المرتبطة
              </h2>
              <ChevronDown
                className={`w-5 h-5 transition-transform ${
                  expandedTab === "accounts" ? "rotate-180" : ""
                }`}
              />
            </button>

            {expandedTab === "accounts" && (
              <div className="border-t border-border p-6">
                {accountsQuery.isLoading ? (
                  <div className="flex items-center justify-center py-8">
                    <Loader2 className="animate-spin w-6 h-6" />
                  </div>
                ) : accounts.length > 0 ? (
                  <div className="space-y-4">
                    {accounts.map((account: any) => (
                      <div
                        key={account.id}
                        className="p-4 border border-border rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <p className="font-bold">{account.accountName}</p>
                            <p className="text-sm text-gray-500">{account.accountId}</p>
                          </div>
                          <div className="text-right">
                            <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${
                              account.status === "linked"
                                ? "bg-green-100 text-green-800"
                                : account.status === "pending"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-red-100 text-red-800"
                            }`}>
                              {account.status === "linked" ? "مرتبط" : account.status === "pending" ? "قيد الانتظار" : "معطل"}
                            </span>
                          </div>
                        </div>
                        {account.protectionEnabled && (
                          <p className="text-sm text-green-600 mt-2">✓ الحماية مفعلة</p>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <p>لم تقم بربط أي حسابات بعد</p>
                    <Button
                      className="mt-4"
                      onClick={() => setLocation("/link-account")}
                    >
                      ربط حساب جديد
                    </Button>
                  </div>
                )}
              </div>
            )}
          </Card>

          {/* Payments Tab */}
          <Card>
            <button
              onClick={() => setExpandedTab(expandedTab === "payments" ? "subscriptions" : "payments")}
              className="w-full p-6 flex items-center justify-between hover:bg-gray-50 transition-colors"
            >
              <h2 className="text-xl font-bold flex items-center gap-2">
                <CreditCard className="w-5 h-5" />
                الفواتير والدفعات
              </h2>
              <ChevronDown
                className={`w-5 h-5 transition-transform ${
                  expandedTab === "payments" ? "rotate-180" : ""
                }`}
              />
            </button>

            {expandedTab === "payments" && (
              <div className="border-t border-border p-6">
                {invoicesQuery.isLoading ? (
                  <div className="flex items-center justify-center py-8">
                    <Loader2 className="animate-spin w-6 h-6" />
                  </div>
                ) : invoices.length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-border">
                          <th className="text-right py-3 px-4 font-semibold">رقم الفاتورة</th>
                          <th className="text-right py-3 px-4 font-semibold">التاريخ</th>
                          <th className="text-right py-3 px-4 font-semibold">المبلغ</th>
                          <th className="text-right py-3 px-4 font-semibold">الحالة</th>
                        </tr>
                      </thead>
                      <tbody>
                        {invoices.map((invoice: any) => (
                          <tr key={invoice.id} className="border-b border-border hover:bg-gray-50">
                            <td className="py-3 px-4">{invoice.stripeInvoiceId}</td>
                            <td className="py-3 px-4">
                              {new Date(invoice.createdAt).toLocaleDateString("ar-EG")}
                            </td>
                            <td className="py-3 px-4 font-semibold">
                              ${(invoice.amount / 100).toFixed(2)}
                            </td>
                            <td className="py-3 px-4">
                              <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${
                                invoice.status === "paid"
                                  ? "bg-green-100 text-green-800"
                                  : invoice.status === "pending"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : "bg-red-100 text-red-800"
                              }`}>
                                {invoice.status === "paid" ? "مدفوع" : invoice.status === "pending" ? "قيد الانتظار" : "فشل"}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <p>لا توجد فواتير بعد</p>
                  </div>
                )}
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}
