import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { format } from 'date-fns';
import { Image as ImageIcon, X } from 'lucide-react';
import { getCategoryIcon } from './GlassIcons';
import UrgencyPill from './UrgencyPill';
import StatusDropdown from './StatusDropdown';

const TicketRow = React.forwardRef(({ ticket, onStatusChange, index }, ref) => {
  const [isFlashing, setIsFlashing] = useState(false);
  const [flashColor, setFlashColor] = useState('');
  const [showPhotoModal, setShowPhotoModal] = useState(false);

  const statusColors = {
    Open: 'rgba(59, 130, 246, 0.15)',
    'In Progress': 'rgba(245, 158, 11, 0.15)',
    Resolved: 'rgba(34, 197, 94, 0.15)',
  };

  const handleStatusChange = (newStatus) => {
    setFlashColor(statusColors[newStatus]);
    setIsFlashing(true);
    onStatusChange(ticket.id, newStatus);

    setTimeout(() => {
      setIsFlashing(false);
    }, 500);
  };

  const isResolved = ticket.status === 'Resolved';

  return (
    <motion.tr
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ delay: index * 0.05, duration: 0.3 }}
      className={`
        group
        transition-all duration-200
        ${isResolved ? 'opacity-60' : ''}
      `}
      style={{
        backgroundColor: isFlashing ? flashColor : 'transparent',
      }}
      layout
    >
      {/* Ticket Number */}
      <td className="py-4 px-4">
        <span
          className="inline-block px-3 py-1.5 rounded-lg font-mono text-sm font-semibold"
          style={{
            background: 'rgba(99, 102, 241, 0.15)',
            border: '1px solid rgba(99, 102, 241, 0.25)',
            color: '#1E40AF',
          }}
        >
          {ticket.id}
        </span>
      </td>

      {/* Property */}
      <td className="py-4 px-4">
        <div
          className={`max-w-[180px] truncate text-sm tooltip ${isResolved ? 'row-resolved' : ''}`}
          data-tooltip={ticket.property}
        >
          {ticket.property}
        </div>
      </td>

      {/* Category */}
      <td className="py-4 px-4">
        <div className="flex items-center gap-3">
          {getCategoryIcon(ticket.category, 'sm')}
          <span className={`text-sm ${isResolved ? 'row-resolved' : ''}`}>
            {ticket.category}
          </span>
        </div>
      </td>

      {/* Description */}
      <td className="py-4 px-4">
        <div
          className={`max-w-[200px] truncate text-sm tooltip ${isResolved ? 'row-resolved' : ''}`}
          data-tooltip={ticket.description}
        >
          {ticket.description}
        </div>
      </td>

      {/* Urgency */}
      <td className="py-4 px-4">
        <UrgencyPill urgency={ticket.urgency} size="sm" showIcon />
      </td>

      {/* Date Submitted */}
      <td className="py-4 px-4">
        <span className={`text-sm text-dark-900/60 ${isResolved ? 'row-resolved' : ''}`}>
          {format(new Date(ticket.dateSubmitted), 'MMM d, yyyy')}
        </span>
      </td>

      {/* Photo */}
      <td className="py-4 px-4">
        {ticket.photoUrl ? (
          <button
            onClick={() => setShowPhotoModal(true)}
            className="p-2 rounded-lg hover:bg-blue-800/10 transition-colors"
            aria-label="View attached photo"
          >
            <ImageIcon size={18} className="text-blue-800" />
          </button>
        ) : (
          <span className="text-dark-900/30 text-xs">—</span>
        )}
      </td>

      {/* Status */}
      <td className="py-4 px-4 relative" style={{ overflow: 'visible' }}>
        <StatusDropdown
          value={ticket.status}
          onChange={handleStatusChange}
        />
      </td>

      {/* Hover border effect */}
      <td className="w-1 p-0">
        <div
          className="h-full w-1 bg-blue-800 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
        />
      </td>

      {/* Photo Modal */}
      <AnimatePresence>
        {showPhotoModal && ticket.photoUrl && (
          <motion.td
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[10000] flex items-center justify-center p-4"
            style={{
              backgroundColor: 'rgba(0, 0, 0, 0.9)',
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0
            }}
            onClick={() => setShowPhotoModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              className="relative max-w-4xl max-h-[90vh]"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setShowPhotoModal(false)}
                className="absolute -top-14 right-0 p-3 rounded-full bg-white/90 hover:bg-white transition-all duration-200 shadow-lg"
                style={{
                  border: '2px solid rgba(0, 0, 0, 0.1)',
                }}
                aria-label="Close photo"
              >
                <X size={24} className="text-gray-900" strokeWidth={2.5} />
              </button>
              <img
                src={ticket.photoUrl}
                alt={`Photo for ticket ${ticket.id}`}
                className="max-w-full max-h-[90vh] rounded-xl object-contain"
              />
            </motion.div>
          </motion.td>
        )}
      </AnimatePresence>
    </motion.tr>
  );
});

// Mobile card version
export const TicketCard = React.forwardRef(({ ticket, onStatusChange, index }, ref) => {
  const [isFlashing, setIsFlashing] = useState(false);
  const [flashColor, setFlashColor] = useState('');
  const [showPhotoModal, setShowPhotoModal] = useState(false);

  const statusColors = {
    Open: 'rgba(59, 130, 246, 0.15)',
    'In Progress': 'rgba(245, 158, 11, 0.15)',
    Resolved: 'rgba(34, 197, 94, 0.15)',
  };

  const handleStatusChange = (newStatus) => {
    setFlashColor(statusColors[newStatus]);
    setIsFlashing(true);
    onStatusChange(ticket.id, newStatus);

    setTimeout(() => {
      setIsFlashing(false);
    }, 500);
  };

  const isResolved = ticket.status === 'Resolved';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ delay: index * 0.05, duration: 0.3 }}
      className={`
        rounded-xl p-4 mb-3
        ${isResolved ? 'opacity-60' : ''}
      `}
      style={{
        background: isFlashing ? flashColor : 'rgba(255, 255, 255, 0.04)',
        border: '1px solid rgba(0, 0, 0, 0.08)',
      }}
      layout
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <span
          className="px-3 py-1.5 rounded-lg font-mono text-sm font-semibold"
          style={{
            background: 'rgba(99, 102, 241, 0.15)',
            border: '1px solid rgba(99, 102, 241, 0.25)',
            color: '#1E40AF',
          }}
        >
          {ticket.id}
        </span>
        <UrgencyPill urgency={ticket.urgency} size="sm" showIcon />
      </div>

      {/* Property */}
      <h3 className={`font-medium text-dark-900 mb-2 ${isResolved ? 'row-resolved' : ''}`}>
        {ticket.property}
      </h3>

      {/* Category */}
      <div className="flex items-center gap-2 mb-3">
        {getCategoryIcon(ticket.category, 'sm')}
        <span className={`text-sm text-dark-900/70 ${isResolved ? 'row-resolved' : ''}`}>
          {ticket.category}
        </span>
      </div>

      {/* Description */}
      <p className={`text-sm text-dark-900/70 mb-3 line-clamp-2 ${isResolved ? 'row-resolved' : ''}`}>
        {ticket.description}
      </p>

      {/* Photo Preview */}
      {ticket.photoUrl && (
        <div className="mb-3">
          <button
            onClick={() => setShowPhotoModal(true)}
            className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-blue-800 hover:bg-blue-800/10 transition-colors"
          >
            <ImageIcon size={16} />
            View attached photo
          </button>
        </div>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between pt-3 border-t border-black/10">
        <span className="text-xs text-dark-900/50">
          {format(new Date(ticket.dateSubmitted), 'MMM d, yyyy')}
        </span>
        <StatusDropdown
          value={ticket.status}
          onChange={handleStatusChange}
        />
      </div>

      {/* Photo Modal */}
      <AnimatePresence>
        {showPhotoModal && ticket.photoUrl && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[10000] flex items-center justify-center p-4"
            style={{
              backgroundColor: 'rgba(0, 0, 0, 0.9)',
            }}
            onClick={() => setShowPhotoModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              className="relative max-w-4xl max-h-[90vh]"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setShowPhotoModal(false)}
                className="absolute -top-14 right-0 p-3 rounded-full bg-white/90 hover:bg-white transition-all duration-200 shadow-lg"
                style={{
                  border: '2px solid rgba(0, 0, 0, 0.1)',
                }}
                aria-label="Close photo"
              >
                <X size={24} className="text-gray-900" strokeWidth={2.5} />
              </button>
              <img
                src={ticket.photoUrl}
                alt={`Photo for ticket ${ticket.id}`}
                className="max-w-full max-h-[90vh] rounded-xl object-contain"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
});

export default TicketRow;
