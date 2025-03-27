import { ItemDatos } from '../../registros/listadoItem/listadoitem.js';
import { mostrarLogin } from '../../index.js';

const DOM = document.querySelector("#root");

export async function CargarListado(grado_id) {
  if (!grado_id) {
      console.error("No se proporcionó grado_id");
      return mostrarLogin();
  }

  DOM.innerHTML = "";
  
  try {
      const response = await fetch(`http://localhost:3005/alumnos/${grado_id}`);
      const alumnos = await response.json();
      
      if (!response.ok) {
          throw new Error(alumnos.mensaje || 'Error al obtener alumnos');
      }
      
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