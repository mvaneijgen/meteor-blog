import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import { Posts } from '../api/posts/posts.js';

import '../api/posts/methods.js';

import './body.html';

Template.main.onCreated(function bodyOnCreated() {
  Meteor.subscribe('posts');
});

// Template.hello.onCreated(function helloOnCreated() {
//   // counter starts at 0
//   this.counter = new ReactiveVar(0);
// });

// Template.hello.helpers({
//   counter() {
//     return Template.instance().counter.get();
//   },
// });

// Template.hello.events({
//   'click button'(event, instance) {
//     // increment the counter when button is clicked
//     instance.counter.set(instance.counter.get() + 1);
//   },
// });
