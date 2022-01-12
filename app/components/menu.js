export function Menu () {
    const $menu = document.createElement('nav');
    $menu.classList.add('menu')
    $menu.innerHTML = `
    <a href='#/'>Home</a>
    <span>-</span>
    <a href='#/search'>Search</a>
    <span>-</span>
    <a href='#/contacto'>Contact</a>
    <span>-</span>
    <a href='https://github.com/danielwuachin' target='_blank' rel='noopener'>Visit my GitHub</a>
    `;
    return  $menu;
}