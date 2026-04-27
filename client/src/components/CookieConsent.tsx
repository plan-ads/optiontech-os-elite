import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { Link } from "wouter";

export default function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if user has already accepted cookies
    const cookieConsent = localStorage.getItem("cookieConsent");
    if (!cookieConsent) {
      // Small delay to avoid jarring appearance
      const timer = setTimeout(() => setIsVisible(true), 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookieConsent", "accepted");
    setIsVisible(false);
  };

  const handleReject = () => {
    localStorage.setItem("cookieConsent", "rejected");
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-white dark:bg-slate-900 border-t border-gray-200 dark:border-slate-800 shadow-2xl">
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          {/* Message */}
          <div className="flex-1">
            <p className="text-sm text-gray-700 dark:text-gray-300">
              نحن نستخدم ملفات تعريف الارتباط (Cookies) لتحسين تجربتك على الموقع. بالموافقة، أنت توافق على{" "}
              <Link
                href="/cookies"
                className="text-cyan-600 dark:text-cyan-400 hover:underline font-medium"
              >
                سياسة الملفات
              </Link>
              {" "}و{" "}
              <Link
                href="/privacy"
                className="text-cyan-600 dark:text-cyan-400 hover:underline font-medium"
              >
                سياسة الخصوصية
              </Link>
            </p>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <button
              onClick={handleReject}
              className="px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
            >
              رفض
            </button>
            <button
              onClick={handleAccept}
              className="px-4 py-2 text-sm font-medium bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg transition-colors"
            >
              موافق
            </button>
            <button
              onClick={() => setIsVisible(false)}
              className="p-1 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
              aria-label="إغلاق"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
