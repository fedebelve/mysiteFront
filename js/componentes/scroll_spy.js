const d = document

export function scrollSpy(){

    const $sections = d.querySelectorAll("section[data-scroll-spy]")
    const cb = entries =>{ //los entries es lo que entra en la visualización
        //console.log("entries --> ", entries)
        entries.forEach(entry => {
            const id = entry.target.getAttribute("id")

            if(entry.isIntersecting){
                d.querySelector(`a[data-scroll-spy][href="#${id}"]`).classList.add("active")

            }else{
                d.querySelector(`a[data-scroll-spy][href="#${id}"]`).classList.remove("active")
                // d.querySelector(`a[data-scroll-spy][href="#inicio"]`).classList.remove("active")
            }
        })
    }

    const observer = new IntersectionObserver(cb, { // detecta cuando en la parte visible se encuentra un elemento. Dispara una callback y en 2do parámetro options
        //root
        //rootMargin: "-300px "
        threshold: [0.70, 0.75], //cuando tenga una visibilidad del 50 al 75 % de su anchura
    }) 

    $sections.forEach( el => observer.observe(el)) //le digo a quién me interesa estar observando, en este caso a section
}

export function btnInicio(){
    d.addEventListener("click", e => {
        if(e.target.matches(".inicio")) { 
            // console.log("AAA")
            d.querySelector(".inicio").classList.add("active")
        }else{
            d.querySelector(".inicio").classList.remove("active")
        }
    })
}