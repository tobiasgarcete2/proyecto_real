// Función para cargar los datos del perfil
async function loadProfileData() {
    try {
        const token = getCookie('token');
        if (!token) {
            console.error("No token found");
            return;
        }

        const decodedToken = jwt_decode(token);
        
        // Actualizar los elementos del DOM con los datos del usuario
        document.getElementById('nombreUsuario').textContent = decodedToken.username || 'Usuario';
        document.getElementById('emailUsuario').textContent = decodedToken.email || 'email@example.com';
        document.getElementById('telefonoUsuario').textContent = decodedToken.telefono || 'No especificado';
        document.getElementById('descripcionUsuario').textContent = decodedToken.descripcion || 'Sin descripción';
        document.getElementById('perfil-info').filesContent = decodedToken.perfil || 'Perfil';
        
        // Si hay una foto de perfil
        if (decodedToken.perfil) {
            document.getElementById('profilePhoto').src = decodedToken.perfil;
        }
    } catch (error) {
        console.error("Error loading profile data:", error);
    }
}
const token = getCookie('token'); // Cambia esto si usas localStorage

if (token) {

    const decodedToken = jwt_decode(token);
    console.log(decodedToken); // Verifica toda la información del token

    console.log(decodedToken.email)
    
    // Acceder a las propiedades del token decodificado
    const userId = decodedToken.id; // ID del usuario
    const userEmail = decodedToken.email; // Correo electrónico del usuario
    const userRole = decodedToken.role; // Rol del usuario
    const username = decodedToken.username; // Nombre de usuario

    // Mostrar los datos en el HTML
    document.getElementById('nombreUsuario').textContent = username; // Mostrar nombre
    document.querySelector("#emailUsuario").textContent = userEmail // Mostrar email
    document.getElementById('telefonoUsuario').textContent = "Ejemplo de teléfono"; // Define cómo obtienes el teléfono
    document.getElementById('descripcionUsuario').textContent = "Descripción del usuario"; // Define cómo obtienes la descripción
} else {
    console.error("No se encontró el token");
}

function getCookie(name) {
    const cookies = document.cookie.split(';'); // Dividir todas las cookies
    for (let i = 0; i < cookies.length; i++) {
        let cookie = cookies[i].trim(); // Eliminar espacios adicionales
        if (cookie.startsWith(name + '=')) { // Verificar si la cookie comienza con el nombre
            return cookie.substring(name.length + 1); // Obtener el valor de la cookie
        }
    }
    return null; // Si no se encuentra la cookie, retornar null
}
// Función para obtener cookies


// Toggle del formulario de edición
document.getElementById('editProfileBtn').addEventListener('click', function() {
    document.getElementById('editForm').classList.toggle('hidden');
    document.getElementById('overlay').classList.toggle('hidden');
    
    // Pre-llenar el formulario con los datos actuales
    const nombreUsuario = document.getElementById('nombreUsuario').textContent;
    const emailUsuario = document.getElementById('emailUsuario').textContent;
    const telefonoUsuario = document.getElementById('telefonoUsuario').textContent;
    const descripcionUsuario = document.getElementById('descripcionUsuario').textContent;
    
    document.getElementById('nombreInput').value = nombreUsuario;
    document.getElementById('emailInput').value = emailUsuario;
    document.getElementById('telefonoInput').value = telefonoUsuario;
    document.getElementById('descripcionInput').value = descripcionUsuario;
});
document.addEventListener('DOMContentLoaded', () => {
            // Función para cerrar sesión
            function logout() {
                // Eliminar la cookie del token
                document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    
                // Otras acciones de cierre de sesión
                localStorage.removeItem('username'); // Si estás almacenando el nombre de usuario en localStorage
                window.location.href = '/login.html'; // Redirigir a la página de inicio de sesión
                alert("se cerró la sesion correctamente");
            }
    
            // Agregar el evento de clic al botón de cerrar sesión
            const logoutBtn = document.getElementById('botonCerrarSesion');
            if (logoutBtn) {
                logoutBtn.addEventListener('click', logout);
            }
        });

// Manejo del formulario de edición
document.getElementById("editar").addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("username", document.getElementById('nombreInput').value);
    formData.append("email", document.getElementById('emailInput').value);
    formData.append("telefono", document.getElementById('telefonoInput').value);
    formData.append("descripcion", document.getElementById('descripcionInput').value);

    const foto = document.getElementById("fileInput").files[0];
    if (foto) {
        formData.append("foto", foto);
    }

    try {
        const response = await fetch('http://localhost:4000/auth/edit', {
            method: "PUT",
            credentials: "include",
            body: formData,
        });

        if (!response.ok) {
            throw new Error('Error en la respuesta del servidor');
        }

        const result = await response.json();
        
        // Actualizar la UI inmediatamente
        document.getElementById('nombreUsuario').textContent = document.getElementById('nombreInput').value;
        document.getElementById('emailUsuario').textContent = document.getElementById('emailInput').value;
        document.getElementById('telefonoUsuario').textContent = document.getElementById('telefonoInput').value;
        document.getElementById('descripcionUsuario').textContent = document.getElementById('descripcionInput').value;

        // Si hay una nueva foto, mostrarla
        if (foto) {
            const reader = new FileReader();
            reader.onload = function(e) {
                document.getElementById('profilePhoto').src = e.target.result;
            };
            reader.readAsDataURL(foto);
        }

        // Ocultar el formulario y la superposición
        document.getElementById('editForm').classList.add('hidden');
        document.getElementById('overlay').classList.add('hidden');

        alert("Perfil actualizado correctamente");
    } catch (error) {
        console.error("Error al actualizar:", error);
        alert("Ocurrió un error al actualizar el perfil.");
    }
});

// Cerrar sesión
document.getElementById('botonCerrarSesion').addEventListener('click', function() {
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    localStorage.removeItem('username');
    window.location.href = '/login.html';
    alert("Sesión cerrada correctamente");
});

// Cargar los datos del perfil al iniciar
document.addEventListener('DOMContentLoaded', loadProfileData);