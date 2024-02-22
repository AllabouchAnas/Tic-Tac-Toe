const express = require('express'); 
const mongoose = require('mongoose');
require('dotenv').config(); 
const UserRoutes = require('./routes/UserRoutes');
import "reflect-metadata";

// Express App
const app = express();

// middleware
app.use(express.json());
app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
});

// Routes
app.use('/api/user', UserRoutes)

// Connect to db
mongoose.connect(process.env.MONGO_URL).then(() => {
    console.log('Connected to db.')
    // Listen for requests
    const port = process.env.PORT || 4000;
    app.listen(port, () => console.log(`Listening on http://localhost:${port}.`));
}).catch((error) => {
    console.log('Connection Error!', error);
});


