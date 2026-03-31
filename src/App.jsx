import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, LayoutDashboard } from 'lucide-react';
import SubmitForm from './components/SubmitForm';
import Dashboard from './components/Dashboard';
import { api } from './services/api';

// App Component
function App() {
  const [activeView, setActiveView] = useState('dashboard');
  const [tickets, setTickets] = useState([]);
  const [properties, setProperties] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingProperties, setIsLoadingProperties] = useState(true);
  const [error, setError] = useState(null);

  // Load tickets and properties from API on mount
  useEffect(() => {
    loadTickets();
    loadProperties();
  }, []);

  const loadTickets = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await api.getTickets();
      setTickets(data);
      setIsLoaded(true);
    } catch (err) {
      console.error('Failed to load tickets:', err);
      setError('Failed to load tickets. Please check if the server is running.');
    } finally {
      setIsLoading(false);
    }
  };

  const loadProperties = async () => {
    try {
      setIsLoadingProperties(true);
      const data = await api.getProperties();
      setProperties(data);
    } catch (err) {
      console.error('Failed to load properties:', err);
    } finally {
      setIsLoadingProperties(false);
    }
  };

  // Handle new ticket submission
  const handleSubmitTicket = async (formData) => {
    try {
      const newTicket = await api.createTicket(formData);
      setTickets((prev) => [newTicket, ...prev]);
      return newTicket.id;
    } catch (err) {
      console.error('Failed to create ticket:', err);
      throw new Error('Failed to submit ticket. Please try again.');
    }
  };

  // Handle status change
  const handleStatusChange = async (ticketId, newStatus) => {
    try {
      await api.updateTicketStatus(ticketId, newStatus);
      setTickets((prev) =>
        prev.map((ticket) =>
          ticket.id === ticketId ? { ...ticket, status: newStatus } : ticket
        )
      );
    } catch (err) {
      console.error('Failed to update status:', err);
      // Optionally show error to user
    }
  };

  // Handle add property
  const handleAddProperty = async (name) => {
    try {
      const newProperty = await api.createProperty(name);
      setProperties((prev) => [...prev, newProperty]);
      return newProperty;
    } catch (err) {
      console.error('Failed to create property:', err);
      throw new Error(err.message || 'Failed to create property');
    }
  };

  // Handle delete property
  const handleDeleteProperty = async (id) => {
    try {
      await api.deleteProperty(id);
      setProperties((prev) => prev.filter((p) => p.id !== id));
      // Also reload tickets in case any were deleted with the property
      await loadTickets();
    } catch (err) {
      console.error('Failed to delete property:', err);
      throw new Error(err.message || 'Failed to delete property. It may have associated tickets.');
    }
  };

  // Navigation handler
  const navigateToView = (view) => {
    setActiveView(view);
  };

  return (
    <div className="min-h-screen bg-light-200">
      {/* Ambient Background Glow */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute -top-40 -left-40 w-96 h-96 rounded-full opacity-10 blur-3xl"
          style={{
            background: 'radial-gradient(circle, rgba(30,64,175,0.3) 0%, transparent 70%)',
          }}
        />
        <div
          className="absolute -bottom-40 -right-40 w-96 h-96 rounded-full opacity-08 blur-3xl"
          style={{
            background: 'radial-gradient(circle, rgba(37,99,235,0.3) 0%, transparent 70%)',
          }}
        />
      </div>

      {/* Navigation */}
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="sticky top-0 z-40 w-full"
        style={{
          background: 'rgba(255, 255, 255, 0.85)',
          borderBottom: '1px solid rgba(0, 0, 0, 0.08)',
          backdropFilter: 'blur(20px)',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <img
                src="https://i.postimg.cc/mkgbHLbX/Deluxe-Holiday-Homes-New-Logo612x300.png"
                alt="Deluxe Holiday Homes"
                className="h-12 w-auto object-contain"
              />
              <div className="hidden sm:block">
                <p className="text-sm text-dark-900/70 font-medium">
                  Maintenance Portal
                </p>
              </div>
            </div>

            {/* Navigation Pills */}
            <div className="flex items-center gap-2">
              <div
                className="flex p-1 rounded-xl"
                style={{
                  background: 'rgba(0, 0, 0, 0.04)',
                  border: '1px solid rgba(0, 0, 0, 0.08)',
                }}
              >
                <button
                  onClick={() => navigateToView('dashboard')}
                  className={`
                    flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg text-sm font-medium
                    transition-all duration-200
                    ${activeView === 'dashboard'
                      ? 'bg-blue-800/15 text-blue-800'
                      : 'text-dark-900/60 hover:text-dark-900 hover:bg-black/5'
                    }
                  `}
                >
                  <LayoutDashboard size={18} className="sm:w-4 sm:h-4" />
                  <span className="hidden sm:inline">Dashboard</span>
                </button>
                <button
                  onClick={() => navigateToView('submit')}
                  className={`
                    flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg text-sm font-medium
                    transition-all duration-200
                    ${activeView === 'submit'
                      ? 'bg-blue-800/15 text-blue-800'
                      : 'text-dark-900/60 hover:text-dark-900 hover:bg-black/5'
                    }
                  `}
                >
                  <Plus size={18} className="sm:w-4 sm:h-4" />
                  <span className="hidden sm:inline">Submit</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
        {/* Error Message */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-600"
          >
            <p className="text-sm font-medium">{error}</p>
            <button
              onClick={loadTickets}
              className="mt-2 text-xs underline"
            >
              Try again
            </button>
          </motion.div>
        )}

        {/* Loading State */}
        {isLoading && !isLoaded ? (
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <div
                className="w-12 h-12 border-4 border-blue-800/20 border-t-blue-800 rounded-full animate-spin mx-auto mb-4"
              />
              <p className="text-dark-900/50 text-sm">Loading tickets...</p>
            </div>
          </div>
        ) : (
          <AnimatePresence mode="wait">
            {activeView === 'dashboard' ? (
              <motion.div
                key="dashboard"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <Dashboard
                  tickets={tickets}
                  onStatusChange={handleStatusChange}
                  onNavigateToSubmit={() => navigateToView('submit')}
                  properties={properties}
                  onAddProperty={handleAddProperty}
                  onDeleteProperty={handleDeleteProperty}
                  isLoadingProperties={isLoadingProperties}
                />
              </motion.div>
            ) : (
              <motion.div
                key="submit"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <SubmitForm
                  onSubmit={handleSubmitTicket}
                  onSuccess={() => navigateToView('dashboard')}
                  properties={properties}
                />
              </motion.div>
            )}
          </AnimatePresence>
        )}
      </main>

      {/* Footer */}
      <footer className="mt-auto py-4 sm:py-6 text-center">
        <p className="text-dark-900/30 text-xs sm:text-sm">
          Deluxe Holiday Homes • Maintenance Portal
        </p>
      </footer>
    </div>
  );
}

export default App;
