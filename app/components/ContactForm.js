export function ContactForm() {
    const d = document,
        $form = d.createElement('form'),
        $styles = d.getElementById('dynamic-styles');

    $form.classList.add('contact-form');


    $form.innerHTML = `

    <h2><a href='https://github.com/danielwuachin' target='_blank' rel='noopener'>Visit my GitHub</a></h2>

    <h4>or</h4>
    <h3>Contact me!</h3>
    <label class='input'>
        <input type="text" class='input__field' name="name" placeholder=" " title="Only letters and spaces" pattern="[a-zA-ZñÑáÁéÉíÍóÓúÚ\\s]+$" required></input>
        <span class='input__label'>Name</span>
    </label>
    
    <br>
    <label class='input input-1'>
        <input type="email" class='input__field' name="email" placeholder=" " title="wrong email" pattern="^[a-z0-9]+(\\.[_a-z0-9]+)*@[a-z0-9-]+(\\.[a-z0-9-]+)*(\\.[a-z]{2,15})$" required></input>
        <span class='input__label'>Email</span>
    </label>

    <br>
    <label class='input'>
        <input type="text" class='input__field' name="subject" placeholder=" " title="This is requeried" required ></input>
        <span class='input__label'>Title</span>
    </label>
    
    <br>
    <label class='input'>
    <textarea name="comments" class='input__field' cols="50" rows="5" placeholder=" " required data-pattern="^.{1,255}$" title="Max of 255 characters"></textarea>
        <span class='input__label'>Message</span>
    </label>


    <br>
    <input type="submit" value="Enviar">

    <div class="contact-form-loader none">
        <img src="app/assets/circles.svg" alt="Cargando">
    </div>

    <div class="contact-form-response none">
        <p>los datos han sido enviados</p>
    </div>
    `;


    function validationForm() {
        const $form = d.querySelector('.contact-form'),
            $inputs = d.querySelectorAll('.contact-form [required]');

        $inputs.forEach(input => {
            const $span = d.createElement("span"),
                $label = input.parentNode;
            $span.id = input.name;
            $span.textContent = input.title;
            $span.classList.add('contact-form-error');
            $label.insertAdjacentElement('beforeend', $span);
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
                let message = err.statusText || 'Please, refresh and send again';
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