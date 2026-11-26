// Endpoint de la API
const url = "https://rickandmortyapi.com/api/character";

// Elementos del DOM
const contenedor = document.getElementById("data-container");
const mensaje = document.getElementById("mensaje");


// 1. Función para mostrar personajes
function mostrarPersonajes(personajes) {

    contenedor.innerHTML = "";

    personajes.slice(0, 8).forEach(personaje => {

        const tarjeta = document.createElement("div");
        tarjeta.classList.add("tarjeta");

        const imagen = document.createElement("img");
        imagen.src = personaje.image;
        imagen.alt = personaje.name;

        const nombre = document.createElement("h3");
        nombre.textContent = personaje.name;

        const estado = document.createElement("p");
        estado.textContent = "Estado: " + personaje.status;

        const especie = document.createElement("p");
        especie.textContent = "Especie: " + personaje.species;

        tarjeta.append(imagen, nombre, estado, especie);

        contenedor.appendChild(tarjeta);
    });
}


// 2. Obtener personajes con FETCH
async function obtenerConFetch() {

    mensaje.textContent = "Cargando personajes con Fetch...";
    contenedor.innerHTML = "";

    try {

        const respuesta = await fetch(url);

        if (!respuesta.ok) {
            throw new Error("Error al obtener los datos");
        }

        const datos = await respuesta.json();

        console.log("Datos obtenidos con Fetch:", datos);

        mostrarPersonajes(datos.results);

        mensaje.textContent = "Personajes obtenidos con Fetch";

    } catch (error) {

        console.error("Error:", error);
        mensaje.textContent = "Ocurrió un error con Fetch";
    }
}


// 3. Obtener personajes con AXIOS
async function obtenerConAxios() {

    mensaje.textContent = "Cargando personajes con Axios...";
    contenedor.innerHTML = "";

    try {

        const respuesta = await axios.get(url);

        console.log("Datos obtenidos con Axios:", respuesta.data);

        mostrarPersonajes(respuesta.data.results);

        mensaje.textContent = "Personajes obtenidos con Axios";

    } catch (error) {

        console.error("Error:", error);
        mensaje.textContent = "Ocurrió un error con Axios";
    }
}


// 4. Eventos de los botones
document.getElementById("boton-fetch")
    .addEventListener("click", obtenerConFetch);

document.getElementById("boton-axios")
    .addEventListener("click", obtenerConAxios);