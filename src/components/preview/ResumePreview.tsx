import React from 'react';
import { useResumeStore, SectionType } from '../../store/resumeStore';
import { ArrowLeft, ArrowRight, MoveVertical, EyeIcon } from 'lucide-react';
import { SectionReorderer } from './SectionReorderer';
import { ResumeTemplate } from './ResumeTemplate';

interface ResumePreviewProps {
  onBack: () => void;
  onNext: () => void;
}

export const ResumePreview: React.FC<ResumePreviewProps> = ({ onBack, onNext }) => {
  const { sectionOrder, toggleSectionEnabled } = useResumeStore();
  const [isReordering, setIsReordering] = React.useState(false);

  return (
    <div className="animate-fade-in">
      <div className="max-w-5xl mx-auto">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-2">Preview & Customize Your Resume</h2>
          <p className="text-neutral-600 dark:text-neutral-400">
            Review and customize your ATS-friendly resume before exporting
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left sidebar - Section controls */}
          <div className="lg:col-span-4 order-2 lg:order-1">
            <div className="sticky top-20">
              <div className="bg-white dark:bg-neutral-800 rounded-lg shadow-sm border border-neutral-200 dark:border-neutral-700 p-4 mb-4">
                <h3 className="text-lg font-semibold mb-4 text-neutral-900 dark:text-white">
                  Resume Sections
                </h3>
                
                <div className="mb-4">
                  <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-2">
                    Toggle sections to show or hide them in your resume
                  </p>
                  <div className="space-y-2">
                    {sectionOrder.map((section) => (
                      <div 
                        key={section.id}
                        className="flex items-center justify-between p-3 bg-neutral-50 dark:bg-neutral-850 border border-neutral-200 dark:border-neutral-700 rounded-md"
                      >
                        <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                          {section.title}
                        </span>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={section.enabled}
                            onChange={() => toggleSectionEnabled(section.id as SectionType)}
                            className="sr-only peer"
                          />
                          <div className="w-9 h-5 bg-neutral-300 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary-300 dark:peer-focus:ring-primary-800 rounded-full peer dark:bg-neutral-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-neutral-600 peer-checked:bg-primary-500"></div>
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
                
                <button
                  onClick={() => setIsReordering(true)}
                  className="btn-outline w-full flex items-center justify-center"
                >
                  <MoveVertical className="h-4 w-4 mr-2" />
                  Reorder Sections
                </button>
              </div>
              
              <div className="bg-neutral-50 dark:bg-neutral-900 rounded-lg border border-neutral-200 dark:border-neutral-800 p-4">
                <h4 className="font-medium text-neutral-800 dark:text-neutral-200 mb-2 flex items-center">
                  <EyeIcon className="h-4 w-4 mr-2 text-primary-500" />
                  ATS Optimization Tips
                </h4>
                <ul className="space-y-2 text-sm text-neutral-600 dark:text-neutral-400">
                  <li className="flex items-start">
                    <span className="inline-block h-1.5 w-1.5 rounded-full bg-primary-500 mt-1.5 mr-2 flex-shrink-0"></span>
                    Keep formatting simple - avoid tables, columns, headers/footers
                  </li>
                  <li className="flex items-start">
                    <span className="inline-block h-1.5 w-1.5 rounded-full bg-primary-500 mt-1.5 mr-2 flex-shrink-0"></span>
                    Use standard section headings recognizable by ATS
                  </li>
                  <li className="flex items-start">
                    <span className="inline-block h-1.5 w-1.5 rounded-full bg-primary-500 mt-1.5 mr-2 flex-shrink-0"></span>
                    Include keywords from the job description
                  </li>
                  <li className="flex items-start">
                    <span className="inline-block h-1.5 w-1.5 rounded-full bg-primary-500 mt-1.5 mr-2 flex-shrink-0"></span>
                    Use standard, ATS-readable fonts (already applied)
                  </li>
                </ul>
              </div>
            </div>
          </div>
          
          {/* Right side - Resume preview */}
          <div className="lg:col-span-8 order-1 lg:order-2">
            <div className="bg-white rounded-lg shadow-md border border-neutral-200 dark:border-neutral-700 p-6 mb-6">
              <ResumeTemplate />
            </div>
            
            <div className="flex justify-between">
              <button onClick={onBack} className="btn-secondary flex items-center">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Editor
              </button>
              <button onClick={onNext} className="btn-primary flex items-center">
                Continue to Export
                <ArrowRight className="h-4 w-4 ml-2" />
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Section reordering modal */}
      {isReordering && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-neutral-800 rounded-lg shadow-xl max-w-md w-full p-5 max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-semibold mb-4 text-neutral-900 dark:text-white">
              Reorder Resume Sections
            </h3>
            <p className="text-neutral-600 dark:text-neutral-400 mb-4">
              Drag and drop sections to change their order
            </p>
            
            <SectionReorderer />
            
            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setIsReordering(false)}
                className="btn-primary"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};