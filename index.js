import { loggin } from './registros/login/login.js';
import { listClases } from './componentes/listado/listado.js';
import { ItemDatos } from './registros/listadoItem/listadoitem.js';

const DOM = document.querySelector("#root");

// Función para mostrar el login
function mostrarLogin() {
    DOM.innerHTML = "";
    DOM.appendChild(loggin());
    
    // Configurar el evento de submit
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', manejarLogin);
    }
}

async function manejarLogin(event) {
  event.preventDefault();
  
  const username = document.getElementById('username').value.trim();
  const password = document.getElementById('password').value.trim();
  
  if (!username || !password) {
    alert('Por favor complete todos los campos');
    return;
  }

  try {
    const response = await fetch('http://localhost:3005/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ 
        nombre: username, 
        contraseña: password
      })
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.mensaje || 'Error en el login');
    }

    localStorage.setItem('usuario', JSON.stringify(data.usuario));
    mostrarItemDatos(data.usuario.grado_id); // Cambiado de mostrarListadoClases a mostrarItemDatos
    
  } catch (error) {
    console.error('Error en login:', error);
    alert(error.message || 'Error al iniciar sesión');
  }
}

// Mostrar listado de clases
function mostrarListadoClases(grado_id) {
    if (!grado_id) {
        console.error("No se proporcionó grado_id");
        return mostrarLogin();
    }

    DOM.innerHTML = "";
    DOM.appendChild(listClases(grado_id));
    
    // Botón de cerrar sesión
    const logoutBtn = document.createElement('button');
    logoutBtn.textContent = 'Cerrar sesión';
    logoutBtn.className = 'logout-btn';
    logoutBtn.addEventListener('click', () => {
        localStorage.removeItem('usuario');
        mostrarLogin();
    });
    DOM.appendChild(logoutBtn);
}

// Mostrar ítems de datos
// ... (código anterior permanece igual)

// En index.js, modifica mostrarItemDatos:
async function mostrarItemDatos(grado_id) {
  if (!grado_id) {
      console.error("No se proporcionó grado_id");
      return mostrarLogin();
  }

  DOM.innerHTML = "";
  
  // Obtener los alumnos del grado_id desde el backend
  try {
      const response = await fetch(`http://localhost:3005/alumnos/${grado_id}`);
      const alumnos = await response.json();
      
      if (!response.ok) {
          throw new Error(alumnos.mensaje || 'Error al obtener alumnos');
      }
      
      // Pasar los alumnos al componente ItemDatos
      DOM.appendChild(ItemDatos(alumnos));
      
  } catch (error) {
      console.error('Error al obtener alumnos:', error);
      alert('Error al cargar la lista de alumnos');
      mostrarLogin();
  }
  
  // Botón de cerrar sesión
  const logoutBtn = document.createElement('button');
  logoutBtn.textContent = 'Cerrar sesión';
  logoutBtn.className = 'logout-btn';
  logoutBtn.addEventListener('click', () => {
      localStorage.removeItem('usuario');
      mostrarLogin();
  });
  DOM.appendChild(logoutBtn);
}

// ... (resto del código permanece igual)

// Inicialización
document.addEventListener('DOMContentLoaded', () => {
    localStorage.removeItem('usuario');
    mostrarLogin();
});

export { mostrarLogin, mostrarListadoClases, mostrarItemDatos };