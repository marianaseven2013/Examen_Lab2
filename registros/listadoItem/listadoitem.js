// En listadoitem.js:
import { h_Header } from '../../componentes/header/header.js';

function ItemDatos(alumnos) {
    let listadosAl = document.createElement('div');
    listadosAl.className = "listAl";

    // Agregar header
    const header = h_Header();
    listadosAl.appendChild(header);
    
    // Lista de elementos
    let foms = document.createElement('div');
    foms.className = "flist";
    
    // Usar los alumnos recibidos en lugar de la lista estática
    alumnos.forEach((alumno) => {
        const itemContainer = document.createElement('div');
        itemContainer.className = 'list-item';
        
        // Contenido del item (nombre del alumno)
        const content = document.createElement('div');
        content.className = 'item-content';
        content.textContent = alumno.nombre; // Asume que cada alumno tiene un campo 'nombre'
        itemContainer.appendChild(content);
        
        // Botón ✓ (Asistió)
        const checkBtn = document.createElement('button');
        checkBtn.className = 'check-btn';
        checkBtn.textContent = '✓';
        checkBtn.addEventListener('click', function() {
            const xBtn = this.parentElement.querySelector('.x-btn');
            this.classList.toggle('active');
            if (this.classList.contains('active')) {
                xBtn.classList.remove('active');
                registrarAsistencia(alumno.id, 'Si'); // Función para registrar asistencia
            }
        });
        itemContainer.appendChild(checkBtn);
        
        // Botón X (No asistió)
        const xBtn = document.createElement('button');
        xBtn.className = 'x-btn';
        xBtn.textContent = 'X';
        xBtn.addEventListener('click', function() {
            const checkBtn = this.parentElement.querySelector('.check-btn');
            this.classList.toggle('active');
            if (this.classList.contains('active')) {
                checkBtn.classList.remove('active');
                registrarAsistencia(alumno.id, 'No'); // Función para registrar inasistencia
            }
        });
        itemContainer.appendChild(xBtn);
        
        foms.appendChild(itemContainer);
    });
    
    listadosAl.appendChild(foms);
    
    // Contenedor para botón y fecha
    const buttonDateContainer = document.createElement('div');
    buttonDateContainer.className = 'button-date-container';
    
    // Fecha (actualizable)
    const dateContainer = document.createElement('div');
    dateContainer.className = 'date-container';
    const dateDisplay = document.createElement('div');
    dateDisplay.className = 'current-date';
    
    function updateDate() {
        const options = { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        };
        dateDisplay.textContent = new Date().toLocaleDateString('es-ES', options);
    }
    
    updateDate();
    dateContainer.appendChild(dateDisplay);
    buttonDateContainer.appendChild(dateContainer);
    
    listadosAl.appendChild(buttonDateContainer);
    
    return listadosAl;
}

// Función para registrar asistencia
async function registrarAsistencia(alumnoId, estado) {
    try {
        const usuario = JSON.parse(localStorage.getItem('usuario'));
        const response = await fetch('http://localhost:3005/asistencia', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                usuario_id: usuario.id,
                grado_id: usuario.grado_id,
                alumnos_id: alumnoId,
                estado: estado
            })
        });
        
        const data = await response.json();
        
        if (!response.ok) {
            throw new Error(data.mensaje || 'Error al registrar asistencia');
        }
        
        console.log('Asistencia registrada:', data);
    } catch (error) {
        console.error('Error al registrar asistencia:', error);
        alert('Error al registrar asistencia');
    }
}

export { ItemDatos };