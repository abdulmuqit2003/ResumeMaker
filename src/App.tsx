import React, { useState } from 'react';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import { ResumeForm } from './components/form/ResumeForm';
import { ResumePreview } from './components/preview/ResumePreview';
import { ExportOptions } from './components/export/ExportOptions';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from './contexts/ThemeContext';

// Main steps in the resume builder process
enum Step {
  FORM,
  PREVIEW,
  EXPORT
}

function App() {
  const [currentStep, setCurrentStep] = useState<Step>(Step.FORM);
  const { theme, toggleTheme } = useTheme();

  // Function to handle navigation between steps
  const navigateToStep = (step: Step) => {
    setCurrentStep(step);
    window.scrollTo(0, 0);
  };

  // Render the appropriate component based on the current step
  const renderStep = () => {
    switch (currentStep) {
      case Step.FORM:
        return <ResumeForm onComplete={() => navigateToStep(Step.PREVIEW)} />;
      case Step.PREVIEW:
        return (
          <ResumePreview 
            onBack={() => navigateToStep(Step.FORM)} 
            onNext={() => navigateToStep(Step.EXPORT)}
          />
        );
      case Step.EXPORT:
        return (
          <ExportOptions 
            onBack={() => navigateToStep(Step.PREVIEW)} 
          />
        );
      default:
        return <ResumeForm onComplete={() => navigateToStep(Step.PREVIEW)} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header currentStep={currentStep} />
      
      {/* Theme toggle button */}
      <button
        onClick={toggleTheme}
        className="fixed bottom-4 right-4 p-3 rounded-full bg-neutral-200 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 shadow-md z-50 hover:bg-neutral-300 dark:hover:bg-neutral-700 transition-colors"
        aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
      >
        {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
      </button>
      
      <main className="flex-grow py-8 px-4 md:px-6 container mx-auto">
        {renderStep()}
      </main>
      
      <Footer />
    </div>
  );
}

export default App;