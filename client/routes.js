//public routes
var exposed = FlowRouter.group({

});

exposed.route('/', {
    name: 'home',
    action: function () {
        BlazeLayout.render('mainLayout', {
          content: 'main'
        });
    }
});