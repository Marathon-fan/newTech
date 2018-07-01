import mongoose from 'mongoose';
import authorModel from './models/author.js'

const resolvers = {
	Query: {
		authors: () => {
			return authorModel.find({});
		},
		authorByAge: (root , {age}) => {
			return authorModel.find({age: age});
		},

		// author: (root, args) => {
		// 	const age = args.age;
		// 	return authors.find(author => author.age === age);
		// },
		authorById: (root, {id}) => {
			return authorModel.findOne({id: id}); // return the first result
		}		
	},
	Mutation: {
		addAuthor: (root, {name, age, books}) => {
			const author = new authorModel({age: age, name:name, books: books});
			return author.save();
		},
		deleteAuthor: (root, {id}) => {
			//return authorModel.remove({id: id})
			return authorModel.findOneAndRemove({id: id})
		},
	    updateAuthor: (root, {id, name}) => {
	    	return authorModel.findOneAndUpdate({id: id}, {name: name});
	    }
	}
}

export default resolvers;

