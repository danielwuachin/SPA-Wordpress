import { ajax } from '../helpers/ajax.js'
import api from '../helpers/wp_api.js'
import { ContactForm } from './ContactForm.js';
import { Observer } from './observer.js';
import { PageForm } from './pageForm.js';
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
        let $home = document.querySelector('.menu-home');
        $home.style.color = "#ffa500";
        await ajax({
            url: api.POSTS,
            cbSuccess: (posts) => {
                let html = '';
    
                posts.forEach((post) => html += PostCard(post));
                $main.innerHTML = html;
                
                
                Observer('.post-card')

            }
        });
    }else if (hash.includes('#/search')){
        let $search = document.querySelector('.menu-search');
        $search.style.color = "#ffa500";
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
                    No results found to <mark>${query}</mark> 
                    </p>
                    `;
                }else {
                    search.forEach((post) => html += SearchCard(post));
                }
                $main.innerHTML = html;

                Observer('.post-card')
            }
        });


    }else if(hash === '#/contacto'){
        let $contact = document.querySelector('.menu-contact');
        $contact.style.color = "#ffa500";
        $main.appendChild(ContactForm());

        Observer('.contact-form')
        
    }else if(hash === '#/page'){
        let $page = document.querySelector('.menu-page');
        $page.style.color = "#ffa500";
        $main.appendChild(PageForm());
        
        Observer('.page-section')
    }
    
    else {  
        await ajax({
            url: `${api.POST}/${localStorage.getItem('wpPostId')}`,
            cbSuccess: (post) => {

                $main.innerHTML= Post(post)
            }
        });
    }

    d.querySelector('.loader').style.display = 'none';
}