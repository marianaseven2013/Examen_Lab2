import { Loginp_p } from './registros/login/login.js';
import { CargarListado } from './componentes/listadoClases/listadoClases.js'; 

const DOM = document.querySelector("#root");

// Función para mostrar el login
function mostrarLogin() {
    DOM.innerHTML = "";
    DOM.appendChild(Loginp_p());
    
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
    CargarListado(data.usuario.grado_id); 
    
  } catch (error) {
    console.error('Error en login:', error);
    alert(error.message || 'Error al iniciar sesión');
  }
}

document.addEventListener('DOMContentLoaded', () => {
    localStorage.removeItem('usuario');
    mostrarLogin();
});

export { mostrarLogin }; 