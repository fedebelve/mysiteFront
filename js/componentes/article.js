
const d = document;

d.addEventListener("DOMContentLoaded", e => {
    const params = new URLSearchParams(window.location.search)
    const pk = params.get('pk')

    getProyecto(pk)
})


async function getProyecto(pk){

    const $article = d.querySelector(".articulo"),
    $fragment = document.createDocumentFragment(),
    $template = d.getElementById("template-article").content

    try{
        const url_api="http://localhost:8000/proyecto/id/",
              url = "http://localhost:5501/article.html?pk="
        let res = await fetch(url_api + pk),
        json = await res.json()

        console.log(json)
        
        if(!res.ok) throw { status: res.status, statusText: res.statusText }
        const article = json[0]

        const prevPK = parseInt(pk)-1
        const postPK = parseInt(pk)+1
        d.querySelector(".nav ul li:nth-child(1) a").href = url+prevPK.toString()
        d.querySelector(".nav ul li:nth-child(3) a").href = url+postPK.toString()

        if(article.isLast === true){
            d.querySelector(".nav ul li:nth-child(3)").style.display = 'none'
        } 

        if(article.id === 1){
            d.querySelector(".nav ul li:nth-child(1)").style.display = 'none'
        } 
        
        $template.querySelector("h1").textContent = article.title
        $template.querySelector(".header span:nth-child(2)").textContent = article.year
        $template.querySelector(".header span:nth-child(3)").textContent = article.duration
        $template.querySelector(".article-description p").textContent = article.description
        const $divTags = $template.querySelector(".card-tags")
        let $tags = ''
        article.tag.forEach(tag => {
           let $tag = "<p>" + tag + "</p>"
           $tags = $tags + $tag
           
        })
        $divTags.innerHTML = $tags

        $fragment.appendChild($template)
        $article.appendChild($fragment)


    }catch(err){
        console.log(err)
        let message = err.statusText || "Ocurrió un error"
        $article.innerHTML = `Error ${err.status}: ${message} `
    }finally{

    }
}

