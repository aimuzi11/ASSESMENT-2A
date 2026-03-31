// API base URL
const API_BASE = '/api';

// Helper function for API calls
const fetchAPI = async (endpoint, options = {}) => {
  try {
    const response = await fetch(`${API_BASE}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'API request failed');
    }

    return await response.json();
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

// API service
export const api = {
  // Get all properties
  getProperties: async () => {
    return fetchAPI('/properties');
  },

  // Create new property
  createProperty: async (name) => {
    return fetchAPI('/properties', {
      method: 'POST',
      body: JSON.stringify({ name }),
    });
  },

  // Delete property
  deleteProperty: async (id) => {
    return fetchAPI(`/properties/${id}`, {
      method: 'DELETE',
    });
  },

  // Get all tickets
  getTickets: async () => {
    const tickets = await fetchAPI('/tickets');
    // Transform date_submitted to dateSubmitted for consistency
    return tickets.map(ticket => ({
      ...ticket,
      id: ticket.ticket_number,
      dateSubmitted: ticket.date_submitted,
      photoUrl: ticket.photo_url
    }));
  },

  // Get single ticket
  getTicket: async (ticketNumber) => {
    const ticket = await fetchAPI(`/tickets/${ticketNumber}`);
    return {
      ...ticket,
      id: ticket.ticket_number,
      dateSubmitted: ticket.date_submitted,
      photoUrl: ticket.photo_url
    };
  },

  // Create new ticket
  createTicket: async (ticketData) => {
    const ticket = await fetchAPI('/tickets', {
      method: 'POST',
      body: JSON.stringify(ticketData),
    });
    return {
      ...ticket,
      id: ticket.ticket_number,
      dateSubmitted: ticket.date_submitted,
      photoUrl: ticket.photo_url
    };
  },

  // Update ticket status
  updateTicketStatus: async (ticketNumber, status) => {
    const ticket = await fetchAPI(`/tickets/${ticketNumber}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status }),
    });
    return {
      ...ticket,
      id: ticket.ticket_number,
      dateSubmitted: ticket.date_submitted,
      photoUrl: ticket.photo_url
    };
  },

  // Delete ticket
  deleteTicket: async (ticketNumber) => {
    return fetchAPI(`/tickets/${ticketNumber}`, {
      method: 'DELETE',
    });
  },

  // Get statistics
  getStats: async () => {
    return fetchAPI('/stats');
  },
};

export default api;
