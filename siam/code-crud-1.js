import React from "react";
import Link from "gatsby-link";
import { StitchClient } from 'mongodb-stitch';
import styled, { css } from "react-emotion";
import Async from "react-promise";
import Codepen from "../components/codepen"

require('babel-polyfill')

// Instantiate a new StitchClient

export default () => {
  const client = new StitchClient('stitchdocs-jdtdl');
  // Authenticate the user against the MongoDB Stitch server
  if (client.authedId()) {
    client.logout().then(handleLogin)
  } else {
    handleLogin()
  }
  // Connect to MongoDB Atlas through the MongoDB service
  const db = client.service('mongodb', 'mongodb-atlas').db('HR');
  
  function handleLogin() {
    client
      .login()
      .then(displayEmployees)
      .catch(err => console.error(err));
  }

  // Query for and display employee data
  function displayEmployees() {
    const tableHtml = db.collection('employees').find({}).sort({ "name.last": 1 }).execute()
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
      } }
    />;
  };


  return (
    <div>
    
    <Codepen user="nlarew" hash="mpZgqV" title="SIAM: CRUD 1"/>
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
    
    </div>
  )
}