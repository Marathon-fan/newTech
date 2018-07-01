
var mongoose = require('mongoose');

var Schema = mongoose.Schema;
//create a schema
var toDoSchema = new Schema({
	itemId: Number,
	item: String, 
	completed: Boolean
}, {
	collection: "TodoList"
});

// we need to create a model using it
var todo = mongoose.model('ToDo', toDoSchema);

//export default ToDo

module.exports = todo;
//export default ToDo

