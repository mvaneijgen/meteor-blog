//public routes
var exposed = FlowRouter.group({
  // add code so the user is redirected to the home page if he tries to go to the login page while he is already logged in
});

exposed.route('/', {
    name: 'home',
    action: function () {
      import '../imports/ui/mainLayout.js'; // nested import
      import '../imports/ui/main.js'; // nested import
      BlazeLayout.render('mainLayout', {
        content: 'main'
      });
    }
});

exposed.route('/login', {
    name: 'login',
    action: function () {
      import '../imports/ui/loginLayout.js'; // nested import
      BlazeLayout.render('loginLayout');
    }
});

/*Private routes*/
var loggedIn = FlowRouter.group({
    triggersEnter: [
        function () {
            var route;
            // if user is not logged in
            if (!(Meteor.loggingIn() || Meteor.userId())) {
                route = FlowRouter.current();
                
                // save the path
                if (route.route.name !== 'login') {
                    Session.set('redirectAfterLogin', route.path);
                }
                FlowRouter.go(FlowRouter.path('/login'));
            }
        }
    ]
});

loggedIn.route('/admin', {
    name: 'admin',
    action: function () {
      import '../imports/ui/mainLayout.js'; // nested import
      import '../imports/ui/admin.js'; // nested import
      BlazeLayout.render('mainLayout', {
        content: 'admin',
      });
    }
});

// hook
Accounts.onLogin(function () {
  Meteor.logoutOtherClients();

  Session.set ('loggedIn', true);

  var redirect = Session.get('redirectAfterLogin');
  
  if (redirect != null) {
    if (redirect !== 'login') {
      FlowRouter.go(redirect);
    }
  }
});

Accounts.onLogout(function() {
  console.log("I just logged out.");

  FlowRouter.go(FlowRouter.path('/'));
});