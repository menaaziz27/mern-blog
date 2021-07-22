const express = require('express');
const app = express();
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
app.post('/api/articles/:name/add-comments', (req, res, next) => {
	const { username, text } = req.body;
	const articleName = req.params.name;

	articlesInfo[articleName].comments.push({ username, text });
	res.status(200).send(articlesInfo[articleName]);
});

app.listen(3000);
