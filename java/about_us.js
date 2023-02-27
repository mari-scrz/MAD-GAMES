const articulo = document.querySelector("#contenido")

function mostrarMas() {
    if (articulo.className == "abierto") {
        // leer menos
        articulo.className = "";
        button.textContent = "Mostrar más";
    } else {
        // leer más
        articulo.className = "abierto";
        button.textContent = "Mostrar menos";
    }
}