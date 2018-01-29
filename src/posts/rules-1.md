---
title: rules-1
codepen:
  title: "SIAM: Rules 1"
  user: nlarew
  hash: rJNBwQ
---
# Stitch in a Minute: Using Rules to Secure Data

MongoDB Stitch ensures security by validating user requests against pre-defined rules.

The following rule on the `employees_secured` collection prevents anyone from
seeing documents that don't have their email address in the `email` field, even
if the query terms would normally return the document:

```javascript
{
  "%%root.email": "%%user.data.email"
} 
```

# What's Next?
- This rule makes sense. Show me a [more complex example of Stitch rules.](../rules-2)