const mongoose = require('mongoose');

const express = require('express');
const app = express();

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

mongoose
	.connect('mongodb://localhost:27017/my-blog')
	.then(client => {
		console.log(`Connected to database 🚀`);
	})
	.catch(e => console.log('error connecting to db' + e));
