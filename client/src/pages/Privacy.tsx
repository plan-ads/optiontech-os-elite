/*
 * Privacy Policy Page - OptionTech OS Elite Intelligence
 * سياسة الخصوصية الشاملة
 */

import { useEffect } from 'react';

const Privacy = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-[#050810] text-gray-900 dark:text-gray-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-50 to-green-50 dark:from-[#0a0f1a] dark:to-[#0f1520] py-12 px-6">
        <div className="container mx-auto max-w-4xl">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            سياسة الخصوصية
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            آخر تحديث: يناير 2026
          </p>
          <div className="mt-4 p-4 bg-blue-100 dark:bg-blue-900/30 border-l-4 border-blue-500 rounded">
            <p className="text-sm text-gray-700 dark:text-gray-300">
              <strong>الشركة:</strong> Option للتسويق الإلكتروني | <strong>المقر:</strong> جمهورية مصر العربية | <strong>السجلات:</strong> مصر | <strong>الخدمات:</strong> حماية Google Ads للسوق السعودي
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto max-w-4xl py-12 px-6">
        {/* معلومات الشركة */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
            معلومات الشركة
          </h2>
          <div className="space-y-4 text-gray-700 dark:text-gray-300">
            <p>
              هذه السياسة تُدار بواسطة <strong>Option للتسويق الإلكتروني</strong>، شركة مصرية مسجلة في جمهورية مصر العربية. نحن متخصصون في حماية حسابات Google Ads من النقرات الوهمية والاحتيال، ونقدم خدماتنا للسوق السعودي والأسواق الأخرى.
            </p>
            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded">
              <p className="font-semibold text-gray-900 dark:text-white mb-2">الإيميلات الرسمية:</p>
              <p>البريد العام: info@optiontechos.com</p>
              <p>دعم العملاء: support@optiontechos.com</p>
              <p>المبيعات: sales@optiontechos.com</p>
              <p>الفواتير: billing@optiontechos.com</p>
              <p>الخصوصية: privacy@optiontechos.com</p>
              <p className="mt-3 text-xs text-gray-600 dark:text-gray-400">المقر الرئيسي: جمهورية مصر العربية</p>
            </div>
          </div>
        </section>

        {/* Introduction */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
            مقدمة
          </h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
            نحن في Option نقدر خصوصيتك وأمان بيانات حسابك. هذه السياسة تشرح كيفية جمع واستخدام ومعالجة بيانات المستخدمين على منصتنا.
          </p>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            بموجب استخدامك لخدماتنا، فإنك توافق على شروط سياسة الخصوصية هذه. إذا كنت لا توافق على أي جزء من هذه السياسة، يرجى عدم استخدام خدماتنا.
          </p>
        </section>

        {/* 1. البيانات التي نجمعها */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
            1. البيانات التي نجمعها
          </h2>

          <div className="space-y-6">
            {/* 1.1 */}
            <div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-gray-200">
                1.1 بيانات الحساب
              </h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
                <li>البريد الإلكتروني والاسم</li>
                <li>معلومات الملف الشخصي (الصورة، البيانات الأساسية)</li>
                <li>كلمة المرور (مشفرة بشكل آمن)</li>
                <li>معلومات الدفع والفواتير</li>
                <li>تاريخ إنشاء الحساب وآخر تسجيل دخول</li>
              </ul>
            </div>

            {/* 1.2 */}
            <div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-gray-200">
                1.2 بيانات Google Ads المرتبطة
              </h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
                <li>معرف حساب Google Ads</li>
                <li>معرف العميل (Customer ID)</li>
                <li>بيانات الحملات الإعلانية (الأداء، الميزانية)</li>
                <li>بيانات النقرات والتحويلات</li>
                <li>معلومات الكلمات المفتاحية والإعلانات</li>
              </ul>
            </div>

            {/* 1.3 */}
            <div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-gray-200">
                1.3 بيانات الاستخدام والتحليلات
              </h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
                <li>سجل الدخول والخروج</li>
                <li>الصفحات المزارة والميزات المستخدمة</li>
                <li>مدة الجلسة وعدد الزيارات</li>
                <li>نوع الجهاز ونظام التشغيل</li>
                <li>عنوان IP والموقع الجغرافي (تقريبي)</li>
              </ul>
            </div>

            {/* 1.4 */}
            <div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-gray-200">
                1.4 بيانات الاتصال
              </h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
                <li>رسائل البريد الإلكتروني والدعم</li>
                <li>محادثات الدعم الفني</li>
                <li>الملاحظات والتعليقات</li>
                <li>استطلاعات الرأي والتقييمات</li>
              </ul>
            </div>
          </div>
        </section>

        {/* 2. كيف نستخدم بيانات */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
            2. كيف نستخدم بيانات
          </h2>

          <div className="space-y-4">
            <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 p-4">
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                تقديم الخدمة
              </h4>
              <p className="text-gray-700 dark:text-gray-300">
                نستخدم بيانات حسابك لتقديم خدمات حماية Google Ads، بما في ذلك تحليل النقرات الوهمية وحظر الروبوتات.
              </p>
            </div>

            <div className="bg-green-50 dark:bg-green-900/20 border-l-4 border-green-500 p-4">
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                تحسين الخدمة
              </h4>
              <p className="text-gray-700 dark:text-gray-300">
                نحلل بيانات الاستخدام لتحسين أداء المنصة وإضافة ميزات جديدة.
              </p>
            </div>

            <div className="bg-purple-50 dark:bg-purple-900/20 border-l-4 border-purple-500 p-4">
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                التواصل
              </h4>
              <p className="text-gray-700 dark:text-gray-300">
                نرسل لك رسائل حول حسابك، التحديثات الأمنية، وإشعارات الخدمة.
              </p>
            </div>

            <div className="bg-orange-50 dark:bg-orange-900/20 border-l-4 border-orange-500 p-4">
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                الامتثال القانوني
              </h4>
              <p className="text-gray-700 dark:text-gray-300">
                نحتفظ بالبيانات للامتثال بالقوانين والأنظمة، ومعالجة النزاعات، وحماية حقوقنا.
              </p>
            </div>
          </div>
        </section>

        {/* 3. مشاركة البيانات */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
            3. مشاركة البيانات
          </h2>

          <div className="space-y-4 text-gray-700 dark:text-gray-300">
            <p>
              <strong>نحن لا نبيع بيانات المستخدمين</strong> إلى أطراف ثالثة. ومع ذلك، قد نشارك البيانات في الحالات التالية:
            </p>

            <div className="space-y-3">
              <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                  مع Google
                </h4>
                <p>
                  نتصل بـ Google Ads API لجلب بيانات حسابك وتحديثها. Google تتعامل مع البيانات وفقاً لسياستها الخاصة.
                </p>
              </div>

              <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                  مع مزودي الخدمات
                </h4>
                <p>
                  نشارك البيانات مع مزودي الخدمات الموثوقين (مثل Stripe للدفع) فقط عند الضرورة.
                </p>
              </div>

              <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                  بأمر قانوني
                </h4>
                <p>
                  قد نفصح عن البيانات إذا طلبت السلطات ذلك قانونياً (مذكرة استدعاء، قرار محكمة، إلخ).
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 4. أمان البيانات */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
            4. أمان البيانات
          </h2>

          <div className="space-y-4 text-gray-700 dark:text-gray-300">
            <p>
              نتخذ تدابير أمنية قوية لحماية بيانات المستخدمين:
            </p>

            <ul className="list-disc list-inside space-y-2">
              <li>
                <strong>التشفير:</strong> جميع البيانات مشفرة أثناء النقل (HTTPS) والتخزين (AES-256)
              </li>
              <li>
                <strong>المصادقة:</strong> نستخدم Google OAuth 2.0 لتسجيل الدخول الآمن
              </li>
              <li>
                <strong>الوصول المحدود:</strong> فقط الموظفون المصرح لهم يمكنهم الوصول للبيانات
              </li>
              <li>
                <strong>المراقبة:</strong> نراقب النظام بحثاً عن أنشطة مريبة
              </li>
              <li>
                <strong>النسخ الاحتياطية:</strong> نحتفظ بنسخ احتياطية آمنة للبيانات
              </li>
            </ul>

            <p className="mt-4 text-orange-600 dark:text-orange-400">
              <strong>ملاحظة:</strong> بالرغم من جهودنا، لا يمكن ضمان أمان 100%. استخدم كلمات مرور قوية وحافظ على سرية بيانات دخولك.
            </p>
          </div>
        </section>

        {/* 5. حقوق المستخدمين */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
            5. حقوق المستخدمين
          </h2>

          <div className="space-y-4">
            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded">
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                الوصول إلى البيانات
              </h4>
              <p className="text-gray-700 dark:text-gray-300">
                يمكنك طلب نسخة من البيانات التي نملكها عنك.
              </p>
            </div>

            <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded">
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                تصحيح البيانات
              </h4>
              <p className="text-gray-700 dark:text-gray-300">
                يمكنك تحديث أو تصحيح بيانات حسابك من لوحة التحكم.
              </p>
            </div>

            <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded">
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                حذف البيانات
              </h4>
              <p className="text-gray-700 dark:text-gray-300">
                يمكنك طلب حذف حسابك وجميع البيانات المرتبطة به.
              </p>
            </div>

            <div className="bg-orange-50 dark:bg-orange-900/20 p-4 rounded">
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                الاعتراض على المعالجة
              </h4>
              <p className="text-gray-700 dark:text-gray-300">
                يمكنك الاعتراض على معالجة بيانات معينة.
              </p>
            </div>
          </div>
        </section>

        {/* 6. ملفات تعريف الارتباط */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
            6. ملفات تعريف الارتباط (Cookies)
          </h2>

          <div className="space-y-4 text-gray-700 dark:text-gray-300">
            <p>
              نستخدم ملفات تعريف الارتباط لتحسين تجربتك على الموقع:
            </p>

            <div className="space-y-3">
              <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                  ملفات تعريف الارتباط الضرورية
                </h4>
                <p>
                  لتسجيل الدخول والأمان والوظائف الأساسية.
                </p>
              </div>

              <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                  ملفات تعريف الارتباط التحليلية
                </h4>
                <p>
                  لفهم كيفية استخدام المستخدمين للموقع (Google Analytics).
                </p>
              </div>

              <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                  ملفات تعريف الارتباط التسويقية
                </h4>
                <p>
                  لتحسين الإعلانات والمحتوى (Google Tag Manager).
                </p>
              </div>
            </div>

            <p className="mt-4">
              يمكنك التحكم في ملفات تعريف الارتباط من إعدادات المتصفح الخاص بك.
            </p>
          </div>
        </section>

        {/* 7. الاحتفاظ بالبيانات */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
            7. الاحتفاظ بالبيانات
          </h2>

          <div className="space-y-4 text-gray-700 dark:text-gray-300">
            <p>
              نحتفظ بالبيانات طالما كان حسابك نشطاً أو حسب الحاجة القانونية:
            </p>

            <ul className="list-disc list-inside space-y-2">
              <li>
                <strong>بيانات الحساب:</strong> طالما يكون الحساب نشطاً
              </li>
              <li>
                <strong>بيانات الفواتير:</strong> 7 سنوات (متطلبات ضريبية)
              </li>
              <li>
                <strong>سجلات الدخول:</strong> 90 يوماً
              </li>
              <li>
                <strong>بيانات التحليلات:</strong> 24 شهراً
              </li>
            </ul>

            <p className="mt-4">
              عند حذف الحساب، سيتم حذف جميع البيانات الشخصية خلال 30 يوماً (باستثناء ما يتطلبه القانون).
            </p>
          </div>
        </section>

        {/* 8. الأطفال */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
            8. حماية الأطفال
          </h2>

          <div className="space-y-4 text-gray-700 dark:text-gray-300">
            <p>
              خدماتنا موجهة للبالغين والشركات فقط. نحن لا نقصد جمع بيانات من الأطفال (أقل من 13 سنة).
            </p>
            <p>
              إذا اكتشفنا أننا جمعنا بيانات من طفل، سنحذفها فوراً. يرجى الاتصال بنا إذا كان لديك مخاوف.
            </p>
          </div>
        </section>

        {/* 9. التغييرات على السياسة */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
            9. التغييرات على السياسة
          </h2>

          <div className="space-y-4 text-gray-700 dark:text-gray-300">
            <p>
              قد نحدث هذه السياسة من وقت لآخر. سيتم إخطارك بأي تغييرات مهمة عبر البريد الإلكتروني أو إشعار على الموقع.
            </p>
            <p>
              استخدامك المستمر للخدمة بعد التغييرات يعني قبولك للسياسة الجديدة.
            </p>
          </div>
        </section>

        {/* 10. الاختصاص القضائي */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
            10. الاختصاص القضائي
          </h2>
          <div className="space-y-4 text-gray-700 dark:text-gray-300">
            <p>
              تخضع هذه السياسة لقوانين جمهورية مصر العربية. أي نزاع ينشأ عن هذه السياسة يجب أن يتم حله وفقاً للقوانين المصرية.
            </p>
            <p>
              بالنسبة للعملاء في السعودية والدول الأخرى، تطبق الخدمات القوانين المحلية ذات الصلة بالإضافة إلى هذه السياسة.
            </p>
          </div>
        </section>

        {/* 11. التواصل معنا */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
            11. التواصل معنا
          </h2>

          <div className="bg-gradient-to-r from-blue-50 to-green-50 dark:from-blue-900/20 dark:to-green-900/20 p-6 rounded-lg">
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              إذا كان لديك أسئلة حول سياسة الخصوصية أو بيانات، يرجى التواصل معنا:
            </p>

            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <span className="text-blue-600 dark:text-blue-400 font-semibold mt-1">📧</span>
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white">البريد الإلكتروني</p>
                  <a href="mailto:privacy@optiontechos.com" className="text-blue-600 dark:text-blue-400 hover:underline">
                    privacy@optiontechos.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="text-green-600 dark:text-green-400 font-semibold mt-1">🌐</span>
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white">الموقع</p>
                  <a href="https://optiontechos.com" className="text-blue-600 dark:text-blue-400 hover:underline">
                    https://optiontechos.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="text-purple-600 dark:text-purple-400 font-semibold mt-1">📍</span>
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white">الموقع</p>
                  <p className="text-gray-700 dark:text-gray-300">المملكة العربية السعودية</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer Note */}
        <div className="border-t border-gray-200 dark:border-gray-700 pt-8 mt-12">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            © 2026 OptionTech OS. جميع الحقوق محفوظة. هذه السياسة سارية المفعول اعتباراً من يناير 2026.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Privacy;
