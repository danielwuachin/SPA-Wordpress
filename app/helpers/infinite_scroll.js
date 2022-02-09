import { PostCard } from "../components/postCard.js";
import { SearchCard } from "../components/SearchCard.js";
import { ajax } from "./ajax.js";
import api from './wp_api.js';

export async function InfiniteScroll() {
    const d = document,
        w = window;
    console.log('dentro de la funcion');
    let query = localStorage.getItem('wpSearch'),
        apiURL,
        Component; //high order component

    w.addEventListener('scroll', async (e) => {
        let {scrollTop, clientHeight, scrollHeight} = d.documentElement,
            {hash} = w.location;
        console.log(scrollTop, clientHeight, scrollHeight);
        if(((scrollTop + clientHeight) + 1) == scrollHeight){
            api.page++;
            console.log('entrando en condicion');
            if(!hash || hash === '#/'){
                apiURL = `${api.POSTS}&page=${api.page}`;
                Component = PostCard;
            }else if (hash.includes('#/search')){
                apiURL = `${api.SEARCH}${query}&page=${api.page}`; 
                Component = SearchCard;
            }else{
                return false;
            }

            d.querySelector('.loader').style.display = 'block';
            
            await ajax({
                url: apiURL,
                cbSuccess: (posts) => {
                    let html = '';
                    console.log('etrando en fetch');
                    posts.forEach(post => html += Component(post));
                    
                    d.getElementById('main').insertAdjacentHTML('beforeend', html);
                    d.querySelector('.loader').style.display = 'none';
                }
            })
        }
    });
}