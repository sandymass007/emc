const express = require('express');
const app = express();
const mongoose = require('mongoose');

// --- ENVIRONMENT & PORT CONFIG ---
const PORT = 3000;
const DB_USER = process.env.DB_USER || 'admin';
const DB_PASS = process.env.DB_PASS || 'password';
const DB_HOST = process.env.DB_HOST || 'localhost';
const DB_PORT = 27017; // CRITICAL FIX: Explicit MongoDB default port
const DB_NAME = 'emc';

// **CORRECTED CONNECTION URL**
const dbUrl = `mongodb://${DB_USER}:${DB_PASS}@${DB_HOST}:${DB_PORT}/${DB_NAME}?authSource=admin`;

// --- MONGODB CONNECTION & SERVER START ---
mongoose.connect(dbUrl)
.then(() => {
    console.log(`MongoDB Connected successfully to: ${DB_HOST}:${DB_PORT}`);
    
    // Start the Express server ONLY after the database connection is confirmed
    app.listen(PORT, () => {
        console.log(`EMC running on http://localhost:${PORT}`);
    });
})
.catch(err => {
    // FATAL ERROR: This will log the failure that caused the white screen
    console.error('FATAL DB CONNECTION ERROR:', err.message);
    process.exit(1); // Exit the application if the database connection fails
});

// --- MONGOOSE SCHEMA & MODEL ---
const employeeSchema = new mongoose.Schema({
    id: Number,
    name: String,
    dept: String,
    title: String,
    status: String,
});

const Employee = mongoose.model('Employee', employeeSchema);

// Helper function to safely get the next sequential ID
async function getNextEmployeeId() {
    // Finds the employee with the highest ID
    const maxEmployee = await Employee.findOne().sort({ id: -1 });
    // Returns the max ID + 1, or 1001 if the collection is empty
    return maxEmployee ? maxEmployee.id + 1 : 1001;
}

// --- EXPRESS MIDDLEWARE ---
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));


// --- ROUTES ---

// Main EMC Dashboard Route (Reads data)
app.get('/', async (req, res) => {
    try {
        // Fetch all employees from the MongoDB database
        const employeeList = await Employee.find({}); 

        res.render('index', {
            portalName: 'EMC',
            employeeList: employeeList // Now uses data from MongoDB
        });
    } catch (err) {
        console.error("Error fetching employees:", err);
        // Display an error page instead of crashing
        res.status(500).send("Error loading dashboard. Check application logs for DB errors.");
    }
});

// Add New Employee Route (Writes data)
app.post('/add', async (req, res) => {
    try {
        const newEmployeeData = {
            id: await getNextEmployeeId(), // Get the next available ID
            name: req.body.employeeName,
            dept: req.body.employeeDept,
            title: req.body.employeeTitle || 'Trainee', // Fallback for missing form fields
            status: req.body.employeeStatus || 'Active' // Fallback
        };

        // Save the new employee to the MongoDB database
        await Employee.create(newEmployeeData); 

        // Redirect back to the dashboard
        res.redirect('/'); 

    } catch (error) {
        console.error("Error adding new employee:", error);
        res.status(500).send("Failed to add employee due to a database error.");
    }
});
