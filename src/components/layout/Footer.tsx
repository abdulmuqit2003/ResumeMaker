import React from 'react';
import { FileText, Heart, Github as GitHub } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white dark:bg-neutral-800 border-t border-neutral-200 dark:border-neutral-700 py-6 px-4 md:px-6">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-4 md:mb-0">
            <FileText className="h-5 w-5 text-primary-600 mr-2" />
            <span className="text-neutral-700 dark:text-neutral-300 font-medium">
              ResumeATS
            </span>
          </div>
          
          <div className="text-center md:text-right">
            <p className="text-sm text-neutral-600 dark:text-neutral-400">
              Built with <Heart className="h-3 w-3 inline text-error-500 mx-1" /> for job seekers everywhere.
            </p>
            <p className="text-xs text-neutral-500 dark:text-neutral-500 mt-1">
              &copy; {new Date().getFullYear()} ResumeATS. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;