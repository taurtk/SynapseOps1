import { useState } from 'react';
import { WelcomeScreen } from '@/components/WelcomeScreen';
import { ChatInterface } from '@/components/ChatInterface';

export default function Home() {
  const [currentStage, setCurrentStage] = useState<'welcome' | 'chat'>('welcome');

  const handleNext = () => {
    console.log('Transitioning from welcome to chat');
    setCurrentStage('chat');
  };

  return (
    <div className="min-h-screen w-full">
      {currentStage === 'welcome' ? (
        <WelcomeScreen onNext={handleNext} />
      ) : (
        <ChatInterface />
      )}
    </div>
  );
}