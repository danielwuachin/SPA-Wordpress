import { ajax } from '../helpers/ajax.js'
import api from '../helpers/wp_api.js'
import { ContactForm } from './ContactForm.js';
import { Post } from './Post.js';
import { PostCard } from './postCard.js';
import { SearchCard } from './SearchCard.js';

export async function Router() {
    const d = document,
        w = window,
        $main = d.getElementById('main')

    let {hash} = location;

    /* to change the view */
    $main.innerHTML = '';

    if(!hash || hash === '#/'){
        await ajax({
            url: api.POSTS,
            cbSuccess: (posts) => {
                let html = '';
    
                posts.forEach((post) => html += PostCard(post));
                $main.innerHTML = html;
            }
        });
    }else if (hash.includes('#/search')){

        let query = localStorage.getItem('wpSearch');

        if(!query) {
            d.querySelector('.loader').style.display = 'none'; 
            return false
        }

        await ajax({
            url: `${api.SEARCH}${query}`,
            cbSuccess: (search) => {
                let html = '';
    
                if(search.lenght === 0) {
                    html = `
                    <p class='error'>
                        No existen resultados de busqueda para el termino <mark>${query}</mark>
                    </p>
                    `;
                }else {
                    search.forEach((post) => html += SearchCard(post));
                }
                $main.innerHTML = html;
            }
        });


    }else if(hash === '#/contacto'){
        $main.appendChild(ContactForm());
        
    }else {  
        await ajax({
            url: `${api.POST}/${localStorage.getItem('wpPostId')}`,
            cbSuccess: (post) => {

                $main.innerHTML= Post(post)
            }
        });
    }

    d.querySelector('.loader').style.display = 'none';
}