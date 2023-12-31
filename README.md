# API for managing users and posts in the context of a blog in Node.js and Express.js

## This is a fully functional project for managing users and posts, created with the aim of practicing Node.js, Express.js and TypeScript.

This project was created to practice the concepts of Node.js, Express.js and TypeScript.

Although it still needs some implementation (this project is still under development), all the basic and fundamental functionalities are working and can be tested.

Some of the topics covered in this project are:

* routes
* database integration
* pagination and sorting
* error handling
* data validation
* use of middleware
* extending Express Request interface for custom properties
* hooks
* environment variables
* MVC pattern

## How to install and run this project

Make sure you have Node.js and npm installed. You can check this by running `node --version` and `npm --version`. If you don't have them installed, go to: https://nodejs.org/en/

As this is a study project, you'll need to create a MongoDB Atlas cluster in order to test the project. Here are some links that may be useful if this is your first time doing this:

* https://www.mongodb.com/basics/mongodb-atlas-tutorial
* https://www.mongodb.com/docs/atlas/getting-started/

With the cluster created, we can move on to the project itself.

1. clone this project
2. install all dependencies by running `npm install`
3. create a .env file in the root of the project to store the database connection uri. I recommend naming the variable 'MONGO_URI' so nothing needs to be changed in the project code. In this variable, you'll store the database connection string. The complete variable will look like this `MONGO_URI=mongodb+srv://<username>:<password>@<clusterName>.mongodb.net/?retryWrites=true&w=majority`. Here's a step-by-step guide on how to create this connection: https://www.mongodb.com/docs/atlas/tutorial/connect-to-your-cluster/ PS: make sure you have selected the "drivers" option
4. you can now check everything is working by running `npm run dev`
5. you should now be able to test the application using a program of your choice, like Postman or Insomnia

Routes:

* server will be running at: http://localhost:3000
* base endpoint for users is: http://localhost:3000/users
* base endpoint for posts is: http://localhost:3000/posts
* for the search tests, endpoints are: http://localhost:3000/posts/search or http://localhost:3000/users/search

All endpoints are sorted and paginated

Keep in mind:

The search method will look for strings contained in "id", "username", "email" or "fullName" for users and "id", "title", "content" and "author" for posts.

Pagination parameters are:

* page: the page you want to access
* limit: how many objects will be returned per page
* sortBy: which field will be used to sort. Valid fields are: "_id", "username", "email", "fullName", "title", "content"
* order: the type of sorting. Valid values are: "asc" for ascending and "desc" for descending.

Here are some test examples:

* localhost:3000/users/search?search=an
* localhost:3000/posts/search?search=an
* localhost:3000/users/search?search=an&page=2
* localhost:3000/posts/search?search=an&page=2&order=desc&limit=2

This is how a user object looks like:

```json
{
  "username": "usernameExample",
  "email": "name@email.com",
  "password": "password",
  "fullName": "Full Name Here"
}
```

where:

```javascript
{
  username: string
  email: string
  password: string
  fullName: string
}
```

And this is how a post object looks like:

```json
{
  "title": "title",
  "content": "this is a content",
  "author": "username"
}
```

where:

```javascript
{
  title: string
  content: string
  author: IUser["username"]
}
```

You can find more details on how the models are built in the user.ts and post.ts files, inside the models folder.

## Find a bug?

If you find an issue or would like to submit an improvement to this project, please use the 'issues' tab above.