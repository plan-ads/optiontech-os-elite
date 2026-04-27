import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, AlertCircle, CheckCircle } from 'lucide-react';
import { trpc } from '@/lib/trpc';

interface LinkAccountModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
}

export function LinkAccountModal({ open, onOpenChange, onSuccess }: LinkAccountModalProps) {
  const [customerId, setCustomerId] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const utils = trpc.useUtils();
  const linkAccountMutation = trpc.oauth.linkGoogleAdsAccount.useMutation({
    onSuccess: () => {
      setSuccess(true);
      setCustomerId('');
      utils.oauth.getLinkedAccounts.invalidate();
      setTimeout(() => {
        onOpenChange(false);
        setSuccess(false);
        onSuccess?.();
      }, 2000);
    },
    onError: (error) => {
      setError(error.message || 'فشل ربط الحساب');
    },
  });

  const handleLink = async () => {
    if (!customerId.trim()) {
      setError('يرجى إدخال معرف الحساب');
      return;
    }

    setLoading(true);
    setError(null);
    
    try {
      await linkAccountMutation.mutateAsync({ customerId: customerId.trim() });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] bg-[#0a0f1a] border-[#00FF88]/30">
        <DialogHeader>
          <DialogTitle className="text-white">ربط حساب Google Ads</DialogTitle>
          <DialogDescription className="text-gray-400">
            أدخل معرف حسابك في Google Ads لربطه بمنصتنا
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {success ? (
            <Alert className="border-[#00FF88]/50 bg-[#00FF88]/10">
              <CheckCircle className="h-4 w-4 text-[#00FF88]" />
              <AlertDescription className="text-[#00FF88]">
                تم ربط الحساب بنجاح! جاري المزامنة...
              </AlertDescription>
            </Alert>
          ) : error ? (
            <Alert className="border-red-500/50 bg-red-500/10">
              <AlertCircle className="h-4 w-4 text-red-500" />
              <AlertDescription className="text-red-500">
                {error}
              </AlertDescription>
            </Alert>
          ) : null}

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300">معرف الحساب</label>
            <Input
              placeholder="مثال: 1234567890"
              value={customerId}
              onChange={(e) => {
                setCustomerId(e.target.value);
                setError(null);
              }}
              disabled={loading || success}
              className="bg-[#050810] border-[#00FF88]/30 text-white placeholder:text-gray-600"
            />
            <p className="text-xs text-gray-500">
              يمكنك العثور على معرف الحساب في إعدادات حسابك في Google Ads
            </p>
          </div>

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
              onClick={handleLink}
              disabled={loading || success || !customerId.trim()}
              className="flex-1 bg-gradient-to-r from-[#00FF88] to-[#00D4FF] text-[#0a0f1a] hover:opacity-90"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  جاري الربط...
                </>
              ) : (
                'ربط الحساب'
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
