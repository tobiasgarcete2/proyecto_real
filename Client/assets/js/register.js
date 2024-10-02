// Client/register.js

document.getElementById('signup-form').addEventListener('submit', async (event) => {
    event.preventDefault();
    
    const role = document.getElementById('role').value;
    const email = document.getElementById('correo').value;
    const password = document.getElementById('password').value;
    
    let username;
    if (role === 'empresa') {
        username = document.getElementById('nombre_empresa').value;
        console.log(role)
    } else {
        username = document.getElementById('nombre_desempleado').value;
    }

    try {
        // Enviar los datos al backend para registrar al usuario    
        const registerResponse = await fetch('http://localhost:4000/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, email, password, role }),
            credentials: "include"
        });

        if (!registerResponse.ok) {
            throw new Error('Error en el registro');
        }

        const mensaje = await registerResponse.text();
        alert("Se registro correctamente")
        
        // Redirigir al usuario a la página de inicio de sesión o al dashboard
        window.location.href = 'http://127.0.0.1:5501/Client/iniciarSesion.html';
    } catch (error) {
        console.log('Error:', error);
        alert('Hubo un error en el registro. Por favor, intente nuevamente.');
    }
});