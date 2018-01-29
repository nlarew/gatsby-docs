---
title: rules-2
codepen:
  title: "SIAM: Rules 2"
  user: nlarew
  hash: LQYPzY
---
# Stitch in a Minute: Using Rules to Secure Data

MongoDB Stitch rules can handle complex filters and use stored Stitch functions
to validate whether or not a document should be returned for a particular query.

The following rule on the `employees_secured2` collection allows a user to see
not only her own documents but also those that describe her direct reports, as
defined by the `doesEmpReportTo()` Stitch function:

```javascript
{
  "%or": [
    {
      "%%true": {
        "%function": {
          "name": "doesEmpReportTo",
          "args": [
            "%%root.email"
          ]
        }
      }
    },
    {
      "%%root.email": "%%user.data.email"
    }
  ]
}
```

## `doesEmpReportTo()`

```javascript
exports = function(empEmail) {
  var atlas = context.services.get("mongodb-atlas");
  var empCol = atlas.db("HR").collection("employees_secured2");
  
  //Find the employee documents for the currently authenticated user.
  var currentUser = empCol.findOne({"email": context.user.data.email });
  if (currentUser === undefined){
    return false;
  }

  //For this document, does the 'manager' property match the _id of the requesting user?
  var isDirectReport = empCol.count({"email" : empEmail, "manager": currentUser._id});
  if (isDirectReport > 0) return true;
  return false;
};
```