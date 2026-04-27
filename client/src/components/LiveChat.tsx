/**
 * Live Chat Component - نظام الدردشة المباشرة
 */

import { useState, useEffect, useRef } from "react";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { MessageCircle, X, Send } from "lucide-react";
import { cn } from "@/lib/utils";

interface Message {
  id: number;
  conversationId: number;
  senderId: number;
  senderType: "customer" | "admin";
  message: string;
  createdAt: Date;
}

interface Conversation {
  id: number;
  subject: string;
  status: "open" | "in_progress" | "resolved" | "closed";
  lastMessageAt: Date;
}

export default function LiveChat() {
  const { user, isAuthenticated } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [isStarting, setIsStarting] = useState(false);
  const [selectedConversation, setSelectedConversation] = useState<number | null>(null);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [subject, setSubject] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const utils = trpc.useUtils();

  // Get conversations
  const { data: conversationsData } = trpc.chat.getConversations.useQuery(undefined, {
    enabled: isAuthenticated && isOpen,
  });

  // Get messages for selected conversation
  const { data: messagesData } = trpc.chat.getMessages.useQuery(
    { conversationId: selectedConversation! },
    {
      enabled: isAuthenticated && !!selectedConversation,
      refetchInterval: 3000, // Poll every 3 seconds
    }
  );

  // Start conversation mutation
  const startConversationMutation = trpc.chat.startConversation.useMutation({
    onSuccess: (data) => {
      setSelectedConversation(data.conversationId);
      setSubject("");
      setIsStarting(false);
      utils.chat.getConversations.invalidate();
    },
    onError: (error) => {
      console.error("Failed to start conversation:", error);
      setIsStarting(false);
    },
  });

  // Send message mutation
  const sendMessageMutation = trpc.chat.sendMessage.useMutation({
    onSuccess: () => {
      setNewMessage("");
      utils.chat.getMessages.invalidate({ conversationId: selectedConversation! });
    },
    onError: (error) => {
      console.error("Failed to send message:", error);
    },
  });

  // Update conversations list
  useEffect(() => {
    if (conversationsData) {
      setConversations(conversationsData);
    }
  }, [conversationsData]);

  // Update messages list
  useEffect(() => {
    if (messagesData) {
      setMessages(messagesData);
      scrollToBottom();
    }
  }, [messagesData]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleStartConversation = async () => {
    if (!subject.trim() || !newMessage.trim()) {
      return;
    }
    setIsStarting(true);
    await startConversationMutation.mutateAsync({
      subject,
      message: newMessage,
    });
  };

  const handleSendMessage = async () => {
    if (!newMessage.trim() || !selectedConversation) {
      return;
    }
    await sendMessageMutation.mutateAsync({
      conversationId: selectedConversation,
      message: newMessage,
    });
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <>
      {/* Chat Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-40 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-full p-4 shadow-lg hover:shadow-xl transition-shadow"
          title="فتح الدردشة المباشرة"
        >
          <MessageCircle className="w-6 h-6" />
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <Card className="fixed bottom-6 right-6 z-50 w-96 max-w-[90vw] h-[600px] max-h-[80vh] flex flex-col shadow-2xl">
          {/* Header */}
          <div className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white p-4 rounded-t-lg flex justify-between items-center">
            <h3 className="font-bold">الدردشة المباشرة</h3>
            <button
              onClick={() => setIsOpen(false)}
              className="hover:bg-white/20 p-1 rounded transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-hidden flex flex-col">
            {!selectedConversation ? (
              // Start conversation form
              <div className="flex-1 p-4 flex flex-col gap-4">
                <div className="text-sm text-gray-600 mb-2">
                  ابدأ محادثة جديدة مع فريق الدعم
                </div>

                <input
                  type="text"
                  placeholder="موضوع المحادثة"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />

                <textarea
                  placeholder="اكتب رسالتك..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 flex-1 resize-none"
                />

                <Button
                  onClick={handleStartConversation}
                  disabled={!subject.trim() || !newMessage.trim() || isStarting}
                  className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white"
                >
                  {isStarting ? "جاري الإرسال..." : "ابدأ المحادثة"}
                </Button>

                {/* Recent conversations */}
                {conversations.length > 0 && (
                  <div className="mt-4 border-t pt-4">
                    <p className="text-sm font-semibold mb-2">محادثاتك السابقة:</p>
                    <div className="space-y-2 max-h-40 overflow-y-auto">
                      {conversations.map((conv) => (
                        <button
                          key={conv.id}
                          onClick={() => setSelectedConversation(conv.id)}
                          className="w-full text-left p-2 hover:bg-gray-100 rounded transition text-sm"
                        >
                          <div className="font-medium truncate">{conv.subject}</div>
                          <div className="text-xs text-gray-500">
                            {conv.status === "open" && "مفتوحة"}
                            {conv.status === "in_progress" && "قيد المعالجة"}
                            {conv.status === "resolved" && "تم حلها"}
                            {conv.status === "closed" && "مغلقة"}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              // Messages view
              <>
                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-3">
                  {messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={cn(
                        "flex",
                        msg.senderType === "customer" ? "justify-end" : "justify-start"
                      )}
                    >
                      <div
                        className={cn(
                          "max-w-xs px-3 py-2 rounded-lg text-sm",
                          msg.senderType === "customer"
                            ? "bg-cyan-500 text-white rounded-br-none"
                            : "bg-gray-200 text-gray-900 rounded-bl-none"
                        )}
                      >
                        {msg.message}
                      </div>
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>

                {/* Input */}
                <div className="border-t p-3 flex gap-2">
                  <Input
                    type="text"
                    placeholder="اكتب رسالة..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        handleSendMessage();
                      }
                    }}
                    className="flex-1"
                  />
                  <Button
                    onClick={handleSendMessage}
                    disabled={!newMessage.trim()}
                    size="icon"
                    className="bg-cyan-500 hover:bg-cyan-600"
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </div>

                {/* Back button */}
                <div className="border-t p-2">
                  <Button
                    onClick={() => setSelectedConversation(null)}
                    variant="outline"
                    size="sm"
                    className="w-full"
                  >
                    العودة للمحادثات
                  </Button>
                </div>
              </>
            )}
          </div>
        </Card>
      )}
    </>
  );
}
