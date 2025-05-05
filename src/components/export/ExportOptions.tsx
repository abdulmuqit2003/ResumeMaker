import React, { useRef } from 'react';
import { useResumeStore } from '../../store/resumeStore';
import { ArrowLeft, Download, FileText, Copy, Check } from 'lucide-react';
import html2pdf from 'html2pdf.js';
import { ResumeTemplate } from '../preview/ResumeTemplate';

interface ExportOptionsProps {
  onBack: () => void;
}

export const ExportOptions: React.FC<ExportOptionsProps> = ({ onBack }) => {
  const { contact } = useResumeStore();
  const resumeRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = React.useState(false);
  const [isDownloading, setIsDownloading] = React.useState(false);

  // Generate PDF using html2pdf.js
  const generatePDF = () => {
    if (resumeRef.current) {
      setIsDownloading(true);
      
      // Create file name from user's name (or default if none)
      const fileName = contact.fullName 
        ? `${contact.fullName.replace(/\s+/g, '_')}_Resume.pdf` 
        : 'Resume.pdf';
      
      // Options for PDF generation
      const options = {
        margin: [0.5, 0.5, 0.5, 0.5],
        filename: fileName,
        image: { type: 'jpeg', quality: 1 },
        html2canvas: { 
          scale: 2,
          useCORS: true,
          letterRendering: true
        },
        jsPDF: { 
          unit: 'in', 
          format: 'letter', 
          orientation: 'portrait' 
        }
      };
      
      // Generate PDF
      html2pdf()
        .set(options)
        .from(resumeRef.current)
        .save()
        .then(() => {
          setIsDownloading(false);
        })
        .catch(error => {
          console.error('Error generating PDF:', error);
          setIsDownloading(false);
        });
    }
  };

  // Copy HTML to clipboard
  const copyToClipboard = async () => {
    if (resumeRef.current) {
      try {
        await navigator.clipboard.writeText(resumeRef.current.outerHTML);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error('Failed to copy:', err);
      }
    }
  };

  return (
    <div className="animate-fade-in">
      <div className="max-w-5xl mx-auto">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-2">Export Your Resume</h2>
          <p className="text-neutral-600 dark:text-neutral-400">
            Your ATS-optimized resume is ready to download
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left sidebar - Export options */}
          <div className="lg:col-span-4 order-2 lg:order-1">
            <div className="sticky top-20">
              <div className="bg-white dark:bg-neutral-800 rounded-lg shadow-sm border border-neutral-200 dark:border-neutral-700 p-6 mb-6">
                <h3 className="text-lg font-semibold mb-4 text-neutral-900 dark:text-white">
                  Download Options
                </h3>
                
                <div className="space-y-4">
                  <button
                    onClick={generatePDF}
                    disabled={isDownloading}
                    className="btn-primary w-full justify-center py-3"
                  >
                    {isDownloading ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Generating PDF...
                      </>
                    ) : (
                      <>
                        <Download className="h-4 w-4 mr-2" />
                        Download as PDF
                      </>
                    )}
                  </button>
                  
                  <button
                    onClick={copyToClipboard}
                    className="btn-secondary w-full justify-center py-3"
                  >
                    {copied ? (
                      <>
                        <Check className="h-4 w-4 mr-2 text-success-500" />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="h-4 w-4 mr-2" />
                        Copy Resume HTML
                      </>
                    )}
                  </button>
                  
                  {/* <button
                    className="btn-outline w-full justify-center py-3"
                  >
                    <FileText className="h-4 w-4 mr-2" />
                    Download as DOCX
                  </button> */}
                </div>
                
                <div className="mt-6 p-4 bg-neutral-50 dark:bg-neutral-900 rounded-lg">
                  <h4 className="font-medium text-neutral-800 dark:text-neutral-200 mb-2">
                    Next Steps
                  </h4>
                  <ul className="space-y-2 text-sm text-neutral-600 dark:text-neutral-400">
                    <li className="flex items-start">
                      <span className="inline-block h-1.5 w-1.5 rounded-full bg-primary-500 mt-1.5 mr-2 flex-shrink-0"></span>
                      Tailor your resume for each job application
                    </li>
                    <li className="flex items-start">
                      <span className="inline-block h-1.5 w-1.5 rounded-full bg-primary-500 mt-1.5 mr-2 flex-shrink-0"></span>
                      Use the exact job title from the listing if applicable
                    </li>
                    <li className="flex items-start">
                      <span className="inline-block h-1.5 w-1.5 rounded-full bg-primary-500 mt-1.5 mr-2 flex-shrink-0"></span>
                      Save your resume with a professional filename like "FirstName_LastName_Resume.pdf"
                    </li>
                  </ul>
                </div>
              </div>
              
              <button onClick={onBack} className="btn-secondary flex items-center">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Preview
              </button>
            </div>
          </div>
          
          {/* Right side - Final resume */}
          <div className="lg:col-span-8 order-1 lg:order-2">
            <div className="bg-white rounded-lg shadow-md border border-neutral-200 dark:border-neutral-700 p-6" ref={resumeRef}>
              <ResumeTemplate />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};