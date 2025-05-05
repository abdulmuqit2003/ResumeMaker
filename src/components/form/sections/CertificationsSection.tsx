import React, { useState } from 'react';
import { useResumeStore, Certification } from '../../../store/resumeStore';
import { Award, Plus, Trash, Edit, Calendar, ExternalLink, Save, X } from 'lucide-react';

export const CertificationsSection: React.FC = () => {
  const { certifications, addCertification, updateCertification, removeCertification } = useResumeStore();
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Omit<Certification, 'id'>>({
    name: '',
    issuer: '',
    date: '',
    expiryDate: '',
    link: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addCertification(formData);
    setFormData({
      name: '',
      issuer: '',
      date: '',
      expiryDate: '',
      link: ''
    });
    setIsAdding(false);
  };

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      updateCertification(editingId, formData);
      setEditingId(null);
    }
    setFormData({
      name: '',
      issuer: '',
      date: '',
      expiryDate: '',
      link: ''
    });
  };

  const startEdit = (cert: Certification) => {
    setEditingId(cert.id);
    setFormData({
      name: cert.name,
      issuer: cert.issuer,
      date: cert.date,
      expiryDate: cert.expiryDate || '',
      link: cert.link || ''
    });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setFormData({
      name: '',
      issuer: '',
      date: '',
      expiryDate: '',
      link: ''
    });
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this certification?')) {
      removeCertification(id);
    }
  };

  return (
    <div className="animate-slide-up">
      <h3 className="text-xl font-semibold mb-4 text-neutral-900 dark:text-white flex items-center">
        <Award className="h-5 w-5 mr-2 text-primary-500" />
        Certifications
      </h3>
      <p className="text-neutral-600 dark:text-neutral-400 mb-6">
        Add professional certifications that demonstrate your expertise
      </p>

      {/* Certifications List */}
      {certifications.length > 0 && (
        <div className="mb-6 space-y-4">
          {certifications.map((cert) => (
            <div 
              key={cert.id} 
              className={`border ${editingId === cert.id ? 'border-primary-300 bg-primary-50 dark:bg-primary-900/20' : 'border-neutral-200 dark:border-neutral-700'} rounded-lg p-4 relative`}
            >
              {editingId === cert.id ? (
                <form onSubmit={handleEditSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="label">Certification Name</label>
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
                      <label htmlFor="issuer" className="label">Issuing Organization</label>
                      <input
                        type="text"
                        id="issuer"
                        name="issuer"
                        value={formData.issuer}
                        onChange={handleChange}
                        className="input"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="date" className="label">Issue Date</label>
                      <input
                        type="month"
                        id="date"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                        className="input"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="expiryDate" className="label">Expiry Date (Optional)</label>
                      <input
                        type="month"
                        id="expiryDate"
                        name="expiryDate"
                        value={formData.expiryDate}
                        onChange={handleChange}
                        className="input"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label htmlFor="link" className="label">Credential URL (Optional)</label>
                      <input
                        type="url"
                        id="link"
                        name="link"
                        value={formData.link}
                        onChange={handleChange}
                        className="input"
                        placeholder="https://credential.example.com/verify/123456"
                      />
                    </div>
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
                      <h4 className="font-semibold text-neutral-900 dark:text-white">{cert.name}</h4>
                      <div className="text-neutral-700 dark:text-neutral-300 mt-1">
                        {cert.issuer}
                      </div>
                      <div className="flex items-center text-neutral-600 dark:text-neutral-400 text-sm mt-1">
                        <Calendar className="h-3 w-3 mr-1" />
                        {cert.date}
                        {cert.expiryDate && ` — ${cert.expiryDate}`}
                      </div>
                      {cert.link && (
                        <a 
                          href={cert.link} 
                          target="_blank" 
                          rel="noreferrer"
                          className="inline-flex items-center text-sm text-primary-600 dark:text-primary-400 hover:underline mt-1"
                        >
                          <ExternalLink className="h-3 w-3 mr-1" />
                          Verify
                        </a>
                      )}
                    </div>
                    <div className="flex space-x-2">
                      <button 
                        onClick={() => startEdit(cert)} 
                        className="text-neutral-500 hover:text-primary-600 dark:text-neutral-400 dark:hover:text-primary-400"
                        aria-label="Edit"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button 
                        onClick={() => handleDelete(cert.id)} 
                        className="text-neutral-500 hover:text-error-600 dark:text-neutral-400 dark:hover:text-error-400"
                        aria-label="Delete"
                      >
                        <Trash className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Add New Certification Form */}
      {isAdding ? (
        <div className="border border-primary-200 dark:border-primary-800 rounded-lg p-4 bg-primary-50 dark:bg-primary-900/20">
          <h4 className="font-semibold text-neutral-900 dark:text-white mb-4">Add Certification</h4>
          <form onSubmit={handleAddSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="name" className="label">Certification Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="input"
                  placeholder="AWS Certified Solutions Architect"
                  required
                />
              </div>
              <div>
                <label htmlFor="issuer" className="label">Issuing Organization</label>
                <input
                  type="text"
                  id="issuer"
                  name="issuer"
                  value={formData.issuer}
                  onChange={handleChange}
                  className="input"
                  placeholder="Amazon Web Services"
                  required
                />
              </div>
              <div>
                <label htmlFor="date" className="label">Issue Date</label>
                <input
                  type="month"
                  id="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  className="input"
                  required
                />
              </div>
              <div>
                <label htmlFor="expiryDate" className="label">Expiry Date (Optional)</label>
                <input
                  type="month"
                  id="expiryDate"
                  name="expiryDate"
                  value={formData.expiryDate}
                  onChange={handleChange}
                  className="input"
                />
              </div>
              <div className="md:col-span-2">
                <label htmlFor="link" className="label">Credential URL (Optional)</label>
                <input
                  type="url"
                  id="link"
                  name="link"
                  value={formData.link}
                  onChange={handleChange}
                  className="input"
                  placeholder="https://credential.example.com/verify/123456"
                />
              </div>
            </div>
            <div className="flex space-x-3">
              <button type="submit" className="btn-primary">
                <Save className="h-4 w-4 mr-2" />
                Save Certification
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
          Add Certification
        </button>
      )}

      {certifications.length === 0 && !isAdding && (
        <div className="text-center p-6 border border-dashed border-neutral-300 dark:border-neutral-700 rounded-lg mt-4">
          <Award className="h-10 w-10 mx-auto text-neutral-400 dark:text-neutral-600" />
          <p className="mt-2 text-neutral-600 dark:text-neutral-400">
            No certifications added yet. Adding relevant certifications can strengthen your resume.
          </p>
        </div>
      )}
      
      <div className="mt-6 text-sm text-neutral-600 dark:text-neutral-400">
        <p className="mb-1">Tips for certification section:</p>
        <ul className="list-disc list-inside space-y-1 text-neutral-500 dark:text-neutral-400">
          <li>Include the full official name of each certification</li>
          <li>List certifications in order of relevance to the job you're applying for</li>
          <li>Add verification links if available</li>
          <li>Include expiration dates for time-limited certifications</li>
        </ul>
      </div>
    </div>
  );
};