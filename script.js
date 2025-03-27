/* document.addEventListener('DOMContentLoaded', function () {
    const loginForm = document.getElementById('loginForm');
    loginForm.addEventListener('submit', async function (event) {
        event.preventDefault();

        const nombre = document.getElementById('nombre').value;
        const contrasena = document.getElementById('contrasena').value;

        console.log("Valores antes de enviar:", nombre, contrasena); // DEBUG

        const usuario = { nombre, contrasena };

        try {
            const respuesta = await fetch('http://localhost:3005/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(usuario) // Enviar como JSON
            });

            const data = await respuesta.json();
            console.log('Respuesta del servidor:', data);
        } catch (error) {
            console.error('Error al enviar la solicitud:', error);
        }
    });
});


// Aquí va la función obtenerGrado(), que ahora utiliza el nombre y la contraseña para obtener el grado_id
async function obtenerGrado(nombre, contrasena) {
    const usuario = { nombre, contrasena };

    const respuesta = await fetch('http://localhost:3005/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(usuario)
    });

    if (!respuesta.ok) {
        console.error("Error al iniciar sesión");
        return;
    }

    const data = await respuesta.json();
    return data.grado_id; // El grado_id del usuario
}

// El resto de tus funciones de clases, como listClases y cargarClases


// Crear la estructura de clases y botones
async function listClases() {
    const grado_id = await obtenerGrado(); // Obtener el grado del usuario

    const listadoclasess = document.createElement('div');
    listadoclasess.className = "CuadrosClases";

    // Lista de clases
    const clases = [
        { id: 1, nombre: "Nursery" },
        { id: 2, nombre: "Primero" },
        { id: 3, nombre: "Segundo" },
        { id: 4, nombre: "Tercero" },
        { id: 5, nombre: "Cuarto" },
        { id: 6, nombre: "Quinto" },
        { id: 7, nombre: "Sexto" },
        { id: 8, nombre: "1Basico" },
        { id: 9, nombre: "2Basico" },
        { id: 10, nombre: "3Basico" },
        { id: 11, nombre: "4Computación" },
        { id: 12, nombre: "4Diseño" },
        { id: 13, nombre: "4Biologia" },
        { id: 14, nombre: "4Perito" },
        { id: 15, nombre: "5Computación" },
        { id: 16, nombre: "5Diseño" },
        { id: 17, nombre: "5Biologia" },
        { id: 18, nombre: "5Perito" },
        { id: 19, nombre: "6Perito" },
        { id: 20, nombre: "Pre-kinder" },
        { id: 21, nombre: "Kinder" },
        { id: 22, nombre: "Prepa" }
    ];

    clases.forEach(clase => {
        // Crear el botón de la clase
        let bttn = document.createElement('button');
        bttn.innerText = clase.nombre;
        bttn.classList.add('btn-clase');
        
        // Si el grado del usuario no coincide con la clase, deshabilitar el botón
        if (clase.id !== grado_id) {
            bttn.disabled = true;  // Deshabilitar el botón
            bttn.style.backgroundColor = "#bdc3c7"; // Estilo para indicar que el botón está deshabilitado
        }

        // Agregar el event listener para el botón
        bttn.addEventListener('click', () => {
            console.log(`Botón "${clase.nombre}" clickeado`);
        });

        listadoclasess.appendChild(bttn);
    });

    return listadoclasess;
}

async function cargarClases() {
    document.body.appendChild(await listClases());
}

 */