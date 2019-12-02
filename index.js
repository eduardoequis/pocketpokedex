// DOM Elements
let description = document.querySelector('.text').children // O = Nombre / 1 = Descripcion
let imagen = document.querySelector(".sprite").children[0]
let button = document.querySelector('button')

// Endpoints de la Api
let endpoint = 'https://pokeapi.co/api/v2/pokemon/'
let endpointDescription = 'https://pokeapi.co/api/v2/pokemon-species/'

// Funcion que llama a la API y trae la info combinada y desordenada.
function getPokemon() {

    let pokemonNumber = Math.round(Math.random() * 250)

    let apiRequest1 = fetch(endpoint + pokemonNumber).then(response => response.json());
    let apiRequest2 = fetch(endpointDescription + pokemonNumber).then(response => response.json());

    Promise.all([apiRequest1,apiRequest2])
    .then(function(values){
        return {
        nombre: values[0],
        datos: values[1]
        }
    })
    .then(arrangeInfo)
    .then(renderInfo)
}

// Organiza la info combinada de la API en un mismo objeto.
function arrangeInfo(infoTotal){

    return {
    nombre: infoTotal.nombre.name,
    numero: infoTotal.nombre.id,
    imagen: infoTotal.nombre.sprites.front_default,
    descripcion: infoTotal.datos.flavor_text_entries.filter(
           function(element) {
            if (element.language.name === "es"){
                console.log(element.flavor_text)
                return element.flavor_text
                }
            })
   }
}

// Actualiza el front
function renderInfo(pokemon) {
    
    imagen.src = pokemon.imagen
    description[0].textContent = pokemon.nombre.toUpperCase()
    description[1].textContent = pokemon.descripcion[0].flavor_text

}

// Funcion que activa el botón
function requestPokemon() {
   getPokemon()
}

button.addEventListener('click', requestPokemon)









