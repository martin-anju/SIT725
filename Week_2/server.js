/*
const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;
// Middleware to parse JSON bodies (for POST requests)
app.use(express.json());
// Serve static files from the "public" folder
app.use(express.static(path.join(__dirname, 'public')));
// In-memory array to store quotes
let quotes = [
"The best way to predict the future is to invent it.",
"Life is 10% what happens to us and 90% how we react to it.",
"The only limit to our realization of tomorrow is our doubts of today.",
"Do not wait to strike till the iron is hot; but make it hot by striking."
];
// GET endpoint to retrieve a random quote
// Usage example: http://localhost:3000/api/quote
app.get('/api/quote', (req, res) => {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    res.json({ quote: quotes[randomIndex] });
});
// Optional: POST endpoint to add a new quote
app.post('/api/quote', (req,res)=>{
    const {quote} = req.body;
    if(!quote || typeof quote !== 'string') {
        return res.status(400).json({error: "Please provide a valid quote"});
    }
    quotes.push(quote);
    res.json({message: 'Quote added successfully.', quotes});

})
*/
const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON bodies (for POST requests)
app.use(express.json());

// Serve static files from the "public" folder
app.use(express.static(path.join(__dirname, 'public')));

// In-memory array to store quotes
let quotes = [
    "The best way to predict the future is to invent it.",
    "Life is 10% what happens to us and 90% how we react to it.",
    "The only limit to our realization of tomorrow is our doubts of today.",
    "Do not wait to strike till the iron is hot; but make it hot by striking."
];

// GET endpoint to retrieve a random quote
// Usage example: http://localhost:3000/api/quote
app.get('/api/quote', (req, res) => {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    res.json({ quote: quotes[randomIndex] });
});

// Optional: POST endpoint to add a new quote
app.post('/api/quote', (req, res) => {
    const { quote } = req.body;
    if (!quote || typeof quote !== 'string') {
        return res.status(400).json({ error: "Please provide a valid quote" });
    }
    quotes.push(quote);
    res.json({ message: 'Quote added successfully.', quotes });
});

// Add GET endpoint to perform addition of two numbers
app.get('/add', (req, res) => {
    // Parse the query parameters 'a' and 'b'
    const a = parseFloat(req.query.a);
    const b = parseFloat(req.query.b);
    
    // Validate if a and b are valid numbers
    if (isNaN(a) || isNaN(b)) {
        return res.status(400).json({ error: "Please provide valid numbers for 'a' and 'b'." });
    }

    // Calculate the sum
    const sum = a + b;

    // Send the result as a JSON response
    res.json({ sum: sum });
});

// Subtraction route
app.get('/subtract', (req, res) => {
    const a = parseFloat(req.query.a);
    const b = parseFloat(req.query.b);

    if (isNaN(a) || isNaN(b)) {
        return res.status(400).json({ error: "Please provide valid numbers for 'a' and 'b'." });
    }

    const difference = a - b;
    res.json({ difference: difference });
});



// Start the server
app.listen(PORT, () => {
    console.log(`App listening on port: ${PORT}`);
});
