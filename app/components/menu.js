export function Menu () {
    const $menu = document.createElement('nav');
    $menu.classList.add('menu', 'header-item')
    $menu.innerHTML = `
    <a href='#/' class='menu-home'>Home</a>
    <span>-</span>
    <a href='#/search' class='menu-search'>Search</a>
    <span>-</span>
    <a href='#/contacto' class='menu-contact'>Contact</a>
    <span>-</span>
    <a href='#/page' class='menu-page'>Change WP blog</a> 
    `;
    return  $menu;
}