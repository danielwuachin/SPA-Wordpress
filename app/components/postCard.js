export function PostCard(props) {
    let {date, id, slug, title, _embedded} = props;
    let dateFormat = new Date(props.date).toLocaleString(),
        urlPoster = _embedded['wp:featuredmedia'] ? _embedded['wp:featuredmedia'][0].source_url : "app/assets/favicon.jpg" ;

    /* save the id in localstorage */
    document.addEventListener('click', e => {
        if(!e.target.matches('.post-card a')) return false;
        localStorage.setItem('wpPostId', e.target.dataset.id)
    })
    
    return `
    <article class='post-card'>
        <img alt='${title.rendered}' src='${urlPoster}'  >
        <h2>${title.rendered}</h2>
        <p>
            <time datetime='${date}'>${dateFormat}</time>
            <a href='#/${slug}' data-id='${id}'>See post</a>
        </p>
    </article>
    `;
}