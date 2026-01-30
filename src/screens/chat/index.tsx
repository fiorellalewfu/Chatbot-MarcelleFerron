import React from 'react';
import type { ApiResponse } from '../../types/index';
import ChipButton from '../../components/shared/ChipButton';
import { useChat } from './useChat';

interface ScreenProps {
  data: ApiResponse;
  onChipClick: (text: string) => void;
}

const ChatScreen: React.FC<ScreenProps> = ({ data, onChipClick }) => {
  const { messages, isLoading, sendMessage, input, setInput } = useChat(data.voice);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      sendMessage(input);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-900 p-4">
      <header className="text-center p-4 border-b border-gray-700">
        <h1 className="text-3xl font-bold text-blue-300">{data.on_screen}</h1>
      </header>
      
      <main className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, index) => (
          <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-lg px-4 py-2 rounded-2xl ${msg.role === 'user' ? 'bg-blue-600 text-white rounded-br-none' : 'bg-gray-700 text-gray-200 rounded-bl-none'}`}>
              <p>{msg.text}</p>
            </div>
          </div>
        ))}
        {isLoading && (
            <div className="flex justify-start">
                 <div className="max-w-lg px-4 py-2 rounded-2xl bg-gray-700 text-gray-200 rounded-bl-none">
                    <div className="flex items-center space-x-2">
                        <span className="block w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                        <span className="block w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                        <span className="block w-2 h-2 bg-gray-400 rounded-full animate-bounce"></span>
                    </div>
                </div>
            </div>
        )}
      </main>

      <footer className="p-4 border-t border-gray-700">
        <div className="flex flex-wrap justify-center gap-2 mb-4">
            {data.chips.map((chip, index) => (
              <ChipButton 
                key={index} 
                text={chip} 
                onClick={onChipClick}
                className="bg-gray-800 border-gray-700 text-sm py-2 px-4"
              />
            ))}
        </div>
        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Pose ta question ici..."
            className="flex-1 bg-gray-700 border border-gray-600 rounded-full px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={isLoading}
          />
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 rounded-full px-5 py-2 font-semibold transition-colors disabled:opacity-50"
            disabled={isLoading}
          >
            Envoyer
          </button>
        </form>
      </footer>
    </div>
  );
};

export default ChatScreen;