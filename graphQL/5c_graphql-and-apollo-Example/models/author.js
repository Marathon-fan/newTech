import mongoose from 'mongoose';
import uuid from 'node-uuid';

const schema = mongoose.Schema;

const authorSchema = new schema({
	// name, age, book and an id 
	id: {type: String, default: uuid.v1}, //mongoDB will automatically generate an id
	name: String, 
	age: Number,
	books: [String]
});

const model = mongoose.model('author', authorSchema);
export default model;