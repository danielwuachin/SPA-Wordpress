import api from '../helpers/wp_api.js';


export function PageForm() {
  const $form = document.createElement('form'),
      d = document,
      $input = document.createElement('input'),
      $section = document.createElement('section');

  $section.classList.add('page-section');

  $section.innerHTML = `
        <h3>Write the name of the WP blog you want to use</h3>
        <h4>Notes</h4>
        <ul>
            <li>Only write te name of the domain, for example: css-tricks, wptavern, malvestida, etc</li>
            <li>Some WP sites have blocked by CORS policy, that pages doesn't work here 😢</li>
            <li>To reset to the default page, leave in blank and hit enter</li>
        </ul>
        <br>
        `;

  $form.classList.add('search-form');

  $input.name = 'search';
  $input.type = 'search';
  $input.placeholder = '';
  $input.autocomplete = 'off';

  $form.appendChild($input);

  $section.appendChild($form)

  if (location.hash.includes('#/')){
      $input.value = localStorage.getItem('wpPage'); 
  }

  d.addEventListener('search', e => {
      if(!e.target.matches('input[type="search"]')) return false;

      if(!e.target.value) localStorage.removeItem('wpPage');
  })


  d.addEventListener('submit', e => {
      if(!e.target.matches('.search-form')) return false;

      e.preventDefault();
      localStorage.setItem('wpPage', e.target.search.value);
      setTimeout(() => {
          location.href = 'http://127.0.0.1:5500/index.html#/';
          location.reload();
      }, 50);
  })


  return $section;
}