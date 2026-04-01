import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, X, ArrowRight, Check, ChevronDown } from 'lucide-react';
import { getCategoryIcon } from './GlassIcons';
import { UrgencySelector } from './UrgencyPill';
import MuiButton from './MuiButton';

const CATEGORIES = ['Plumbing', 'Electrical', 'AC/HVAC', 'Furniture', 'Cleaning', 'Other'];

const SubmitForm = ({ onSubmit, onSuccess, properties = [] }) => {
  const [formData, setFormData] = useState({
    property: '',
    category: '',
    urgency: '',
    description: '',
    photoUrl: null,
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [newTicketId, setNewTicketId] = useState('');
  const [categoryDropdownOpen, setCategoryDropdownOpen] = useState(false);
  const fileInputRef = useRef(null);
  const categoryRef = useRef(null);

  const maxDescriptionLength = 500;

  // Handle click outside for category dropdown
  React.useEffect(() => {
    const handleClickOutside = (event) => {
      if (categoryRef.current && !categoryRef.current.contains(event.target)) {
        setCategoryDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.property) {
      newErrors.property = 'Please select a property';
    }
    if (!formData.category) {
      newErrors.category = 'Please select a category';
    }
    if (!formData.urgency) {
      newErrors.urgency = 'Please select urgency level';
    }
    if (!formData.description.trim()) {
      newErrors.description = 'Please describe the issue';
    } else if (formData.description.trim().length < 10) {
      newErrors.description = 'Description must be at least 10 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate a brief submission delay
      await new Promise((resolve) => setTimeout(resolve, 600));

      const ticketId = await onSubmit(formData);
      setNewTicketId(ticketId);
      setShowSuccess(true);
    } catch (error) {
      console.error('Failed to submit ticket:', error);
      setErrors((prev) => ({
        ...prev,
        submit: 'Failed to submit ticket. Please try again.'
      }));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setErrors((prev) => ({ ...prev, photo: 'Image must be less than 5MB' }));
        return;
      }

      const reader = new FileReader();
      reader.onload = (event) => {
        setFormData((prev) => ({ ...prev, photoUrl: event.target.result }));
        setErrors((prev) => ({ ...prev, photo: null }));
      };
      reader.readAsDataURL(file);
    }
  };

  const removePhoto = () => {
    setFormData((prev) => ({ ...prev, photoUrl: null }));
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSuccessClose = () => {
    setShowSuccess(false);
    setFormData({
      property: '',
      category: '',
      urgency: '',
      description: '',
      photoUrl: null,
    });
    setErrors({});
  };

  const inputBaseClasses = `
    w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl
    glass-input
    text-dark-900 placeholder-dark-900/40
    font-dm text-sm
    focus-ring-animate
  `;

  return (
    <>
      <motion.div
        className="w-full max-w-[560px] mx-auto px-2 sm:px-0"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        {/* Form Card */}
        <div
          className="rounded-2xl p-5 sm:p-8 relative overflow-visible"
          style={{
            background: 'rgba(255, 255, 255, 0.8)',
            border: '1px solid rgba(0, 0, 0, 0.08)',
            backdropFilter: 'blur(20px)',
            boxShadow: '0 0 40px rgba(30, 64, 175, 0.1)',
          }}
        >
          {/* Subtle gradient glow */}
          <div
            className="absolute -top-20 -right-20 w-40 h-40 rounded-full opacity-30 pointer-events-none hidden sm:block"
            style={{
              background: 'radial-gradient(circle, rgba(99,102,241,0.4) 0%, transparent 70%)',
            }}
          />

          <div className="relative">
            {/* Header */}
            <div className="mb-6 sm:mb-8">
              <h2 className="font-sora text-xl sm:text-2xl font-semibold text-dark-900 mb-2">
                Submit an Issue
              </h2>
              <p className="text-dark-900/50 text-xs sm:text-sm">
                Report a maintenance issue for your property
              </p>
            </div>

            {/* Submission Error */}
            {errors.submit && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-4 p-4 rounded-xl bg-red-500/10 border border-red-500/20"
              >
                <p className="text-red-600 text-sm font-medium">{errors.submit}</p>
              </motion.div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
              {/* Property Dropdown */}
              <div className="space-y-1.5 sm:space-y-2">
                <label htmlFor="property" className="block text-xs sm:text-sm font-medium text-dark-900/70">
                  Property
                </label>
                <select
                  id="property"
                  value={formData.property}
                  onChange={(e) => {
                    setFormData((prev) => ({ ...prev, property: e.target.value }));
                    if (errors.property) setErrors((prev) => ({ ...prev, property: null }));
                  }}
                  className={`${inputBaseClasses} custom-select ${
                    errors.property ? 'border-red-500/50 shake' : ''
                  }`}
                  aria-describedby={errors.property ? 'property-error' : undefined}
                >
                  <option value="">Select a property</option>
                  {properties.map((prop) => (
                    <option key={prop.id} value={prop.name}>
                      {prop.name}
                    </option>
                  ))}
                </select>
                {errors.property && (
                  <p id="property-error" className="text-red-400 text-xs">{errors.property}</p>
                )}
              </div>

              {/* Category Dropdown with Icons */}
              <div className="space-y-1.5 sm:space-y-2" ref={categoryRef}>
                <label className="block text-xs sm:text-sm font-medium text-dark-900/70">
                  Issue Category
                </label>
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setCategoryDropdownOpen(!categoryDropdownOpen)}
                    className={`${inputBaseClasses} text-left flex items-center justify-between ${
                      errors.category ? 'border-red-500/50 shake' : ''
                    }`}
                    aria-haspopup="listbox"
                    aria-expanded={categoryDropdownOpen}
                    aria-describedby={errors.category ? 'category-error' : undefined}
                  >
                    {formData.category ? (
                      <span className="flex items-center gap-3">
                        {getCategoryIcon(formData.category, 'sm')}
                        <span>{formData.category}</span>
                      </span>
                    ) : (
                      <span className="text-dark-900/40">Select a category</span>
                    )}
                    <ChevronDown
                      size={18}
                      className={`text-dark-900/50 transition-transform ${
                        categoryDropdownOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>

                  <AnimatePresence>
                    {categoryDropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.15 }}
                        className="absolute mt-2 w-full py-2 rounded-xl overflow-hidden"
                        style={{
                          background: 'rgba(255, 255, 255, 0.98)',
                          border: '1px solid rgba(0, 0, 0, 0.1)',
                          backdropFilter: 'blur(20px)',
                          boxShadow: '0 10px 40px rgba(0, 0, 0, 0.5)',
                          zIndex: 9999,
                        }}
                        role="listbox"
                      >
                        {CATEGORIES.map((cat) => (
                          <motion.button
                            key={cat}
                            type="button"
                            onClick={() => {
                              setFormData((prev) => ({ ...prev, category: cat }));
                              setCategoryDropdownOpen(false);
                              if (errors.category) setErrors((prev) => ({ ...prev, category: null }));
                            }}
                            className={`
                              w-full flex items-center gap-3 px-4 py-3
                              text-left text-sm
                              transition-colors duration-150
                              hover:bg-black/5
                              ${formData.category === cat ? 'bg-black/5' : ''}
                            `}
                            whileHover={{ x: 4 }}
                            role="option"
                            aria-selected={formData.category === cat}
                          >
                            {getCategoryIcon(cat, 'sm')}
                            <span className="text-dark-900">{cat}</span>
                            {formData.category === cat && (
                              <Check size={16} className="ml-auto text-blue-800" />
                            )}
                          </motion.button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                {errors.category && (
                  <p id="category-error" className="text-red-400 text-xs">{errors.category}</p>
                )}
              </div>

              {/* Urgency Selector */}
              <UrgencySelector
                value={formData.urgency}
                onChange={(urgency) => {
                  setFormData((prev) => ({ ...prev, urgency }));
                  if (errors.urgency) setErrors((prev) => ({ ...prev, urgency: null }));
                }}
                error={errors.urgency}
              />

              {/* Description */}
              <div className="space-y-1.5 sm:space-y-2">
                <label htmlFor="description" className="block text-xs sm:text-sm font-medium text-dark-900/70">
                  Description
                </label>
                <div className="relative">
                  <textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => {
                      if (e.target.value.length <= maxDescriptionLength) {
                        setFormData((prev) => ({ ...prev, description: e.target.value }));
                        if (errors.description) setErrors((prev) => ({ ...prev, description: null }));
                      }
                    }}
                    placeholder="Describe the maintenance issue in detail..."
                    rows={4}
                    className={`${inputBaseClasses} resize-none ${
                      errors.description ? 'border-red-500/50 shake' : ''
                    }`}
                    aria-describedby="description-count description-error"
                  />
                  <span
                    id="description-count"
                    className={`absolute bottom-3 right-3 text-xs ${
                      formData.description.length > maxDescriptionLength * 0.9
                        ? 'text-amber-400'
                        : 'text-dark-900/30'
                    }`}
                  >
                    {formData.description.length}/{maxDescriptionLength}
                  </span>
                </div>
                {errors.description && (
                  <p id="description-error" className="text-red-400 text-xs">{errors.description}</p>
                )}
              </div>

              {/* Photo Upload */}
              <div className="space-y-1.5 sm:space-y-2">
                <label className="block text-xs sm:text-sm font-medium text-dark-900/70">
                  Photo (Optional)
                </label>

                {formData.photoUrl ? (
                  <div className="relative rounded-xl overflow-hidden border border-black/10">
                    <img
                      src={formData.photoUrl}
                      alt="Uploaded preview"
                      className="w-full h-40 object-cover"
                    />
                    <button
                      type="button"
                      onClick={removePhoto}
                      className="absolute top-2 right-2 w-8 h-8 rounded-full bg-black/60 hover:bg-black/80 flex items-center justify-center transition-colors"
                      aria-label="Remove photo"
                    >
                      <X size={16} className="text-white" />
                    </button>
                  </div>
                ) : (
                  <motion.label
                    className={`
                      flex flex-col items-center justify-center
                      w-full h-32 rounded-xl
                      border-2 border-dashed border-black/20
                      hover:border-blue-800/50 hover:bg-white/[0.02]
                      cursor-pointer transition-all duration-200
                      ${errors.photo ? 'border-red-500/50' : ''}
                    `}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                  >
                    <Upload size={24} className="text-dark-900/40 mb-2" />
                    <span className="text-dark-900/50 text-sm">
                      Drop photo here or click to browse
                    </span>
                    <span className="text-dark-900/30 text-xs mt-1">
                      PNG, JPG up to 5MB
                    </span>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handlePhotoUpload}
                      className="hidden"
                      aria-label="Upload photo"
                    />
                  </motion.label>
                )}
                {errors.photo && (
                  <p className="text-red-400 text-xs">{errors.photo}</p>
                )}
              </div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={isSubmitting}
                className={`
                  w-full py-3 sm:py-4 px-4 sm:px-6 rounded-xl
                  font-sora font-semibold text-sm sm:text-base text-white
                  flex items-center justify-center gap-2
                  transition-all duration-300
                  focus:outline-none focus:ring-2 focus:ring-blue-800 focus:ring-offset-2 focus:ring-offset-dark-900
                  ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}
                `}
                style={{
                  background: '#1E40AF',
                  boxShadow: '0 4px 20px rgba(30, 64, 175, 0.4)',
                }}
                whileHover={!isSubmitting ? { scale: 1.01, boxShadow: '0 6px 30px rgba(30, 64, 175, 0.5)' } : {}}
                whileTap={!isSubmitting ? { scale: 0.99 } : {}}
              >
                {isSubmitting ? (
                  <motion.div
                    className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                  />
                ) : (
                  <>
                    Submit Issue
                    <ArrowRight size={18} />
                  </>
                )}
              </motion.button>
            </form>
          </div>
        </div>
      </motion.div>

      {/* Success Modal */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ backgroundColor: 'rgba(0, 0, 0, 0.8)' }}
            onClick={handleSuccessClose}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              className="w-full max-w-md p-8 rounded-2xl text-center"
              style={{
                background: 'rgba(255, 255, 255, 0.85)',
                border: '1px solid rgba(0, 0, 0, 0.1)',
                backdropFilter: 'blur(30px)',
                boxShadow: '0 0 60px rgba(30, 64, 175, 0.2)',
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Animated Checkmark */}
              <div className="w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center"
                style={{
                  background: 'rgba(34, 197, 94, 0.15)',
                  border: '1px solid rgba(34, 197, 94, 0.3)',
                }}
              >
                <svg
                  className="w-10 h-10"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#22C55E"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M4 12l5 5L20 7" className="draw-check" />
                </svg>
              </div>

              {/* Ticket Number */}
              <div
                className="inline-block px-5 py-2 rounded-xl mb-4 font-mono text-2xl font-bold"
                style={{
                  background: 'rgba(30, 64, 175, 0.15)',
                  border: '1px solid rgba(30, 64, 175, 0.25)',
                  color: '#1E40AF',
                }}
              >
                {newTicketId}
              </div>

              <h3 className="font-sora text-xl font-semibold text-dark-900 mb-2">
                Issue Submitted
              </h3>
              <p className="text-dark-900/50 text-sm mb-8">
                Your maintenance request has been logged successfully
              </p>

              <motion.button
                onClick={handleSuccessClose}
                className="w-full py-3 px-4 rounded-xl font-semibold text-white"
                style={{
                  background: '#1E40AF',
                }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Submit Another
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default SubmitForm;
