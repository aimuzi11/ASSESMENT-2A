import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Filter, X, ClipboardCheck, ChevronDown } from 'lucide-react';
import TicketRow, { TicketCard } from './TicketRow';
import MuiButton from './MuiButton';
import PropertyManager from './PropertyManager';

const URGENCY_LEVELS = ['Low', 'Medium', 'High'];
const STATUS_OPTIONS = ['Open', 'In Progress', 'Resolved'];

// Stat Card Component
const StatCard = ({ label, value, accentColor, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.4 }}
    className="relative overflow-hidden rounded-xl p-5"
    style={{
      background: 'rgba(255, 255, 255, 0.8)',
      border: '1px solid rgba(0, 0, 0, 0.08)',
      backdropFilter: 'blur(20px)',
    }}
  >
    {/* Left accent border */}
    <div
      className="absolute left-0 top-0 bottom-0 w-1 rounded-l-xl"
      style={{ backgroundColor: accentColor }}
    />

    <div className="pl-3">
      <div className="font-sora text-3xl font-semibold text-dark-900 mb-1">
        {value}
      </div>
      <div className="text-sm text-dark-900/50">
        {label}
      </div>
    </div>
  </motion.div>
);

// Filter Pill Button
const FilterPill = ({ label, isActive, onClick, color }) => (
  <motion.button
    onClick={onClick}
    className={`
      px-4 py-2 rounded-lg text-sm font-medium
      transition-all duration-200
    `}
    style={{
      backgroundColor: isActive ? `${color}25` : 'rgba(0, 0, 0, 0.04)',
      color: isActive ? color : 'rgba(0, 0, 0, 0.5)',
      border: `1px solid ${isActive ? `${color}50` : 'rgba(0, 0, 0, 0.08)'}`,
    }}
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
    aria-pressed={isActive}
  >
    {label}
  </motion.button>
);

// Empty State Component
const EmptyState = ({ onSubmitClick }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    className="flex flex-col items-center justify-center py-20"
  >
    {/* Clipboard with checkmark illustration */}
    <svg
      width="120"
      height="120"
      viewBox="0 0 120 120"
      fill="none"
      className="mb-6 opacity-50"
    >
      {/* Clipboard body */}
      <rect
        x="25"
        y="20"
        width="70"
        height="85"
        rx="8"
        fill="rgba(99, 102, 241, 0.1)"
        stroke="rgba(30, 64, 175, 0.3)"
        strokeWidth="2"
      />
      {/* Clipboard clip */}
      <rect
        x="40"
        y="12"
        width="40"
        height="16"
        rx="4"
        fill="rgba(30, 64, 175, 0.15)"
        stroke="rgba(99, 102, 241, 0.4)"
        strokeWidth="2"
      />
      {/* Checkmark circle */}
      <circle
        cx="60"
        cy="62"
        r="22"
        fill="rgba(34, 197, 94, 0.15)"
        stroke="rgba(34, 197, 94, 0.5)"
        strokeWidth="2"
      />
      {/* Checkmark */}
      <path
        d="M50 62L56 68L70 54"
        stroke="rgba(34, 197, 94, 0.8)"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>

    <h3 className="font-sora text-xl font-semibold text-dark-900 mb-2">
      No issues found
    </h3>
    <p className="text-dark-900/50 text-sm mb-6">
      Submit your first maintenance request to get started
    </p>

    <motion.button
      onClick={onSubmitClick}
      className="px-6 py-3 rounded-xl font-semibold text-white"
      style={{
        background: '#1E40AF',
        boxShadow: '0 4px 20px rgba(30, 64, 175, 0.4)',
      }}
      whileHover={{ scale: 1.02, boxShadow: '0 6px 30px rgba(30, 64, 175, 0.5)' }}
      whileTap={{ scale: 0.98 }}
    >
      Submit an Issue
    </motion.button>
  </motion.div>
);

const Dashboard = ({
  tickets,
  onStatusChange,
  onNavigateToSubmit,
  properties = [],
  onAddProperty,
  onDeleteProperty,
  isLoadingProperties
}) => {
  const [propertyFilter, setPropertyFilter] = useState('');
  const [urgencyFilters, setUrgencyFilters] = useState([]);
  const [statusFilters, setStatusFilters] = useState([]);
  const [propertyDropdownOpen, setPropertyDropdownOpen] = useState(false);

  // Calculate metrics
  const metrics = useMemo(() => ({
    total: tickets.length,
    open: tickets.filter((t) => t.status === 'Open').length,
    inProgress: tickets.filter((t) => t.status === 'In Progress').length,
    resolved: tickets.filter((t) => t.status === 'Resolved').length,
  }), [tickets]);

  // Filter tickets
  const filteredTickets = useMemo(() => {
    return tickets.filter((ticket) => {
      if (propertyFilter && ticket.property !== propertyFilter) return false;
      if (urgencyFilters.length > 0 && !urgencyFilters.includes(ticket.urgency)) return false;
      if (statusFilters.length > 0 && !statusFilters.includes(ticket.status)) return false;
      return true;
    });
  }, [tickets, propertyFilter, urgencyFilters, statusFilters]);

  const toggleUrgencyFilter = (urgency) => {
    setUrgencyFilters((prev) =>
      prev.includes(urgency)
        ? prev.filter((u) => u !== urgency)
        : [...prev, urgency]
    );
  };

  const toggleStatusFilter = (status) => {
    setStatusFilters((prev) =>
      prev.includes(status)
        ? prev.filter((s) => s !== status)
        : [...prev, status]
    );
  };

  const hasActiveFilters = propertyFilter || urgencyFilters.length > 0 || statusFilters.length > 0;

  const clearAllFilters = () => {
    setPropertyFilter('');
    setUrgencyFilters([]);
    setStatusFilters([]);
  };

  const urgencyColors = {
    Low: '#22C55E',
    Medium: '#F59E0B',
    High: '#EF4444',
  };

  const statusColors = {
    Open: '#3B82F6',
    'In Progress': '#F59E0B',
    Resolved: '#22C55E',
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="w-full"
    >
      {/* Metrics Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard
          label="Total Issues"
          value={metrics.total}
          accentColor="#1E40AF"
          delay={0}
        />
        <StatCard
          label="Open"
          value={metrics.open}
          accentColor="#3B82F6"
          delay={0.08}
        />
        <StatCard
          label="In Progress"
          value={metrics.inProgress}
          accentColor="#F59E0B"
          delay={0.16}
        />
        <StatCard
          label="Resolved"
          value={metrics.resolved}
          accentColor="#22C55E"
          delay={0.24}
        />
      </div>

      {/* Property Manager */}
      <PropertyManager
        properties={properties}
        onAddProperty={onAddProperty}
        onDeleteProperty={onDeleteProperty}
        isLoading={isLoadingProperties}
      />

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="rounded-xl p-5 mb-6"
        style={{
          background: 'rgba(255, 255, 255, 0.8)',
          border: '1px solid rgba(0, 0, 0, 0.08)',
          backdropFilter: 'blur(20px)',
        }}
      >
        <div className="flex flex-col lg:flex-row lg:items-center gap-4">
          {/* Property Filter */}
          <div className="relative flex-shrink-0">
            <button
              onClick={() => setPropertyDropdownOpen(!propertyDropdownOpen)}
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm"
              style={{
                background: propertyFilter ? 'rgba(30, 64, 175, 0.15)' : 'rgba(0, 0, 0, 0.04)',
                border: `1px solid ${propertyFilter ? 'rgba(30, 64, 175, 0.3)' : 'rgba(0, 0, 0, 0.08)'}`,
                color: propertyFilter ? '#1E40AF' : 'rgba(0, 0, 0, 0.6)',
              }}
            >
              <Filter size={16} />
              <span className="max-w-[180px] truncate">
                {propertyFilter || 'All Properties'}
              </span>
              <ChevronDown
                size={14}
                className={`transition-transform ${propertyDropdownOpen ? 'rotate-180' : ''}`}
              />
            </button>

            <AnimatePresence>
              {propertyDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  className="absolute mt-2 w-64 py-2 rounded-xl"
                  style={{
                    background: 'rgba(255, 255, 255, 0.98)',
                    border: '1px solid rgba(0, 0, 0, 0.1)',
                    backdropFilter: 'blur(20px)',
                    boxShadow: '0 10px 40px rgba(0, 0, 0, 0.5)',
                    zIndex: 9999,
                  }}
                >
                  <button
                    onClick={() => {
                      setPropertyFilter('');
                      setPropertyDropdownOpen(false);
                    }}
                    className={`
                      w-full px-4 py-2 text-left text-sm hover:bg-black/5
                      ${!propertyFilter ? 'text-blue-800' : 'text-dark-900/70'}
                    `}
                  >
                    All Properties
                  </button>
                  {properties.map((prop) => (
                    <button
                      key={prop.id}
                      onClick={() => {
                        setPropertyFilter(prop.name);
                        setPropertyDropdownOpen(false);
                      }}
                      className={`
                        w-full px-4 py-2 text-left text-sm hover:bg-black/5 truncate
                        ${propertyFilter === prop.name ? 'text-blue-800' : 'text-dark-900/70'}
                      `}
                    >
                      {prop.name}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Urgency Filters */}
          <div className="flex items-center gap-2">
            <span className="text-sm text-dark-900/40 mr-1">Urgency:</span>
            {URGENCY_LEVELS.map((level) => (
              <FilterPill
                key={level}
                label={level}
                isActive={urgencyFilters.includes(level)}
                onClick={() => toggleUrgencyFilter(level)}
                color={urgencyColors[level]}
              />
            ))}
          </div>

          {/* Status Filters */}
          <div className="flex items-center gap-2">
            <span className="text-sm text-dark-900/40 mr-1">Status:</span>
            {STATUS_OPTIONS.map((status) => (
              <FilterPill
                key={status}
                label={status}
                isActive={statusFilters.includes(status)}
                onClick={() => toggleStatusFilter(status)}
                color={statusColors[status]}
              />
            ))}
          </div>

          {/* Issue Count & Clear */}
          <div className="flex items-center gap-4 lg:ml-auto">
            <span className="text-sm text-dark-900/40">
              Showing {filteredTickets.length} of {tickets.length} issues
            </span>
            {hasActiveFilters && (
              <motion.button
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                onClick={clearAllFilters}
                className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm text-red-400 hover:bg-red-500/10 transition-colors"
              >
                <X size={14} />
                Clear filters
              </motion.button>
            )}
          </div>
        </div>
      </motion.div>

      {/* Issues Table / Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="rounded-xl"
        style={{
          background: 'rgba(255, 255, 255, 0.8)',
          border: '1px solid rgba(0, 0, 0, 0.08)',
          backdropFilter: 'blur(20px)',
          overflow: 'visible',
        }}
      >
        {filteredTickets.length === 0 ? (
          <EmptyState onSubmitClick={onNavigateToSubmit} />
        ) : (
          <>
            {/* Desktop Table */}
            <div className="hidden md:block rounded-xl" style={{ overflow: 'visible' }}>
              <table className="w-full" style={{ overflow: 'visible' }}>
                <thead>
                  <tr className="border-b border-black/10">
                    <th className="py-4 px-4 text-left text-sm font-medium text-dark-900/50">
                      Ticket #
                    </th>
                    <th className="py-4 px-4 text-left text-sm font-medium text-dark-900/50">
                      Property
                    </th>
                    <th className="py-4 px-4 text-left text-sm font-medium text-dark-900/50">
                      Category
                    </th>
                    <th className="py-4 px-4 text-left text-sm font-medium text-dark-900/50">
                      Urgency
                    </th>
                    <th className="py-4 px-4 text-left text-sm font-medium text-dark-900/50">
                      Date
                    </th>
                    <th className="py-4 px-4 text-left text-sm font-medium text-dark-900/50">
                      Photo
                    </th>
                    <th className="py-4 px-4 text-left text-sm font-medium text-dark-900/50">
                      Status
                    </th>
                    <th className="w-1"></th>
                  </tr>
                </thead>
                <tbody style={{ overflow: 'visible' }}>
                  <AnimatePresence mode="popLayout">
                    {filteredTickets.map((ticket, index) => (
                      <TicketRow
                        key={ticket.id}
                        ticket={ticket}
                        onStatusChange={onStatusChange}
                        index={index}
                      />
                    ))}
                  </AnimatePresence>
                </tbody>
              </table>
            </div>

            {/* Mobile Cards */}
            <div className="md:hidden p-4">
              <AnimatePresence mode="popLayout">
                {filteredTickets.map((ticket, index) => (
                  <TicketCard
                    key={ticket.id}
                    ticket={ticket}
                    onStatusChange={onStatusChange}
                    index={index}
                  />
                ))}
              </AnimatePresence>
            </div>
          </>
        )}
      </motion.div>
    </motion.div>
  );
};

export default Dashboard;
