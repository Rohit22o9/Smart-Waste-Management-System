const mongoose = require('mongoose');

let conn = null;
const MONGO_URI = process.env.MONGO_URI || "mongodb+srv://rohitdb:Rohit2209@cluster0.l4v0ldu.mongodb.net/econova?retryWrites=true&w=majority&appName=Cluster0";

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, default: 'user' },
    createdAt: { type: Date, default: Date.now }
});

const User = mongoose.models.User || mongoose.model('User', userSchema);

exports.handler = async (event, context) => {
    context.callbackWaitsForEmptyEventLoop = false;

    if (conn == null) {
        conn = mongoose.connect(MONGO_URI);
        await conn;
    }

    if (event.httpMethod !== 'POST') {
        return { statusCode: 405, body: 'Method Not Allowed' };
    }

    try {
        const { username, password } = JSON.parse(event.body);

        // Admin override
        if (username === 'admin' && password === 'admin@123') {
            return { statusCode: 200, body: JSON.stringify({ role: 'admin', username: 'Administrator' }) };
        }

        const user = await User.findOne({ username, password });
        if (!user) {
            return { statusCode: 401, body: JSON.stringify({ error: "Invalid credentials" }) };
        }

        return {
            statusCode: 200,
            body: JSON.stringify({ role: 'user', username: user.username })
        };
    } catch (err) {
        return { statusCode: 500, body: JSON.stringify({ error: err.message }) };
    }
};
