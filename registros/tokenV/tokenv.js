function verificarToken() {
    const token = localStorage.getItem('token');
   
    if (!token) {
        // Si no hay token, redirigir al login
        window.location.href = '/login.html';  // Cambia a la ruta de tu login
        return false;
    }
 
 
    // Si el token está presente, validarlo en el backend (opcional)
    fetch('http://localhost:3001/verificar-token', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    .then(response => response.json())
    .then(data => {
        if (data.validado) {
            // Token válido, cargar la página de clases
            cargarDOM();
        } else {
            // Token inválido, redirigir al login
            localStorage.removeItem('token');
            window.location.href = '/login.html';  // Cambia a la ruta de tu login
        }
    })
    .catch(error => {
        console.error('Error al verificar el token:', error);
        localStorage.removeItem('token');
        window.location.href = '/login.html';  // Cambia a la ruta de tu login
    });
 }
 
 
 export {verificarToken}
 
 