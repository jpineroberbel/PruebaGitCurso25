
function maquetarPelis(contenedor, listaPelis )
{
 for (let pelicula of listaPelis)
    {
        div = document.createElement("div");
            
        div.addEventListener("click", ()=> lanzaPeticionDetalle(pelicula.imdbID));

        let imagen = document.createElement("img");
        imagen.onerror = (e)=> e.target.src = "./error.jpg"
        
        imagen.src = pelicula.Poster;
        texto = document.createElement("p");
        texto.innerHTML = pelicula.Title;

        div.appendChild(imagen);
        div.appendChild(texto);
        contenedor.appendChild(div);

    }
}
var contadorPaginas = 1;
function lanzaPeticionDetalle(id)
{
    fetch("https://www.omdbapi.com/?i="+id+"&apikey=9de3cf92").then(response => response.json())
        .then(data => {
            console.log(data);
        });
}

function lanzaPeticion(url)
{
    if (!peticionEnCurso)
    { 
        peticionEnCurso = true;
        fetch(url).then(response => response.json()).then(data => {
                /** Procesar los datos **/
            maquetarPelis(contenedor, data.Search)
            contadorPaginas++;
            peticionEnCurso = false;
        });

    }

}
window.onload = ()=>
{
    peticionEnCurso =false;
    cont = document.getElementById("contenedor");
    cajaTexto = document.getElementById("cajaTexto");
    cajaTexto.addEventListener("change",(e)=>console.log(cajaTexto.value));
    document.getElementById("btnCargar").addEventListener("click", ()=>{
                 lanzaPeticion("https://www.omdbapi.com/?s="+cajaTexto.value+"&apikey=9de3cf92&page="+contadorPaginas);
    });

    document.getElementById("btnBuscar").addEventListener("click", ()=>{
        cont.innerHTML = "";
        contadorPaginas=1;
        lanzaPeticion("https://www.omdbapi.com/?s="+cajaTexto.value+"&apikey=9de3cf92&page="+contadorPaginas);
     
    });

     landing = document.getElementById("landing");
     buscador = document.getElementById("buscador");
     document.getElementById("btnAccederBuscador").addEventListener("click", ()=>{
                 landing.style.visibility= "hidden";
                 buscador.style.visibility= "visible";
    });
}

window.onscroll = () => {
    let cercaFinal = (window.innerHeight + window.scrollY >= document.body.offsetHeight -200)

    if (cercaFinal)
        lanzaPeticion("https://www.omdbapi.com/?s="+cajaTexto.value+"&apikey=9de3cf92&page="+contadorPaginas);
};
    

















/*
window.addEventListener("scroll", () => {
  const nearBottom =
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 200;

  if (nearBottom) {
    console.log("Salta")
  }
});*/