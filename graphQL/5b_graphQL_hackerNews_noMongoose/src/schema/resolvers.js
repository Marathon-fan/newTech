
module.exports = {
  Query: {
    allLinks: async (root, data, {mongo: {Links}}) => { // 1
      return await Links.find({}).toArray(); // 2
    },
  },

  Mutation: {
    createLink: async (root, data, {mongo: {Links}}) => {
      const response = await Links.insert(data); // 3
      return Object.assign({id: response.insertedIds[0]}, data); // 4
    },
  },

  Link: {
    id: root => root._id || root.id, // 5
  },
};


// Going step by step once more:
// 1 The context object you’ve specified in that call to graphqlExpress is the third argument passed down to each resolver.

// 2 For the allLinks query all you need is to call MongoDB’s find function in the Links collection, and then turn the 
// results into an array.

// 3 For the createLink mutation you save the data via Links.insert.

// 4 Still inside createLink, use insertedIds from MongoDB to return the final Link object from the resolver.

// 5 MongoDB will automatically generate ids for you, which is great! Unfortunately, it calls them _id, while your schema 
// calls them id. You could change the schema to use _id as well instead, but this is the perfect opportunity to talk about 
// other kinds of resolvers. As you can see, you can have resolvers for any GraphQL type in your schema, it doesn’t have to
//  be just for Query and Mutation. In this case, you’ve created one for the id field in the Link type. The server will now 
//  trigger that function whenever this field is requested, so you can have it grab _id instead there. The first argument 
//  in a resolver (called root) is an object with the current data for that type. It should be null for Query and Mutation, 
//  but for other types it will already have whatever your other resolvers have returned for them.

