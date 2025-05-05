import React, { useState } from 'react';
import { useResumeStore, Education } from '../../../store/resumeStore';
import { GraduationCap, Plus, Trash, Edit, Calendar, MapPin, Save, X } from 'lucide-react';

export const EducationSection: React.FC = () => {
  const { education, addEducation, updateEducation, removeEducation } = useResumeStore();
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Omit<Education, 'id'>>({
    institution: '',
    degree: '',
    field: '',
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
    addEducation(formData);
    setFormData({
      institution: '',
      degree: '',
      field: '',
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
      updateEducation(editingId, formData);
      setEditingId(null);
    }
    setFormData({
      institution: '',
      degree: '',
      field: '',
      location: '',
      startDate: '',
      endDate: '',
      current: false,
      description: ''
    });
  };

  const startEdit = (edu: Education) => {
    setEditingId(edu.id);
    setFormData({
      institution: edu.institution,
      degree: edu.degree,
      field: edu.field,
      location: edu.location,
      startDate: edu.startDate,
      endDate: edu.endDate,
      current: edu.current,
      description: edu.description || ''
    });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setFormData({
      institution: '',
      degree: '',
      field: '',
      location: '',
      startDate: '',
      endDate: '',
      current: false,
      description: ''
    });
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this education entry?')) {
      removeEducation(id);
    }
  };

  return (
    <div className="animate-slide-up">
      <h3 className="text-xl font-semibold mb-4 text-neutral-900 dark:text-white flex items-center">
        <GraduationCap className="h-5 w-5 mr-2 text-primary-500" />
        Education
      </h3>
      <p className="text-neutral-600 dark:text-neutral-400 mb-6">
        Add your educational background, starting with the most recent degree
      </p>

      {/* Education List */}
      {education.length > 0 && (
        <div className="mb-6 space-y-4">
          {education.map((edu) => (
            <div 
              key={edu.id} 
              className={`border ${editingId === edu.id ? 'border-primary-300 bg-primary-50 dark:bg-primary-900/20' : 'border-neutral-200 dark:border-neutral-700'} rounded-lg p-4 relative`}
            >
              {editingId === edu.id ? (
                <form onSubmit={handleEditSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="institution" className="label">Institution Name</label>
                      <input
                        type="text"
                        id="institution"
                        name="institution"
                        value={formData.institution}
                        onChange={handleChange}
                        className="input"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="degree" className="label">Degree</label>
                      <input
                        type="text"
                        id="degree"
                        name="degree"
                        value={formData.degree}
                        onChange={handleChange}
                        className="input"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="field" className="label">Field of Study</label>
                      <input
                        type="text"
                        id="field"
                        name="field"
                        value={formData.field}
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
                        I am currently studying here
                      </label>
                    </div>
                  </div>
                  <div>
                    <label htmlFor="description" className="label">Additional Information (Optional)</label>
                    <textarea
                      id="description"
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      rows={3}
                      className="input"
                      placeholder="Honors, awards, GPA, relevant coursework, etc."
                    ></textarea>
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
                      <h4 className="font-semibold text-neutral-900 dark:text-white">{edu.degree} in {edu.field}</h4>
                      <div className="flex items-center text-neutral-700 dark:text-neutral-300 mt-1">
                        <GraduationCap className="h-4 w-4 mr-1 text-neutral-500 dark:text-neutral-400" />
                        {edu.institution}
                      </div>
                      <div className="flex items-center text-neutral-600 dark:text-neutral-400 text-sm mt-1">
                        <Calendar className="h-3 w-3 mr-1" />
                        {edu.startDate} — {edu.current ? 'Present' : edu.endDate}
                      </div>
                      <div className="flex items-center text-neutral-600 dark:text-neutral-400 text-sm mt-1">
                        <MapPin className="h-3 w-3 mr-1" />
                        {edu.location}
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <button 
                        onClick={() => startEdit(edu)} 
                        className="text-neutral-500 hover:text-primary-600 dark:text-neutral-400 dark:hover:text-primary-400"
                        aria-label="Edit"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button 
                        onClick={() => handleDelete(edu.id)} 
                        className="text-neutral-500 hover:text-error-600 dark:text-neutral-400 dark:hover:text-error-400"
                        aria-label="Delete"
                      >
                        <Trash className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                  {edu.description && (
                    <div className="mt-3 text-sm text-neutral-700 dark:text-neutral-300">
                      {edu.description}
                    </div>
                  )}
                </>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Add New Education Form */}
      {isAdding ? (
        <div className="border border-primary-200 dark:border-primary-800 rounded-lg p-4 bg-primary-50 dark:bg-primary-900/20">
          <h4 className="font-semibold text-neutral-900 dark:text-white mb-4">Add Education</h4>
          <form onSubmit={handleAddSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="institution" className="label">Institution Name</label>
                <input
                  type="text"
                  id="institution"
                  name="institution"
                  value={formData.institution}
                  onChange={handleChange}
                  className="input"
                  required
                />
              </div>
              <div>
                <label htmlFor="degree" className="label">Degree</label>
                <input
                  type="text"
                  id="degree"
                  name="degree"
                  value={formData.degree}
                  onChange={handleChange}
                  className="input"
                  placeholder="Bachelor of Science, Associate's Degree, etc."
                  required
                />
              </div>
              <div>
                <label htmlFor="field" className="label">Field of Study</label>
                <input
                  type="text"
                  id="field"
                  name="field"
                  value={formData.field}
                  onChange={handleChange}
                  className="input"
                  placeholder="Computer Science, Business, etc."
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
                  placeholder="City, State"
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
                  I am currently studying here
                </label>
              </div>
            </div>
            <div>
              <label htmlFor="description" className="label">Additional Information (Optional)</label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={3}
                className="input"
                placeholder="Honors, awards, GPA, relevant coursework, etc."
              ></textarea>
            </div>
            <div className="flex space-x-3">
              <button type="submit" className="btn-primary">
                <Save className="h-4 w-4 mr-2" />
                Save Education
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
          Add Education
        </button>
      )}

      {education.length === 0 && !isAdding && (
        <div className="text-center p-6 border border-dashed border-neutral-300 dark:border-neutral-700 rounded-lg mt-4">
          <GraduationCap className="h-10 w-10 mx-auto text-neutral-400 dark:text-neutral-600" />
          <p className="mt-2 text-neutral-600 dark:text-neutral-400">
            Add your educational background to enhance your resume
          </p>
        </div>
      )}
      
      <div className="mt-6 text-sm text-neutral-600 dark:text-neutral-400">
        <p className="mb-1">Tips for education section:</p>
        <ul className="list-disc list-inside space-y-1 text-neutral-500 dark:text-neutral-400">
          <li>Always include your degree, field of study, and graduation date</li>
          <li>For recent graduates, consider including relevant coursework</li>
          <li>If you have a high GPA (3.5+), include it in the description</li>
          <li>List education in reverse chronological order (most recent first)</li>
        </ul>
      </div>
    </div>
  );
};