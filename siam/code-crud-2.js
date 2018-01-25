import React from "react";
import Link from "gatsby-link";
import { StitchClient } from "mongodb-stitch";
import styled, { css } from "react-emotion";
import Async from "react-promise";

require("babel-polyfill");

// Instantiate a new StitchClient

export default () => {
  const client = new StitchClient("stitchdocs-jdtdl");
  // Connect to MongoDB Atlas through the MongoDB service
  const db = client.service("mongodb", "mongodb-atlas").db("HR");
  handleLogin().then(displayEmployees);
  

  function handleLogin() {
    if (client.authedId()) {
      return client.logout().then(client.login);
    } else {
      return client.login();
    }
  }

  // Query for and display employee data
  function displayEmployees() {
    const tableHtml = db.collection("employees")
      .updateOne(
        { email: "hucejte@wuava.pk" },
        { $set: { salary: (100000 * Math.random()).toFixed(0) } },
        { upsert: true }
      )
      .then( () => db.collection('employees').find({'email' : 'hucejte@wuava.pk'}).sort({ "name.last": 1 }).execute() )

    return <Async
      promise={tableHtml}
      then={employees => {
        console.log('employees', employees)
        const html = employees.map(employee => `
          <tr>
            <td>${employee.name.last}, ${employee.name.first}</td>
            <td>${employee.email}</td>
            <td>${employee.role} - ${employee.level}</td>
            <td>${employee.salary}</td>
          </tr>
        `).join('');
        return <tbody dangerouslySetInnerHTML={{ __html: html }}></tbody>;
      } } />
  }

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Title</th>
          <th>Salary</th>
        </tr>
      </thead>
      {displayEmployees()}
    </table>
  );
};
