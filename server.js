const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

// MongoDB Connection
const MONGO_URI = "mongodb+srv://rohitdb:Rohit2209@cluster0.l4v0ldu.mongodb.net/econova?retryWrites=true&w=majority&appName=Cluster0";

mongoose.connect(MONGO_URI)
    .then(() => console.log("✅ Connected to MongoDB Atlas"))
    .catch(err => console.error("❌ MongoDB Connection Error:", err));

// User Schema
const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, default: 'user' },
    createdAt: { type: Date, default: Date.now }
});

const User = mongoose.model('User', userSchema);

// --- Auth Routes ---

// Signup
app.post('/api/signup', async (req, res) => {
    try {
        const { username, password } = req.body;
        
        // Check if user exists
        const existing = await User.findOne({ username });
        if (existing) return res.status(400).json({ error: "Username already exists" });

        const newUser = new User({ username, password });
        await newUser.save();
        
        res.status(201).json({ message: "User created successfully" });
    } catch (err) {
        res.status(500).json({ error: "Server error during signup" });
    }
});

// Login
app.post('/api/login', async (req, res) => {
    try {
        const { username, password } = req.body;

        // Hardcoded Admin Check (as requested)
        if (username === 'admin' && password === 'admin@123') {
            return res.json({ role: 'admin', username: 'Administrator' });
        }

        const user = await User.findOne({ username, password });
        if (!user) return res.status(401).json({ error: "Invalid credentials" });

        res.json({ role: 'user', username: user.username });
    } catch (err) {
        res.status(500).json({ error: "Server error during login" });
    }
});

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});
