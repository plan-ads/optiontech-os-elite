import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Bell, X, CheckCircle, AlertCircle, Info } from 'lucide-react';
import { trpc } from '@/lib/trpc';
import { formatDistanceToNow } from 'date-fns';
import { ar } from 'date-fns/locale';

interface Notification {
  id: number;
  title: string;
  content: string;
  type: 'success' | 'error' | 'info' | 'warning';
  read: boolean;
  createdAt: Date;
}

export function NotificationCenter() {
  const [open, setOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const { data: notificationsData } = trpc.notifications.list.useQuery(undefined, {
    refetchInterval: 5000, // تحديث كل 5 ثواني
  });

  const markAsReadMutation = trpc.notifications.markAsRead.useMutation();
  const deleteNotificationMutation = trpc.notifications.delete.useMutation();

  useEffect(() => {
    if (notificationsData) {
      setNotifications(notificationsData);
    }
  }, [notificationsData]);

  const unreadCount = notifications.filter(n => !n.read).length;

  const handleMarkAsRead = async (id: number) => {
    await markAsReadMutation.mutateAsync({ id });
    setNotifications(prev =>
      prev.map(n => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const handleDelete = async (id: number) => {
    await deleteNotificationMutation.mutateAsync({ id });
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'success':
        return <CheckCircle className="h-5 w-5 text-[#00FF88]" />;
      case 'error':
        return <AlertCircle className="h-5 w-5 text-red-500" />;
      case 'warning':
        return <AlertCircle className="h-5 w-5 text-yellow-500" />;
      default:
        return <Info className="h-5 w-5 text-blue-500" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'success':
        return 'bg-[#00FF88]/10 border-[#00FF88]/30';
      case 'error':
        return 'bg-red-500/10 border-red-500/30';
      case 'warning':
        return 'bg-yellow-500/10 border-yellow-500/30';
      default:
        return 'bg-blue-500/10 border-blue-500/30';
    }
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="relative p-2 text-gray-400 hover:text-[#00FF88] transition-colors"
      >
        <Bell className="h-6 w-6" />
        {unreadCount > 0 && (
          <Badge
            className="absolute -top-1 -right-1 bg-red-500 text-white text-xs"
            variant="default"
          >
            {unreadCount}
          </Badge>
        )}
      </button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[500px] bg-[#0a0f1a] border-[#00FF88]/30 max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-white">الإشعارات</DialogTitle>
            <DialogDescription className="text-gray-400">
              {unreadCount > 0
                ? `لديك ${unreadCount} إشعار جديد`
                : 'لا توجد إشعارات جديدة'}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-3 py-4">
            {notifications.length === 0 ? (
              <div className="text-center py-8">
                <Bell className="h-12 w-12 text-gray-600 mx-auto mb-3 opacity-50" />
                <p className="text-gray-500">لا توجد إشعارات</p>
              </div>
            ) : (
              notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-4 rounded-lg border ${getTypeColor(notification.type)} ${
                    !notification.read ? 'ring-1 ring-[#00FF88]/50' : ''
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="mt-1">{getIcon(notification.type)}</div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <h3 className="font-medium text-white">{notification.title}</h3>
                        <button
                          onClick={() => handleDelete(notification.id)}
                          className="text-gray-500 hover:text-gray-300 transition-colors"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                      <p className="text-sm text-gray-400 mt-1">{notification.content}</p>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-xs text-gray-500">
                          {formatDistanceToNow(new Date(notification.createdAt), {
                            locale: ar,
                            addSuffix: true,
                          })}
                        </span>
                        {!notification.read && (
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleMarkAsRead(notification.id)}
                            className="h-6 text-xs text-[#00FF88] hover:bg-[#00FF88]/10"
                          >
                            وضع علامة كمقروء
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
