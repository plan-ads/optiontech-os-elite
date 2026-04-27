import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, AlertCircle, CheckCircle, Copy } from 'lucide-react';
import { trpc } from '@/lib/trpc';

interface CreateAccountModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
}

export function CreateAccountModal({ open, onOpenChange, onSuccess }: CreateAccountModalProps) {
  const [accountName, setAccountName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [newAccountId, setNewAccountId] = useState<string | null>(null);

  const utils = trpc.useUtils();
  const createAccountMutation = trpc.oauth.createGoogleAdsAccount.useMutation({
    onSuccess: (data) => {
      setSuccess(true);
      setNewAccountId(data.customerId);
      setAccountName('');
      utils.oauth.getLinkedAccounts.invalidate();
      setTimeout(() => {
        onOpenChange(false);
        setSuccess(false);
        setNewAccountId(null);
        onSuccess?.();
      }, 3000);
    },
    onError: (error) => {
      setError(error.message || 'فشل إنشاء الحساب');
    },
  });

  const handleCreate = async () => {
    if (!accountName.trim()) {
      setError('يرجى إدخال اسم الحساب');
      return;
    }

    setLoading(true);
    setError(null);
    
    try {
      await createAccountMutation.mutateAsync({ accountName: accountName.trim() });
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] bg-[#0a0f1a] border-[#00FF88]/30">
        <DialogHeader>
          <DialogTitle className="text-white">إنشاء حساب Google Ads جديد</DialogTitle>
          <DialogDescription className="text-gray-400">
            قم بإنشاء حساب Google Ads جديد مباشرة من منصتنا
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {success && newAccountId ? (
            <div className="space-y-4">
              <Alert className="border-[#00FF88]/50 bg-[#00FF88]/10">
                <CheckCircle className="h-4 w-4 text-[#00FF88]" />
                <AlertDescription className="text-[#00FF88]">
                  تم إنشاء الحساب بنجاح!
                </AlertDescription>
              </Alert>

              <div className="bg-[#050810] border border-[#00FF88]/30 rounded-lg p-4 space-y-2">
                <p className="text-sm text-gray-400">معرف الحساب الجديد:</p>
                <div className="flex items-center gap-2">
                  <code className="flex-1 bg-[#0a0f1a] border border-[#00FF88]/20 rounded px-3 py-2 text-[#00FF88] text-sm font-mono break-all">
                    {newAccountId}
                  </code>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => copyToClipboard(newAccountId)}
                    className="border-[#00FF88]/30 text-gray-300 hover:bg-[#00FF88]/10"
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
                <p className="text-xs text-gray-500">
                  احفظ هذا المعرف - ستحتاجه للوصول إلى حسابك
                </p>
              </div>

              <p className="text-sm text-gray-400 text-center">
                جاري إعداد حسابك... سيتم إعادة التوجيه قريباً
              </p>
            </div>
          ) : error ? (
            <Alert className="border-red-500/50 bg-red-500/10">
              <AlertCircle className="h-4 w-4 text-red-500" />
              <AlertDescription className="text-red-500">
                {error}
              </AlertDescription>
            </Alert>
          ) : null}

          {!success && (
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">اسم الحساب</label>
              <Input
                placeholder="مثال: حسابي الإعلاني"
                value={accountName}
                onChange={(e) => {
                  setAccountName(e.target.value);
                  setError(null);
                }}
                disabled={loading}
                className="bg-[#050810] border-[#00FF88]/30 text-white placeholder:text-gray-600"
              />
              <p className="text-xs text-gray-500">
                اختر اسماً يساعدك على تذكر الغرض من هذا الحساب
              </p>
            </div>
          )}

          {!success && (
            <div className="flex gap-3 pt-4">
              <Button
                variant="outline"
                onClick={() => onOpenChange(false)}
                disabled={loading}
                className="flex-1 border-[#00FF88]/30 text-gray-300 hover:bg-[#00FF88]/10"
              >
                إلغاء
              </Button>
              <Button
                onClick={handleCreate}
                disabled={loading || !accountName.trim()}
                className="flex-1 bg-gradient-to-r from-[#00FF88] to-[#00D4FF] text-[#0a0f1a] hover:opacity-90"
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    جاري الإنشاء...
                  </>
                ) : (
                  'إنشاء الحساب'
                )}
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
