import React, { useState, useEffect } from 'react';
import articleContent from './article-content';
import Articles from '../components/Articles';
import CommentList from '../components/CommentList';
import AddCommentForm from '../components/AddCommentForm';
import axios from 'axios';

export const Article = ({ match }) => {
	const name = match.params.name;
	const [articleInfo, setArticleInfo] = useState({ comments: [] });
	const article = articleContent.find(article => article.name === name);
	const otherArticles = articleContent.filter(article => article.name !== name);
	useEffect(() => {
		const fetchArticle = async () => {
			const article = await axios.get(`/api/articles/${name}`);
			const data = article.data;
			console.log(data);
			setArticleInfo(data);
		};
		fetchArticle();
	}, [name]);
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
			<CommentList comments={articleInfo.comments} />
			<AddCommentForm articleName={name} setArticleInfo={setArticleInfo} />
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
