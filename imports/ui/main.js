import { Template } from 'meteor/templating';

import './main.html';

console.log("rendering 'main'.");

Template.main.onCreated(function bodyOnCreated() {
  Meteor.subscribe('posts');
});