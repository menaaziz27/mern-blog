const express = require('express');
const app = express();
const Article = require('./models/Article');
require('./utils.js/db');

let articlesInfo = {
	'learn-react': {
		comments: [],
	},
	'learn-node': {
		comments: [],
	},
	'my-thoughts-on-learning-react': {
		comments: [],
	},
};

app.use(express.json());

app.post('/api/articles/', async (req, res, next) => {
	try {
		const article = await Article.create(req.body);
		res.status(200).json(article);
	} catch (error) {
		if (!error.statusCode) {
			error.statusCode = 500;
		}
		next(error);
	}
});

app.get('/api/articles/:name', async (req, res, next) => {
	const name = req.params.name;
	console.log(name);
	try {
		const article = await Article.findOne({ name });
		if (!article) {
			const error = new Error('No article found!');
			error.status = 404;
			throw error;
		}
		res.status(200).json(article);
	} catch (error) {
		if (!error.statusCode) {
			error.statusCode = 500;
		}
		next(error);
	}
});

app.post('/api/articles/:name/add-comments', async (req, res, next) => {
	const { username, text } = req.body;
	const articleName = req.params.name;

	articlesInfo[articleName].comments.push({ username, text });
	res.status(200).send(articlesInfo[articleName]);
});

app.use((error, req, res, next) => {
	console.log(error.message);
	const status = error.statusCode || 500;
	const message = error.message;
	const data = error.data;
	res.status(status).json({ message: message, data: data });
});

app.listen(8080);
