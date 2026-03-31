const pool = require('./db');

const createTables = async () => {
  try {
    console.log('🔧 Creating database tables...');

    // Drop existing tables if they exist
    await pool.query(`DROP TABLE IF EXISTS tickets CASCADE;`);
    await pool.query(`DROP TABLE IF EXISTS properties CASCADE;`);

    // Create properties table
    await pool.query(`
      CREATE TABLE properties (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL UNIQUE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Insert default properties
    await pool.query(`
      INSERT INTO properties (name) VALUES
        ('Marina Towers — Unit 4B'),
        ('Palm Residences — Villa 12'),
        ('Downtown Loft — Suite 7'),
        ('JBR Waterfront — Apt 22A'),
        ('Business Bay Studio — 301');
    `);

    // Create tickets table
    await pool.query(`
      CREATE TABLE tickets (
        id SERIAL PRIMARY KEY,
        ticket_number VARCHAR(20) UNIQUE NOT NULL,
        property_id INTEGER REFERENCES properties(id) ON DELETE CASCADE,
        category VARCHAR(50) NOT NULL,
        urgency VARCHAR(20) NOT NULL CHECK (urgency IN ('Low', 'Medium', 'High')),
        description TEXT NOT NULL,
        photo_url TEXT,
        status VARCHAR(20) NOT NULL DEFAULT 'Open' CHECK (status IN ('Open', 'In Progress', 'Resolved')),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Create index on ticket_number for faster lookups
    await pool.query(`
      CREATE INDEX idx_ticket_number ON tickets(ticket_number);
    `);

    // Create index on status for faster filtering
    await pool.query(`
      CREATE INDEX idx_status ON tickets(status);
    `);

    // Create function to update updated_at timestamp
    await pool.query(`
      CREATE OR REPLACE FUNCTION update_updated_at_column()
      RETURNS TRIGGER AS $$
      BEGIN
        NEW.updated_at = CURRENT_TIMESTAMP;
        RETURN NEW;
      END;
      $$ language 'plpgsql';
    `);

    // Create trigger to automatically update updated_at
    await pool.query(`
      CREATE TRIGGER update_tickets_updated_at
        BEFORE UPDATE ON tickets
        FOR EACH ROW
        EXECUTE FUNCTION update_updated_at_column();
    `);

    console.log('✅ Database tables created successfully!');
    console.log('✅ Properties inserted');
    console.log('📊 Ready to accept ticket submissions');

  } catch (error) {
    console.error('❌ Error creating tables:', error);
    throw error;
  } finally {
    await pool.end();
  }
};

// Run if executed directly
if (require.main === module) {
  createTables()
    .then(() => {
      console.log('🎉 Database initialization complete!');
      process.exit(0);
    })
    .catch((err) => {
      console.error('Failed to initialize database:', err);
      process.exit(1);
    });
}

module.exports = createTables;
