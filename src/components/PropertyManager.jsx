import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Building2, X, Trash2 } from 'lucide-react';

const PropertyManager = ({ properties, onAddProperty, onDeleteProperty, isLoading }) => {
  const [isAdding, setIsAdding] = useState(false);
  const [newPropertyName, setNewPropertyName] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!newPropertyName.trim()) {
      setError('Property name is required');
      return;
    }

    try {
      await onAddProperty(newPropertyName.trim());
      setNewPropertyName('');
      setIsAdding(false);
      setError('');
    } catch (err) {
      setError(err.message || 'Failed to add property');
    }
  };

  const handleDelete = async (id, name) => {
    if (window.confirm(`Are you sure you want to delete "${name}"? This will also delete all associated tickets.`)) {
      try {
        await onDeleteProperty(id);
      } catch (err) {
        setError(err.message || 'Failed to delete property');
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="rounded-xl p-6 mb-6"
      style={{
        background: 'rgba(255, 255, 255, 0.8)',
        border: '1px solid rgba(0, 0, 0, 0.08)',
        backdropFilter: 'blur(20px)',
      }}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-lg flex items-center justify-center"
            style={{
              background: 'rgba(30, 64, 175, 0.1)',
              border: '1px solid rgba(30, 64, 175, 0.2)',
            }}
          >
            <Building2 size={20} className="text-blue-800" />
          </div>
          <div>
            <h3 className="font-sora text-lg font-semibold text-dark-900">
              Manage Properties
            </h3>
            <p className="text-xs text-dark-900/50">
              {properties.length} {properties.length === 1 ? 'property' : 'properties'} available
            </p>
          </div>
        </div>

        <motion.button
          onClick={() => setIsAdding(!isAdding)}
          className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-white"
          style={{
            background: '#1E40AF',
            boxShadow: '0 2px 10px rgba(30, 64, 175, 0.3)',
          }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {isAdding ? (
            <>
              <X size={16} />
              Cancel
            </>
          ) : (
            <>
              <Plus size={16} />
              Add Property
            </>
          )}
        </motion.button>
      </div>

      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-600 text-sm"
        >
          {error}
        </motion.div>
      )}

      <AnimatePresence>
        {isAdding && (
          <motion.form
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            onSubmit={handleSubmit}
            className="mb-4 overflow-hidden"
          >
            <div className="flex gap-2">
              <input
                type="text"
                value={newPropertyName}
                onChange={(e) => {
                  setNewPropertyName(e.target.value);
                  setError('');
                }}
                placeholder="e.g., Marina Towers — Unit 5C"
                className="flex-1 px-4 py-3 rounded-xl glass-input text-dark-900 placeholder-dark-900/40 text-sm focus-ring-animate"
                autoFocus
              />
              <motion.button
                type="submit"
                className="px-6 py-3 rounded-xl text-sm font-semibold text-white"
                style={{
                  background: '#22C55E',
                  boxShadow: '0 2px 10px rgba(34, 197, 94, 0.3)',
                }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Add
              </motion.button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>

      {isLoading ? (
        <div className="flex justify-center py-8">
          <div className="w-8 h-8 border-2 border-blue-800/20 border-t-blue-800 rounded-full animate-spin" />
        </div>
      ) : (
        <div className="space-y-2">
          {properties.length === 0 ? (
            <div className="text-center py-8 text-dark-900/40 text-sm">
              No properties yet. Add your first property to get started.
            </div>
          ) : (
            <AnimatePresence mode="popLayout">
              {properties.map((property, index) => (
                <motion.div
                  key={property.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ delay: index * 0.05 }}
                  className="flex items-center justify-between p-3 rounded-lg hover:bg-black/5 transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center"
                      style={{
                        background: 'rgba(99, 102, 241, 0.1)',
                        border: '1px solid rgba(99, 102, 241, 0.2)',
                      }}
                    >
                      <Building2 size={16} className="text-indigo-600" />
                    </div>
                    <span className="text-sm text-dark-900 font-medium">
                      {property.name}
                    </span>
                  </div>

                  <motion.button
                    onClick={() => handleDelete(property.id, property.name)}
                    className="opacity-0 group-hover:opacity-100 p-2 rounded-lg hover:bg-red-500/10 text-red-500 transition-all"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Trash2 size={16} />
                  </motion.button>
                </motion.div>
              ))}
            </AnimatePresence>
          )}
        </div>
      )}
    </motion.div>
  );
};

export default PropertyManager;
