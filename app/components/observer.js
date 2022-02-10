export function Observer(element) {
    const $elements = document.querySelectorAll(element);

  
  
    //los entries son como los eventos que recibe el addEventListener
    const cb = (entries) =>{
      entries.forEach(entry => {

            if(entry.isIntersecting){
                //si el video es intersectado, dale play
                entry.target.classList.add('intersected');
            }else {
                entry.target.classList.remove('intersected');
            }
  
            //al cambiar pestañas se pausa el video
            window.addEventListener("visibilitychange", e => document.visibilityState === "visible" 
            ? entry.target.classList.add('intersected')
            : entry.target.classList.remove('intersected'))
        })
    }
    const observer = new IntersectionObserver(cb, {threshold:0.1});
  
    //el observe() es para que funcione le observador
    $elements.forEach(el => observer.observe(el))
}