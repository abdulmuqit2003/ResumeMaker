import React from 'react';
import { FileText } from 'lucide-react';

interface HeaderProps {
  currentStep: number;
}

const Header: React.FC<HeaderProps> = ({ currentStep }) => {
  // Steps for the progress indicator
  const steps = [
    { id: 0, name: 'Build Resume' },
    { id: 1, name: 'Preview & Customize' },
    { id: 2, name: 'Export & Download' },
  ];

  return (
    <header className="bg-white dark:bg-neutral-800 border-b border-neutral-200 dark:border-neutral-700 py-4 px-4 md:px-6">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          {/* Logo and site name */}
          <div className="flex items-center mb-4 md:mb-0">
            <FileText className="h-8 w-8 text-primary-600 mr-2" />
            <h1 className="text-xl font-bold text-neutral-900 dark:text-white">
              ResumeATS
            </h1>
          </div>

          {/* Progress steps on larger screens */}
          <div className="hidden md:flex items-center space-x-4">
            {steps.map((step, index) => (
              <React.Fragment key={step.id}>
                {index > 0 && (
                  <div className={`h-0.5 w-10 ${
                    currentStep >= index ? 'bg-primary-500' : 'bg-neutral-300 dark:bg-neutral-700'
                  }`} />
                )}
                <div className="flex items-center">
                  <div className={`flex-shrink-0 h-8 w-8 rounded-full border-2 flex items-center justify-center ${
                    currentStep >= step.id 
                      ? 'border-primary-500 bg-primary-50 dark:bg-primary-900 text-primary-600 dark:text-primary-400' 
                      : 'border-neutral-300 dark:border-neutral-700 text-neutral-500 dark:text-neutral-400'
                  }`}>
                    {currentStep > step.id ? (
                      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    ) : (
                      <span>{step.id + 1}</span>
                    )}
                  </div>
                  <span className={`ml-2 text-sm font-medium ${
                    currentStep >= step.id 
                      ? 'text-primary-600 dark:text-primary-400' 
                      : 'text-neutral-500 dark:text-neutral-400'
                  }`}>
                    {step.name}
                  </span>
                </div>
              </React.Fragment>
            ))}
          </div>

          {/* Mobile view - just show current step */}
          <div className="md:hidden">
            <div className="text-sm font-medium text-primary-600 dark:text-primary-400">
              Step {currentStep + 1}: {steps[currentStep].name}
            </div>
            <div className="mt-2 h-1.5 w-full bg-neutral-200 dark:bg-neutral-700 rounded-full overflow-hidden">
              <div 
                className="h-full bg-primary-500 rounded-full" 
                style={{ width: `${(currentStep + 1) / steps.length * 100}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;