function loggin() {
    let loginContainer = document.createElement('div');
    loginContainer.className = 'login-container';
    
    let loginBox = document.createElement('div');
    loginBox.className = 'login-box';
    
    let title = document.createElement('h1');
    title.textContent = 'Ingresa para ver tu listado!';
    title.className = 'login-title';
    
    let form = document.createElement('form');
    form.id = 'login-form';
    
    // Campo de usuario
    let userField = document.createElement('div');
    userField.className = 'form-field';
    
    let userLabel = document.createElement('label');
    userLabel.textContent = 'Tu Nombre de usuario';
    userLabel.htmlFor = 'username';
    
    let nombreInput = document.createElement('input');
    nombreInput.type = 'text';
    nombreInput.id = 'username';
    nombreInput.placeholder = 'Nombre de usuario';
    nombreInput.required = true;
    nombreInput.className = 'form-input';
    
    userField.appendChild(userLabel);
    userField.appendChild(nombreInput);
    
    // Campo de contraseña
    let passField = document.createElement('div');
    passField.className = 'form-field';
    
    let passLabel = document.createElement('label');
    passLabel.textContent = 'Tu Contraseña';
    passLabel.htmlFor = 'password';
    
    let contraseñaInput = document.createElement('input');
    contraseñaInput.type = 'password';
    contraseñaInput.id = 'password';
    contraseñaInput.placeholder = 'Contraseña';
    contraseñaInput.required = true;
    contraseñaInput.className = 'form-input';
    
    passField.appendChild(passLabel);
    passField.appendChild(contraseñaInput);
    
    // Botón de login
    let loginButton = document.createElement('button');
    loginButton.type = 'submit';
    loginButton.textContent = 'Ingresar';
    loginButton.className = 'login-button';
    
    form.appendChild(userField);
    form.appendChild(passField);
    form.appendChild(loginButton);
    
    loginBox.appendChild(title);
    loginBox.appendChild(form);
    loginContainer.appendChild(loginBox);
    
    return loginContainer;
}

export { loggin };