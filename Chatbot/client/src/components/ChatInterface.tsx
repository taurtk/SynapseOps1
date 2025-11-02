import React, { useState, useEffect, useRef } from 'react';
import { LexRuntimeV2Client, RecognizeTextCommand } from "@aws-sdk/client-lex-runtime-v2";
import { fromCognitoIdentityPool } from "@aws-sdk/credential-providers";
import { AnimatedBackground } from './AnimatedBackground';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send } from 'lucide-react';

// Provides a fallback for JSX types if not globally available.
declare global {
  namespace JSX {
    interface IntrinsicElements {
      [elemName: string]: any;
    }
  }
}

// Defines the structure for each chat message
interface Message {
  content: string;
  isUser: boolean;
  timestamp: string;
  createdAt?: number | string; // Add createdAt for compatibility
}

// Set up the AWS credentials to connect to Cognito
const credentials = fromCognitoIdentityPool({
    clientConfig: { region: "us-east-1" },
    identityPoolId: "us-east-1:31a9bdff-be5a-430d-b330-eb6f965ca120", // Your Identity Pool ID
});
const lexClient = new LexRuntimeV2Client({ region: "us-east-1", credentials });

// The main React component for the chat interface
export function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Set up a persistent session ID for the conversation
  const [sessionId] = useState("session-" + Date.now());
  // Stores the bot's session state (memory)
  const [sessionState, setSessionState] = useState<any | undefined>(undefined);

  // Auto-scroll to the latest message
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(scrollToBottom, [messages]);

  // Add the initial bot greeting
  useEffect(() => {
    setMessages([{
      content: "Hello! I'm your Onboarding assistant. How can I help you today?",
      isUser: false,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      createdAt: Date.now(),
    }]);
  }, []);

  // Handles sending the user's message to AWS Lex
  const sendMessage = async () => {
    const text = inputValue.trim();
    if (!text) return;

    // Add the user's message to the UI
    const userMessage: Message = {
      content: text,
      isUser: true,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      createdAt: Date.now(),
    };
    setMessages((prev: Message[]) => [...prev, userMessage]);
    setInputValue('');

    // Create the command to send to Lex
    const command = new RecognizeTextCommand({
      botId: "VJE6YGSH17",        // Your Bot ID
      botAliasId: "SULA84Q2H9",  // Your Alias ID
      localeId: "en_US",
      sessionId: sessionId,       // Use the persistent session ID
      text: text,
      sessionState: sessionState, // Send the bot's memory back
    });

    try {
      // Send the command and get a response
      const data = await lexClient.send(command);
      
      // Check if the conversation is over and clear the bot's memory
      if (data.sessionState) {
        const dialogActionType = data.sessionState.dialogAction?.type;
        // Define valid dialog action types that end a conversation turn
        const completedTypes = ["Fulfilled", "Close", "ElicitIntent"] as const;
        type DialogActionType = typeof completedTypes[number];
        
        if (dialogActionType && completedTypes.includes(dialogActionType as DialogActionType)) {
          // The intent is complete (e.g., leave request finished or Q&A answered).
          // Clear the session state so the next message starts a new conversation.
          setSessionState(undefined);
        } else {
          // The conversation is still ongoing (e.g., bot is asking for a date).
          // Save the bot's memory for the next turn.
          setSessionState(data.sessionState);
        }
      } else {
        setSessionState(undefined); // No session state returned, clear it.
      }

      let botResponse: Message = {
        content: "Sorry, I didn't quite understand that.",
        isUser: false,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        createdAt: Date.now(),
      };
      
      // Add all of the bot's messages to the UI
      if (data.messages && data.messages.length > 0) {
        botResponse.content = data.messages.map((msg: any) => msg.content).join(' ');
      }
      setMessages((prev: Message[]) => [...prev, botResponse]);

    } catch (err) {
      console.error("Error communicating with Lex:", err);
      const errorResponse: Message = {
          content: "Error: Connection to the assistant failed.",
          isUser: false,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          createdAt: Date.now(),
      };
      setMessages((prev: Message[]) => [...prev, errorResponse]);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      // Prevent the default form submission if the Input is inside a form
      e.preventDefault();
      sendMessage();
    }
  };

  // Renders the chat UI
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
        >
          {/* Chat Header */}
          <div className="flex items-center justify-between p-4 border-b border-primary/20">
            <div className="flex items-center space-x-2">
              <img src="/synapse-logo.png" alt="SynapseOps Logo" className="w-8 h-8" /> 
              <h2 className="text-lg font-semibold text-foreground">
                Onboarding Assistant
              </h2>
            </div>
            <div className="w-3 h-3 bg-primary rounded-full animate-pulse" />
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 relative">
            {messages.map((message: Message, index: number) => (
              <div
                key={index}
                className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[75%] px-4 py-3 rounded-lg ${
                    message.isUser
                      ? 'bg-card text-card-foreground ml-4'
                      : 'bg-card border-l-4 border-primary text-card-foreground mr-4'
                  }`}
                  style={{ boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)' }}
                >
                  <p className="text-sm leading-relaxed">{message.content}</p>
                  <div className="text-xs text-muted-foreground mt-1">
                    {new Date(message.createdAt || Date.now()).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-4 border-t border-primary/20">
            <div className="flex space-x-3">
              <div className="flex-1 relative">
                <Input
                  value={inputValue}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInputValue(e.target.value)}
                  onKeyDown={handleKeyDown}
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                  placeholder="Type your message..."
                  className={`bg-card/50 border-none text-foreground placeholder:text-muted-foreground transition-all duration-300 ${isFocused ? 'ring-2 ring-primary/50 shadow-lg' : ''
                    }`}
                  style={{
                    backdropFilter: 'blur(10px)',
                    borderBottom: isFocused ? '2px solid #4D9DE0' : '1px solid transparent'
                  }}
                />
              </div>
              <Button
                onClick={sendMessage}
                size="icon"
                variant="default"
                className="bg-primary hover:bg-primary/90 text-primary-foreground"
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