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
