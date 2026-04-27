/*
 * Terms of Service Page - OptionTech OS Elite Intelligence
 * شروط الخدمة والاستخدام
 */

import { useEffect } from 'react';

const Terms = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-[#050810] text-gray-900 dark:text-gray-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-50 to-green-50 dark:from-[#0a0f1a] dark:to-[#0f1520] py-12 px-6">
        <div className="container mx-auto max-w-4xl">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            شروط الخدمة والاستخدام
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            آخر تحديث: يناير 2026
          </p>
          <div className="mt-4 p-4 bg-blue-100 dark:bg-blue-900/30 border-l-4 border-blue-500 rounded">
            <p className="text-sm text-gray-700 dark:text-gray-300">
              <strong>الشركة:</strong> Option للتسويق الإلكتروني | <strong>المقر الرئيسي:</strong> جمهورية مصر العربية | <strong>السجلات:</strong> مصر | <strong>العمل والخدمات:</strong> السوق السعودي
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
              هذه الشروط تُدار بواسطة <strong>Option للتسويق الإلكتروني</strong>، شركة مصرية مسجلة في جمهورية مصر العربية. نحن متخصصون في حماية حسابات Google Ads من النقرات الوهمية والاحتيال، ونقدم خدماتنا للسوق السعودي.
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
            مرحباً بك في OptionTech OS Elite Intelligence. هذه الشروط تحكم استخدامك لخدماتنا. بموجب الوصول إلى الموقع أو استخدام الخدمة، فإنك توافق على الالتزام بهذه الشروط.
          </p>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            إذا كنت لا توافق على أي جزء من هذه الشروط، يرجى عدم استخدام خدماتنا.
          </p>
        </section>

        {/* 1. تعريف الخدمات */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
            1. تعريف الخدمات
          </h2>

          <div className="space-y-4 text-gray-700 dark:text-gray-300">
            <p>
              OptionTech OS توفر منصة متكاملة لحماية حملات Google Ads من خلال:
            </p>

            <ul className="list-disc list-inside space-y-2">
              <li>
                <strong>كشف النقرات الوهمية:</strong> تحديد والقضاء على النقرات غير الشرعية
              </li>
              <li>
                <strong>حظر الروبوتات:</strong> منع الروبوتات من النقر على إعلاناتك
              </li>
              <li>
                <strong>التحليلات المتقدمة:</strong> تقارير مفصلة عن أداء حملاتك
              </li>
              <li>
                <strong>الحماية الذكية:</strong> حماية تلقائية بناءً على الذكاء الاصطناعي
              </li>
              <li>
                <strong>دعم العملاء:</strong> دعم فني متخصص 24/7
              </li>
            </ul>
          </div>
        </section>

        {/* 2. حساب المستخدم */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
            2. حساب المستخدم
          </h2>

          <div className="space-y-4">
            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded">
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                المسؤولية عن الحساب
              </h4>
              <p className="text-gray-700 dark:text-gray-300">
                أنت مسؤول عن الحفاظ على سرية كلمة المرور والبيانات المرتبطة بحسابك. أنت توافق على تحمل جميع الأنشطة التي تحدث تحت حسابك.
              </p>
            </div>

            <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded">
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                المعلومات الدقيقة
              </h4>
              <p className="text-gray-700 dark:text-gray-300">
                تتعهد بتقديم معلومات دقيقة وكاملة عند إنشاء الحساب والحفاظ على تحديثها.
              </p>
            </div>

            <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded">
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                الاستخدام المسؤول
              </h4>
              <p className="text-gray-700 dark:text-gray-300">
                توافق على عدم مشاركة حسابك مع الآخرين وعدم استخدام الخدمة لأغراض غير قانونية.
              </p>
            </div>
          </div>
        </section>

        {/* 3. الاستخدام المقبول */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
            3. الاستخدام المقبول
          </h2>

          <div className="space-y-4 text-gray-700 dark:text-gray-300">
            <p>
              توافق على عدم استخدام الخدمة:
            </p>

            <ul className="list-disc list-inside space-y-2">
              <li>لأغراض غير قانونية أو غير أخلاقية</li>
              <li>لنشر محتوى مسيء أو تهديدات</li>
              <li>للتحرش أو الإساءة إلى الآخرين</li>
              <li>لنشر برامج ضارة أو فيروسات</li>
              <li>لانتهاك حقوق الملكية الفكرية</li>
              <li>لمحاولة الوصول غير المصرح به إلى الخدمة</li>
              <li>لإرسال بريد عشوائي أو محتوى مكرر</li>
              <li>لاستخدام الخدمة بطريقة تؤثر على أداء النظام</li>
            </ul>
          </div>
        </section>

        {/* 4. الملكية الفكرية */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
            4. الملكية الفكرية
          </h2>

          <div className="space-y-4 text-gray-700 dark:text-gray-300">
            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded">
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                حقوق OptionTech OS
              </h4>
              <p>
                جميع محتوى الموقع والخدمة (البرامج، التصاميم، النصوص، الرسومات) ملك لـ OptionTech OS. لا يمكنك نسخ أو توزيع أو تعديل أي محتوى بدون إذن كتابي.
              </p>
            </div>

            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded">
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                حقوق المستخدم
              </h4>
              <p>
                أنت تحتفظ بجميع حقوق محتوى Google Ads الخاص بك. نحن نستخدم هذا المحتوى فقط لتقديم الخدمة.
              </p>
            </div>
          </div>
        </section>

        {/* 5. الأسعار والدفع */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
            5. الأسعار والدفع
          </h2>

          <div className="space-y-4 text-gray-700 dark:text-gray-300">
            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded">
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                الأسعار
              </h4>
              <p>
                قد نغير الأسعار في أي وقت. سيتم إخطارك بأي تغييرات قبل 30 يوماً. استمرارك في استخدام الخدمة يعني قبولك للأسعار الجديدة.
              </p>
            </div>

            <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded">
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                الفواتير والدفع
              </h4>
              <p>
                ستُرسل الفواتير شهرياً أو حسب الخطة المختارة. توافق على دفع جميع الرسوم المستحقة في الموعد المحدد.
              </p>
            </div>

            <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded">
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                المبالغ المرتجعة
              </h4>
              <p>
                لا توجد مبالغ مرتجعة بعد استخدام الخدمة. يمكنك إلغاء الاشتراك في أي وقت.
              </p>
            </div>
          </div>
        </section>

        {/* 6. الخدمات المقدمة */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
            6. الخدمات المقدمة
          </h2>

          <div className="space-y-4 text-gray-700 dark:text-gray-300">
            <p>
              نبذل قصارى جهدنا لتقديم خدمة عالية الجودة، لكن:
            </p>

            <ul className="list-disc list-inside space-y-2">
              <li>
                <strong>بدون ضمانات:</strong> الخدمة تُقدم "كما هي" بدون ضمانات صريحة أو ضمنية
              </li>
              <li>
                <strong>التوفر:</strong> قد تحدث أعطال أو صيانة. نسعى لتوفر 99.5% لكن لا نضمنه
              </li>
              <li>
                <strong>الدقة:</strong> بينما نسعى للدقة، قد تحتوي البيانات على أخطاء
              </li>
              <li>
                <strong>المسؤولية المحدودة:</strong> لن نكون مسؤولين عن خسائر غير مباشرة أو عرضية
              </li>
            </ul>
          </div>
        </section>

        {/* 7. تعليق الخدمة */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
            7. تعليق الخدمة
          </h2>

          <div className="space-y-4 text-gray-700 dark:text-gray-300">
            <p>
              قد نعلق أو نلغي حسابك إذا:
            </p>

            <ul className="list-disc list-inside space-y-2">
              <li>انتهكت هذه الشروط</li>
              <li>لم تدفع الرسوم المستحقة</li>
              <li>استخدمت الخدمة بطريقة تضر النظام</li>
              <li>انتهكت القوانين أو حقوق الآخرين</li>
              <li>قمت بأنشطة احتيالية</li>
            </ul>

            <p className="mt-4">
              سنحاول إخطارك قبل التعليق عندما يكون ذلك ممكناً.
            </p>
          </div>
        </section>

        {/* 8. التعديلات على الشروط */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
            8. التعديلات على الشروط
          </h2>

          <div className="space-y-4 text-gray-700 dark:text-gray-300">
            <p>
              قد نعدل هذه الشروط في أي وقت. سيتم إخطارك بالتغييرات المهمة. استمرارك في استخدام الخدمة يعني قبولك للشروط الجديدة.
            </p>
          </div>
        </section>

        {/* 9. الإنهاء */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
            9. الإنهاء
          </h2>

          <div className="space-y-4 text-gray-700 dark:text-gray-300">
            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded">
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                الإنهاء من قبلك
              </h4>
              <p>
                يمكنك إنهاء حسابك في أي وقت من إعدادات الحساب. سيتم حذف البيانات وفقاً لسياسة الخصوصية.
              </p>
            </div>

            <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded">
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                الإنهاء من قبلنا
              </h4>
              <p>
                قد ننهي الخدمة بإشعار 30 يوماً إذا توقفنا عن تقديم الخدمة.
              </p>
            </div>
          </div>
        </section>

        {/* 10. المسؤولية القانونية */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
            10. المسؤولية القانونية
          </h2>

          <div className="space-y-4 text-gray-700 dark:text-gray-300">
            <p>
              <strong>تحديد المسؤولية:</strong> في أي حال، لن تتجاوز مسؤوليتنا المبلغ الذي دفعته في آخر 12 شهراً.
            </p>

            <p>
              <strong>عدم المسؤولية:</strong> لن نكون مسؤولين عن:
            </p>

            <ul className="list-disc list-inside space-y-2">
              <li>الخسائر غير المباشرة أو العرضية</li>
              <li>فقدان البيانات أو الأرباح</li>
              <li>انقطاع الخدمة</li>
              <li>الأضرار الناجمة عن استخدام الخدمة</li>
            </ul>
          </div>
        </section>

        {/* 11. القانون الواجب التطبيق */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
            11. القانون الواجب التطبيق
          </h2>

          <div className="space-y-4 text-gray-700 dark:text-gray-300">
            <p>
              تحكم هذه الشروط قوانين المملكة العربية السعودية. أي نزاع سيتم حله في المحاكم السعودية.
            </p>
          </div>
        </section>

        {/* 12. التواصل معنا */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
            12. التواصل معنا
          </h2>

          <div className="bg-gradient-to-r from-blue-50 to-green-50 dark:from-blue-900/20 dark:to-green-900/20 p-6 rounded-lg">
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              إذا كان لديك أسئلة حول هذه الشروط:
            </p>

            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <span className="text-blue-600 dark:text-blue-400 font-semibold mt-1">📧</span>
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white">البريد الإلكتروني</p>
                  <a href="mailto:support@optiontechos.com" className="text-blue-600 dark:text-blue-400 hover:underline">
                    support@optiontechos.com
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
            © 2026 OptionTech OS. جميع الحقوق محفوظة. هذه الشروط سارية المفعول اعتباراً من يناير 2026.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Terms;
