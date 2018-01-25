---
title: crud-2
---
<script src="https://cdn.rawgit.com/google/code-prettify/master/loader/run_prettify.js"></script>
<script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossorigin="anonymous"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossorigin="anonymous"></script>
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta.3/js/bootstrap.min.js" integrity="sha384-a5N7Y/aK3qNeh15eJKGWxsqtnX/wWdSZSKp+81YjTmS15nvnvxKHuzaWwXHDli+4" crossorigin="anonymous"></script>
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta.2/css/bootstrap.min.css" integrity="sha384-PsH8R72JQ3SOdhVi3uxftmaW6Vc51MKb0q5P2rRUpPvrszuE4W1povHYgTpBfshb" crossorigin="anonymous">

<link rel="stylesheet" href="../siam.css">

<style>
iframe {
  min-height: 300px;
  height: 55%;
  width: 100%;
  /* margin-top: 7px; */
  margin-bottom: 15px;
}

.alerticon {
  margin-left: -15px;
  margin-right: 5px;
  margin-top: -10px;
}

.layout {
  display: flex;
  flex-direction: row;
  width: 100%;
}

.content-code {
  min-width: 1100px;
}

.content-other {
  margin: 36px 0;
  padding: 0 0 0 10px;
  min-width: 550px
}

.whats-next {
  padding: 0 0 0 5px;
}
</style>

# Stitch in a Minute: Upserting Data to Atlas

Let's update the <a href='siam-crud-1.html'>web page we used previously</a> to insert some data to the employee collection.

Take a look at the following HTML page:

<div class="layout">
<div class="content-code">

##### HTML

```html
<html>
  <!-- Import the MongoDB Stitch JavaScript Driver -->
  <script src="https://s3.amazonaws.com/stitch-sdks/js/library/v2/stable/stitch.min.js"></script>
  <script>
    const client = new stitch.StitchClient('stitchdocs-jdtdl');
    const db = client.service('mongodb', 'mongodb-atlas').db('HR');

    handleLogin().then(displayEmployees)
    
    function handleLogin() {
      if (client.authedId()) {
        client.logout().then(handleLogin)
      } else {
        client.login()
      }
    }

    function displayEmployees() {
      //Update an existing employee
      db.collection('employees')
        .updateOne(
          { 'email': 'hucejte@wuava.pk' },
          { $set: { 'salary': (100000 * Math.random()).toFixed(0) } },
          { upsert: true }
        )
        .then(() =>
          db.collection('employees')
            .find({'email' : 'hucejte@wuava.pk'})
            .sort({ "name.last": 1 })
            .execute(),
          err => console.error(err)
        )
        .then(employees => {
          html = employees.map(employee => `
            <tr>
              <td>${employee.name.last}, ${employee.name.first}</td>
              <td>${employee.email}</td>
              <td>${employee.role} - ${employee.level}</td>
              <td>${employee.salary}</td>
            </tr>
          `).join('');
          document.getElementById('employees').innerHTML = html,
        err => console.error(err)
        })
    }
  </script>
  <body>
    <table class='table'>
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Title</th>
          <th>Salary</th>
        </tr>
      </thead>
      <tbody id='employees'></tbody>
    </table>
  </body>
</html>
```

</div>

<div class="content-other">

<iframe id="livepage" src="http://176b04bd.ngrok.io/code-crud-2"></iframe>

<div class="whats-next">
<div class="alert alert-danger" role="alert">
  <img class='alerticon' src='../alert.ico' width='32px' />
  <strong>Something Isn't Quite Right...</strong>
  <br />
  You may have already noticed a major problem here:
  You are an <strong>anonymous user</strong> viewing rather sensitive personal information! By default, Stitch restricts what you can and
  can't see; we've overridden those rules to keep this example as simple as possible. As you work through other Stitch
  examples, you'll learn about authentication and authorization.
</div>

## What's Next?

- I've seen enough CRUD, and this security issue is bothering me. [Let's fix it.](../siam-rules-1.html)
- I want to learn more about [MongoDB's CRUD operations.](https://docs.mongodb.com/manual/crud/)
- CRUD is easy; take me to the [Authentication docs.](https://docs.mongodb.com/stitch/authentication/)
- I want to [start playing with my own data in Stitch.](http://stitch.mongodb.com)

</div>
</div>

</div>
