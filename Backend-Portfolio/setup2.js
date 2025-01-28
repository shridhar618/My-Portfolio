const sqlite3 = require('sqlite3').verbose();

// Connect to SQLite Database (it will create the file if it doesn't exist)
const db = new sqlite3.Database('./database/contact.db', (err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('Connected to the SQLite database.');
});



// Create 'contact' table for storing contact form submissions
db.run(`
    CREATE TABLE IF NOT EXISTS contact (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        full_name TEXT NOT NULL,
        email TEXT NOT NULL,
        mobile_number TEXT NOT NULL,
        subject TEXT NOT NULL,
        message TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
`, (err) => {
    if (err) {
        console.error(err.message);
    } else {
        console.log('Users table created.');
    }
    db.close();
});
