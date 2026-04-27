/*
 * Cookie Policy Page - OptionTech OS Elite Intelligence
 * سياسة ملفات تعريف الارتباط
 */

import { useEffect } from 'react';

const Cookies = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-[#050810] text-gray-900 dark:text-gray-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-50 to-green-50 dark:from-[#0a0f1a] dark:to-[#0f1520] py-12 px-6">
        <div className="container mx-auto max-w-4xl">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            سياسة ملفات تعريف الارتباط
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            آخر تحديث: يناير 2026
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto max-w-4xl py-12 px-6">
        {/* Introduction */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
            مقدمة
          </h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
            تستخدم منصة OptionTech OS ملفات تعريف الارتباط (Cookies) وتقنيات تتبع مشابهة لتحسين تجربتك على الموقع. هذه السياسة تشرح ما هي ملفات تعريف الارتباط وكيف نستخدمها.
          </p>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            بموجب استخدامك للموقع، فإنك توافق على استخدام ملفات تعريف الارتباط وفقاً لهذه السياسة.
          </p>
        </section>

        {/* 1. ما هي ملفات تعريف الارتباط */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
            1. ما هي ملفات تعريف الارتباط؟
          </h2>

          <div className="space-y-4 text-gray-700 dark:text-gray-300">
            <p>
              ملفات تعريف الارتباط (Cookies) هي ملفات صغيرة يتم حفظها على جهازك عند زيارة الموقع. تحتوي على معلومات تساعدنا على:
            </p>

            <ul className="list-disc list-inside space-y-2">
              <li>تذكر تفضيلاتك وإعداداتك</li>
              <li>تحسين أداء الموقع</li>
              <li>فهم كيفية استخدام المستخدمين للموقع</li>
              <li>تقديم محتوى مخصص</li>
              <li>الحفاظ على أمان حسابك</li>
            </ul>

            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded mt-4">
              <p className="text-sm">
                <strong>ملاحظة:</strong> ملفات تعريف الارتباط لا تحتوي على فيروسات أو برامج ضارة. هي ملفات نصية آمنة تماماً.
              </p>
            </div>
          </div>
        </section>

        {/* 2. أنواع ملفات تعريف الارتباط */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
            2. أنواع ملفات تعريف الارتباط
          </h2>

          <div className="space-y-4">
            {/* Essential */}
            <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 p-4">
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                ملفات تعريف الارتباط الضرورية (Essential)
              </h4>
              <p className="text-gray-700 dark:text-gray-300 mb-3">
                ضرورية لتشغيل الموقع والخدمات الأساسية:
              </p>
              <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300 text-sm">
                <li>تسجيل الدخول والمصادقة</li>
                <li>الأمان والحماية من الاحتيال</li>
                <li>تذكر تفضيلات اللغة والموضوع</li>
                <li>الحفاظ على جلسة المستخدم</li>
              </ul>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-3">
                <strong>لا يمكن تعطيلها:</strong> هذه الملفات ضرورية لعمل الموقع
              </p>
            </div>

            {/* Analytics */}
            <div className="bg-green-50 dark:bg-green-900/20 border-l-4 border-green-500 p-4">
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                ملفات تعريف الارتباط التحليلية (Analytics)
              </h4>
              <p className="text-gray-700 dark:text-gray-300 mb-3">
                لفهم كيفية استخدام المستخدمين للموقع:
              </p>
              <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300 text-sm">
                <li>عدد الزيارات والمستخدمين</li>
                <li>الصفحات الأكثر زيارة</li>
                <li>مدة الجلسة والتفاعل</li>
                <li>مصدر الزيارة (Google, Facebook, إلخ)</li>
              </ul>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-3">
                <strong>المزود:</strong> Google Analytics
              </p>
            </div>

            {/* Marketing */}
            <div className="bg-purple-50 dark:bg-purple-900/20 border-l-4 border-purple-500 p-4">
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                ملفات تعريف الارتباط التسويقية (Marketing)
              </h4>
              <p className="text-gray-700 dark:text-gray-300 mb-3">
                لتحسين الإعلانات والمحتوى:
              </p>
              <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300 text-sm">
                <li>تتبع الإعلانات والحملات</li>
                <li>فهم اهتمامات المستخدمين</li>
                <li>تحسين استهداف الإعلانات</li>
                <li>قياس فعالية الحملات</li>
              </ul>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-3">
                <strong>المزود:</strong> Google Tag Manager, Google Ads
              </p>
            </div>

            {/* Functional */}
            <div className="bg-orange-50 dark:bg-orange-900/20 border-l-4 border-orange-500 p-4">
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                ملفات تعريف الارتباط الوظيفية (Functional)
              </h4>
              <p className="text-gray-700 dark:text-gray-300 mb-3">
                لتحسين تجربة المستخدم:
              </p>
              <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300 text-sm">
                <li>تذكر تفضيلاتك (Theme, Language)</li>
                <li>حفظ بيانات النموذج</li>
                <li>تخصيص المحتوى</li>
                <li>تحسين الأداء</li>
              </ul>
            </div>
          </div>
        </section>

        {/* 3. ملفات تعريف الارتباط المستخدمة */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
            3. ملفات تعريف الارتباط المستخدمة
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-100 dark:bg-gray-800">
                  <th className="px-4 py-2 text-right text-gray-900 dark:text-white font-semibold">اسم الملف</th>
                  <th className="px-4 py-2 text-right text-gray-900 dark:text-white font-semibold">النوع</th>
                  <th className="px-4 py-2 text-right text-gray-900 dark:text-white font-semibold">الغرض</th>
                  <th className="px-4 py-2 text-right text-gray-900 dark:text-white font-semibold">المدة</th>
                </tr>
              </thead>
              <tbody className="text-gray-700 dark:text-gray-300">
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <td className="px-4 py-3">session_id</td>
                  <td className="px-4 py-3">ضروري</td>
                  <td className="px-4 py-3">تسجيل الدخول والمصادقة</td>
                  <td className="px-4 py-3">عند الخروج</td>
                </tr>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <td className="px-4 py-3">theme_preference</td>
                  <td className="px-4 py-3">وظيفي</td>
                  <td className="px-4 py-3">تذكر الموضوع (Light/Dark)</td>
                  <td className="px-4 py-3">سنة واحدة</td>
                </tr>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <td className="px-4 py-3">language_preference</td>
                  <td className="px-4 py-3">وظيفي</td>
                  <td className="px-4 py-3">تذكر اللغة المختارة</td>
                  <td className="px-4 py-3">سنة واحدة</td>
                </tr>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <td className="px-4 py-3">_ga</td>
                  <td className="px-4 py-3">تحليلي</td>
                  <td className="px-4 py-3">Google Analytics - تتبع الزيارات</td>
                  <td className="px-4 py-3">سنتان</td>
                </tr>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <td className="px-4 py-3">_gid</td>
                  <td className="px-4 py-3">تحليلي</td>
                  <td className="px-4 py-3">Google Analytics - معرف الجلسة</td>
                  <td className="px-4 py-3">24 ساعة</td>
                </tr>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <td className="px-4 py-3">GTM_ID</td>
                  <td className="px-4 py-3">تسويقي</td>
                  <td className="px-4 py-3">Google Tag Manager - تتبع الأحداث</td>
                  <td className="px-4 py-3">جلسة واحدة</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* 4. ملفات تعريف الارتباط الطرف الثالث */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
            4. ملفات تعريف الارتباط من أطراف ثالثة
          </h2>

          <div className="space-y-4 text-gray-700 dark:text-gray-300">
            <p>
              قد تستخدم الخدمات التالية ملفات تعريف الارتباط الخاصة بها:
            </p>

            <div className="space-y-3">
              <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                  Google Analytics
                </h4>
                <p className="text-sm mb-2">
                  لتحليل استخدام الموقع والإحصائيات
                </p>
                <a href="https://policies.google.com/privacy" className="text-blue-600 dark:text-blue-400 hover:underline text-sm">
                  سياسة الخصوصية
                </a>
              </div>

              <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                  Google Tag Manager
                </h4>
                <p className="text-sm mb-2">
                  لتتبع الأحداث والتحويلات
                </p>
                <a href="https://policies.google.com/privacy" className="text-blue-600 dark:text-blue-400 hover:underline text-sm">
                  سياسة الخصوصية
                </a>
              </div>

              <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                  Google OAuth
                </h4>
                <p className="text-sm mb-2">
                  لتسجيل الدخول والمصادقة الآمنة
                </p>
                <a href="https://policies.google.com/privacy" className="text-blue-600 dark:text-blue-400 hover:underline text-sm">
                  سياسة الخصوصية
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* 5. كيفية التحكم في ملفات تعريف الارتباط */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
            5. كيفية التحكم في ملفات تعريف الارتباط
          </h2>

          <div className="space-y-4">
            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded">
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                إعدادات المتصفح
              </h4>
              <p className="text-gray-700 dark:text-gray-300 mb-3">
                يمكنك التحكم في ملفات تعريف الارتباط من إعدادات المتصفح:
              </p>
              <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300 text-sm">
                <li>
                  <strong>Chrome:</strong> Settings → Privacy and security → Cookies and other site data
                </li>
                <li>
                  <strong>Firefox:</strong> Preferences → Privacy & Security → Cookies and Site Data
                </li>
                <li>
                  <strong>Safari:</strong> Preferences → Privacy → Cookies and website data
                </li>
                <li>
                  <strong>Edge:</strong> Settings → Privacy and services → Cookies and other site data
                </li>
              </ul>
            </div>

            <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded">
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                الخيارات المتاحة
              </h4>
              <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
                <li>
                  <strong>قبول جميع الملفات:</strong> السماح بجميع ملفات تعريف الارتباط
                </li>
                <li>
                  <strong>رفض الملفات غير الضرورية:</strong> قبول الملفات الضرورية فقط
                </li>
                <li>
                  <strong>حذف الملفات:</strong> حذف جميع ملفات تعريف الارتباط المحفوظة
                </li>
                <li>
                  <strong>الوضع الخاص:</strong> عدم حفظ ملفات تعريف الارتباط
                </li>
              </ul>
            </div>

            <div className="bg-orange-50 dark:bg-orange-900/20 p-4 rounded">
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                تحذير مهم
              </h4>
              <p className="text-gray-700 dark:text-gray-300 text-sm">
                إذا عطلت ملفات تعريف الارتباط الضرورية، قد لا تتمكن من:
              </p>
              <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300 text-sm mt-2">
                <li>تسجيل الدخول إلى حسابك</li>
                <li>استخدام الخدمات الأساسية</li>
                <li>الحفاظ على تفضيلاتك</li>
              </ul>
            </div>
          </div>
        </section>

        {/* 6. عدم التتبع */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
            6. إشارة عدم التتبع (Do Not Track)
          </h2>

          <div className="space-y-4 text-gray-700 dark:text-gray-300">
            <p>
              بعض المتصفحات تدعم ميزة "عدم التتبع" (Do Not Track). نحترم هذا الطلب، لكن:
            </p>

            <ul className="list-disc list-inside space-y-2">
              <li>
                ملفات تعريف الارتباط الضرورية ستبقى مفعلة (لتشغيل الموقع)
              </li>
              <li>
                ملفات تعريف الارتباط التحليلية والتسويقية قد تكون محدودة
              </li>
              <li>
                قد تتأثر بعض الميزات بتفعيل هذا الخيار
              </li>
            </ul>
          </div>
        </section>

        {/* 7. تحديثات السياسة */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
            7. تحديثات السياسة
          </h2>

          <div className="space-y-4 text-gray-700 dark:text-gray-300">
            <p>
              قد نحدث هذه السياسة من وقت لآخر. سيتم إخطارك بأي تغييرات مهمة.
            </p>

            <p>
              آخر تحديث: يناير 2026
            </p>
          </div>
        </section>

        {/* 8. التواصل معنا */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
            8. التواصل معنا
          </h2>

          <div className="bg-gradient-to-r from-blue-50 to-green-50 dark:from-blue-900/20 dark:to-green-900/20 p-6 rounded-lg">
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              إذا كان لديك أسئلة حول سياسة ملفات تعريف الارتباط:
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

export default Cookies;
