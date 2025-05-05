import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { ContactSection } from './sections/ContactSection';
import { WorkExperienceSection } from './sections/WorkExperienceSection';
import { EducationSection } from './sections/EducationSection';
import { SkillsSection } from './sections/SkillsSection';
import { ProjectsSection } from './sections/ProjectsSection';
import { CertificationsSection } from './sections/CertificationsSection';
import { CustomSectionsManager } from './sections/CustomSectionsManager';
import { useResumeStore } from '../../store/resumeStore';

interface ResumeFormProps {
  onComplete: () => void;
}

export const ResumeForm: React.FC<ResumeFormProps> = ({ onComplete }) => {
  const { contact, workExperience, education, skills } = useResumeStore();
  const [activeTab, setActiveTab] = useState<string>('contact');
  
  // Form validation
  const isContactValid = !!contact.fullName && !!contact.email;
  const isWorkValid = workExperience.length > 0;
  const isEducationValid = education.length > 0;
  const isSkillsValid = skills.length > 0;
  
  // Overall form validity
  const isFormComplete = isContactValid && isWorkValid && isEducationValid && isSkillsValid;

  // Define all available tabs
  const tabs = [
    { id: 'contact', label: 'Contact Info', required: true, valid: isContactValid },
    { id: 'work', label: 'Work Experience', required: true, valid: isWorkValid },
    { id: 'education', label: 'Education', required: true, valid: isEducationValid },
    { id: 'skills', label: 'Skills', required: true, valid: isSkillsValid },
    { id: 'projects', label: 'Projects', required: false, valid: true },
    { id: 'certifications', label: 'Certifications', required: false, valid: true },
    { id: 'custom', label: 'Custom Sections', required: false, valid: true },
  ];

  // Render the appropriate component based on the active tab
  const renderActiveTabContent = () => {
    switch (activeTab) {
      case 'contact':
        return <ContactSection />;
      case 'work':
        return <WorkExperienceSection />;
      case 'education':
        return <EducationSection />;
      case 'skills':
        return <SkillsSection />;
      case 'projects':
        return <ProjectsSection />;
      case 'certifications':
        return <CertificationsSection />;
      case 'custom':
        return <CustomSectionsManager />;
      default:
        return <ContactSection />;
    }
  };

  return (
    <div className="animate-fade-in">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-2">Build Your ATS-Friendly Resume</h2>
          <p className="text-neutral-600 dark:text-neutral-400">
            Fill in the information below to create a resume that will get through Applicant Tracking Systems
          </p>
        </div>
        
        {/* Tab navigation */}
        <div className="border-b border-neutral-200 dark:border-neutral-700 mb-8">
          <nav className="flex overflow-x-auto pb-1 space-x-1 sm:space-x-2" aria-label="Tabs">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`whitespace-nowrap px-3 py-2.5 rounded-t-lg text-sm font-medium transition-colors relative
                  ${activeTab === tab.id 
                    ? 'bg-white dark:bg-neutral-800 text-primary-600 dark:text-primary-400 border-b-2 border-primary-500' 
                    : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-300'
                  }`}
              >
                {tab.label}
                {tab.required && <span className="text-error-500 ml-0.5">*</span>}
                {tab.valid && (
                  <span className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-success-500"></span>
                )}
              </button>
            ))}
          </nav>
        </div>
        
        {/* Active tab content */}
        <div className="bg-white dark:bg-neutral-800 rounded-lg shadow-sm border border-neutral-200 dark:border-neutral-700 p-6 mb-8">
          {renderActiveTabContent()}
        </div>
        
        {/* Navigation buttons */}
        <div className="flex justify-between">
          <div className="text-sm text-neutral-500 dark:text-neutral-400 flex items-center">
            <span className="mr-1">*</span> Required fields
          </div>
          
          <div className="flex space-x-4">
            <button
              onClick={onComplete}
              disabled={!isFormComplete}
              className="btn-primary flex items-center"
            >
              Continue to Preview 
              <ArrowRight className="ml-2 h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};