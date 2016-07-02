import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

export const Posts = new Mongo.Collection( 'posts' );

if (Meteor.isServer){
  if (!Posts.findOne()){// no post yet!
    Posts.insert({
      title:"new post",
      createdAt: new Date()
    });
    console.log("there you go, a new post!")
  }
  else {
    console.log("there is already a post");
  }

  // Publish Posts
  Meteor.publish('posts', function postsPublication(){
    return Posts.find();
  });

}
