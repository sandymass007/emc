// server.js
const express = require('express');
const app = express();
const PORT = 3000;

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true })); 
app.use(express.static('public')); 

let employees = [
    { id: 1001, name: "Arden Cho", dept: "HR", title: "Manager", status: "Active" },
    { id: 1002, name: "Ben Parker", dept: "IT", title: "Engineer", status: "Active" }
];

// Main EMC Dashboard Route
app.get('/', (req, res) => {
    res.render('index', { 
        portalName: 'EMC', // Changed to "EMC"
        employeeList: employees 
    });
});

app.post('/add', (req, res) => {
    const newEmployee = {
        id: employees.length + 1001,
        name: req.body.employeeName,
        dept: req.body.employeeDept,
        title: req.body.employeeTitle,
        status: "Active"
    };
    employees.push(newEmployee);
    res.redirect('/');
});

app.listen(PORT, () => {
    console.log(`EMC running on http://localhost:${PORT}`); // Changed to "EMC running"
});
