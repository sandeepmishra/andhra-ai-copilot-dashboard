
import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  MessageSquare, Send, Mic, X, Bot, User, 
  Download, Copy, ThumbsUp, ThumbsDown 
} from 'lucide-react';

interface ChatPanelProps {
  onClose: () => void;
}

export const ChatPanel = ({ onClose }: ChatPanelProps) => {
  const [message, setMessage] = useState('');
  const [isListening, setIsListening] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'ai',
      content: 'Hello! I\'m your AI analysis assistant. I can help you analyze CDR/IPDR data, detect patterns, and generate insights. What would you like to investigate today?',
      timestamp: new Date().toLocaleTimeString(),
      suggestions: [
        'Show call patterns for suspect X',
        'Detect anomalies in recent data',
        'Generate timeline for Case #2024-001',
        'Plot tower movements on map'
      ]
    }
  ]);

  const suggestedQueries = [
    'Track suspect movement patterns',
    'Flag long IPDR sessions',
    'Generate geospatial heatmap',
    'Analyze call frequency by time',
    'Detect unusual data usage patterns',
    'Compare suspect communication networks'
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (message.trim()) {
      const newMessage = {
        id: messages.length + 1,
        type: 'user',
        content: message,
        timestamp: new Date().toLocaleTimeString()
      };

      setMessages([...messages, newMessage]);
      setMessage('');

      // Simulate AI response
      setTimeout(() => {
        const aiResponse = {
          id: messages.length + 2,
          type: 'ai',
          content: 'I\'m analyzing your request. Based on the CDR data, I found several interesting patterns. Here\'s a summary of the findings...',
          timestamp: new Date().toLocaleTimeString(),
          hasResults: true
        };
        setMessages(prev => [...prev, aiResponse]);
      }, 1500);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setMessage(suggestion);
  };

  const toggleVoiceInput = () => {
    setIsListening(!isListening);
    // Voice input logic would go here
  };

  return (
    <div className="w-96 bg-slate-800 border-l border-slate-700 flex flex-col h-screen">
      {/* Header */}
      <div className="p-4 border-b border-slate-700">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Bot className="h-5 w-5 text-blue-400" />
            <h3 className="text-white font-medium">AI Analysis Assistant</h3>
          </div>
          <Button size="sm" variant="ghost" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>
        <p className="text-sm text-slate-400 mt-1">CDR/IPDR Intelligence Co-pilot</p>
      </div>

      {/* Suggested Queries */}
      <div className="p-4 border-b border-slate-700">
        <h4 className="text-sm font-medium text-white mb-2">Quick Queries</h4>
        <div className="flex flex-wrap gap-2">
          {suggestedQueries.slice(0, 3).map((query, index) => (
            <Button
              key={index}
              size="sm"
              variant="outline"
              onClick={() => handleSuggestionClick(query)}
              className="text-xs h-7 text-slate-300 border-slate-600 hover:border-slate-500"
            >
              {query}
            </Button>
          ))}
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] ${msg.type === 'user' ? 'order-2' : 'order-1'}`}>
              <div className="flex items-center space-x-2 mb-1">
                {msg.type === 'ai' ? (
                  <Bot className="h-4 w-4 text-blue-400" />
                ) : (
                  <User className="h-4 w-4 text-green-400" />
                )}
                <span className="text-xs text-slate-400">{msg.timestamp}</span>
              </div>
              
              <div className={`p-3 rounded-lg ${
                msg.type === 'user' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-slate-700 text-slate-100'
              }`}>
                <p className="text-sm">{msg.content}</p>
                
                {msg.suggestions && (
                  <div className="mt-3 space-y-2">
                    <p className="text-xs text-slate-300">Try asking:</p>
                    {msg.suggestions.map((suggestion, index) => (
                      <Button
                        key={index}
                        size="sm"
                        variant="ghost"
                        onClick={() => handleSuggestionClick(suggestion)}
                        className="w-full justify-start text-xs h-7 text-slate-300 hover:bg-slate-600"
                      >
                        {suggestion}
                      </Button>
                    ))}
                  </div>
                )}
                
                {msg.hasResults && (
                  <div className="mt-3 flex space-x-2">
                    <Button size="sm" variant="ghost" className="text-xs h-6">
                      <Download className="h-3 w-3 mr-1" />
                      Export
                    </Button>
                    <Button size="sm" variant="ghost" className="text-xs h-6">
                      <Copy className="h-3 w-3 mr-1" />
                      Copy
                    </Button>
                  </div>
                )}
              </div>
              
              {msg.type === 'ai' && (
                <div className="flex items-center space-x-2 mt-2">
                  <Button size="sm" variant="ghost" className="h-6 w-6 p-0">
                    <ThumbsUp className="h-3 w-3" />
                  </Button>
                  <Button size="sm" variant="ghost" className="h-6 w-6 p-0">
                    <ThumbsDown className="h-3 w-3" />
                  </Button>
                </div>
              )}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 border-t border-slate-700">
        <div className="flex space-x-2">
          <div className="flex-1 relative">
            <Input
              placeholder="Ask about CDR/IPDR analysis..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              className="bg-slate-700 border-slate-600 text-white pr-10"
            />
            <Button
              size="sm"
              variant="ghost"
              onClick={toggleVoiceInput}
              className={`absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0 ${
                isListening ? 'text-red-400' : 'text-slate-400'
              }`}
            >
              <Mic className="h-3 w-3" />
            </Button>
          </div>
          <Button
            onClick={handleSendMessage}
            disabled={!message.trim()}
            className="bg-blue-600 hover:bg-blue-700"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
        
        {isListening && (
          <div className="mt-2 flex items-center space-x-2">
            <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse" />
            <span className="text-xs text-red-400">Listening...</span>
          </div>
        )}
      </div>
    </div>
  );
};
