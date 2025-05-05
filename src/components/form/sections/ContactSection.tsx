import React from 'react';
import { useResumeStore } from '../../../store/resumeStore';
import { User, Mail, Phone, MapPin, Linkedin, Globe } from 'lucide-react';

export const ContactSection: React.FC = () => {
  const { contact, updateContact } = useResumeStore();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    updateContact({ [name]: value });
  };

  return (
    <div className="animate-slide-up">
      <h3 className="text-xl font-semibold mb-4 text-neutral-900 dark:text-white">
        Contact Information
      </h3>
      <p className="text-neutral-600 dark:text-neutral-400 mb-6">
        Your contact information will be displayed at the top of your resume
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Full Name */}
        <div className="col-span-2">
          <label htmlFor="fullName" className="label flex items-center">
            <User className="h-4 w-4 mr-2 text-neutral-500 dark:text-neutral-400" />
            Full Name <span className="text-error-500 ml-1">*</span>
          </label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            value={contact.fullName}
            onChange={handleChange}
            placeholder="John Doe"
            className="input"
            required
          />
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="label flex items-center">
            <Mail className="h-4 w-4 mr-2 text-neutral-500 dark:text-neutral-400" />
            Email Address <span className="text-error-500 ml-1">*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={contact.email}
            onChange={handleChange}
            placeholder="john.doe@example.com"
            className="input"
            required
          />
        </div>

        {/* Phone */}
        <div>
          <label htmlFor="phone" className="label flex items-center">
            <Phone className="h-4 w-4 mr-2 text-neutral-500 dark:text-neutral-400" />
            Phone Number <span className="text-error-500 ml-1">*</span>
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={contact.phone}
            onChange={handleChange}
            placeholder="(123) 456-7890"
            className="input"
            required
          />
        </div>

        {/* Location */}
        <div>
          <label htmlFor="location" className="label flex items-center">
            <MapPin className="h-4 w-4 mr-2 text-neutral-500 dark:text-neutral-400" />
            Location <span className="text-error-500 ml-1">*</span>
          </label>
          <input
            type="text"
            id="location"
            name="location"
            value={contact.location}
            onChange={handleChange}
            placeholder="City, State"
            className="input"
            required
          />
          <p className="mt-1 text-xs text-neutral-500 dark:text-neutral-400">
            City and state are sufficient for ATS systems, no need for full address
          </p>
        </div>

        {/* LinkedIn */}
        <div>
          <label htmlFor="linkedin" className="label flex items-center">
            <Linkedin className="h-4 w-4 mr-2 text-neutral-500 dark:text-neutral-400" />
            LinkedIn Profile
          </label>
          <input
            type="url"
            id="linkedin"
            name="linkedin"
            value={contact.linkedin || ''}
            onChange={handleChange}
            placeholder="https://linkedin.com/in/johndoe"
            className="input"
          />
        </div>

        {/* Personal Website */}
        <div>
          <label htmlFor="website" className="label flex items-center">
            <Globe className="h-4 w-4 mr-2 text-neutral-500 dark:text-neutral-400" />
            Personal Website
          </label>
          <input
            type="url"
            id="website"
            name="website"
            value={contact.website || ''}
            onChange={handleChange}
            placeholder="https://johndoe.com"
            className="input"
          />
        </div>
      </div>

      <div className="mt-4 text-sm text-neutral-500 dark:text-neutral-400">
        <p className="flex items-center">
          <span className="inline-block h-4 w-4 rounded-full bg-success-500 mr-2"></span>
          Professional email addresses are preferred by employers
        </p>
      </div>
    </div>
  );
};