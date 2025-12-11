<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><%= portalName %></title>
    <style>
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; margin: 0; background-color: #f0f2f5; }
        .container { max-width: 1000px; margin: 40px auto; background: white; padding: 30px; border-radius: 12px; box-shadow: 0 6px 15px rgba(0, 0, 0, 0.1); }
        h1 { text-align: center; color: #007bff; margin-bottom: 30px; border-bottom: 2px solid #007bff; padding-bottom: 10px; }
        table { width: 100%; border-collapse: collapse; margin-top: 25px; }
        th, td { border: 1px solid #e0e0e0; padding: 15px; text-align: left; }
        th { background-color: #007bff; color: white; font-weight: 600; }
        tr:nth-child(even) { background-color: #f9f9f9; }
        .add-form { margin-bottom: 30px; padding: 20px; border: 1px solid #dcdcdc; border-radius: 8px; background-color: #e9f5ff; }
        input[type="text"] { padding: 12px; margin-right: 15px; border: 1px solid #ccc; border-radius: 6px; width: 180px; }
        button { background-color: #28a745; color: white; padding: 12px 20px; border: none; border-radius: 6px; cursor: pointer; transition: background-color 0.3s; }
        button:hover { background-color: #218838; }
    </style>
</head>
<body>
    <div class="container">
        <h1><%= portalName %></h1>
        <div class="add-form">
            <h2>New Employee Onboarding</h2>
            <form action="/add" method="POST">
                <input type="text" name="employeeName" placeholder="Full Name" required>
                <input type="text" name="employeeDept" placeholder="Department" required>
                <input type="text" name="employeeTitle" placeholder="Job Title" required>
                <button type="submit">Enroll Employee</button>
            </form>
        </div>
        <h2>Team Roster</h2>
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Department</th>
                    <th>Title</th>
                    <th>Status</th>
                </tr>
            </thead>
            <tbody>
                <% employeeList.forEach(function(employee) { %>
                    <tr>
                        <td><%= employee.id %></td>
                        <td><%= employee.name %></td>
                        <td><%= employee.dept %></td>
                        <td><%= employee.title %></td>
                        <td><%= employee.status %></td>
                    </tr>
                <% }); %>
            </tbody>
        </table>
    </div>
</body>
</html>
