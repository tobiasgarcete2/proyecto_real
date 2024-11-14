// perfilCliente.js

// Cargar datos del perfil desde el localStorage al cargar la página
// Mostrar u ocultar el formulario de edición y la superposición
document.getElementById('editProfileBtn').addEventListener('click', function () {

    
    document.getElementById('editForm').classList.toggle('hidden');
    document.getElementById('overlay').classList.toggle('hidden');
});

// Función para cambiar la foto de perfil

// Manejo de la carga de la imagen
document.getElementById('fileInput').addEventListener('change', function (event) {
    const file = event.target.files[0]; // Obtiene el primer archivo
    if (file) {
        const reader = new FileReader(); // Crea un objeto FileReader
        reader.onload = function (e) {
            document.getElementById('profilePhoto').src = e.target.result; // Actualiza la imagen de perfil
            localStorage.setItem('fotoPerfil', e.target.result); // Guarda la nueva foto de perfil en localStorage
        };
        reader.readAsDataURL(file); // Lee el archivo como una URL de datos
    }
});

// Función para guardar los cambios de perfil
document.getElementById('saveProfileBtn').addEventListener('click', function () {
    const nombre = document.getElementById('nombreInput').value;
    const email = document.getElementById('emailInput').value;
    const telefono = document.getElementById('telefonoInput').value;
    const descripcion = document.getElementById('descripcionInput').value;

    // Actualiza la información mostrada en el perfil
    const nombreFinal = nombre || 'John2 Doe';
    const emailFinal = email || 'johndoe@example.com';
    const telefonoFinal = telefono || '+123 456 789';
    const descripcionFinal = descripcion || 'Desarrollador web con experiencia en tecnologías frontend y backend.';

    document.getElementById('nombreUsuario').innerText = nombreFinal;
    document.getElementById('emailUsuario').innerText = emailFinal;
    document.getElementById('telefonoUsuario').innerText = telefonoFinal;
    document.getElementById('descripcionUsuario').innerText = descripcionFinal;

    // Guardar los datos en localStorage
    localStorage.setItem('nombreUsuario', nombreFinal);
    localStorage.setItem('emailUsuario', emailFinal);
    localStorage.setItem('telefonoUsuario', telefonoFinal);
    localStorage.setItem('descripcionUsuario', descripcionFinal);


    // Oculta el formulario y el overlay después de guardar
    document.getElementById('editForm').classList.add('hidden');
    document.getElementById('overlay').classList.add('hidden');
});

document.getElementById("editar").addEventListener("submit", async (e) => {
    e.preventDefault();

    // 1. Obtener valores del formulario
    const nombre = document.getElementById('nombreInput')?.value || 'John2 Doe';
    const email = document.getElementById('emailInput')?.value || 'johndoe@example.com';
    const telefono = document.getElementById('telefonoInput')?.value || '+123 456 789';
    const descripcion = document.getElementById('descripcionInput')?.value || 'Desarrollador web con experiencia en tecnologías frontend y backend.';
    const foto = document.getElementById("fileInput")?.files[0]; // archivo opcional

    // 2. Actualiza la información mostrada en el perfil
    document.getElementById('nombreUsuario').innerText = nombre;
    document.getElementById('emailUsuario').innerText = email;
    document.getElementById('telefonoUsuario').innerText = telefono;
    document.getElementById('descripcionUsuario').innerText = descripcion;

    // 3. Preparar FormData
    const formData = new FormData();
    formData.append("nombreUsuario", nombre);
    // formData.append("emailUsuario", email);
    // formData.append("telefonoUsuario", telefono);
    // formData.append("descripcionUsuario", descripcion);
    // if (foto) {
    //     formData.append("foto", foto); // solo se agrega si el archivo existe
    // }

    // 4. Mostrar contenido de FormData para verificar
    for (const pair of formData.entries()) {
        console.log(pair[0] + ': ' + pair[1]);
    }

    // 5. Enviar datos con fetch usando try-catch para el manejo de errores
    try {
        const response = await fetch('http://localhost:4000/auth/edit', {
            method: "PUT",
            credentials: "include",
            body: formData,
        });
        
        if (!response.ok) {
            throw new Error('Error en la respuesta del servidor');
        }
        console.log("Formulario enviado con éxito:", await response.json());

    } catch (error) {
        console.error("FALLÓ EL ENVÍO:", error.message);
    }
});
