---
layout: default
title:  "Welcome to Jekyll!"
date:   2016-02-12 17:50:00
categories: main
---
### What is the goal of this app/repo?
My goal here is to create a blog with Meteor.<br>
I'd like this repo to be some kind of source for people starting their journey with Meteor.

### Day 1
**What do I use to run meteor on my mac?**<br>
I use Phusion Passenger. Go check it out [here](https://www.phusionpassenger.com/).

**.gitignore**<br>
To ignore files (or folders), you need to create a .gitignore file in the correct folder and add rules to ignore specific files.<br>
This is handy when you don't want git to pollute your repo with unnecessary files like images, log files, etc.

### Day 2
**bootstrap**<br>
I added 2 packages:<br>
- twbs:bootstrap<br>
- ian:accounts-ui-bootstrap-3<br>

Those packages help you use bootstrap to design a responsive layout.<br>

**routing**<br>
With a [router](https://guide.meteor.com/routing.html), you can display a custom URL that represents a specific state/view of your app.<br>
Your user can then share the URL or bookmark it.<br>
There are different routers available for Meteor but in our case, we will use [Flowrouter](https://kadira.io/academy/meteor-routing-guide/content/introduction-to-flow-router).
- kadira:flow-router<br>
- kadira:blaze-layout<br>

**authentication and permissions**<br>
This [tutorial](https://medium.com/@satyavh/using-flow-router-for-authentication-ba7bb2644f42#.y9pybhiao) helped me a lot to figure out how to implement efficient routing accross public and private pages.<br>
Unfortunately, it's in CoffeeScript. Luckily, someone in the comments posted the code in Javascript.<br>
I've added 2 packages:<br>
- [session](https://atmospherejs.com/meteor/session)<br>
- [gwendall:auth-client-callbacks](https://atmospherejs.com/gwendall/auth-client-callbacks)<br>

The 1st one helps you store things. In our case, we want to store the URL. If the user wants to view a "private" page (like the admin page) and is not logged in, then we will redirect him to the login page and once logged in, he will be redirected to the page he was previously trying to reach. Cool huh?<br>
For more details, the documentation is [here](https://docs.meteor.com/api/session.html).<br>
The 2nd package adds client-side onLogin and onLogout callbacks.

### Day 3
So I discovered this week that `new Mongo.Collection` will not create a MongoDB collection automatically ([source](http://stackoverflow.com/a/37847071)).<br>
When I tried this code in `/server/main.js`:<br>

``` js

Meteor.startup(() => {
  // code to run on server at startup
  if (!Posts.findOne()){// no post yet!
      Posts.insert({
        title:"my new post",
        createdAt: new Date()
      });
  }
});
```

I had this error message:<br>

```js
ReferenceError: Posts is not defined
```

So don't try to do this otherwise it will never work.<br>
<br>
After some (~~zillions~~) trials and errors, the best place to initialise your collection is in `/imports/api/posts/posts.js` file.<br>

```

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
}

```

Now if you've cloned the repo, you would have installed automatically a package called `meteortoys:allthings`.<br>
When you are on your [page](http://0.0.0.0:3000/), click `Ctrl + M`. You will be able to access some useful tools. One of them lets you know if your inserts have been done correctly.<br>
If you've paid attention, you will see that the `Posts` collection is currently showing as 0.<br>
That's because we need to publish and subscribe to our collection otherwise the `client` can't access our data.<br>
And that's exactly what we are going to do next!<br>

**publish/subscribe**<br>
Now the goal of this post/article/blog (~~I'm not calling it a tutorial as it is so disorganised~~), as I stated before, is to give you references on how to do things.
I'm not going to explain how `publish and subscribe` work in Meteor.<br>
This [tutorial](https://www.meteor.com/tutorials/blaze/publish-and-subscribe) explains it very well.<br>
Because we have removed the `autopublish` and `subscribe` packages for security reasons, we now need to let the client access the data safely.<br>

**Organise your templates**<br>
It's very useful to read people's problems and solutions on forums.<br>
One day I was looking for a way to organise my templates and I stumble upon [this](https://gitter.im/meteor/meteor?at=57606360dfb1d8aa45a3567b).<br>
In Meteor 1.3.3 update, they introduced [**nested imports**](https://github.com/benjamn/reify/blob/master/WHY_NEST_IMPORTS.md) (found on [reddit](https://www.reddit.com/r/javascript/comments/4m5f03/meteor_133_introduces_nested_import_statements_if/d3v3x0m)).<br>
And this is really a cool feature because now, in your `routes.js` file, instead of loading everything at once, you can load specific templates.<br>

```

exposed.route('/login', {
    name: 'login',
    action: function () {
      import '../imports/ui/loginLayout.js'; // nested import
      BlazeLayout.render('loginLayout');
    }
});

```

**Organise your templates (part 2)**<br>
At this stage, we've put each template in an individual `.html` and `.js` files.<br>
With stripped out every parts of our `body.html` file and quite joyfully, templates are now in their respective files :)<br>
We can now get rid of our `body.html` and `body.js` files.

### Day 4

### TODO
- gh-pages / worktree
- `tests` folder
- home page: list of all posts<br>
- add post page<br>
- upload images<br>
- admin page: edit/delete posts<br>
- profile page<br>
- search<br>
- login<br>
- super admin page: block user, block post<br>
- comments<br>