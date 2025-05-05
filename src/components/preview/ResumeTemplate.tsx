import React from 'react';
import { useResumeStore, SectionType } from '../../store/resumeStore';

export const ResumeTemplate: React.FC = () => {
  const { 
    contact, 
    workExperience, 
    education, 
    skills, 
    projects, 
    certifications, 
    customSections, 
    sectionOrder 
  } = useResumeStore();

  // Function to render a section based on its type
  const renderSection = (sectionType: SectionType) => {
    switch (sectionType) {
      case 'contact':
        return (
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-neutral-900">{contact.fullName}</h1>
            <div className="flex flex-wrap justify-center gap-x-4 mt-2 text-neutral-700">
              {contact.email && <span>{contact.email}</span>}
              {contact.phone && <span>{contact.phone}</span>}
              {contact.location && <span>{contact.location}</span>}
            </div>
            <div className="flex flex-wrap justify-center gap-x-4 mt-1 text-neutral-700">
              {contact.linkedin && <span>{contact.linkedin}</span>}
              {contact.website && <span>{contact.website}</span>}
            </div>
          </div>
        );
      
      case 'workExperience':
        return workExperience.length > 0 ? (
          <div className="mb-6">
            <h2 className="text-lg font-bold text-neutral-900 border-b border-neutral-300 pb-1 mb-3">
              WORK EXPERIENCE
            </h2>
            <div className="space-y-4">
              {workExperience.map((job) => (
                <div key={job.id} className="mb-3">
                  <div className="flex flex-col sm:flex-row sm:justify-between">
                    <div>
                      <h3 className="font-bold text-neutral-900">{job.title}</h3>
                      <p className="text-neutral-700">{job.company}</p>
                    </div>
                    <div className="text-neutral-600 text-sm mt-1 sm:mt-0 sm:text-right">
                      <p>{job.location}</p>
                      <p>{job.startDate} – {job.current ? 'Present' : job.endDate}</p>
                    </div>
                  </div>
                  <p className="text-neutral-700 mt-2 whitespace-pre-line">{job.description}</p>
                </div>
              ))}
            </div>
          </div>
        ) : null;
      
      case 'education':
        return education.length > 0 ? (
          <div className="mb-6">
            <h2 className="text-lg font-bold text-neutral-900 border-b border-neutral-300 pb-1 mb-3">
              EDUCATION
            </h2>
            <div className="space-y-4">
              {education.map((edu) => (
                <div key={edu.id} className="mb-3">
                  <div className="flex flex-col sm:flex-row sm:justify-between">
                    <div>
                      <h3 className="font-bold text-neutral-900">{edu.degree} in {edu.field}</h3>
                      <p className="text-neutral-700">{edu.institution}</p>
                    </div>
                    <div className="text-neutral-600 text-sm mt-1 sm:mt-0 sm:text-right">
                      <p>{edu.location}</p>
                      <p>{edu.startDate} – {edu.current ? 'Present' : edu.endDate}</p>
                    </div>
                  </div>
                  {edu.description && (
                    <p className="text-neutral-700 mt-2">{edu.description}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        ) : null;
      
      case 'skills':
        return skills.length > 0 ? (
          <div className="mb-6">
            <h2 className="text-lg font-bold text-neutral-900 border-b border-neutral-300 pb-1 mb-3">
              SKILLS
            </h2>
            <div className="flex flex-wrap gap-x-2 gap-y-1">
              {skills.map((skill, index) => (
                <React.Fragment key={skill.id}>
                  <span className="text-neutral-700">{skill.name}</span>
                  {index < skills.length - 1 && <span className="text-neutral-400">•</span>}
                </React.Fragment>
              ))}
            </div>
          </div>
        ) : null;
      
      case 'projects':
        return projects.length > 0 ? (
          <div className="mb-6">
            <h2 className="text-lg font-bold text-neutral-900 border-b border-neutral-300 pb-1 mb-3">
              PROJECTS
            </h2>
            <div className="space-y-3">
              {projects.map((project) => (
                <div key={project.id} className="mb-3">
                  <div className="flex flex-col sm:flex-row sm:justify-between">
                    <h3 className="font-bold text-neutral-900">
                      {project.name}
                      {project.link && (
                        <span className="font-normal text-neutral-600 ml-2 text-sm">
                          ({project.link})
                        </span>
                      )}
                    </h3>
                  </div>
                  <p className="text-neutral-700 mt-1">{project.description}</p>
                  {project.skills && project.skills.length > 0 && (
                    <p className="text-neutral-600 text-sm mt-1">
                      <span className="font-medium">Skills:</span> {project.skills.join(', ')}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        ) : null;
      
      case 'certifications':
        return certifications.length > 0 ? (
          <div className="mb-6">
            <h2 className="text-lg font-bold text-neutral-900 border-b border-neutral-300 pb-1 mb-3">
              CERTIFICATIONS
            </h2>
            <div className="space-y-2">
              {certifications.map((cert) => (
                <div key={cert.id} className="mb-2">
                  <div className="flex flex-col sm:flex-row sm:justify-between">
                    <div>
                      <h3 className="font-bold text-neutral-900">{cert.name}</h3>
                      <p className="text-neutral-700">{cert.issuer}</p>
                    </div>
                    <div className="text-neutral-600 text-sm mt-1 sm:mt-0 sm:text-right">
                      <p>
                        {cert.date}
                        {cert.expiryDate && ` – ${cert.expiryDate}`}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : null;
      
      case 'customSections':
        return customSections.length > 0 ? (
          <>
            {customSections.map((section) => (
              section.items.length > 0 ? (
                <div key={section.id} className="mb-6">
                  <h2 className="text-lg font-bold text-neutral-900 border-b border-neutral-300 pb-1 mb-3">
                    {section.title.toUpperCase()}
                  </h2>
                  <div className="space-y-3">
                    {section.items.map((item) => (
                      <div key={item.id} className="mb-3">
                        <div className="flex flex-col sm:flex-row sm:justify-between">
                          <div>
                            <h3 className="font-bold text-neutral-900">{item.title}</h3>
                            {item.subtitle && (
                              <p className="text-neutral-700">{item.subtitle}</p>
                            )}
                          </div>
                          {item.date && (
                            <div className="text-neutral-600 text-sm mt-1 sm:mt-0 sm:text-right">
                              <p>{item.date}</p>
                            </div>
                          )}
                        </div>
                        {item.description && (
                          <p className="text-neutral-700 mt-1">{item.description}</p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ) : null
            ))}
          </>
        ) : null;
      
      default:
        return null;
    }
  };

  return (
    <div className="font-sans text-neutral-900 divide-y divide-neutral-200">
      <div className="mx-auto p-6 bg-white text-black print:max-w-letter print:mx-0 print:p-0 print:text-xs">
        {/* Render sections in the order specified by sectionOrder */}
        {sectionOrder
          .filter(section => section.enabled)
          .map(section => (
            <React.Fragment key={section.id}>
              {renderSection(section.id as SectionType)}
            </React.Fragment>
          ))}
      </div>
    </div>
  );
};