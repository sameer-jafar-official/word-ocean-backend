const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("connected to MongoDB"));

const WordSchema = new mongoose.Schema({
    word: String,
    meaning:String,
    example:String,
    createdAt : { type : Date , default : Date.now}
});
const word = mongoose.model('Word', WordSchema);

app.post('/add-word' ,async (req , res) => {
    const {word , meaning , example} = req.body;
    const entry = new WordSchema({word , meaning , example });
    await entry.save();
    res.json({message : 'Word Added!' });
});

app.get('/words' , async (req , res)=>{
    const words = await WordSchema.find();
    res.json(words);
});
app.listen(3000 , ()=> console.log("server running on port 3000"));
