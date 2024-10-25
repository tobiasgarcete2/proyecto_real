// Ejecutamos la siguiente lógica al cargar el HTML.
document.addEventListener('DOMContentLoaded', () => {

    console.log('llegó');

    // Obtenemos del localStorage el token.
    const token = localStorage.getItem('token'); // Asegúrate de obtener el token del localStorage

    // Hacemos una solicitud al servidor para validar la sesión
    fetch("http://localhost:4000/auth/session", {
        credentials: "include",
        withCredentials: true,
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            // Si usas token en la autenticación por headers, lo puedes enviar aquí
            'Authorization': `Bearer ${token}`
        }
    })
    .then((res) => {
        if (!res.ok) {
            throw new Error('No autorizado');
        }
        return res.json();
    })
    .then((data) => {
        console.log("Sesión válida", data);
    })
    .catch((error) => console.error('Error:', error));

    // Verificamos si el token existe o no
    if (!token) {
        console.log("No hay token, muestra los botones de login y registro.");
        // Lógica para mostrar botones de login y registro
    } else {
        console.log("Token encontrado, muestra el botón de cerrar sesión.");

        // Mostramos un botón de cerrar sesión (si está en el DOM)
        // document.getElementById('navv').innerHTML = `<a class="btn" href="" id="logout"><button>Cerrar Sesión</button></a>`;
        // document.getElementById('publiEstilo').innerHTML = `<a href="subirPubli.html" class="boton-subir">Subir Publicación</a>`;

        // Le agregamos un evento click al botón de logout
        document.getElementById('logout')?.addEventListener('click', () => {

            // Al clickear, se elimina del localStorage el token.
            localStorage.removeItem('token');

            // Recargamos la página para que hagan efecto los cambios.
            window.location.reload();
        });
    }
});
