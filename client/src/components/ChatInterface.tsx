import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';
import { AnimatedBackground } from './AnimatedBackground';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send } from 'lucide-react';

interface Message {
  id: string;
  content: string;
  isUser: boolean;
  sessionId: string;
  createdAt: Date;
}

export function ChatInterface() {
  const [sessionId] = useState(() => `session-${Date.now()}`);
  const queryClient = useQueryClient();
  
  // Fetch messages for this session
  const { data: messages = [], isLoading } = useQuery({
    queryKey: ['/api/messages', sessionId],
    queryFn: () => fetch(`/api/messages/${sessionId}`).then(res => res.json())
  });
  
  // Add initial welcome message if no messages exist
  useEffect(() => {
    if (messages.length === 0 && !isLoading) {
      sendMessageMutation.mutate({
        content: "Hello! I'm your SynapseOps assistant. How can I help you today?",
        isUser: false,
        sessionId
      });
    }
  }, [messages.length, isLoading, sessionId]);
  const [inputValue, setInputValue] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  // Send message mutation
  const sendMessageMutation = useMutation({
    mutationFn: async (messageData: { content: string; isUser: boolean; sessionId: string }) => {
      const response = await apiRequest('POST', '/api/messages', messageData);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/messages', sessionId] });
    }
  });

  const sendMessage = () => {
    if (!inputValue.trim()) return;

    console.log('Sending message:', inputValue);
    
    sendMessageMutation.mutate({
      content: inputValue,
      isUser: true,
      sessionId
    });
    
    setInputValue('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      <AnimatedBackground />
      
      <div className="relative z-10 flex items-center justify-center min-h-screen p-6">
        <div 
          className="w-full max-w-2xl h-[600px] flex flex-col"
          style={{
            background: 'rgba(45, 55, 72, 0.4)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(77, 157, 224, 0.3)',
            borderRadius: '16px',
            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)'
          }}
          data-testid="chat-container"
        >
          {/* Chat Header */}
          <div className="flex items-center justify-between p-4 border-b border-primary/20">
            <h2 className="text-lg font-semibold text-foreground" data-testid="chat-title">
              SynapseOps Assistant
            </h2>
            <div className="w-3 h-3 bg-primary rounded-full animate-pulse" />
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 relative">
            {/* Subtle branding watermark */}
            <div 
              className="absolute bottom-4 right-4 text-foreground/10 text-sm font-medium pointer-events-none"
              style={{ opacity: 0.15 }}
              data-testid="watermark"
            >
              created by SynapseOps
            </div>

            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
                data-testid={`message-${message.isUser ? 'user' : 'bot'}-${message.id}`}
              >
                <div
                  className={`max-w-[75%] px-4 py-3 rounded-lg ${
                    message.isUser
                      ? 'bg-card text-card-foreground ml-4'
                      : 'bg-card border-l-4 border-primary text-card-foreground mr-4'
                  }`}
                  style={{
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
                  }}
                >
                  <p className="text-sm leading-relaxed">{message.content}</p>
                  <div className="text-xs text-muted-foreground mt-1">
                    {new Date(message.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Input Area */}
          <div className="p-4 border-t border-primary/20">
            <div className="flex space-x-3">
              <div className="flex-1 relative">
                <Input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  onFocus={() => {
                    console.log('Input focused');
                    setIsFocused(true);
                  }}
                  onBlur={() => setIsFocused(false)}
                  placeholder="Type your message..."
                  className={`bg-card/50 border-none text-foreground placeholder:text-muted-foreground transition-all duration-300 ${
                    isFocused ? 'ring-2 ring-primary/50 shadow-lg' : ''
                  }`}
                  style={{
                    backdropFilter: 'blur(10px)',
                    borderBottom: isFocused ? '2px solid #4D9DE0' : '1px solid transparent'
                  }}
                  data-testid="input-message"
                />
              </div>
              <Button
                onClick={sendMessage}
                size="icon"
                variant="default"
                className="bg-primary hover:bg-primary/90 text-primary-foreground"
                data-testid="button-send"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}