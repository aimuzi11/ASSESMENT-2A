import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, LayoutDashboard, Wrench } from 'lucide-react';
import SubmitForm from './components/SubmitForm';
import Dashboard from './components/Dashboard';

// Seed data for first-time users
const generateSeedData = () => {
  const now = new Date();

  return [
    {
      id: 'MNT-0001',
      property: 'Marina Towers — Unit 4B',
      category: 'Plumbing',
      urgency: 'High',
      description: 'Water leak under the kitchen sink causing damage to the cabinet. Need urgent repair before it spreads to the floor.',
      photoUrl: null,
      dateSubmitted: new Date(now - 2 * 24 * 60 * 60 * 1000).toISOString(),
      status: 'In Progress',
    },
    {
      id: 'MNT-0002',
      property: 'Palm Residences — Villa 12',
      category: 'AC/HVAC',
      urgency: 'Medium',
      description: 'AC unit in the master bedroom making unusual clicking sounds and not cooling properly during afternoon hours.',
      photoUrl: null,
      dateSubmitted: new Date(now - 5 * 24 * 60 * 60 * 1000).toISOString(),
      status: 'Open',
    },
    {
      id: 'MNT-0003',
      property: 'Downtown Loft — Suite 7',
      category: 'Electrical',
      urgency: 'High',
      description: 'Multiple power outlets in the living room stopped working. Circuit breaker keeps tripping when resetting.',
      photoUrl: null,
      dateSubmitted: new Date(now - 1 * 24 * 60 * 60 * 1000).toISOString(),
      status: 'Open',
    },
    {
      id: 'MNT-0004',
      property: 'JBR Waterfront — Apt 22A',
      category: 'Cleaning',
      urgency: 'Low',
      description: 'Request for deep cleaning service before new tenant move-in scheduled for next week.',
      photoUrl: null,
      dateSubmitted: new Date(now - 12 * 24 * 60 * 60 * 1000).toISOString(),
      status: 'Resolved',
    },
    {
      id: 'MNT-0005',
      property: 'Business Bay Studio — 301',
      category: 'Furniture',
      urgency: 'Medium',
      description: 'Office chair hydraulic lift is broken - the seat keeps sinking. Replacement or repair needed.',
      photoUrl: null,
      dateSubmitted: new Date(now - 8 * 24 * 60 * 60 * 1000).toISOString(),
      status: 'In Progress',
    },
  ];
};

// LocalStorage keys
const STORAGE_KEYS = {
  TICKETS: 'pmt_tickets',
  TICKET_COUNTER: 'pmt_ticket_counter',
};

// App Component
function App() {
  const [activeView, setActiveView] = useState('dashboard');
  const [tickets, setTickets] = useState([]);
  const [ticketCounter, setTicketCounter] = useState(6);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load data from localStorage on mount
  useEffect(() => {
    try {
      const storedTickets = localStorage.getItem(STORAGE_KEYS.TICKETS);
      const storedCounter = localStorage.getItem(STORAGE_KEYS.TICKET_COUNTER);

      if (storedTickets) {
        setTickets(JSON.parse(storedTickets));
        setTicketCounter(storedCounter ? parseInt(storedCounter, 10) : 6);
      } else {
        // First time - seed with demo data
        const seedData = generateSeedData();
        setTickets(seedData);
        localStorage.setItem(STORAGE_KEYS.TICKETS, JSON.stringify(seedData));
        localStorage.setItem(STORAGE_KEYS.TICKET_COUNTER, '6');
      }
    } catch (error) {
      console.error('Error loading from localStorage:', error);
      setTickets(generateSeedData());
    }

    setIsLoaded(true);
  }, []);

  // Save to localStorage whenever tickets change
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem(STORAGE_KEYS.TICKETS, JSON.stringify(tickets));
    }
  }, [tickets, isLoaded]);

  // Handle new ticket submission
  const handleSubmitTicket = (formData) => {
    const ticketId = `MNT-${String(ticketCounter).padStart(4, '0')}`;

    const newTicket = {
      id: ticketId,
      property: formData.property,
      category: formData.category,
      urgency: formData.urgency,
      description: formData.description,
      photoUrl: formData.photoUrl,
      dateSubmitted: new Date().toISOString(),
      status: 'Open',
    };

    setTickets((prev) => [newTicket, ...prev]);
    setTicketCounter((prev) => {
      const newCounter = prev + 1;
      localStorage.setItem(STORAGE_KEYS.TICKET_COUNTER, String(newCounter));
      return newCounter;
    });

    return ticketId;
  };

  // Handle status change
  const handleStatusChange = (ticketId, newStatus) => {
    setTickets((prev) =>
      prev.map((ticket) =>
        ticket.id === ticketId ? { ...ticket, status: newStatus } : ticket
      )
    );
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
            background: 'radial-gradient(circle, rgba(99,102,241,0.3) 0%, transparent 70%)',
          }}
        />
        <div
          className="absolute -bottom-40 -right-40 w-96 h-96 rounded-full opacity-08 blur-3xl"
          style={{
            background: 'radial-gradient(circle, rgba(34,211,238,0.3) 0%, transparent 70%)',
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
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{
                  background: 'linear-gradient(135deg, rgba(30,64,175,0.12) 0%, rgba(37,99,235,0.12) 100%)',
                  border: '1px solid rgba(30,64,175,0.3)',
                }}
              >
                <Wrench size={20} className="text-blue-800" />
              </div>
              <div>
                <h1 className="font-sora font-semibold text-dark-900 text-lg">
                  PropertyMaint
                </h1>
                <p className="text-xs text-dark-900/40 -mt-0.5 hidden sm:block">
                  Maintenance Tracker
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
                    flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium
                    transition-all duration-200
                    ${activeView === 'dashboard'
                      ? 'bg-blue-800/15 text-blue-800'
                      : 'text-dark-900/60 hover:text-dark-900 hover:bg-black/5'
                    }
                  `}
                >
                  <LayoutDashboard size={16} />
                  <span className="hidden sm:inline">Dashboard</span>
                </button>
                <button
                  onClick={() => navigateToView('submit')}
                  className={`
                    flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium
                    transition-all duration-200
                    ${activeView === 'submit'
                      ? 'bg-blue-800/15 text-blue-800'
                      : 'text-dark-900/60 hover:text-dark-900 hover:bg-black/5'
                    }
                  `}
                >
                  <Plus size={16} />
                  <span className="hidden sm:inline">Submit Issue</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="mt-auto py-6 text-center">
        <p className="text-dark-900/30 text-sm">
          Property Maintenance Tracker • Built with React + Tailwind
        </p>
      </footer>
    </div>
  );
}

export default App;
