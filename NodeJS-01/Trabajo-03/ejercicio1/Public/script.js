//DECLARAMOS VARIABLES A UTILIZAR
var elementoH1 = "";
var existeH1 = false;

var elementoImagen = "";
var existeImagen = false;

var cambioColor = false;

//FUNCION AGREGAR UN H1 SI NO SE AGREGO TODAVIA
function agregarH1(){
    if(!existeH1){
        elementoH1 = document.createElement("h1");
        elementoH1.textContent = "Hola DOM";
        document.getElementById("container__h1").appendChild(elementoH1);
        existeH1 = true 
    }
}
//FUNCION CAMBIA EL CONTENIDO DEL H1 SI EL MISMO FUE CREADO
function cambiarH1(){
    if(existeH1){
        if( elementoH1.textContent == "Hola DOM"){
            elementoH1.textContent = "Chau DOM";
        } else{
            elementoH1.textContent = "Hola DOM";
        }
    }
}

//FUNCION CAMBIAR EL COLOR DEL CONTENIDO DEL H1 SI EL MISMO FUE CREADO
function colorH1(){
    if (existeH1) {
        if(!cambioColor) {
            elementoH1.style.color = "#8e4";
            cambioColor = true;
        } else {    
            elementoH1.style.color = "#e84";
            cambioColor = false;
        }
    }
}
//FUNCION AGREGAR UNA IMAGEN SI NO SE AGREGO TODAVIA
function agregarImagen(){
    if(!existeImagen){
        elementoImagen = document.createElement("img");
        elementoImagen.src = "Imagenes/imagen-1.png";
        elementoImagen.style.width = "300px";
        document.getElementById("container__img").appendChild(elementoImagen);
        existeImagen = true;
    }
}
//FUNCION CAMBIAR LA IMAGEN SI EL MISMO FUE CREADO
function cambiarImagen(){
    if(existeImagen){
        if(elementoImagen.src.includes("imagen-1.png")){
            elementoImagen.src = "Imagenes/imagen-2.png";
        } else {
            elementoImagen.src = "Imagenes/imagen-1.png";
        }
    }
}
//FUNCION CAMBIAR EL TAMAÑO DE LA IMAGEN SI EL MISMO FUE CREADO
function cambiarTamanio(){
    if(existeImagen){
        if(elementoImagen.style.width == "300px")
            elementoImagen.style.width = "150px"
        else {
            elementoImagen.style.width = "300px"
        }
    }
}