const express = require('express');
const session = require('express-session');
const bcrypt = require('bcryptjs');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const app = express();
const PORT = 3000;

// Connect to SQLite Database
const db = new sqlite3.Database('./database/users.db', (err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('Connected to the SQLite database.');
});


// Connect to SQLite Database
const database = new sqlite3.Database('./database/contact.db', (err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('Connected to the SQLite database.');
});

// Middleware
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
    session({
        secret: 'shridhar-secret',
        resave: false,
        saveUninitialized: true,
    })
);

// Default Route: Redirect to Signup Page
app.get('/', (req, res) => {
    res.redirect('/signup');
});

// Signup Page
app.get('/signup', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/signup.html'));
});

app.post('/signup', async (req, res) => {
    const { username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    db.run(
        `INSERT INTO users (username, email, password) VALUES (?, ?, ?)`,
        [username, email, hashedPassword],
        (err) => {
            if (err) {
                console.error(err.message);
                res.status(500).send('Error creating user.');
            } else {
                res.redirect('/login');
            }
        }
    );
});

// Login Page
app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/login.html'));
});

app.post('/login', (req, res) => {
    const { email, password } = req.body;

    db.get(
        `SELECT * FROM users WHERE email = ?`,
        [email],
        async (err, user) => {
            if (err) {
                console.error(err.message);
                res.status(500).send('Error logging in.');
            } else if (user && (await bcrypt.compare(password, user.password))) {
                req.session.user = { id: user.id, username: user.username };
                res.redirect('/index'); // Redirect to /index route
            } else {
                res.status(400).send('Invalid email or password.');
            }
        }
    );
});

// Index Page (Your Home Page)
app.get('/index', (req, res) => {
    if (req.session.user) {
        // Add a flag in a script tag that we can check in frontend
        const htmlContent = `
            <script>
                window.isLoggedIn = true;
                window.username = "${req.session.user.username}";
            </script>
        `;
        
        // Send the HTML file with the additional script
        res.send(htmlContent + require('fs').readFileSync(path.join(__dirname, 'public/index.html'), 'utf8'));
    } else {
        res.redirect('/login');
    }
});

// Contact Form Route
app.post('/contact', (req, res) => {
    const { fullName, email, mobileNumber, subject, message } = req.body;

    database.run(
        `INSERT INTO contact (full_name, email, mobile_number, subject, message) VALUES (?, ?, ?, ?, ?)`,
        [fullName, email, mobileNumber, subject, message],
        (err) => {
            if (err) {
                console.error(err.message);
                res.status(500).send('Error submitting message.');
            } else{
                res.status(200).send('Message sent to Shridhar successfully.');
            }
        }
    );
});

// Logout
app.get('/logout', (req, res) => {
    req.session.destroy(() => {
        res.redirect('/login');
    });
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
