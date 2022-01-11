export async function ajax(props) {
    /* no le pasamos cabecera ni metodo https porque solo usaremos get */
    let {url, cbSuccess, mode} = props;

    await fetch(url, {
        method: 'GET',
        mode: 'cors'
    })
    .then(res => res.ok ? res.json() : Promise.reject(res))
    .then(json => cbSuccess(json))
    .catch(err => {
        let message = err.statusText || 'Ocurrio un error al acceder a la API';

        document.getElementById('main').innerHTML = `<div class="error">
        <p>Error ${err.status}: ${message}</p>
        </div>`;

        document.querySelector('.loader').style.display = 'none';

        console.log(err)
    })
}