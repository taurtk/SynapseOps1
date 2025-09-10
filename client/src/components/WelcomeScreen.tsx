import { AnimatedBackground } from './AnimatedBackground';
import { SynapseOpsLogo } from './SynapseOpsLogo';
import { Button } from '@/components/ui/button';

interface WelcomeScreenProps {
  onNext: () => void;
}

export function WelcomeScreen({ onNext }: WelcomeScreenProps) {
  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden">
      <AnimatedBackground />
      
      <div className="relative z-10 flex flex-col items-center space-y-8 text-center px-6">
        <SynapseOpsLogo />
        
        <div className="space-y-4 max-w-md">
          <p 
            className="text-lg text-foreground/90 font-medium leading-relaxed"
            data-testid="welcome-message"
          >
            Welcome to the company! Here's your assistant to get you started.
          </p>
        </div>
        
        <Button
          onClick={() => {
            console.log('Next button clicked');
            onNext();
          }}
          variant="outline"
          size="lg"
          className="mt-8 px-8 py-3 text-primary border-primary/50 bg-transparent hover:bg-primary/10 hover:border-primary transition-all duration-300 backdrop-blur-sm"
          data-testid="button-next"
        >
          Next
        </Button>
      </div>
    </div>
  );
}