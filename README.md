# loopback-example-user-organization

This is a demo application to showcase how to customize the user model with
an associated organization. 

## Models:

Org: The organization model

- name: String
- orgUsers: hasMany relation to OrgUser (mapping `Org.name` to `OrgUser.realm`

OrgUser: The user model (extends from User)

- fname: String
- lname: String
- org: belongsTo relation to Org (FK: orgUserId)

## Example code in server/boot/user-org-realm.js
```js
module.exports = function(app) {
  var OrgUser = app.models.OrgUser;
  var Org = app.models.Org;

  // Create an organization named as 'myRealm'
  Org.create({name: 'myRealm'}, function(err, org) {
    console.log(err, org);
    // Create an user within the organization
    org.orgUsers.create(
      {
        username: 'john',
        lname: 'Smith',
        fname: 'John',
        email: 'john@gmail.com',
        password: '123'
      },
      function(err, user) {
        console.log(err, user);

        // Now try to login with realm
        OrgUser.login({username: 'myRealm:john', password: '123'},
          function(err, result) {
            console.log(err, result);
          })
      });

  });
};
```

## Run the example
```
$ node .
```
You should see the output similar as follows:
```
null { name: 'myRealm', id: 1 }
Browse your REST API at http://0.0.0.0:3000/explorer
Web server listening at: http://0.0.0.0:3000/
null { username: 'john',
  lname: 'Smith',
  fname: 'John',
  email: 'john@gmail.com',
  password: '$2a$10$E.4BOagiUW2v7qZCRkZAHuRDgeJRwW4pw70nGitwMtaIaFuoXqP6K',
  orgUserId: 1,
  realm: 'myRealm',
  id: 1 }
null { ttl: 1209600,
  userId: 1,
  created: Tue Feb 10 2015 13:51:24 GMT-0800 (PST),
  id: 'e6l5U3LJ9PKyMrbkGHu5xKDO0Uv9en5NG69PMqwzAROBIwGJWpkyJx5YjvAF1Dcw' }
```  



