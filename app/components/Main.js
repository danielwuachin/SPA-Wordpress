import { SearchForm } from "./SearchForm.js"
export function Main() {
    const $main = document.createElement('main'),
        $header = document.querySelector('header');
    $main.id = 'main';


    if(!location.hash.includes('#/search')) $main.classList.add('grid-fluid');
    else $header.appendChild(SearchForm());
    
    return $main;
}