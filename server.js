// server.js - Fully Corrected Code

// 1. Module Imports
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Load environment variables (though in Docker we use explicit -e flags)
dotenv.config(); 

// 2. Express Setup
const app = express();
const PORT = process.env.PORT || 3000;

// 3. Middleware Configuration (CRITICAL for handling forms and serving static files)
// Serve static files from the 'public' directory (for CSS/JS/images)
app.use(express.static('public')); 
// Parse application/x-www-form-urlencoded (for handling form submissions like Add Employee)
app.use(express.urlencoded({ extended: true })); 
// Parse application/json
app.use(express.json());

// Set EJS as the templating engine
app.set('view engine', 'ejs');
app.set('views', 'views'); // Explicitly set the views directory

// 4. MongoDB Connection (CRITICAL FIX: Using correct environment variables and template literal)

// Variables are pulled from the Docker 'docker run -e' flags
const DB_USER = process.env.DB_USER;
const DB_PASS = process.env.DB_PASS;
const DB_HOST = process.env.DB_HOST;

// The fully qualified connection string must use backticks (template literal)
const mongoURI = `mongodb://${DB_USER}:${DB_PASS}@${DB_HOST}:27017/emc?authSource=admin`;

mongoose.connect(mongoURI, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true,
