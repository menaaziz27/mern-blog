import React from 'react';
import articleContent from './article-content';
import Articles from '../components/Articles';

export const Article = ({ match }) => {
	const name = match.params.name;
	const article = articleContent.find(article => article.name === name);
	const otherArticles = articleContent.filter(article => article.name !== name);

	if (!article) return <h1>No article found!</h1>;
	return (
		<>
			<h1 className="sm:text-4xl text-2xl font-bold mt-6 text-gray-900 mb-6">
				{article.title}
			</h1>
			{article.content.map((paragraph, index) => (
				<p className="mx-auto leading-relaxed text-base mb-4" key={index}>
					{paragraph}
				</p>
			))}
			<h1 className="sm:text-4xl text-2xl font-bold mt-6 text-gray-900 mb-6">
				other articles
			</h1>
			<div className="flex flex-wrap -m-4">
				<Articles articles={otherArticles} />
			</div>
		</>
	);
};

export default Article;
