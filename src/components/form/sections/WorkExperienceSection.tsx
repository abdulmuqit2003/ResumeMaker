import React, { useState } from 'react';
import { useResumeStore, WorkExperience } from '../../../store/resumeStore';
import { Building, Plus, Trash, Edit, Calendar, MapPin, Briefcase, Save, X } from 'lucide-react';

export const WorkExperienceSection: React.FC = () => {
  const { workExperience, addWorkExperience, updateWorkExperience, removeWorkExperience } = useResumeStore();
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Omit<WorkExperience, 'id'>>({
    company: '',
    title: '',
    location: '',
    startDate: '',
    endDate: '',
    current: false,
    description: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData((prev) => ({ ...prev, [name]: checked }));
  };

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addWorkExperience(formData);
    setFormData({
      company: '',
      title: '',
      location: '',
      startDate: '',
      endDate: '',
      current: false,
      description: ''
    });
    setIsAdding(false);
  };

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      updateWorkExperience(editingId, formData);
      setEditingId(null);
    }
    setFormData({
      company: '',
      title: '',
      location: '',
      startDate: '',
      endDate: '',
      current: false,
      description: ''
    });
  };

  const startEdit = (experience: WorkExperience) => {
    setEditingId(experience.id);
    setFormData({
      company: experience.company,
      title: experience.title,
      location: experience.location,
      startDate: experience.startDate,
      endDate: experience.endDate,
      current: experience.current,
      description: experience.description
    });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setFormData({
      company: '',
      title: '',
      location: '',
      startDate: '',
      endDate: '',
      current: false,
      description: ''
    });
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this work experience?')) {
      removeWorkExperience(id);
    }
  };

  return (
    <div className="animate-slide-up">
      <h3 className="text-xl font-semibold mb-4 text-neutral-900 dark:text-white flex items-center">
        <Briefcase className="h-5 w-5 mr-2 text-primary-500" />
        Work Experience
      </h3>
      <p className="text-neutral-600 dark:text-neutral-400 mb-6">
        Add your relevant work experience, starting with the most recent position
      </p>

      {/* Experience List */}
      {workExperience.length > 0 && (
        <div className="mb-6 space-y-4">
          {workExperience.map((experience) => (
            <div 
              key={experience.id} 
              className={`border ${editingId === experience.id ? 'border-primary-300 bg-primary-50 dark:bg-primary-900/20' : 'border-neutral-200 dark:border-neutral-700'} rounded-lg p-4 relative`}
            >
              {editingId === experience.id ? (
                <form onSubmit={handleEditSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="company" className="label">Company Name</label>
                      <input
                        type="text"
                        id="company"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        className="input"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="title" className="label">Job Title</label>
                      <input
                        type="text"
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        className="input"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="location" className="label">Location</label>
                      <input
                        type="text"
                        id="location"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        className="input"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="startDate" className="label">Start Date</label>
                      <input
                        type="month"
                        id="startDate"
                        name="startDate"
                        value={formData.startDate}
                        onChange={handleChange}
                        className="input"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="endDate" className="label">End Date</label>
                      <input
                        type="month"
                        id="endDate"
                        name="endDate"
                        value={formData.endDate}
                        onChange={handleChange}
                        disabled={formData.current}
                        className={`input ${formData.current ? 'bg-neutral-100 dark:bg-neutral-800' : ''}`}
                      />
                    </div>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="current"
                        name="current"
                        checked={formData.current}
                        onChange={handleCheckboxChange}
                        className="h-4 w-4 text-primary-600 rounded border-neutral-300 dark:border-neutral-700 focus:ring-primary-500"
                      />
                      <label htmlFor="current" className="ml-2 block text-sm text-neutral-700 dark:text-neutral-300">
                        I currently work here
                      </label>
                    </div>
                  </div>
                  <div>
                    <label htmlFor="description" className="label">Description</label>
                    <textarea
                      id="description"
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      rows={4}
                      className="input"
                      placeholder="Describe your responsibilities and achievements"
                      required
                    ></textarea>
                    <p className="mt-1 text-xs text-neutral-500 dark:text-neutral-400">
                      Use bullet points by starting lines with * or - for better ATS readability
                    </p>
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
                      <h4 className="font-semibold text-neutral-900 dark:text-white">{experience.title}</h4>
                      <div className="flex items-center text-neutral-700 dark:text-neutral-300 mt-1">
                        <Building className="h-4 w-4 mr-1 text-neutral-500 dark:text-neutral-400" />
                        {experience.company}
                      </div>
                      <div className="flex items-center text-neutral-600 dark:text-neutral-400 text-sm mt-1">
                        <Calendar className="h-3 w-3 mr-1" />
                        {experience.startDate} — {experience.current ? 'Present' : experience.endDate}
                      </div>
                      <div className="flex items-center text-neutral-600 dark:text-neutral-400 text-sm mt-1">
                        <MapPin className="h-3 w-3 mr-1" />
                        {experience.location}
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <button 
                        onClick={() => startEdit(experience)} 
                        className="text-neutral-500 hover:text-primary-600 dark:text-neutral-400 dark:hover:text-primary-400"
                        aria-label="Edit"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button 
                        onClick={() => handleDelete(experience.id)} 
                        className="text-neutral-500 hover:text-error-600 dark:text-neutral-400 dark:hover:text-error-400"
                        aria-label="Delete"
                      >
                        <Trash className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                  <div className="mt-3 text-sm text-neutral-700 dark:text-neutral-300 whitespace-pre-line">
                    {experience.description}
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Add New Experience Form */}
      {isAdding ? (
        <div className="border border-primary-200 dark:border-primary-800 rounded-lg p-4 bg-primary-50 dark:bg-primary-900/20">
          <h4 className="font-semibold text-neutral-900 dark:text-white mb-4">Add Work Experience</h4>
          <form onSubmit={handleAddSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="company" className="label">Company Name</label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  className="input"
                  required
                />
              </div>
              <div>
                <label htmlFor="title" className="label">Job Title</label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="input"
                  required
                />
              </div>
              <div>
                <label htmlFor="location" className="label">Location</label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  className="input"
                  required
                />
              </div>
              <div>
                <label htmlFor="startDate" className="label">Start Date</label>
                <input
                  type="month"
                  id="startDate"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleChange}
                  className="input"
                  required
                />
              </div>
              <div>
                <label htmlFor="endDate" className="label">End Date</label>
                <input
                  type="month"
                  id="endDate"
                  name="endDate"
                  value={formData.endDate}
                  onChange={handleChange}
                  disabled={formData.current}
                  className={`input ${formData.current ? 'bg-neutral-100 dark:bg-neutral-800' : ''}`}
                />
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="current"
                  name="current"
                  checked={formData.current}
                  onChange={handleCheckboxChange}
                  className="h-4 w-4 text-primary-600 rounded border-neutral-300 dark:border-neutral-700 focus:ring-primary-500"
                />
                <label htmlFor="current" className="ml-2 block text-sm text-neutral-700 dark:text-neutral-300">
                  I currently work here
                </label>
              </div>
            </div>
            <div>
              <label htmlFor="description" className="label">Description</label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={4}
                className="input"
                placeholder="Describe your responsibilities and achievements"
                required
              ></textarea>
              <p className="mt-1 text-xs text-neutral-500 dark:text-neutral-400">
                Use bullet points by starting lines with * or - for better ATS readability
              </p>
            </div>
            <div className="flex space-x-3">
              <button type="submit" className="btn-primary">
                <Save className="h-4 w-4 mr-2" />
                Save Experience
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
          Add Work Experience
        </button>
      )}

      {workExperience.length === 0 && !isAdding && (
        <div className="text-center p-6 border border-dashed border-neutral-300 dark:border-neutral-700 rounded-lg mt-4">
          <Briefcase className="h-10 w-10 mx-auto text-neutral-400 dark:text-neutral-600" />
          <p className="mt-2 text-neutral-600 dark:text-neutral-400">
            Add your work experience to improve your resume's ATS compatibility
          </p>
        </div>
      )}
      
      <div className="mt-6 text-sm text-neutral-600 dark:text-neutral-400">
        <p className="mb-1">Tips for ATS-friendly work experience:</p>
        <ul className="list-disc list-inside space-y-1 text-neutral-500 dark:text-neutral-400">
          <li>Focus on achievements with quantifiable results</li>
          <li>Use industry-specific keywords from the job description</li>
          <li>Avoid unusual job titles – use standard industry titles</li>
          <li>Format using plain text with clear bullet points</li>
        </ul>
      </div>
    </div>
  );
};