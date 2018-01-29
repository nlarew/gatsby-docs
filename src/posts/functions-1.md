---
title: functions-1
codepen:
  title: "SIAM: Functions 1"
  user: nlarew
  hash: vporex
---
# Stitch in a Minute: Reading Data from Atlas

MongoDB Stitch can store functions that you write and run them on-demand.

Here we use the following functions that we've saved on Stitch to build an org
chart based on data in a MongoDB collection.

## `buildOrgChart()`
```javascript
exports = function() {
  // Connect to MongoDB Atlas
  var atlas = context.services.get("mongodb-atlas");
  var employees = atlas.db("HR").collection("employees");
  
  var orgChart = [];
  
  // Employees at the top level of the org chart do not have a manager.
  var topLevelEmployees = employees.find({"manager" : {$eq: null}}).toArray();

  // Build a JSON object for each top-level employee and all their
  // reporting employees to return to our client application. 
  topLevelEmployees.forEach(function(employee){
    var empObj = context.functions.execute('createEmployeeObject', employee);
    orgChart.push(empObj);
  });
  
  return orgChart;
};
```

## `createEmployeeObject()`
```javascript
// Create a JSON object for an employee, recursively creating nested
// objects for all employees that report to them.
exports = function(employee) {
  // Connect to MongoDB Atlas
  var atlas = context.services.get("mongodb-atlas");
  var employees = atlas.db("HR").collection("employees");
  
  var directReports = employees.find({ manager: employee._id }).toArray();
  
  directReports.forEach(function(directReport, i) {
    directReports[i] = context.functions.execute('createEmployeeObject', directReport);
  });
  
  var employeeObject = {
    _id: employee._id,
    name: employee.name.last + ", " + employee.name.first,
    title: employee.role + " - " + employee.level,
    email: employee.email,
    directReports: directReports
  };
  
  return employeeObject;
};
```