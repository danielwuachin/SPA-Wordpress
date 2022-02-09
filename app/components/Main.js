import { SearchForm } from "./searchForm.js"
export function Main() {
    const $main = document.createElement('main'),
        $header = document.querySelector('header');
    $main.id = 'main';


    if(location.hash.includes('#/search')) $header.appendChild(SearchForm());
    else $main.classList.add('grid-fluid'); 
    return $main;
}