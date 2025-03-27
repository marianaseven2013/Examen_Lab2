import { h_Header } from '../../componentes/header/header.js';

function ItemDatos(alumnos) {
    let listadosAl = document.createElement('div');
    listadosAl.className = "listAl";

    const header = h_Header();
    listadosAl.appendChild(header);
    
    let foms = document.createElement('div');
    foms.className = "flist";
    
    const asistenciasTemporales = {};
    
    alumnos.forEach((alumno) => {
        const itemContainer = document.createElement('div');
        itemContainer.className = 'list-item';
        
        const nameContainer = document.createElement('div');
        nameContainer.className = 'item-content';
        
        const nameLine = document.createElement('div');
        nameLine.className = 'name-line';
        
        const firstName = document.createElement('span');
        firstName.className = 'first-name';
        firstName.textContent = alumno.nombre;
        
        const lastName = document.createElement('span');
        lastName.className = 'last-name';
        lastName.textContent = alumno.apellido;
        
        nameLine.appendChild(firstName);
        nameLine.appendChild(document.createTextNode(' '));
        nameLine.appendChild(lastName);
        nameContainer.appendChild(nameLine);
        itemContainer.appendChild(nameContainer);
        
        //Boton chequesito
        const checkBtn = document.createElement('button');
        checkBtn.className = 'check-btn';
        checkBtn.textContent = '✓';
        checkBtn.addEventListener('click', function() {
            const xBtn = this.parentElement.querySelector('.x-btn');
            this.classList.toggle('active');
            if (this.classList.contains('active')) {
                xBtn.classList.remove('active');
                asistenciasTemporales[alumno.id] = 'Si';
            } else {
                delete asistenciasTemporales[alumno.id];
            }
        });
        itemContainer.appendChild(checkBtn);
        
        //Boton Equis
        const xBtn = document.createElement('button');
        xBtn.className = 'x-btn';
        xBtn.textContent = 'X';
        xBtn.addEventListener('click', function() {
            const checkBtn = this.parentElement.querySelector('.check-btn');
            this.classList.toggle('active');
            if (this.classList.contains('active')) {
                checkBtn.classList.remove('active');
                asistenciasTemporales[alumno.id] = 'No';
            } else {
                delete asistenciasTemporales[alumno.id];
            }
        });
        itemContainer.appendChild(xBtn);
        
        foms.appendChild(itemContainer);
    });
    
    listadosAl.appendChild(foms);
    
    // Contenedor para botón y fecha
    const buttonDateContainer = document.createElement('div');
    buttonDateContainer.className = 'button-date-container';
    
    // Esto es para que la fecha se valla actualizando
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
    
    // Botón Guardar
    const saveButton = document.createElement('button');
    saveButton.className = 'save-button';
    saveButton.textContent = 'Guardar';
    saveButton.addEventListener('click', async () => {
        await guardarAsistencias(asistenciasTemporales);
    });
    buttonDateContainer.appendChild(saveButton);
    
    listadosAl.appendChild(buttonDateContainer);
    
    return listadosAl;
}

// Función para guardar todas las asistencias
async function guardarAsistencias(asistencias) {
    try {
        const usuario = JSON.parse(localStorage.getItem('usuario'));
        const grado_id = usuario.grado_id;
        
        const asistenciasArray = Object.entries(asistencias).map(([alumno_id, estado]) => ({
            usuario_id: usuario.id,
            grado_id,
            alumnos_id: alumno_id,
            estado
        }));
        
        const response = await fetch('http://localhost:3005/asistencia/multiple', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(asistenciasArray)
        });
        
        const data = await response.json();
        
        if (!response.ok) {
            throw new Error(data.mensaje || 'Error al guardar asistencias');
        }
        
        alert('Asistencias guardadas correctamente');
        console.log('Asistencias guardadas:', data);
    } catch (error) {
        console.error('Error al guardar asistencias:', error);
        alert('Error al guardar asistencias: ' + error.message);
    }
}

export { ItemDatos };