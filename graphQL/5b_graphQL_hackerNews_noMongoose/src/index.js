
const express = require('express');
const bodyParser = require('body-parser');// This package automatically parses JSON requests.
const {graphqlExpress, graphiqlExpress} = require('apollo-server-express');
const schema = require('./schema');// This package will handle GraphQL server requests and responses for you, based on your schema.

// 1
const connectMongo = require('./mongo-connector');

// 2
const start = async () => {
  // 3
  const mongo = await connectMongo();
  var app = express();
  app.use('/graphql', bodyParser.json(), graphqlExpress({
  	// context object is a special GraphQL object that gets passed to all resolvers,
    context: {mongo}, // 4
    schema
  }));
  app.use('/graphiql', graphiqlExpress({
    endpointURL: '/graphql',
  }));

  const PORT = 3000;
  app.listen(PORT, () => {
    console.log(`Hackernews GraphQL server running on port ${PORT}.`)
  });
};

// 5
start();



// Let’s go over the changes here, step by step:
// 1 Import the function you’ve just created.
// 2 Wrap the whole app setup code with an async function. That’s just so you can use async/await syntax, 
// now that there’s an asynchronous step. You could use promise syntax instead as well.
// 3 Call the MongoDB connect function and wait for it to finish.
// 4 Put the MongoDB collections into the context object. This is a special GraphQL object that gets passed 
// to all resolvers, so it’s the perfect place to share code (such as connectors like this) between them.
// 5 Run the start function

