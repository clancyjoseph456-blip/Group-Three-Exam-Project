// controllers/authController.js
const db = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Student registration
exports.register = async (req, res) => {
    const { name, email, password, program_of_study, year_of_study } = req.body;
    
    try {
        // Check if user already exists
        const [existing] = await db.query('SELECT * FROM User WHERE email = ?', [email]);
        if (existing.length > 0) {
            return res.status(400).json({ message: 'Email already registered' });
        }
        
        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);
        
        // Insert user
        const [result] = await db.query(
            'INSERT INTO User (name, email, password, program_of_study, year_of_study, role) VALUES (?, ?, ?, ?, ?, "student")',
            [name, email, hashedPassword, program_of_study, year_of_study]
        );
        
        // Create JWT token
        const token = jwt.sign({ id: result.insertId, role: 'student' }, process.env.JWT_SECRET);
        
        res.status(201).json({
            token,
            user: { id: result.insertId, name, email, role: 'student' }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Login
exports.login = async (req, res) => {
    const { email, password } = req.body;
    
    try {
        const [users] = await db.query('SELECT * FROM User WHERE email = ?', [email]);
        if (users.length === 0) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }
        
        const user = users[0];
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }
        
        const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET);
        res.json({
            token,
            user: { id: user.id, name: user.name, email: user.email, role: user.role }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};