export async function getFormacion(table){

    const d = document,
    $table = d.querySelector(table).children, 
    $fragment = document.createDocumentFragment(),
    $template = d.getElementById("template-fila").content
    

    try{
        let res = await fetch("http://localhost:8000/formacion"),
        json = await res.json()

        if(!res.ok) throw { status: res.status, statusText: res.statusText }

        json.forEach(el => {
            
            $template.querySelector("tr td:nth-child(1)").textContent = el.year
            $template.querySelector("tr td:nth-child(2)").textContent = el.type
            $template.querySelector("tr td:nth-child(3)").textContent = el.place
            $template.querySelector("tr td:nth-child(4)").textContent = el.description
            
            let $clone = d.importNode($template, true)

            $fragment.appendChild($clone)
        
        });

        $table[0].appendChild($fragment)

    }catch(err){
        console.log(err)
        let message = err.statusText || "Ocurrió un error"
        $table.innerHTML = `Error ${err.status}: ${message} `
    }finally{

    }
}