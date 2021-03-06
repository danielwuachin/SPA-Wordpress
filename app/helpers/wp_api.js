let NAME = "";

    if(!localStorage.getItem('wpPage')) NAME = 'css-tricks';
    else NAME = localStorage.getItem('wpPage');


const
    DOMAIN = `https://${NAME}.com`,
    SITE = `${DOMAIN}/wp-json`,
    API_WP = `${SITE}/WP/V2`,
    PER_PAGE = 9,
    POSTS = `${API_WP}/posts?_embed&per_page=${PER_PAGE}`,
    POST = `${API_WP}/posts`,
    CATEGORIES = `${API_WP}/categories`,
    SEARCH = `${API_WP}/search?_embed&per_page=${PER_PAGE}&search=`;

let page = 1;

export default {
    NAME,
    DOMAIN,
    SITE,
    API_WP,
    POSTS,
    POST,
    SEARCH, 
    CATEGORIES,
    PER_PAGE,
    page,
}