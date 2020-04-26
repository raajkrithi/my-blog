import React, { useState, useEffect } from 'react';
import articleContent from './article-content';
import ArticleList from '../components/ArticleList';
import CommentsList from '../components/CommentsList';
import ErrorPage from './ErrorPage';
import UpvotesSection from '../components/UpvotesSection';
const ArticlePage= ({match}) =>{
    const name=match.params.name;
    const article= articleContent.find(article=>article.name===name);

    const [articleInfo, setArticleInfo] = useState({ upvotes:0,comments:[] });
    
    useEffect(()=>{
        const fetchData=async()=>{
         const result=await fetch(`/api/articles/${name}`) ;
         const body=await result.json(); 
         console.log(body);
         setArticleInfo(body);
        }
        fetchData();
        setArticleInfo({ upvotes: Math.ceil(Math.random()*10) });
    }, [name]);

    if (!article) return <ErrorPage/>;
    
    const otherArticles=articleContent.filter(article => article.name!==name);
    return(
        <>
        <h1>{article.title}</h1>
        <UpvotesSection articleName={name} upvotes={articleInfo.upvotes} setArticleInfo={setArticleInfo} />
        {article.content.map((paragraph,key)=>(
            <p key={key}> {paragraph}</p>
        ))}
        <CommentsList comments={articleInfo.comments} />
        <h3>Other Articles:</h3>
        <ArticleList articles={otherArticles}/>
        </>
    );
}

    export default ArticlePage; 