document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('loginForm').addEventListener('submit', async (event) => {
        event.preventDefault();

        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        try {
            const response = await fetch('http://localhost:4000/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password }),
                credentials: "include",
                mode:"cors"
            });

            const data = await response.json();

            if (response.ok) {
                // Almacenar el token en el almacenamiento local
                localStorage.setItem('token', data.token);
                localStorage.setItem('username', data.username);
                alert("Se inició sesión correctamente");
                // Redirigir al usuario a la página principal después de iniciar sesión exitosamente
                window.location.href = 'http://127.0.0.1:5501/Client/index.html'; // Reemplazar con la ruta correcta
            } else {
                alert(data.message); // Mostrar alert con el mensaje de error
            }
        } catch (error) {
            console.error('Error al procesar la solicitud:', error);
            alert('Error al procesar la solicitud. Por favor, inténtelo de nuevo más tarde.');
        }
    });

    // Función para actualizar la visibilidad de los botones de cierre de sesión
    function updateAuthButtons() {
        const logoutBtn = document.getElementById('logoutBtn');
        const token = localStorage.getItem('token');

        if (logoutBtn) {
            if (token) {
                logoutBtn.style.display = 'inline'; // Mostrar el botón de cerrar sesión
            } else {
                logoutBtn.style.display = 'none'; // Ocultar el botón de cerrar sesión
            }
        }
    }

    // Función para cerrar sesión
    function logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        updateAuthButtons();
        window.location.href = '/login.html'; // Redirigir a la página de inicio de sesión
    }

    // Ejecutar al cargar la página
    updateAuthButtons();

    // Agregar el evento de clic al botón de cerrar sesión
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', logout);
    }
});
