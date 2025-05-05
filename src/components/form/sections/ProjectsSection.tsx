import React, { useState } from 'react';
import { useResumeStore, Project } from '../../../store/resumeStore';
import { FolderGit2, Plus, Trash, Edit, Save, X, Link as LinkIcon } from 'lucide-react';

export const ProjectsSection: React.FC = () => {
  const { projects, addProject, updateProject, removeProject } = useResumeStore();
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Omit<Project, 'id'>>({
    name: '',
    description: '',
    link: '',
    skills: []
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSkillsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const skillsText = e.target.value;
    const skillsArray = skillsText.split(',').map(skill => skill.trim()).filter(Boolean);
    setFormData((prev) => ({ ...prev, skills: skillsArray }));
  };

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addProject(formData);
    setFormData({
      name: '',
      description: '',
      link: '',
      skills: []
    });
    setIsAdding(false);
  };

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      updateProject(editingId, formData);
      setEditingId(null);
    }
    setFormData({
      name: '',
      description: '',
      link: '',
      skills: []
    });
  };

  const startEdit = (project: Project) => {
    setEditingId(project.id);
    setFormData({
      name: project.name,
      description: project.description,
      link: project.link || '',
      skills: project.skills || []
    });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setFormData({
      name: '',
      description: '',
      link: '',
      skills: []
    });
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      removeProject(id);
    }
  };

  return (
    <div className="animate-slide-up">
      <h3 className="text-xl font-semibold mb-4 text-neutral-900 dark:text-white flex items-center">
        <FolderGit2 className="h-5 w-5 mr-2 text-primary-500" />
        Projects
      </h3>
      <p className="text-neutral-600 dark:text-neutral-400 mb-6">
        Add relevant projects that showcase your skills and experience
      </p>

      {/* Projects List */}
      {projects.length > 0 && (
        <div className="mb-6 space-y-4">
          {projects.map((project) => (
            <div 
              key={project.id} 
              className={`border ${editingId === project.id ? 'border-primary-300 bg-primary-50 dark:bg-primary-900/20' : 'border-neutral-200 dark:border-neutral-700'} rounded-lg p-4 relative`}
            >
              {editingId === project.id ? (
                <form onSubmit={handleEditSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="name" className="label">Project Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="input"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="description" className="label">Description</label>
                    <textarea
                      id="description"
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      rows={3}
                      className="input"
                      placeholder="Describe what you built and key achievements"
                      required
                    ></textarea>
                  </div>
                  <div>
                    <label htmlFor="link" className="label">Project Link (Optional)</label>
                    <input
                      type="url"
                      id="link"
                      name="link"
                      value={formData.link}
                      onChange={handleChange}
                      className="input"
                      placeholder="https://github.com/yourusername/project"
                    />
                  </div>
                  <div>
                    <label htmlFor="skills" className="label">Skills Used (Optional)</label>
                    <input
                      type="text"
                      id="skills"
                      name="skills"
                      value={formData.skills?.join(', ') || ''}
                      onChange={handleSkillsChange}
                      className="input"
                      placeholder="React, Node.js, MongoDB (comma separated)"
                    />
                  </div>
                  <div className="flex space-x-3">
                    <button type="submit" className="btn-primary">
                      <Save className="h-4 w-4 mr-2" />
                      Save Changes
                    </button>
                    <button 
                      type="button" 
                      onClick={cancelEdit}
                      className="btn-secondary"
                    >
                      <X className="h-4 w-4 mr-2" />
                      Cancel
                    </button>
                  </div>
                </form>
              ) : (
                <>
                  <div className="flex justify-between">
                    <div>
                      <h4 className="font-semibold text-neutral-900 dark:text-white">{project.name}</h4>
                      {project.link && (
                        <a 
                          href={project.link} 
                          target="_blank" 
                          rel="noreferrer"
                          className="inline-flex items-center text-sm text-primary-600 dark:text-primary-400 hover:underline mt-1"
                        >
                          <LinkIcon className="h-3 w-3 mr-1" />
                          Project Link
                        </a>
                      )}
                    </div>
                    <div className="flex space-x-2">
                      <button 
                        onClick={() => startEdit(project)} 
                        className="text-neutral-500 hover:text-primary-600 dark:text-neutral-400 dark:hover:text-primary-400"
                        aria-label="Edit"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button 
                        onClick={() => handleDelete(project.id)} 
                        className="text-neutral-500 hover:text-error-600 dark:text-neutral-400 dark:hover:text-error-400"
                        aria-label="Delete"
                      >
                        <Trash className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                  <div className="mt-2 text-sm text-neutral-700 dark:text-neutral-300">
                    {project.description}
                  </div>
                  {project.skills && project.skills.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {project.skills.map((skill, index) => (
                        <span 
                          key={index}
                          className="inline-block px-2 py-0.5 bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 rounded text-xs"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  )}
                </>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Add New Project Form */}
      {isAdding ? (
        <div className="border border-primary-200 dark:border-primary-800 rounded-lg p-4 bg-primary-50 dark:bg-primary-900/20">
          <h4 className="font-semibold text-neutral-900 dark:text-white mb-4">Add Project</h4>
          <form onSubmit={handleAddSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="label">Project Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="input"
                required
              />
            </div>
            <div>
              <label htmlFor="description" className="label">Description</label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={3}
                className="input"
                placeholder="Describe what you built and key achievements"
                required
              ></textarea>
            </div>
            <div>
              <label htmlFor="link" className="label">Project Link (Optional)</label>
              <input
                type="url"
                id="link"
                name="link"
                value={formData.link}
                onChange={handleChange}
                className="input"
                placeholder="https://github.com/yourusername/project"
              />
            </div>
            <div>
              <label htmlFor="skills" className="label">Skills Used (Optional)</label>
              <input
                type="text"
                id="skills"
                name="skills"
                value={formData.skills?.join(', ') || ''}
                onChange={handleSkillsChange}
                className="input"
                placeholder="React, Node.js, MongoDB (comma separated)"
              />
            </div>
            <div className="flex space-x-3">
              <button type="submit" className="btn-primary">
                <Save className="h-4 w-4 mr-2" />
                Save Project
              </button>
              <button 
                type="button" 
                onClick={() => setIsAdding(false)}
                className="btn-secondary"
              >
                <X className="h-4 w-4 mr-2" />
                Cancel
              </button>
            </div>
          </form>
        </div>
      ) : (
        <button
          onClick={() => setIsAdding(true)}
          className="btn-outline w-full flex items-center justify-center py-3"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Project
        </button>
      )}

      {projects.length === 0 && !isAdding && (
        <div className="text-center p-6 border border-dashed border-neutral-300 dark:border-neutral-700 rounded-lg mt-4">
          <FolderGit2 className="h-10 w-10 mx-auto text-neutral-400 dark:text-neutral-600" />
          <p className="mt-2 text-neutral-600 dark:text-neutral-400">
            No projects added yet. Projects showcase your practical skills to employers.
          </p>
        </div>
      )}
      
      <div className="mt-6 text-sm text-neutral-600 dark:text-neutral-400">
        <p className="mb-1">Tips for showcasing projects:</p>
        <ul className="list-disc list-inside space-y-1 text-neutral-500 dark:text-neutral-400">
          <li>Focus on results and impact, not just technologies used</li>
          <li>Include quantifiable metrics when possible (e.g., improved performance by 30%)</li>
          <li>Add links to GitHub repositories or live demos</li>
          <li>Highlight your role if it was a team project</li>
        </ul>
      </div>
    </div>
  );
};