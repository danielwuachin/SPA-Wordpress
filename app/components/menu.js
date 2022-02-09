export function Menu () {
    const $menu = document.createElement('nav');
    $menu.classList.add('menu', 'header-item')
    $menu.innerHTML = `
    <a href='#/'>Home</a>
    <span>-</span>
    <a href='#/search'>Search</a>
    <span>-</span>
    <a href='#/contacto'>Contact</a>
    <span>-</span>
    <a href='#/page'>Change WP blog</a>
    
    
    `;
    return  $menu;
}