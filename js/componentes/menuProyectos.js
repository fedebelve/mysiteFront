const d = document
export function menuProyectos(btnActivo){

    d.addEventListener("click", e => {

        if(e.target.matches(btnActivo)) { 
            // const tab = d.querySelector()
            const tags = e.target.id.split("-")[1]
            getProyectos(tags)
            
        }
    })
}


export async function getProyectos(tags){

    const $proyectos = d.querySelector(".cards"),
    $template = d.getElementById("template-card").content,
    $fragment = d.createDocumentFragment()

    try{
        // let res = await fetch("http://localhost:3005/proyectos?tags_like="+ tags),
        let res = await fetch("http://localhost:8000/proyecto/"+ tags),
        json = await res.json()

        //if(!res.ok){throw new Error("ocurrió un error al solicitar los datos")} //puedo hacer esto, pero el new Error solo me deja pasar un string al Catch
        //lo que puedo hacer es pasarle un objeto al throw

        if(!res.ok) throw { status: res.status, statusText: res.statusText }

        json.forEach(el => {

            $template.querySelector("a").href = "http://127.0.0.1:5501/article.html?pk="+el.id
            $template.querySelector("img").src = el.img
            $template.querySelector(".card-title").textContent = el.title
            $template.querySelector(".card-dates span:nth-child(1)").textContent = el.year + " - "
            $template.querySelector(".card-dates span:nth-child(2)").textContent = el.duration
            const $divTags = $template.querySelector(".card-tags")
            let $tags = ''
            el.tag.forEach(tag => {
               let $tag = "<p>" + tag + "</p>"
               $tags = $tags + $tag
               
            })
            $divTags.innerHTML = $tags
            $template.querySelector("article > p").textContent = el.description

            let $clone = d.importNode($template, true)

            $fragment.appendChild($clone)
        
        });

        $proyectos.replaceChildren($fragment)

    }catch(err){
        console.log(err)
        let message = err.statusText || "Ocurrió un error"
        $proyectos.innerHTML = `Error ${err.status}: ${message} `
    }finally{

    }
}


// (() => {
//     const $proyectos = document.getElementById("proyectos"),
//     $fragment = document.createDocumentFragment()

//     async function getData(){
//         try{
//             let res = await fetch("http://localhost:3005/proyectos"),
//             json = await res.json()

//             //if(!res.ok){throw new Error("ocurrió un error al solicitar los datos")} //puedo hacer esto, pero el new Error solo me deja pasar un string al Catch
//             //lo que puedo hacer es pasarle un objeto al throw

//             if(!res.ok) throw { status: res.status, statusText: res.statusText }

//             json.forEach(el => {
//                 const $article = document.createElement("article")
//                 $article.classList.add("card")
//                 const $img = document.createElement("img")
//                 const $span = document.createElement("span")
//                 const $p = document.createElement("p")
//                 $img.src = el.src
//                 $span.textContent = el.since
//                 $p.textContent = el.description
                
//                 $article.appendChild($img)
//                 $article.appendChild($span)
//                 $article.appendChild($p)

//                 $fragment.appendChild($article)
            
//             });

//             console.log($fragment)
//             $proyectos.replaceChildren($fragment)
    
//         }catch(err){
//             console.log(err)
//             let message = err.statusText || "Ocurrió un error"
//             $proyectos.innerHTML = `Error ${err.status}: ${message} `
//         }finally{

//         }
//     }

//     getData()

// })();