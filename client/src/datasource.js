
function switchContent(articleId) {
    const articles = document.getElementsByClassName('article-params');
    for( i = 0; i < articles.length;) {
        articles.item(i).classList.remove('not-visible');
        if(articles.item(i).id !== articleId) {
            articles.item(i).classList.add('not-visible');
        }
    }
}

/*function switchContent(articleId) {
    console.log(articleId);
}*/