const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("✅ Connected to MongoDB"))
    .catch(err => console.error("❌ MongoDB connection error:", err));

const WordSchema = new mongoose.Schema({
    word: String,
    meaning: String,
    example: String,
    createdAt: { type: Date, default: Date.now }
});

// 🔥 Model name starts with capital letter by convention
const Word = mongoose.model('Word', WordSchema);

app.get('/', (req, res) => {
    res.send("🌊 Word Ocean API is running...");
});

app.post('/add-word', async (req, res) => {
    try {
        const { word, meaning, example } = req.body;
        const entry = new Word({ word, meaning, example }); // ✅ Correct model
        await entry.save();
        res.json({ message: '✅ Word Added!' });
    } catch (err) {
        console.error('❌ Error in /add-word:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.get('/words', async (req, res) => {
    try {
        const words = await Word.find(); // ✅ Correct model
        res.json(words);
    } catch (err) {
        console.error('❌ Error in /words:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.listen(3000, () => console.log("🚀 Server running on port 3000"));
