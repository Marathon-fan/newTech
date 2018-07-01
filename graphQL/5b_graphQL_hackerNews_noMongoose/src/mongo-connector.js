const {MongoClient} = require('mongodb');

// 1
const MONGO_URL = 'mongodb://localhost:27017/hackernews';

// 2
module.exports = async () => {
  const db = await MongoClient.connect(MONGO_URL);
  return {Links: db.collection('links')};
}


// This piece of code is doing the following things:
// First, specify the url for connecting to the desired MongoDB instance.
//  This is the default url usually available, but feel free to replace it with your own if different.

// Then, export a function that connects to the db and returns the collections your resolvers will
//  use (just Links for now). Since connecting is an asynchronous operation, the function needs to be 
//  annotated with the async keyword.



// error: TypeError: db.collection is not a function
// Uninstalling existing mongodb package and reinstalling using the following commands resolved the issues

// npm uninstall mongodb --save
// npm install mongodb@2.2.33 --save 
// Version MongoDB >= 3 - That database variable is actually the parent object of the object you are trying to access. If u using mongo 3+:

// const myDb = db.db('YourDatabase') 
// myDb.collection('YourDatabase).insertOne .... 