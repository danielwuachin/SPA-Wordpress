export function SearchForm() {
    const $form = document.createElement('form'),
        d = document,
        $label = document.createElement('label'),
        $span = document.createElement('span'),
        $input = document.createElement('input');

    $form.classList.add('search-form','header-item')

    $label.classList.add('input');

    $span.classList.add('input__label');
    $span.textContent = 'Search'

    $input.classList.add('input__field');
    $input.name = 'search';
    $input.type = 'search';
    $input.placeholder = ' ';
    $input.autocomplete = 'off';
    

    $label.appendChild($input);

    $label.appendChild($span);
    
    $form.appendChild($label);

    if (location.hash.includes('#/search')){
        $input.value = localStorage.getItem('wpSearch'); 
    }

    d.addEventListener('search', e => {
        if(!e.target.matches('input[type="search"]')) return false;

        if(!e.target.value) localStorage.removeItem('wpSearch');
    })


    d.addEventListener('submit', e => {
        if(!e.target.matches('.search-form')) return false;

        e.preventDefault();
        localStorage.setItem('wpSearch', e.target.search.value);
        location.hash = `#/search?search=${e.target.search.value}`;
    })


    return $form;
}