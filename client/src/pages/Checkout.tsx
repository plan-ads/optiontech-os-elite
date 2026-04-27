import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { trpc } from "@/lib/trpc";
import { Loader2, Check, X, ArrowRight } from "lucide-react";
import { useLocation } from "wouter";

export default function Checkout() {
  const { user, isAuthenticated } = useAuth();
  const [location, setLocation] = useLocation();
  const [selectedPlan, setSelectedPlan] = useState<number | null>(null);
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly");
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const plansQuery = trpc.plans.list.useQuery();
  const subscriptionQuery = trpc.subscriptions.current.useQuery(undefined, {
    enabled: isAuthenticated,
  });
  const createCheckoutMutation = trpc.payment.createCheckout.useMutation();

  // Check for success parameter
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("success") === "true") {
      setSuccessMessage("تم الاشتراك بنجاح! شكراً لك.");
      setTimeout(() => setSuccessMessage(""), 5000);
    }
  }, []);

  const handleCheckout = async (planId: number) => {
    if (!user) return;

    setLoading(true);
    try {
      const result = await createCheckoutMutation.mutateAsync({
        stripePriceId: `price_${planId}_${billingCycle}`,
        successUrl: `${window.location.origin}/checkout?success=true`,
        cancelUrl: `${window.location.origin}/checkout?canceled=true`,
      });

      if (result.url) {
        window.location.href = result.url;
      }
    } catch (error) {
      console.error("Checkout error:", error);
      alert("فشل إنشاء جلسة الدفع. يرجى المحاولة مرة أخرى.");
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <Card className="w-full max-w-md p-8 text-center">
          <h1 className="text-2xl font-bold mb-4">يجب تسجيل الدخول أولاً</h1>
          <p className="text-gray-500 mb-6">
            يرجى تسجيل الدخول باستخدام حسابك لاختيار الباقة المناسبة
          </p>
          <Button 
            onClick={() => setLocation("/")}
            className="w-full"
          >
            العودة للرئيسية
          </Button>
        </Card>
      </div>
    );
  }

  if (plansQuery.isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="animate-spin w-8 h-8" />
      </div>
    );
  }

  const plans = plansQuery.data || [];
  const currentSubscription = subscriptionQuery.data;

  // Sort plans by price
  const sortedPlans = [...plans].sort((a, b) => {
    const priceA = a.priceMonthly === "0" ? 0 : parseFloat(a.priceMonthly);
    const priceB = b.priceMonthly === "0" ? 0 : parseFloat(b.priceMonthly);
    return priceA - priceB;
  });

  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">اختر الباقة المناسبة</h1>
          <p className="text-xl text-gray-500 mb-8">
            ابدأ مع حماية Google Ads الذكية اليوم
          </p>

          {/* Success Message */}
          {successMessage && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-8 text-green-800">
              {successMessage}
            </div>
          )}

          {/* Billing Cycle Toggle */}
          <div className="flex justify-center gap-4 mb-8">
            <button
              onClick={() => setBillingCycle("monthly")}
              className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                billingCycle === "monthly"
                  ? "bg-primary text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              شهري
            </button>
            <button
              onClick={() => setBillingCycle("yearly")}
              className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                billingCycle === "yearly"
                  ? "bg-primary text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              سنوي (توفير 20%)
            </button>
          </div>
        </div>

        {/* Plans Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {sortedPlans.map((plan) => {
            const isCurrentPlan = currentSubscription?.plan?.id === plan.id;
            const isFree = plan.priceMonthly === "0";
            const isPopular = plan.nameAr === "Professional";

            return (
              <Card
                key={plan.id}
                className={`relative overflow-hidden transition-all duration-300 ${
                  isPopular ? "ring-2 ring-primary md:scale-105" : ""
                } ${isCurrentPlan ? "ring-2 ring-green-500" : ""}`}
              >
                {isPopular && (
                  <div className="absolute top-0 right-0 bg-primary text-white px-4 py-1 text-sm font-bold">
                    الأكثر شيوعاً
                  </div>
                )}

                <div className="p-8">
                  {/* Plan Name */}
                  <h2 className="text-2xl font-bold mb-2">{plan.nameAr}</h2>
                  <p className="text-gray-500 mb-6">{plan.descriptionAr}</p>

                  {/* Price */}
                  <div className="mb-8">
                    {isFree ? (
                      <div>
                        <span className="text-4xl font-bold">مجاني</span>
                        <p className="text-sm text-gray-500 mt-2">مدى الحياة</p>
                      </div>
                    ) : (
                      <div>
                        <span className="text-4xl font-bold">
                          ${billingCycle === "monthly" ? plan.priceMonthly : (parseFloat(plan.priceMonthly) * 12 * 0.8).toFixed(2)}
                        </span>
                        <p className="text-sm text-gray-500 mt-2">
                          {billingCycle === "monthly" ? "شهرياً" : "سنوياً"}
                        </p>
                        <p className="text-xs text-primary mt-1">
                          + شهر تجربة مجاني
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Features */}
                  <ul className="space-y-3 mb-8">
                    <li className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span>حماية من الحملات الاحتيالية</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span>تقارير يومية</span>
                    </li>

                    {!isFree && (
                      <>
                        <li className="flex items-start gap-3">
                          <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                          <span>دعم أولوي 24/7</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                          <span>تحليلات متقدمة</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                          <span>إدارة حسابات متعددة</span>
                        </li>
                      </>
                    )}

                    {plan.nameAr === "Nuclear" && (
                      <>
                        <li className="flex items-start gap-3">
                          <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                          <span>API مخصص</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                          <span>مدير حساب مخصص</span>
                        </li>
                      </>
                    )}
                  </ul>

                  {/* Button */}
                  {isCurrentPlan ? (
                    <Button className="w-full" disabled variant="outline">
                      <Check className="w-4 h-4 ml-2" />
                      الباقة الحالية
                    </Button>
                  ) : isFree ? (
                    <Button 
                      className="w-full"
                      variant="outline"
                      onClick={() => setLocation("/dashboard")}
                    >
                      <ArrowRight className="w-4 h-4 ml-2" />
                      ابدأ الآن
                    </Button>
                  ) : (
                    <Button
                      className="w-full"
                      onClick={() => handleCheckout(plan.id)}
                      disabled={loading}
                    >
                      {loading ? (
                        <>
                          <Loader2 className="animate-spin mr-2 w-4 h-4" />
                          جاري المعالجة...
                        </>
                      ) : (
                        <>
                          <ArrowRight className="w-4 h-4 ml-2" />
                          ابدأ الآن
                        </>
                      )}
                    </Button>
                  )}
                </div>
              </Card>
            );
          })}
        </div>

        {/* FAQ Section */}
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8">الأسئلة الشائعة</h2>
          <div className="space-y-4">
            <Card className="p-6">
              <h3 className="font-bold mb-2">هل يمكنني تغيير الباقة لاحقاً؟</h3>
              <p className="text-gray-600">
                نعم، يمكنك الترقية أو الانخفاض في أي وقت. سيتم حساب الفرق في الفاتورة التالية.
              </p>
            </Card>
            <Card className="p-6">
              <h3 className="font-bold mb-2">هل هناك فترة تجربة مجانية؟</h3>
              <p className="text-gray-600">
                نعم، جميع الباقات المدفوعة تأتي مع شهر تجربة مجاني بدون رسوم.
              </p>
            </Card>
            <Card className="p-6">
              <h3 className="font-bold mb-2">كيف يمكنني الإلغاء؟</h3>
              <p className="text-gray-600">
                يمكنك الإلغاء في أي وقت من لوحة التحكم. لن يتم فرض أي رسوم إضافية.
              </p>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
