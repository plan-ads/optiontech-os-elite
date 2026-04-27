# OptionTech OS - Elite Intelligence - TODO

## المرحلة الأولى: ترقية المشروع
- [x] ترقية المشروع لـ web-db-user

## المرحلة الثانية: نظام المستخدمين
- [x] إصلاح App.tsx للحفاظ على التصميم الحالي
- [x] إصلاح Home.tsx للحفاظ على التصميم الحالي
- [x] إضافة تسجيل الدخول بـ Google OAuth
- [x] إنشاء صفحة تسجيل الدخول

## المرحلة الثالثة: نظام الباقات
- [x] إنشاء جدول الباقات في قاعدة البيانات
- [x] إنشاء جدول اشتراكات العملاء
- [x] صفحة اختيار الباقة الديناميكية

## المرحلة الرابعة: نظام ربط الحسابات
- [x] إنشاء جدول طلبات الربط
- [x] صفحة طلب ربط حساب Google Ads
- [x] تعليمات الربط مع MCC 890-054-5042
- [x] نظام تتبع حالة الربط

## المرحلة الخامسة: لوحة تحكم العميل
- [x] لوحة تحكم العميل الرئيسية
- [x] عرض حالة الحساب والباقة
- [x] إحصائيات الحماية

## تحسين SEO
- [x] إضافة Meta tags (title, description, keywords)
- [x] إضافة Open Graph tags للسوشيال ميديا
- [x] إضافة Schema.org structured data
- [x] تحسين العناوين للكلمات المفتاحية

## إعداد بيئة Google Ads API (الربط الأوتوماتيكي)
- [x] إضافة مكتبات Google Ads API
- [x] تطوير Backend endpoints للربط الأوتوماتيكي
- [x] نظام ربط فوري بدون انتظار
- [x] تحديث قاعدة البيانات
- [x] تحديث صفحة LinkAccount للربط الأوتوماتيكي
- [x] الاختبارات (7 tests passed)

## نظام الدفع Stripe
- [x] إضافة مكتبات Stripe
- [x] تحديث قاعدة البيانات - جداول الدفع والفواتير
- [x] Backend endpoints للدفع والاشتراكات

## صفحة الدفع والـ Checkout
- [x] بناء صفحة Checkout احترافية
- [x] عرض الباقات الثلاث مع التفاصيل
- [x] معالجة الدفع مع Stripe
- [x] اختيار دورة الفواتير (شهري/سنوي)
- [x] عرض رسالة النجاح
- [x] قسم الأسئلة الشائعة

## لوحة تحكم المدير
- [x] بناء لوحة التحكم المتقدمة
- [x] عرض الاشتراكات النشطة
- [x] عرض حسابات Google Ads المرتبطة
- [x] عرض الفواتير والدفعات
- [x] إحصائيات شاملة (حسابات، إيرادات، فواتير)
- [x] تبويبات قابلة للتوسع

## الاختبارات الشاملة
- [x] اختبارات Plans Router
- [x] اختبارات Subscriptions Router
- [x] اختبارات Ads Accounts Router
- [x] اختبارات Link Requests Router
- [x] اختبارات Dashboard Router
- [x] اختبارات Payment Router
- [x] اختبارات Auth Router
- [x] 21 اختبار ناجح


## Phase 2: Smart Sync System (الـ 4 أنواع من المستخدمين) ✅
- [x] **النوع 1**: حساب رئيسي فقط (كل شيء في Google Sheets)
  - [x] مزامنة من Google Sheets
  - [x] ربط تلقائي مباشر
  
- [x] **النوع 2**: حساب رئيسي + حسابات فرعية (MMC)
  - [x] جلب جميع الحسابات من Google Ads
  - [x] مزامنة مع Google Sheets
  - [x] ربط الكل تلقائياً
  
- [x] **النوع 3**: حسابات في Google Sheets فقط (بدون Google Ads)
  - [x] جلب من Google Sheets
  - [x] إضافة الحسابات لقاعدة البيانات
  - [x] فتح حساب للمستخدم
  
- [x] **النوع 4**: بدون حسابات إعلانية
  - [x] تسجيل المستخدم فقط
  - [x] فتح حساب جديد

- [x] إنشاء خدمة المزامنة الذكية (smartSyncService.ts)
  - [x] دالة detectUserType() - تحديد نوع المستخدم
  - [x] دالة syncFromGoogleSheets() - جلب من Sheets
  - [x] دالة syncFromGoogleAds() - جلب من Google Ads
  - [x] دالة mergeAccounts() - دمج البيانات الذكي
  - [x] دالة handleAllFourTypes() - معالجة الـ 4 أنواع

- [x] تحديث OAuth Router
  - [x] تحديث handleCallback مع Smart Sync
  - [x] إضافة detectUserType endpoint
  - [x] تحديث syncAccounts مع المنطق الجديد

## Phase 2.5: Google OAuth Authentication (الجديد)
- [x] إنشاء googleAuthService.ts
- [x] تحديث server/_core/oauth.ts لاستخدام Google OAuth
- [x] تحديث client/src/const.ts للتعامل مع Google OAuth
- [x] تحديث Login.tsx لاستخدام Google OAuth مباشرة
- [x] كتابة اختبارات vitest لـ Google Auth
- [x] جميع الاختبارات تمر بنجاح (44 اختبار)

## Phase 3: Dashboard & UI
- [ ] إنشاء صفحة Dashboard الرئيسية
  - [ ] عرض Google Sheets الخاص بنا
  - [ ] عرض الحسابات المرتبطة
  - [ ] عرض الإحصائيات
  
- [ ] إنشاء ميزة "ربط حساب"
  - [ ] صفحة ربط حساب Google Ads موجود
  - [ ] التحقق من صحة الحساب
  - [ ] تأكيد الربط
  
- [ ] إنشاء ميزة "إنشاء حساب" (تطوير لاحق)
  - [ ] صفحة إنشاء حساب Google Ads جديد
  - [ ] معالجة الطلب
  - [ ] تأكيد الإنشاء
  
- [ ] تحديث صفحة "تغيير الباقة"
  - [ ] عرض الباقات المتاحة
  - [ ] اختيار باقة جديدة
  - [ ] معالجة الدفع (Stripe)

## Phase 4: Database & Backend
- [ ] إضافة جدول user_account_mappings
  - [ ] ربط المستخدمين بالحسابات
  - [ ] تتبع نوع المستخدم
  
- [ ] إضافة جدول sync_logs
  - [ ] تسجيل عمليات المزامنة
  - [ ] تتبع الأخطاء
  
- [ ] إضافة دوال قاعدة البيانات الجديدة
  - [ ] getUserType()
  - [ ] saveSyncLog()
  - [ ] getAccountMappings()

## Phase 5: Google Sheets Integration
- [x] تحديث googleSheetsService.ts
  - [x] دالة getAccountsFromSheet() - جلب الحسابات
  - [x] دالة getPlansFromSheet() - جلب الباقات
  - [x] دالة validateAccountData() - التحقق من البيانات

## Phase 6: Testing & Documentation
- [ ] اختبار النوع 1 (حساب رئيسي فقط)
- [ ] اختبار النوع 2 (MMC)
- [ ] اختبار النوع 3 (Sheets فقط)
- [ ] اختبار النوع 4 (بدون حسابات)
- [ ] اختبار المزامنة الذكية
- [ ] اختبار معالجة الأخطاء
- [ ] توثيق API endpoints
- [ ] توثيق عملية المزامنة

## Phase 7: Security & Compliance
- [ ] التحقق من Google Policies Compliance
- [ ] تأمين بيانات OAuth
- [ ] تأمين بيانات Google Sheets
- [ ] معالجة الأخطاء بأمان
- [ ] تسجيل العمليات الحساسة

## Phase 8: Performance & Optimization
- [ ] تحسين سرعة المزامنة
- [ ] تقليل استدعاءات API
- [ ] تخزين مؤقت (Caching)
- [ ] معالجة الحسابات الكبيرة


## Phase 3: Dashboard & UI (لوحة التحكم)
- [ ] إنشاء صفحة Dashboard الرئيسية
  - [ ] عرض الحسابات المرتبطة
  - [ ] عرض حالة المزامنة
  - [ ] عرض الباقات والخطط
  - [ ] عرض إحصائيات الحسابات
  
- [ ] إنشاء مكونات UI
  - [ ] AccountCard - بطاقة الحساب
  - [ ] SyncStatus - حالة المزامنة
  - [ ] PlanBadge - شارة الباقة
  - [ ] AccountStats - إحصائيات الحساب

- [ ] تصميم واجهة Dashboard
  - [ ] تخطيط الصفحة (Layout)
  - [ ] ألوان وأيقونات
  - [ ] استجابة الجوال (Responsive)

## Phase 4: ربط وإنشاء الحسابات الديناميكي
- [ ] ميزة ربط حساب Google Ads موجود
  - [ ] إنشاء LinkAccountModal
  - [ ] إضافة endpoint linkGoogleAdsAccount
  - [ ] معالجة الأخطاء والتحقق
  
- [ ] ميزة إنشاء حساب Google Ads جديد
  - [ ] إنشاء CreateAccountModal
  - [ ] إضافة endpoint createGoogleAdsAccount
  - [ ] معالجة الأخطاء والتحقق

- [ ] دمج الميزات في Dashboard
  - [ ] أزرار الربط والإنشاء
  - [ ] معالجة الحالات المختلفة
  - [ ] تحديث البيانات بعد العملية

## Phase 5: نظام الإشعارات والتنبيهات
- [ ] إنشاء نظام الإشعارات
  - [ ] إضافة جدول notifications في قاعدة البيانات
  - [ ] إنشاء NotificationService
  - [ ] إضافة endpoints للإشعارات
  
- [ ] أنواع الإشعارات
  - [ ] إشعار ربط الحساب بنجاح
  - [ ] إشعار فشل المزامنة
  - [ ] إشعار تغيير الباقة
  - [ ] إشعار انتهاء الاشتراك
  
- [ ] واجهة الإشعارات
  - [ ] NotificationCenter - مركز الإشعارات
  - [ ] NotificationBell - جرس الإشعارات
  - [ ] NotificationToast - إشعارات منبثقة

- [ ] معالجة الإشعارات
  - [ ] تخزين الإشعارات
  - [ ] تحديث حالة الإشعار (مقروء/غير مقروء)
  - [ ] حذف الإشعارات

## Phase 6: الاختبار الشامل
- [ ] اختبار Dashboard
  - [ ] عرض البيانات الصحيحة
  - [ ] تحديث البيانات تلقائياً
  - [ ] استجابة الجوال
  
- [ ] اختبار ربط الحسابات
  - [ ] ربط حساب موجود
  - [ ] إنشاء حساب جديد
  - [ ] معالجة الأخطاء
  
- [ ] اختبار الإشعارات
  - [ ] إرسال الإشعارات
  - [ ] عرض الإشعارات
  - [ ] تحديث حالة الإشعار

- [ ] اختبار المزامنة الذكية
  - [ ] اختبار Type 1
  - [ ] اختبار Type 2
  - [ ] اختبار Type 3
  - [ ] اختبار Type 4

## Phase 2.6: تحسين واجهة تسجيل الدخول (الجديد)
- [x] تحسين تصميم صفحة Login
  - [x] إضافة رسائل توضيحية عن Google OAuth
  - [x] تحسين عرض معلومات الأمان
  - [x] إضافة رسالة الخصوصية
  - [x] تحسين الاستجابة للجوال
  - [x] إضافة أيقونات وتصميم احترافي
  
- [x] إضافة مكونات جديدة
  - [x] SecurityBadge - شارة الأمان
  - [x] PrivacyNotice - إشعار الخصوصية
  - [x] TrustIndicators - مؤشرات الثقة
  
- [x] اختبار الاستجابة
  - [x] اختبار على الجوال
  - [x] اختبار على التابلت
  - [x] اختبار على سطح المكتب

## Phase 2.7: تصحيح Google OAuth Credentials (الجديد)
- [x] الحصول على Google OAuth Client ID الصحيح
- [x] الحصول على Google OAuth Client Secret الصحيح
- [x] تحديث البيئة بالبيانات الصحيحة
- [x] كتابة اختبارات vitest للتحقق من البيانات
- [x] جميع الاختبارات تمر بنجاح (6 اختبارات)


## Phase 2.8: تحويل الموقع إلى Light Mode (الجديد)
- [x] تحديث index.css لدعم Light Mode
- [x] تغيير الخلفية من أسود → أبيض
- [x] تفعيل Theme Switcher
- [x] إضافة زر التبديل بين الأوضاع
- [x] الألوان الأزرق والأخضر محفوظة في كلا الوضعين

## Phase 2.9: إصلاح Google OAuth Flow (الجديد)
- [x] إصلاح googleAuthService.ts لاستخدام البيانات بشكل ديناميكي
- [x] إضافة validation للبيانات المفقودة
- [x] إضافة رسائل خطأ واضحة
- [x] اختبار OAuth Flow (50 اختبار ناجح)

## Phase 2.10: Google Tag Manager و Analytics (الجديد)
- [x] إضافة Google Site Verification meta tag
- [x] إضافة Google Tag Manager (GTM-P4QF257M)
- [x] إضافة Google Analytics 4 (G-7RY9993K68)
- [x] تتبع الأحداث والإحصائيات
- [x] الموقع جاهز للنشر

## Phase 2.11: الصفحات القانونية والبيانات الرسمية (الجديد)
- [x] إنشاء صفحة Privacy Policy
- [x] إنشاء صفحة Terms of Service
- [x] إنشاء صفحة Cookie Policy
- [x] إضافة معلومات الشركة (مصرية)
- [x] إضافة الإيميلات الرسمية
- [x] تحديث Footer بالروابط

## Phase 2.12: Header و Footer في جميع الصفحات (الجديد)
- [x] إنشاء مكون Header مع القائمة الرئيسية
- [x] تحديث مكون Footer مع جميع الروابط
- [x] تطبيق Header و Footer على جميع الصفحات
- [x] إضافة تبديل الوضع الليلي في Header
- [x] إضافة روابط التنقل السريع
- [x] إضافة معلومات الاتصال في Footer

## Phase 3: Admin Dashboard (الجديد)
- [x] إنشاء جداول قاعدة البيانات الإضافية
  - [x] جدول admin_logs (سجلات النشاط)
  - [x] جدول reports (التقارير)
  - [x] جدول report_schedules (جدولة التقارير)
  - [x] جدول email_logs (سجلات البريد)
- [x] إنشاء ملف admin-db.ts بدوال قاعدة البيانات
- [ ] بناء صفحة Admin Dashboard
  - [ ] عرض جميع المحادثات
  - [ ] عرض جميع العملاء
  - [ ] عرض الاشتراكات النشطة
  - [ ] عرض الإحصائيات الشاملة
  
- [ ] بناء صفحة Admin Dashboard
  - [ ] عرض جميع المحادثات
  - [ ] عرض جميع العملاء
  - [ ] عرض الاشتراكات النشطة
  - [ ] عرض الإحصائيات الشاملة
  
- [ ] مكونات Admin UI
  - [ ] جدول المحادثات (Conversations Table)
  - [ ] جدول العملاء (Customers Table)
  - [ ] جدول الاشتراكات (Subscriptions Table)
  - [ ] لوحة الإحصائيات (Statistics Dashboard)
  
- [ ] إضافة tRPC procedures للـ Admin
  - [ ] getAdminDashboardStats
  - [ ] getAllConversations
  - [ ] getAllCustomers
  - [ ] getAllSubscriptions
  - [ ] getAdminLogs

## Phase 4: نظام الدفع Stripe (الجديد)
- [ ] تفعيل Stripe integration
  - [ ] إضافة STRIPE_SECRET_KEY
  - [ ] إضافة STRIPE_PUBLISHABLE_KEY
  - [ ] إضافة STRIPE_WEBHOOK_SECRET
  
- [ ] تحديث قاعدة البيانات
  - [ ] إضافة stripe_customer_id إلى جدول users
  - [ ] إضافة stripe_subscription_id إلى جدول subscriptions
  - [ ] إضافة stripe_payment_method_id إلى جدول payments
  
- [ ] بناء صفحة الدفع المتقدمة
  - [ ] عرض الباقات مع الأسعار
  - [ ] اختيار دورة الفواتير
  - [ ] معالجة الدفع الآمنة
  - [ ] عرض رسالة النجاح
  
- [ ] إضافة tRPC procedures للدفع
  - [ ] createStripeCheckoutSession
  - [ ] handleStripeWebhook
  - [ ] updateSubscriptionStatus
  - [ ] cancelSubscription
  - [ ] updatePaymentMethod

## Phase 5: نظام التقارير المتقدمة (الجديد)
- [ ] إنشاء جداول قاعدة البيانات
  - [ ] جدول reports (التقارير)
  - [ ] جدول report_schedules (جدولة التقارير)
  - [ ] جدول email_logs (سجلات البريد)
  
- [ ] بناء خدمة التقارير
  - [ ] generateDailyReport() - تقرير يومي
  - [ ] generateWeeklyReport() - تقرير أسبوعي
  - [ ] generateMonthlyReport() - تقرير شهري
  - [ ] sendReportEmail() - إرسال البريد
  
- [ ] إضافة tRPC procedures للتقارير
  - [ ] getReports
  - [ ] getReportById
  - [ ] createReportSchedule
  - [ ] updateReportSchedule
  - [ ] deleteReportSchedule
  - [ ] sendTestReport
  
- [ ] واجهة إدارة التقارير
  - [ ] صفحة عرض التقارير
  - [ ] صفحة جدولة التقارير
  - [ ] عرض سجلات البريد
  - [ ] إعدادات التقارير

## Phase 6: الاختبار والتحقق (الجديد)
- [ ] اختبارات Admin Dashboard
  - [ ] اختبار عرض البيانات
  - [ ] اختبار الفلترة والبحث
  - [ ] اختبار الصلاحيات
  
- [ ] اختبارات نظام الدفع
  - [ ] اختبار إنشاء جلسة Stripe
  - [ ] اختبار معالجة الـ Webhook
  - [ ] اختبار تحديث الاشتراك
  
- [ ] اختبارات نظام التقارير
  - [ ] اختبار توليد التقارير
  - [ ] اختبار إرسال البريد
  - [ ] اختبار جدولة التقارير

## Phase 2.16: بناء لوحة تحكم بسيطة للعملاء (Dashboard) - الجديد
- [x] إنشاء خدمة Google Ads API للحصول على بيانات الحملات
- [x] بناء صفحة Dashboard بسيطة
- [x] إضافة مربعات المعلومات الأساسية (KPIs):
  - [x] الإنفاق الإجمالي (Total Spend)
  - [x] إجمالي النقرات (Total Clicks)
  - [x] الانطباعات (Impressions)
  - [x] معدل النقر (CTR)
  - [x] معدل التحويل (Conversion Rate)
- [x] كتابة اختبارات vitest (10 اختبارات نجحت)
- [x] اختبار وتحسين الأداء
- [ ] حفظ Checkpoint
