// app/support/chat/page.tsx
'use client';
import { useState, useEffect } from 'react';
import axios from '@/lib/axiosClient';
import { Loader } from '@/components/common/Loader';
import { ErrorMessage } from '@/components/common/ErrorMessage';
import { Input, Button } from '@/components/ui';

interface ChatMessage {
  id: string;
  sender: 'user' | 'support';
  text: string;
  timestamp: string;
}

export default function ChatPage() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // טעינת ההודעות הראשונית
  useEffect(() => {
    setLoading(true);
    axios
      .get('/support/chat')
      .then((res) => setMessages(res.data.messages))
      .catch(() => setError('שגיאה בטעינת ההודעות'))
      .finally(() => setLoading(false));
  }, []);

  const handleSend = async () => {
    if (!newMessage.trim()) return;
    setLoading(true);

    try {
      const res = await axios.post('/support/chat', { text: newMessage });
      // נניח שה־API מחזיר את ההודעה שנוצרה
      const created: ChatMessage = res.data.message;
      setMessages((prev) => [...prev, created]);
      setNewMessage('');
    } catch {
      setError('שגיאה בשליחת ההודעה');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold">תמיכה בצ'אט</h1>

      {isLoading && <Loader />}
      {error && <ErrorMessage message={error} />}

      <div className="h-64 overflow-y-auto border border-gray-300 rounded p-4 space-y-2">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`${
              msg.sender === 'user' ? 'text-right' : 'text-left'
            }`}
          >
            <div
              className={`inline-block px-3 py-2 rounded-md ${
                msg.sender === 'user'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-800'
              }`}
            >
              {msg.text}
            </div>
            <p className="text-xs text-gray-500">
              {new Date(msg.timestamp).toLocaleString('he-IL')}
            </p>
          </div>
        ))}
      </div>

      <div className="flex space-x-2 rtl:space-x-reverse">
        <Input
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="כתוב הודעה..."
        />
        <Button variant="primary" onClick={handleSend} disabled={isLoading}>
          שלח
        </Button>
      </div>
    </div>
  );
}
