const mongoose = require('mongoose')
const todo = require('./mongoose/todo')
const bodyParser = require('body-parser');
const path = require('path');
const express = require('express')
const app = express();
const schema = require('./graphql/Schema/Schema')
const graphql = require('graphql')
const graphqlHTTP = require('express-graphql')

app.use(bodyParser.urlencoded({extended:true}))
mongoose.connect('mongodb://localhost:27017/MongooseExample')

var db = mongoose.connection;
db.on('error', () => {
	console.log('---FAILED to connect to mongoose');
});
db.once('open', () => {
	console.log('+++conneted to mongoose');
})

app.use('/graphql', graphqlHTTP (req => ({
	schema
})))

app.post('/quotes', (req, res) => {
	//Insert into TodoList Collection
	var todoItem = new todo ({
		itemId:1,
		item:req.body.item,
		completed: false
	})

	todoItem.save((err, result) => {
		if (err) {
			console.log("---TodoItem save failed " + err)
		}
		console.log("+++TodoItem saved successfully " + todoItem.item)
		res.redirect('/')
	})
})

//start the server
app.listen(3000, () => {
	console.log("+++Express Server is running.");
});

app.get('/', (req, res) => {
	res.sendFile(__dirname + '/index.html')

});