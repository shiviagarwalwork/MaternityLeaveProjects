'use client';

import { useState, useRef, useEffect } from 'react';
import { Send, BookmarkPlus, Bookmark as BookmarkIcon } from 'lucide-react';
import { ChatMessage } from '@/types';
import { aiService } from '@/services/aiService';
import { bookmarkService } from '@/services/bookmarkService';
import HerbImage from './HerbImage';
import ChakraIcon from './ChakraIcon';
import OmSymbol from './OmSymbol';

export default function ChatInterface() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      role: 'assistant',
      content: 'Namaste! 🙏 I\'m your Ayurvedic health advisor. Ask me about health concerns, remedies, or wellness guidance based on ancient Ayurvedic manuscripts.',
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await aiService.getChatResponse(input);
      setMessages(prev => [...prev, response]);
    } catch (error) {
      console.error('Error getting response:', error);
      const errorMessage: ChatMessage = {
        id: Date.now().toString(),
        role: 'assistant',
        content: 'I apologize, but I encountered an error. Please try again.',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleBookmark = (message: ChatMessage) => {
    bookmarkService.add({
      type: 'chat',
      data: message
    });
    alert('Message bookmarked!');
  };

  // Extract herb names from message content for displaying images
  const extractHerbNames = (content: string): string[] => {
    const herbs = ['Ginger', 'Turmeric', 'Brahmi', 'Ashwagandha', 'Tulsi', 'Neem', 'Amla', 'Triphala',
                   'Guduchi', 'Giloy', 'Cumin', 'Coriander', 'Fennel', 'Cinnamon', 'Cardamom',
                   'Black Pepper', 'Clove', 'Sandalwood', 'Saffron', 'Mint', 'Peppermint', 'Basil',
                   'Holy Basil', 'Fenugreek', 'Ajwain', 'Curry Leaves', 'Sesame', 'Ghee', 'Honey',
                   'Jatamansi', 'Shankhpushpi', 'Bhringraj', 'Manjistha', 'Guggulu', 'Shallaki', 'Nutmeg'];

    const found: string[] = [];
    herbs.forEach(herb => {
      if (content.includes(herb) && !found.includes(herb)) {
        found.push(herb);
      }
    });
    return found.slice(0, 4); // Max 4 herbs per message
  };

  return (
    <div className="flex flex-col h-full parchment-card rounded-lg shadow-2xl relative overflow-hidden">
      {/* Large decorative chakra */}
      <ChakraIcon className="absolute top-0 right-0 text-[var(--gold)] opacity-5 chakra-glow" size={200} />

      {/* Chat Header */}
      <div className="relative bg-[var(--card-bg-light)] px-6 py-5 rounded-t-xl border-b-2 border-[var(--accent-primary)]">
        <div className="flex items-center gap-3">
          <OmSymbol className="text-[var(--accent-primary)]" size={36} />
          <div>
            <h2 className="text-2xl font-bold text-[var(--accent-primary)]">
              Ayurvedic Health Advisor
            </h2>
            <p className="text-sm text-[var(--text-muted)]">
              Ask questions about health and wellness
            </p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6 relative z-10">
        {messages.map((message) => {
          const herbNames = message.role === 'assistant' ? extractHerbNames(message.content) : [];

          return (
            <div
              key={message.id}
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-[85%] ${message.role === 'user' ? 'order-2' : 'order-1'}`}>
                <div
                  className={`rounded-xl px-5 py-4 shadow-lg border-2 ${
                    message.role === 'user'
                      ? 'bg-gradient-to-br from-[var(--accent-primary)] to-[var(--olive)] text-[var(--background)] border-[var(--accent-secondary)]'
                      : 'bg-[var(--card-bg-light)] text-[var(--foreground)] border-[var(--border-color)]'
                  }`}
                >
                  <div className="whitespace-pre-wrap leading-relaxed">{message.content}</div>

                  {/* Display herb images for assistant messages */}
                  {message.role === 'assistant' && herbNames.length > 0 && (
                    <div className="mt-4 pt-4 border-t border-[var(--border-color)]">
                      <p className="text-sm font-bold text-[var(--accent-secondary)] mb-3">
                        Featured Herbs:
                      </p>
                      <div className="flex flex-wrap gap-3">
                        {herbNames.map((herb, idx) => (
                          <HerbImage key={idx} name={herb} size="medium" />
                        ))}
                      </div>
                    </div>
                  )}

                  {message.sources && message.sources.length > 0 && (
                    <div className="mt-4 pt-4 border-t border-[var(--border-color)]">
                      <p className="text-sm font-bold text-[var(--accent-secondary)] mb-2">
                        Sources:
                      </p>
                      {message.sources.map((source, idx) => (
                        <div key={idx} className="text-sm mb-2">
                          <a
                            href={source.sourceUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[var(--accent-primary)] hover:text-[var(--accent-secondary)] font-medium underline"
                          >
                            {source.manuscriptTitle}
                          </a>
                          <span className="ml-2 text-[var(--success)]">
                            ({(source.confidence * 100).toFixed(0)}%)
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {message.role === 'assistant' && (
                  <div className="flex items-center mt-2 space-x-3">
                    <button
                      onClick={() => handleBookmark(message)}
                      className="text-sm text-[var(--accent-primary)] hover:text-[var(--accent-secondary)] flex items-center font-medium"
                    >
                      <BookmarkPlus className="w-4 h-4 mr-1" />
                      Bookmark
                    </button>
                    <span className="text-xs text-[var(--text-muted)]">
                      {new Date(message.timestamp).toLocaleTimeString()}
                    </span>
                  </div>
                )}
              </div>
            </div>
          );
        })}

        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-[var(--card-bg-light)] border border-[var(--border-color)] rounded-xl px-6 py-4">
              <div className="flex space-x-2">
                <div className="w-2.5 h-2.5 bg-[var(--accent-primary)] rounded-full animate-bounce"></div>
                <div className="w-2.5 h-2.5 bg-[var(--accent-secondary)] rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                <div className="w-2.5 h-2.5 bg-[var(--accent-tertiary)] rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="border-t-2 border-[var(--border-color)] p-4 bg-[var(--card-bg-light)] relative z-10">
        <div className="flex space-x-3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask about health concerns, remedies, or wellness advice..."
            className="flex-1 px-5 py-3 border border-[var(--border-color)] rounded-xl bg-[var(--card-bg)] text-[var(--foreground)] placeholder-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--accent-primary)] focus:border-[var(--accent-primary)]"
            disabled={isLoading}
          />
          <button
            onClick={handleSend}
            disabled={isLoading || !input.trim()}
            className="ancient-button px-6 py-3 rounded-xl disabled:opacity-40 disabled:cursor-not-allowed flex items-center"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
