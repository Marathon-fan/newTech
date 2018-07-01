
// import {
// 	GraphQLObjectType,
// 	GraphQLNonNull,
// 	GraphQLSchema,
// 	GraphQLString,
// 	GraphQLList,
// 	GraphQLInt,
// 	GraphQLBoolean
// } from 'graphql/type';

const { 
	GraphQLObjectType,
	GraphQLNonNull,
	GraphQLSchema,
	GraphQLString,
	GraphQLList,
	GraphQLInt,
	GraphQLBoolean
} = require('graphql/type')

const ToDoMongo = require('../../mongoose/todo')

/**
 * generate projection object for mongoose
 * @param  {Object} fieldASTs
 * @return {Project}
 */
function getProjection (fieldASTs) {
	return fieldASTs.fieldNodes[0].selectionSet.selections.reduce((projections, selection) => {
		projections[selection.name.value] = true;
		return projections;
	}, {});
}

module.exports = getProjection;

//Types are bascially creating our object structure using graphql.
//So looking at the above code you can see that the todoType is similar to the schema/model we created in mongoose.
var todoType = new GraphQLObjectType({
	name: 'todo',
	description: 'todo item',
	fields: () => ({
		itemId: {
			type: (GraphQLInt),
			description: 'The id of the todo',
		},
		item: {
			type: GraphQLString,
			description: 'The name of the todo',
		},
		completed: {
			type: GraphQLBoolean,
			description: 'Completed todo?'
		}
	})
});


// A schema will always have query or mutation as entry point. In our example, as you see we are creating a basic query.
// schema of GraphQL. so there are two schema here, schema of GraphQL and schema of our data model
var schema = new GraphQLSchema({
	query: new GraphQLObjectType({
		name: 'RootQueryType',
		fields: {
			todo: {
				type: new GraphQLList(todoType),
				args: {
					itemId: {
						name: 'itemId',
						type: new GraphQLNonNull(GraphQLInt)
					}
				},
				resolve: (root, {itemId}, source, fieldASTs) => {
					var projections = getProjection(fieldASTs);
					var foundItems = new Promise((resolve, reject) => {
						ToDoMongo.find({itemId}, projections, (err, todos) => {
							err ? reject(err) : resolve(todos)
						})
					}) 
					return foundItems

				}
			}
		}
	})
});

module.exports = schema