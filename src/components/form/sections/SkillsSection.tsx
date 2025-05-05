import React, { useState } from 'react';
import { useResumeStore, Skill } from '../../../store/resumeStore';
import { Code, Plus, X, Trash } from 'lucide-react';

export const SkillsSection: React.FC = () => {
  const { skills, addSkill, removeSkill } = useResumeStore();
  const [newSkill, setNewSkill] = useState('');
  const [isAdding, setIsAdding] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newSkill.trim()) {
      addSkill({ name: newSkill.trim() });
      setNewSkill('');
      setIsAdding(false);
    }
  };

  const handleDelete = (id: string) => {
    removeSkill(id);
  };

  // Suggested skills for different categories
  const suggestedSkills = {
    technical: ['JavaScript', 'Python', 'React', 'SQL', 'AWS', 'Git', 'Docker', 'Node.js'],
    soft: ['Communication', 'Teamwork', 'Leadership', 'Problem Solving', 'Time Management'],
    languages: ['English', 'Spanish', 'French', 'German', 'Chinese'],
    tools: ['Microsoft Office', 'Adobe Creative Suite', 'Figma', 'Jira', 'Tableau']
  };

  // Add a suggested skill
  const addSuggestedSkill = (skill: string) => {
    // Check if skill already exists
    if (!skills.some(s => s.name.toLowerCase() === skill.toLowerCase())) {
      addSkill({ name: skill });
    }
  };

  return (
    <div className="animate-slide-up">
      <h3 className="text-xl font-semibold mb-4 text-neutral-900 dark:text-white flex items-center">
        <Code className="h-5 w-5 mr-2 text-primary-500" />
        Skills
      </h3>
      <p className="text-neutral-600 dark:text-neutral-400 mb-6">
        Add relevant skills that showcase your expertise. Include technical, soft skills, and tools you're proficient with.
      </p>

      {/* Current Skills */}
      <div className="mb-6">
        <label className="label">Your Skills</label>
        
        {skills.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {skills.map((skill) => (
              <div 
                key={skill.id}
                className="inline-flex items-center px-3 py-1.5 bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300 rounded-full border border-primary-200 dark:border-primary-800"
              >
                <span className="text-sm font-medium">{skill.name}</span>
                <button 
                  onClick={() => handleDelete(skill.id)}
                  className="ml-2 text-primary-500 hover:text-primary-700 dark:hover:text-primary-300"
                  aria-label={`Remove ${skill.name}`}
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center p-6 border border-dashed border-neutral-300 dark:border-neutral-700 rounded-lg">
            <Code className="h-10 w-10 mx-auto text-neutral-400 dark:text-neutral-600" />
            <p className="mt-2 text-neutral-600 dark:text-neutral-400">
              No skills added yet. Add skills to improve your resume.
            </p>
          </div>
        )}
      </div>

      {/* Add New Skill */}
      {isAdding ? (
        <div className="mb-6 border border-primary-200 dark:border-primary-800 rounded-lg p-4 bg-primary-50 dark:bg-primary-900/20">
          <form onSubmit={handleSubmit} className="flex">
            <input
              type="text"
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              className="input flex-grow"
              placeholder="Enter a skill (e.g., JavaScript, Project Management)"
              autoFocus
            />
            <div className="flex ml-2">
              <button 
                type="submit" 
                className="btn-primary"
                disabled={!newSkill.trim()}
              >
                Add
              </button>
              <button 
                type="button" 
                onClick={() => {
                  setNewSkill('');
                  setIsAdding(false);
                }}
                className="btn-secondary ml-2"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      ) : (
        <button
          onClick={() => setIsAdding(true)}
          className="btn-outline w-full flex items-center justify-center py-3 mb-6"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Skill
        </button>
      )}

      {/* Suggested Skills */}
      <div className="mb-6">
        <h4 className="text-base font-medium text-neutral-800 dark:text-neutral-200 mb-3">
          Suggested Skills
        </h4>
        
        <div className="space-y-4">
          <div>
            <h5 className="text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
              Technical Skills
            </h5>
            <div className="flex flex-wrap gap-2">
              {suggestedSkills.technical.map((skill) => (
                <button
                  key={skill}
                  onClick={() => addSuggestedSkill(skill)}
                  disabled={skills.some(s => s.name.toLowerCase() === skill.toLowerCase())}
                  className={`px-3 py-1 text-xs rounded-full border transition-colors
                    ${skills.some(s => s.name.toLowerCase() === skill.toLowerCase())
                      ? 'bg-neutral-100 dark:bg-neutral-800 text-neutral-400 dark:text-neutral-500 border-neutral-200 dark:border-neutral-700 cursor-not-allowed'
                      : 'bg-white dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 border-neutral-300 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-700'
                    }`}
                >
                  {skill}
                </button>
              ))}
            </div>
          </div>
          
          <div>
            <h5 className="text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
              Soft Skills
            </h5>
            <div className="flex flex-wrap gap-2">
              {suggestedSkills.soft.map((skill) => (
                <button
                  key={skill}
                  onClick={() => addSuggestedSkill(skill)}
                  disabled={skills.some(s => s.name.toLowerCase() === skill.toLowerCase())}
                  className={`px-3 py-1 text-xs rounded-full border transition-colors
                    ${skills.some(s => s.name.toLowerCase() === skill.toLowerCase())
                      ? 'bg-neutral-100 dark:bg-neutral-800 text-neutral-400 dark:text-neutral-500 border-neutral-200 dark:border-neutral-700 cursor-not-allowed'
                      : 'bg-white dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 border-neutral-300 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-700'
                    }`}
                >
                  {skill}
                </button>
              ))}
            </div>
          </div>
          
          <div>
            <h5 className="text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
              Tools & Software
            </h5>
            <div className="flex flex-wrap gap-2">
              {suggestedSkills.tools.map((skill) => (
                <button
                  key={skill}
                  onClick={() => addSuggestedSkill(skill)}
                  disabled={skills.some(s => s.name.toLowerCase() === skill.toLowerCase())}
                  className={`px-3 py-1 text-xs rounded-full border transition-colors
                    ${skills.some(s => s.name.toLowerCase() === skill.toLowerCase())
                      ? 'bg-neutral-100 dark:bg-neutral-800 text-neutral-400 dark:text-neutral-500 border-neutral-200 dark:border-neutral-700 cursor-not-allowed'
                      : 'bg-white dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 border-neutral-300 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-700'
                    }`}
                >
                  {skill}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-6 text-sm text-neutral-600 dark:text-neutral-400">
        <p className="mb-1">Tips for an ATS-friendly skills section:</p>
        <ul className="list-disc list-inside space-y-1 text-neutral-500 dark:text-neutral-400">
          <li>Include both technical and soft skills</li>
          <li>Match skills to the job description when possible</li>
          <li>Be specific (e.g., "React" instead of just "JavaScript frameworks")</li>
          <li>Include skill proficiency levels if relevant</li>
        </ul>
      </div>
    </div>
  );
};