export function ContactForm() {
    const d = document,
        $form = d.createElement('form'),
        $styles = d.getElementById('dynamic-styles');

    $form.classList.add('contact-form');

    $styles.innerHTML = `
    :root{
        --font: sans-serif;
        --font-size: 16px;
        --yellow-color: #f7df1e;
        --dark-color: #222;
        --yellow-color-85: rgba(247,222,30, 0.85);
        --dark-color-85: rgba(34, 34, 34, .85);
        --container-width: 1200px;
    }
    
    
    
    
    /*-------------reset----------------*/
    html{
        box-sizing: border-box;
        font-family: sans-serif;
        /* se establece en 16´x para trabajar con rems */
        font-size: 16px;
    }
    
    /* esto es para que el contenido generado dinamicamente se adate al tamaño del contenido de la etiqueta html creada anteriormente */
    *,
    *::after,
    *::before{
        box-sizing: inherit;
    }
    
    
    .contact-form {
        --form-ok-color: #4caf50;
        --form-error-color: #f44836;
        margin-left: auto;
        margin-right: auto;
        width: 80%;
    }
    
    .contact-form > * {
        padding: 0.5rem;
        margin: 1rem auto;
        display: block;
        width: 100%;
    }
    
    .contact-form textarea {
        resize: none;
    }
    
    .contact-form legend,
    .contact-form-response{
        font-size: 1.5rem;
        font-weight: bold;
        text-align: center;
    }
    
    .contact-form input,
    .contact-form textarea{
        font-size: 1rem;
        font-family: sans-serif;
    }
    
    .contact-form input[type="submit"]{
        width: 50%;
        font-weight: bold;
        cursor: pointer;
    }
    
    .contact-form *::placeholder{
        color: #000;
    }
    
    .contact-form [required]:valid {
        border: thin solid var(--form-ok-color);
    }
    
    .contact-form [required]:invalid {
        border: thin solid var(--form-error-color);
    }
    
    .contact-form-error{
        margin-top: -1rem;
        font-size: 80%;
        background-color: var(--form-error-color);
        color: #fff;
        transition: all 800ms ease;
    }
    
    .contact-form-error.is-active{
        display: block;
        animation: show-message 1s 1 normal 0s ease-out both;
    }
    
    .contact-form-loader{
        text-align: center;
    }
    
    .none {
        display: none;
    }
    
    
    @keyframes show-message {
        0% {
            visibility:hidden;
            opacity: 1;
        }
    
        100% {
            visibility: visible;
            opacity: 1;
        }
    }
    `;

    $form.innerHTML = `
    <legend>Contactame!</legend>
    <input type="text" name="name" placeholder="Escribe tu nombre" title="Nombre solo recibe letras y espacios en blanco" 
    pattern="[a-zA-ZñÑáÁéÉíÍóÓúÚ\\s]+$" required>
    <input type="email" name="email" placeholder="Escribe tu email"
    title="Email incorrecto" pattern="^[a-z0-9]+(\\.[_a-z0-9]+)*@[a-z0-9-]+(\\.[a-z0-9-]+)*(\\.[a-z]{2,15})$" required>
    <input type="text" name="subject" placeholder="Asunto a tratar" title="El asunto es requerido" required >
    <textarea name="comments" cols="50" rows="5" placeholder="Escribe tus comentarios"
    required data-pattern="^.{1,255}$" title="Tu comentario no debe exceder los 255 caracteres"></textarea>
    <input type="submit" value="Enviar">

    <div class="contact-form-loader none">
        <img src="app/assets/loader.svg" alt="Cargando">
    </div>

    <div class="contact-form-response none">
        <p>los datos han sido enviados</p>
    </div>
    `;


    function validationForm() {
        const $form = d.querySelector('.contact-form'),
            $inputs = d.querySelectorAll('.contact-form [required]');

        $inputs.forEach(input => {
            const $span = d.createElement("span");
            $span.id = input.name;
            $span.textContent = input.title;
            $span.classList.add('contact-form-error','none');
            input.insertAdjacentElement('afterend', $span);
        });

        d.addEventListener('keyup', (e)=> {
            if(e.target.matches('.contact-form [required]')){
                let $input = e.target,
                    pattern = $input.pattern || $input.dataset.pattern;

                
                if(pattern && $input.value !=="") {
                    let regex = new RegExp(pattern);
                    /* si no valida el valor, se le agrega la clase */
                    return !regex.exec($input.value) 
                        ? d.getElementById($input.name).classList.add('is-active')
                        : d.getElementById($input.name).classList.remove('is-active');
                }

                if(!pattern) {
                    return $input.value === "" 
                    ? d.getElementById($input.name).classList.add('is-active')
                    : d.getElementById($input.name).classList.remove('is-active'); 
                }
            }
        });



        d.addEventListener('submit', (e) => {
            /* quitamos default para evitar que envie algo y poder usar ajax */
            e.preventDefault()
            alert('Enviando...')

            const $loader= d.querySelector('.contact-form-loader'),
                $response = d.querySelector('.contact-form-response');
                
            $loader.classList.remove('none');

            /* post */
            fetch('https://formsubmit.co/ajax/j.d.rodriguez.1624@gmail.com', {
                method: 'POST',

                /* usamos el FormData, ya que el target del evento es el mimso formulario, y asi 
                no hace falta pasar los key: value ya ue todo esta en el formulario
                ademas, el objeto formData hace parse() de una vez a dichos elementos MIENTRAS 
                TENGAN EL atributo name ya establecido */
                body: new FormData(e.target)
            })
            .then(res => res.ok ? res.json() : Promise.reject(res))
            .then(json => {
                console.log(json)
                $loader.classList.add('none');
                $response.classList.remove('none');
                $response.innerHTML = `<p>${json.message}</p>`
                $form.reset();
            })
            .catch(err => {
                let message = err.statusText || 'Ocurrio un error al enviar, intenta nuevamente';
                $response.innerHTML = `<p>Error ${err.status}: ${message}</p>`;
            })
            .finally(() => {
                setTimeout(() => setTimeout(() => {
                    $response.classList.add('none')
                    $response.innerHTML = '';
                }, 3000));
            })


/*                 setTimeout(() => {
                
            }, 3000); */
            
        })
    }

    setTimeout(() => {
        validationForm();    
    }, 100);


    return $form
}