import React, { useState } from 'react';
import { useResumeStore, CustomSection, CustomSectionItem } from '../../../store/resumeStore';
import { ListPlus, Plus, Trash, Edit, Save, X, ListChecks } from 'lucide-react';

export const CustomSectionsManager: React.FC = () => {
  const { customSections, addCustomSection, updateCustomSection, removeCustomSection, addCustomSectionItem, updateCustomSectionItem, removeCustomSectionItem } = useResumeStore();
  
  const [newSectionTitle, setNewSectionTitle] = useState('');
  const [isAddingSection, setIsAddingSection] = useState(false);
  const [editingSectionId, setEditingSectionId] = useState<string | null>(null);
  const [editingSectionTitle, setEditingSectionTitle] = useState('');
  
  // Item form state
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [isAddingItem, setIsAddingItem] = useState(false);
  const [editingItemId, setEditingItemId] = useState<string | null>(null);
  const [itemFormData, setItemFormData] = useState<Omit<CustomSectionItem, 'id'>>({
    title: '',
    subtitle: '',
    date: '',
    description: ''
  });

  // Section handlers
  const handleAddSectionSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newSectionTitle.trim()) {
      addCustomSection(newSectionTitle.trim());
      setNewSectionTitle('');
      setIsAddingSection(false);
    }
  };

  const handleEditSectionSubmit = (e: React.FormEvent, sectionId: string) => {
    e.preventDefault();
    if (editingSectionTitle.trim()) {
      updateCustomSection(sectionId, editingSectionTitle.trim());
      setEditingSectionId(null);
      setEditingSectionTitle('');
    }
  };

  const startEditSection = (section: CustomSection) => {
    setEditingSectionId(section.id);
    setEditingSectionTitle(section.title);
  };

  const cancelEditSection = () => {
    setEditingSectionId(null);
    setEditingSectionTitle('');
  };

  const handleDeleteSection = (id: string) => {
    if (window.confirm(`Are you sure you want to delete this section and all its items?`)) {
      removeCustomSection(id);
      if (activeSection === id) {
        setActiveSection(null);
      }
    }
  };

  // Item handlers
  const handleItemChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setItemFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddItemSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (activeSection) {
      addCustomSectionItem(activeSection, itemFormData);
      setItemFormData({
        title: '',
        subtitle: '',
        date: '',
        description: ''
      });
      setIsAddingItem(false);
    }
  };

  const handleEditItemSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (activeSection && editingItemId) {
      updateCustomSectionItem(activeSection, editingItemId, itemFormData);
      setEditingItemId(null);
      setItemFormData({
        title: '',
        subtitle: '',
        date: '',
        description: ''
      });
    }
  };

  const startEditItem = (item: CustomSectionItem) => {
    setEditingItemId(item.id);
    setItemFormData({
      title: item.title,
      subtitle: item.subtitle || '',
      date: item.date || '',
      description: item.description || ''
    });
  };

  const cancelEditItem = () => {
    setEditingItemId(null);
    setItemFormData({
      title: '',
      subtitle: '',
      date: '',
      description: ''
    });
  };

  const handleDeleteItem = (itemId: string) => {
    if (activeSection && window.confirm('Are you sure you want to delete this item?')) {
      removeCustomSectionItem(activeSection, itemId);
    }
  };

  // Find the active section object
  const activeSectionObj = customSections.find(section => section.id === activeSection);

  return (
    <div className="animate-slide-up">
      <h3 className="text-xl font-semibold mb-4 text-neutral-900 dark:text-white flex items-center">
        <ListPlus className="h-5 w-5 mr-2 text-primary-500" />
        Custom Sections
      </h3>
      <p className="text-neutral-600 dark:text-neutral-400 mb-6">
        Create custom sections for additional resume content like volunteer work, publications, or awards
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left side - Section management */}
        <div className="md:col-span-1">
          <div className="mb-4">
            <h4 className="font-medium text-neutral-800 dark:text-neutral-200 mb-2">Your Custom Sections</h4>
            
            {customSections.length > 0 ? (
              <div className="space-y-2">
                {customSections.map((section) => (
                  <div key={section.id} className="relative">
                    {editingSectionId === section.id ? (
                      <form 
                        onSubmit={(e) => handleEditSectionSubmit(e, section.id)}
                        className="mb-2"
                      >
                        <div className="flex">
                          <input
                            type="text"
                            value={editingSectionTitle}
                            onChange={(e) => setEditingSectionTitle(e.target.value)}
                            className="input flex-grow"
                            placeholder="Section name"
                            autoFocus
                          />
                          <div className="flex ml-2">
                            <button 
                              type="submit" 
                              className="btn-primary"
                            >
                              <Save className="h-4 w-4" />
                            </button>
                            <button 
                              type="button" 
                              onClick={cancelEditSection}
                              className="btn-secondary ml-2"
                            >
                              <X className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      </form>
                    ) : (
                      <div 
                        className={`flex justify-between items-center p-3 rounded-lg cursor-pointer border ${
                          activeSection === section.id 
                            ? 'bg-primary-50 dark:bg-primary-900/20 border-primary-200 dark:border-primary-800' 
                            : 'bg-white dark:bg-neutral-800 border-neutral-200 dark:border-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-700'
                        }`}
                        onClick={() => setActiveSection(section.id)}
                      >
                        <div className="flex items-center">
                          <ListChecks className={`h-4 w-4 mr-2 ${
                            activeSection === section.id
                              ? 'text-primary-500 dark:text-primary-400'
                              : 'text-neutral-500 dark:text-neutral-400'
                          }`} />
                          <span className="text-neutral-800 dark:text-neutral-200 font-medium">
                            {section.title}
                          </span>
                          <span className="ml-2 text-xs text-neutral-500 dark:text-neutral-400">
                            ({section.items.length} {section.items.length === 1 ? 'item' : 'items'})
                          </span>
                        </div>
                        <div className="flex space-x-1">
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              startEditSection(section);
                            }} 
                            className="text-neutral-500 hover:text-primary-600 dark:text-neutral-400 dark:hover:text-primary-400 p-1"
                            aria-label="Edit"
                          >
                            <Edit className="h-3.5 w-3.5" />
                          </button>
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteSection(section.id);
                            }} 
                            className="text-neutral-500 hover:text-error-600 dark:text-neutral-400 dark:hover:text-error-400 p-1"
                            aria-label="Delete"
                          >
                            <Trash className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center p-4 border border-dashed border-neutral-300 dark:border-neutral-700 rounded-lg">
                <p className="text-sm text-neutral-600 dark:text-neutral-400">
                  No custom sections yet. Add a section to get started.
                </p>
              </div>
            )}
          </div>

          {/* Add Section Form */}
          {isAddingSection ? (
            <div className="mt-4">
              <form onSubmit={handleAddSectionSubmit}>
                <div className="mb-2">
                  <label htmlFor="newSectionTitle" className="label">Section Title</label>
                  <input
                    type="text"
                    id="newSectionTitle"
                    value={newSectionTitle}
                    onChange={(e) => setNewSectionTitle(e.target.value)}
                    className="input"
                    placeholder="Volunteer Work, Awards, etc."
                    required
                    autoFocus
                  />
                </div>
                <div className="flex space-x-2">
                  <button
                    type="submit"
                    className="btn-primary"
                    disabled={!newSectionTitle.trim()}
                  >
                    <Save className="h-4 w-4 mr-2" />
                    Add Section
                  </button>
                  <button
                    type="button"
                    className="btn-secondary"
                    onClick={() => {
                      setNewSectionTitle('');
                      setIsAddingSection(false);
                    }}
                  >
                    <X className="h-4 w-4 mr-2" />
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          ) : (
            <button
              onClick={() => setIsAddingSection(true)}
              className="btn-outline w-full flex items-center justify-center"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add New Section
            </button>
          )}
        </div>

        {/* Right side - Section items */}
        <div className="md:col-span-2">
          {activeSection ? (
            <div>
              <div className="flex justify-between items-center mb-4">
                <h4 className="font-medium text-neutral-800 dark:text-neutral-200">
                  {activeSectionObj?.title} Items
                </h4>
              </div>

              {/* Items List */}
              {activeSectionObj && activeSectionObj.items.length > 0 ? (
                <div className="space-y-4 mb-4">
                  {activeSectionObj.items.map((item) => (
                    <div
                      key={item.id}
                      className={`border ${editingItemId === item.id ? 'border-primary-300 bg-primary-50 dark:bg-primary-900/20' : 'border-neutral-200 dark:border-neutral-700'} rounded-lg p-4`}
                    >
                      {editingItemId === item.id ? (
                        <form onSubmit={handleEditItemSubmit} className="space-y-3">
                          <div>
                            <label htmlFor="title" className="label">Title</label>
                            <input
                              type="text"
                              id="title"
                              name="title"
                              value={itemFormData.title}
                              onChange={handleItemChange}
                              className="input"
                              required
                            />
                          </div>
                          <div>
                            <label htmlFor="subtitle" className="label">Subtitle/Organization (Optional)</label>
                            <input
                              type="text"
                              id="subtitle"
                              name="subtitle"
                              value={itemFormData.subtitle || ''}
                              onChange={handleItemChange}
                              className="input"
                            />
                          </div>
                          <div>
                            <label htmlFor="date" className="label">Date (Optional)</label>
                            <input
                              type="text"
                              id="date"
                              name="date"
                              value={itemFormData.date || ''}
                              onChange={handleItemChange}
                              className="input"
                              placeholder="May 2022 or 2020-2022"
                            />
                          </div>
                          <div>
                            <label htmlFor="description" className="label">Description (Optional)</label>
                            <textarea
                              id="description"
                              name="description"
                              value={itemFormData.description || ''}
                              onChange={handleItemChange}
                              className="input"
                              rows={3}
                            ></textarea>
                          </div>
                          <div className="flex space-x-2">
                            <button type="submit" className="btn-primary">
                              <Save className="h-4 w-4 mr-2" />
                              Save Changes
                            </button>
                            <button
                              type="button"
                              onClick={cancelEditItem}
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
                              <h5 className="font-semibold text-neutral-900 dark:text-white">
                                {item.title}
                              </h5>
                              {item.subtitle && (
                                <p className="text-neutral-700 dark:text-neutral-300 mt-1">
                                  {item.subtitle}
                                </p>
                              )}
                              {item.date && (
                                <p className="text-neutral-600 dark:text-neutral-400 text-sm mt-1">
                                  {item.date}
                                </p>
                              )}
                            </div>
                            <div className="flex space-x-2">
                              <button
                                onClick={() => startEditItem(item)}
                                className="text-neutral-500 hover:text-primary-600 dark:text-neutral-400 dark:hover:text-primary-400"
                                aria-label="Edit"
                              >
                                <Edit className="h-4 w-4" />
                              </button>
                              <button
                                onClick={() => handleDeleteItem(item.id)}
                                className="text-neutral-500 hover:text-error-600 dark:text-neutral-400 dark:hover:text-error-400"
                                aria-label="Delete"
                              >
                                <Trash className="h-4 w-4" />
                              </button>
                            </div>
                          </div>
                          {item.description && (
                            <p className="mt-2 text-sm text-neutral-700 dark:text-neutral-300 whitespace-pre-line">
                              {item.description}
                            </p>
                          )}
                        </>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center p-6 border border-dashed border-neutral-300 dark:border-neutral-700 rounded-lg mb-4">
                  <p className="text-neutral-600 dark:text-neutral-400">
                    No items in this section yet. Add an item to get started.
                  </p>
                </div>
              )}

              {/* Add Item Form */}
              {isAddingItem ? (
                <div className="border border-primary-200 dark:border-primary-800 rounded-lg p-4 bg-primary-50 dark:bg-primary-900/20">
                  <h5 className="font-medium text-neutral-800 dark:text-neutral-200 mb-3">
                    Add Item to {activeSectionObj?.title}
                  </h5>
                  <form onSubmit={handleAddItemSubmit} className="space-y-3">
                    <div>
                      <label htmlFor="title" className="label">Title</label>
                      <input
                        type="text"
                        id="title"
                        name="title"
                        value={itemFormData.title}
                        onChange={handleItemChange}
                        className="input"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="subtitle" className="label">Subtitle/Organization (Optional)</label>
                      <input
                        type="text"
                        id="subtitle"
                        name="subtitle"
                        value={itemFormData.subtitle || ''}
                        onChange={handleItemChange}
                        className="input"
                      />
                    </div>
                    <div>
                      <label htmlFor="date" className="label">Date (Optional)</label>
                      <input
                        type="text"
                        id="date"
                        name="date"
                        value={itemFormData.date || ''}
                        onChange={handleItemChange}
                        className="input"
                        placeholder="May 2022 or 2020-2022"
                      />
                    </div>
                    <div>
                      <label htmlFor="description" className="label">Description (Optional)</label>
                      <textarea
                        id="description"
                        name="description"
                        value={itemFormData.description || ''}
                        onChange={handleItemChange}
                        className="input"
                        rows={3}
                        placeholder="Describe this item"
                      ></textarea>
                    </div>
                    <div className="flex space-x-2">
                      <button type="submit" className="btn-primary">
                        <Save className="h-4 w-4 mr-2" />
                        Add Item
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setIsAddingItem(false);
                          setItemFormData({
                            title: '',
                            subtitle: '',
                            date: '',
                            description: ''
                          });
                        }}
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
                  onClick={() => setIsAddingItem(true)}
                  className="btn-outline w-full flex items-center justify-center py-3"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Item to {activeSectionObj?.title}
                </button>
              )}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full border border-dashed border-neutral-300 dark:border-neutral-700 rounded-lg p-8">
              <ListPlus className="h-12 w-12 text-neutral-400 dark:text-neutral-600 mb-4" />
              <h4 className="text-lg font-medium text-neutral-800 dark:text-neutral-200 mb-2">
                Select a section to edit
              </h4>
              <p className="text-neutral-600 dark:text-neutral-400 text-center max-w-md">
                Choose a section from the list on the left, or create a new custom section to add specialized content to your resume
              </p>
              {customSections.length === 0 && (
                <button
                  onClick={() => setIsAddingSection(true)}
                  className="btn-primary mt-4"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Create First Section
                </button>
              )}
            </div>
          )}
        </div>
      </div>
      
      <div className="mt-6 text-sm text-neutral-600 dark:text-neutral-400">
        <p className="mb-1">Ideas for custom sections:</p>
        <ul className="list-disc list-inside space-y-1 text-neutral-500 dark:text-neutral-400">
          <li>Volunteer Experience</li>
          <li>Awards & Honors</li>
          <li>Publications</li>
          <li>Languages</li>
          <li>Conferences & Events</li>
          <li>Extracurricular Activities</li>
        </ul>
      </div>
    </div>
  );
};