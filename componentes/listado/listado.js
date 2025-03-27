/* import { h_Header } from '../header/header.js';

function listClases(grado_id) {
    let listadoclasess = document.createElement('div');
    listadoclasess.className = "CuadrosClases";

    let header = h_Header();
    listadoclasess.appendChild(header);

    const usuario = JSON.parse(localStorage.getItem('usuario'));
    if (!usuario) {
        console.error('Usuario no autenticado');
        return listadoclasess;
    }

    let secciones = [
        {
            nombre: "Nursery🧸", 
            clase: "seccion-nursery",
            clases: ["Nursery"]
        },
        {
            nombre: "Primaria Menor ◀︎", 
            clase: "seccion-primaria-menor",
            clases: ["Pre-kinder", "Kinder", "Prepa"]
        },
        {
            nombre: "Primaria Mayor ◀︎", 
            clase: "seccion-primaria-mayor",
            clases: ["Primero", "Segundo", "Tercero", "Cuarto", "Quinto", "Sexto"]
        },
        {
            nombre: "Básicos ◀︎", 
            clase: "seccion-basicos",
            clases: ["1Basico", "2Basico", "3Basico"]
        },
        {
            nombre: "✯ Diversificado ✯", 
            clase: "seccion-diversificado",
            clases: ["4Computación", "4Diseño", "4Biología", "4Perito", 
                     "5Computación", "5Diseño", "5Biología", "5Perito", 
                     "6Perito"]
        }
    ];

    const seccionesFiltradas = filtrarSeccionesPorGrado(secciones, usuario.grado_id);

    seccionesFiltradas.forEach(seccion => {
        let texto = document.createElement('div');
        texto.innerText = seccion.nombre;
        texto.className = 'titulo-seccion';
        listadoclasess.appendChild(texto);

        seccion.clases.forEach(clase => {
            let bttn = document.createElement('button');
            bttn.innerText = clase;
            bttn.classList.add('btn-clase');
            bttn.classList.add(clase.toLowerCase());

            bttn.addEventListener('click', () => {
                console.log(`Botón "${clase}" clickeado`);
            });

            listadoclasess.appendChild(bttn);
        });
    });

    return listadoclasess;
}

// Función corregida
function filtrarSeccionesPorGrado(secciones, grado_id) {
    const permisosPorGrado = {
        15: ["Nursery🧸", "Primaria Menor ◀︎"],
        13: ["Primaria Mayor ◀︎"],
        17: ["Básicos ◀︎", "✯ Diversificado ✯"]
    };

    const seccionesPermitidas = permisosPorGrado[grado_id] || [];
    
    return secciones
        .filter(seccion => seccionesPermitidas.includes(seccion.nombre))
        .map(seccion => ({
            ...seccion,
            clases: seccion.clases.filter(clase => clasePermitidaParaGrado(clase, grado_id))
        }));
}

function clasePermitidaParaGrado(clase, grado_id) {
    return true;
}

export { listClases }; */