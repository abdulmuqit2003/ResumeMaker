import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type Contact = {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  linkedin?: string;
  website?: string;
};

export type WorkExperience = {
  id: string;
  company: string;
  title: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
};

export type Education = {
  id: string;
  institution: string;
  degree: string;
  field: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description?: string;
};

export type Skill = {
  id: string;
  name: string;
};

export type Project = {
  id: string;
  name: string;
  description: string;
  link?: string;
  skills?: string[];
};

export type Certification = {
  id: string;
  name: string;
  issuer: string;
  date: string;
  expiryDate?: string;
  link?: string;
};

export type CustomSection = {
  id: string;
  title: string;
  items: CustomSectionItem[];
};

export type CustomSectionItem = {
  id: string;
  title: string;
  subtitle?: string;
  date?: string;
  description?: string;
};

export type SectionType = 
  | 'contact' 
  | 'workExperience' 
  | 'education' 
  | 'skills' 
  | 'projects' 
  | 'certifications' 
  | 'customSections';

export type SectionOrder = {
  id: SectionType;
  title: string;
  enabled: boolean;
};

export type ResumeState = {
  contact: Contact;
  workExperience: WorkExperience[];
  education: Education[];
  skills: Skill[];
  projects: Project[];
  certifications: Certification[];
  customSections: CustomSection[];
  sectionOrder: SectionOrder[];
  
  // Actions
  updateContact: (contact: Partial<Contact>) => void;
  addWorkExperience: (experience: Omit<WorkExperience, 'id'>) => void;
  updateWorkExperience: (id: string, experience: Partial<WorkExperience>) => void;
  removeWorkExperience: (id: string) => void;
  addEducation: (education: Omit<Education, 'id'>) => void;
  updateEducation: (id: string, education: Partial<Education>) => void;
  removeEducation: (id: string) => void;
  addSkill: (skill: Omit<Skill, 'id'>) => void;
  updateSkill: (id: string, skill: Partial<Skill>) => void;
  removeSkill: (id: string) => void;
  addProject: (project: Omit<Project, 'id'>) => void;
  updateProject: (id: string, project: Partial<Project>) => void;
  removeProject: (id: string) => void;
  addCertification: (certification: Omit<Certification, 'id'>) => void;
  updateCertification: (id: string, certification: Partial<Certification>) => void;
  removeCertification: (id: string) => void;
  addCustomSection: (title: string) => void;
  updateCustomSection: (id: string, title: string) => void;
  removeCustomSection: (id: string) => void;
  addCustomSectionItem: (sectionId: string, item: Omit<CustomSectionItem, 'id'>) => void;
  updateCustomSectionItem: (sectionId: string, itemId: string, item: Partial<CustomSectionItem>) => void;
  removeCustomSectionItem: (sectionId: string, itemId: string) => void;
  updateSectionOrder: (sectionOrder: SectionOrder[]) => void;
  toggleSectionEnabled: (id: SectionType) => void;
  resetResume: () => void;
};

const generateId = () => Math.random().toString(36).substring(2, 11);

const initialState: Omit<ResumeState, 'updateContact' | 'addWorkExperience' | 'updateWorkExperience' | 'removeWorkExperience' | 'addEducation' | 'updateEducation' | 'removeEducation' | 'addSkill' | 'updateSkill' | 'removeSkill' | 'addProject' | 'updateProject' | 'removeProject' | 'addCertification' | 'updateCertification' | 'removeCertification' | 'addCustomSection' | 'updateCustomSection' | 'removeCustomSection' | 'addCustomSectionItem' | 'updateCustomSectionItem' | 'removeCustomSectionItem' | 'updateSectionOrder' | 'toggleSectionEnabled' | 'resetResume'> = {
  contact: {
    fullName: '',
    email: '',
    phone: '',
    location: '',
    linkedin: '',
    website: '',
  },
  workExperience: [],
  education: [],
  skills: [],
  projects: [],
  certifications: [],
  customSections: [],
  sectionOrder: [
    { id: 'contact', title: 'Contact Information', enabled: true },
    { id: 'workExperience', title: 'Work Experience', enabled: true },
    { id: 'education', title: 'Education', enabled: true },
    { id: 'skills', title: 'Skills', enabled: true },
    { id: 'projects', title: 'Projects', enabled: true },
    { id: 'certifications', title: 'Certifications', enabled: true },
    { id: 'customSections', title: 'Custom Sections', enabled: true },
  ],
};

export const useResumeStore = create<ResumeState>()(
  persist(
    (set) => ({
      ...initialState,
      
      updateContact: (contact) => set((state) => ({
        contact: { ...state.contact, ...contact },
      })),
      
      addWorkExperience: (experience) => set((state) => ({
        workExperience: [...state.workExperience, { id: generateId(), ...experience }],
      })),
      
      updateWorkExperience: (id, experience) => set((state) => ({
        workExperience: state.workExperience.map(exp => 
          exp.id === id ? { ...exp, ...experience } : exp
        ),
      })),
      
      removeWorkExperience: (id) => set((state) => ({
        workExperience: state.workExperience.filter(exp => exp.id !== id),
      })),
      
      addEducation: (education) => set((state) => ({
        education: [...state.education, { id: generateId(), ...education }],
      })),
      
      updateEducation: (id, education) => set((state) => ({
        education: state.education.map(edu => 
          edu.id === id ? { ...edu, ...education } : edu
        ),
      })),
      
      removeEducation: (id) => set((state) => ({
        education: state.education.filter(edu => edu.id !== id),
      })),
      
      addSkill: (skill) => set((state) => ({
        skills: [...state.skills, { id: generateId(), ...skill }],
      })),
      
      updateSkill: (id, skill) => set((state) => ({
        skills: state.skills.map(s => 
          s.id === id ? { ...s, ...skill } : s
        ),
      })),
      
      removeSkill: (id) => set((state) => ({
        skills: state.skills.filter(s => s.id !== id),
      })),
      
      addProject: (project) => set((state) => ({
        projects: [...state.projects, { id: generateId(), ...project }],
      })),
      
      updateProject: (id, project) => set((state) => ({
        projects: state.projects.map(p => 
          p.id === id ? { ...p, ...project } : p
        ),
      })),
      
      removeProject: (id) => set((state) => ({
        projects: state.projects.filter(p => p.id !== id),
      })),
      
      addCertification: (certification) => set((state) => ({
        certifications: [...state.certifications, { id: generateId(), ...certification }],
      })),
      
      updateCertification: (id, certification) => set((state) => ({
        certifications: state.certifications.map(c => 
          c.id === id ? { ...c, ...certification } : c
        ),
      })),
      
      removeCertification: (id) => set((state) => ({
        certifications: state.certifications.filter(c => c.id !== id),
      })),
      
      addCustomSection: (title) => set((state) => ({
        customSections: [...state.customSections, { 
          id: generateId(), 
          title,
          items: [] 
        }],
      })),
      
      updateCustomSection: (id, title) => set((state) => ({
        customSections: state.customSections.map(section => 
          section.id === id ? { ...section, title } : section
        ),
      })),
      
      removeCustomSection: (id) => set((state) => ({
        customSections: state.customSections.filter(section => section.id !== id),
      })),
      
      addCustomSectionItem: (sectionId, item) => set((state) => ({
        customSections: state.customSections.map(section => 
          section.id === sectionId 
            ? { ...section, items: [...section.items, { id: generateId(), ...item }] } 
            : section
        ),
      })),
      
      updateCustomSectionItem: (sectionId, itemId, item) => set((state) => ({
        customSections: state.customSections.map(section => 
          section.id === sectionId 
            ? { 
                ...section, 
                items: section.items.map(i => 
                  i.id === itemId ? { ...i, ...item } : i
                ) 
              } 
            : section
        ),
      })),
      
      removeCustomSectionItem: (sectionId, itemId) => set((state) => ({
        customSections: state.customSections.map(section => 
          section.id === sectionId 
            ? { 
                ...section, 
                items: section.items.filter(i => i.id !== itemId) 
              } 
            : section
        ),
      })),
      
      updateSectionOrder: (sectionOrder) => set({
        sectionOrder,
      }),
      
      toggleSectionEnabled: (id) => set((state) => ({
        sectionOrder: state.sectionOrder.map(section => 
          section.id === id 
            ? { ...section, enabled: !section.enabled } 
            : section
        ),
      })),
      
      resetResume: () => set({ ...initialState }),
    }),
    {
      name: 'resume-storage',
    }
  )
);