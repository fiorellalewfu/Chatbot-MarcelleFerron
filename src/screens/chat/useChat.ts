import { useState } from 'react';
import { sendChatMessage } from '../../services/geminiService';
import type { ChatMessage } from '../../types/index';

export const useChat = (initialMessage: string) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: initialMessage }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = async (text: string) => {
    if (!text.trim()) return;

    const userMessage: ChatMessage = { role: 'user', text };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const modelMessage = await sendChatMessage(text);
      setMessages(prev => [...prev, modelMessage]);
    } catch (error) {
      const errorMessage: ChatMessage = {
        role: 'model',
        text: "Désolée, j'ai eu un petit problème de connexion avec mes idées. Pourrais-tu répéter?"
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    messages,
    input,
    isLoading,
    setInput,
    sendMessage,
  };
};