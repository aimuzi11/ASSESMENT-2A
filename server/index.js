const express = require('express');
const cors = require('cors');
const pool = require('./db');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

const app = express();
const PORT = process.env.PORT || 3001;
const isProduction = process.env.NODE_ENV === 'production';

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' })); // For base64 image uploads

// Serve static files in production
if (isProduction) {
  app.use(express.static(path.join(__dirname, '..', 'dist')));
}

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Server is running' });
});

// Get all properties
app.get('/api/properties', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM properties ORDER BY name');
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching properties:', error);
    res.status(500).json({ error: 'Failed to fetch properties' });
  }
});

// Create new property
app.post('/api/properties', async (req, res) => {
  try {
    const { name } = req.body;

    if (!name || !name.trim()) {
      return res.status(400).json({ error: 'Property name is required' });
    }

    const result = await pool.query(
      'INSERT INTO properties (name) VALUES ($1) RETURNING *',
      [name.trim()]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    if (error.code === '23505') {
      return res.status(400).json({ error: 'Property already exists' });
    }
    console.error('Error creating property:', error);
    res.status(500).json({ error: 'Failed to create property' });
  }
});

// Delete property
app.delete('/api/properties/:id', async (req, res) => {
  try {
    const { id } = req.params;

    // Check if property has associated tickets
    const ticketsCheck = await pool.query(
      'SELECT COUNT(*) FROM tickets WHERE property_id = $1',
      [id]
    );

    const ticketCount = parseInt(ticketsCheck.rows[0].count);

    const result = await pool.query(
      'DELETE FROM properties WHERE id = $1 RETURNING name',
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Property not found' });
    }

    res.json({
      message: 'Property deleted successfully',
      name: result.rows[0].name,
      ticketsDeleted: ticketCount
    });
  } catch (error) {
    console.error('Error deleting property:', error);
    if (error.code === '23503') {
      return res.status(400).json({
        error: 'Cannot delete property with existing tickets. Please delete or reassign tickets first.'
      });
    }
    res.status(500).json({ error: 'Failed to delete property' });
  }
});

// Get all tickets
app.get('/api/tickets', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT
        t.id,
        t.ticket_number,
        p.name as property,
        t.category,
        t.urgency,
        t.description,
        t.photo_url,
        t.status,
        t.created_at as date_submitted
      FROM tickets t
      JOIN properties p ON t.property_id = p.id
      ORDER BY t.created_at DESC
    `);
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching tickets:', error);
    res.status(500).json({ error: 'Failed to fetch tickets' });
  }
});

// Get single ticket by ticket number
app.get('/api/tickets/:ticketNumber', async (req, res) => {
  try {
    const { ticketNumber } = req.params;
    const result = await pool.query(`
      SELECT
        t.id,
        t.ticket_number,
        p.name as property,
        t.category,
        t.urgency,
        t.description,
        t.photo_url,
        t.status,
        t.created_at as date_submitted
      FROM tickets t
      JOIN properties p ON t.property_id = p.id
      WHERE t.ticket_number = $1
    `, [ticketNumber]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Ticket not found' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error fetching ticket:', error);
    res.status(500).json({ error: 'Failed to fetch ticket' });
  }
});

// Create new ticket
app.post('/api/tickets', async (req, res) => {
  try {
    const { property, category, urgency, description, photoUrl } = req.body;

    // Validate required fields
    if (!property || !category || !urgency || !description) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Get property ID
    const propertyResult = await pool.query(
      'SELECT id FROM properties WHERE name = $1',
      [property]
    );

    if (propertyResult.rows.length === 0) {
      return res.status(400).json({ error: 'Invalid property' });
    }

    const propertyId = propertyResult.rows[0].id;

    // Get next ticket number
    const countResult = await pool.query('SELECT COUNT(*) FROM tickets');
    const ticketCount = parseInt(countResult.rows[0].count) + 1;
    const ticketNumber = `MNT-${String(ticketCount).padStart(4, '0')}`;

    // Insert ticket
    const result = await pool.query(`
      INSERT INTO tickets (ticket_number, property_id, category, urgency, description, photo_url)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING
        id,
        ticket_number,
        category,
        urgency,
        description,
        photo_url,
        status,
        created_at as date_submitted
    `, [ticketNumber, propertyId, category, urgency, description, photoUrl || null]);

    const ticket = result.rows[0];
    ticket.property = property;

    res.status(201).json(ticket);
  } catch (error) {
    console.error('Error creating ticket:', error);
    res.status(500).json({ error: 'Failed to create ticket' });
  }
});

// Update ticket status
app.patch('/api/tickets/:ticketNumber/status', async (req, res) => {
  try {
    const { ticketNumber } = req.params;
    const { status } = req.body;

    if (!status || !['Open', 'In Progress', 'Resolved'].includes(status)) {
      return res.status(400).json({ error: 'Invalid status' });
    }

    const result = await pool.query(`
      UPDATE tickets
      SET status = $1
      WHERE ticket_number = $2
      RETURNING
        id,
        ticket_number,
        category,
        urgency,
        description,
        photo_url,
        status,
        created_at as date_submitted
    `, [status, ticketNumber]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Ticket not found' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error updating ticket status:', error);
    res.status(500).json({ error: 'Failed to update ticket status' });
  }
});

// Delete ticket (admin only - you can add auth later)
app.delete('/api/tickets/:ticketNumber', async (req, res) => {
  try {
    const { ticketNumber } = req.params;

    const result = await pool.query(
      'DELETE FROM tickets WHERE ticket_number = $1 RETURNING ticket_number',
      [ticketNumber]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Ticket not found' });
    }

    res.json({ message: 'Ticket deleted successfully', ticketNumber });
  } catch (error) {
    console.error('Error deleting ticket:', error);
    res.status(500).json({ error: 'Failed to delete ticket' });
  }
});

// Get ticket statistics
app.get('/api/stats', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT
        COUNT(*) as total,
        COUNT(*) FILTER (WHERE status = 'Open') as open,
        COUNT(*) FILTER (WHERE status = 'In Progress') as in_progress,
        COUNT(*) FILTER (WHERE status = 'Resolved') as resolved
      FROM tickets
    `);

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error fetching stats:', error);
    res.status(500).json({ error: 'Failed to fetch statistics' });
  }
});

// Serve frontend app in production (must be after API routes)
if (isProduction) {
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'dist', 'index.html'));
  });
}

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📊 API endpoints available at http://localhost:${PORT}/api`);
});

module.exports = app;
