import {menuProyectos, getProyectos} from "./componentes/menuProyectos.js";
import { scrollSpy,btnInicio } from "./componentes/scroll_spy.js";
import { getFormacion } from "./componentes/table.js";

const d = document;
d.addEventListener("DOMContentLoaded", e => {
   menuProyectos(".tab")
   scrollSpy()
   getFormacion(".table")
   getProyectos("all")
   taza("taza")
})

function taza(taza){
    d.getElementById(taza).playbackRate = 5;
}