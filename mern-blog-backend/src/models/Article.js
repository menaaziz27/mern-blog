const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const articleSchema = new Schema({
	name: String,
	comments: {
		type: [{}],
		default: [],
	},
});

const Article = mongoose.model('Article', articleSchema);
module.exports = Article;
