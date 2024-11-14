document.addEventListener('DOMContentLoaded', function () {
    // Cargar datos del perfil desde el localStorage al cargar la página
    window.onload = function () {
        const nombreUsuario = localStorage.getItem('nombreUsuario') || '';
        const emailUsuario = localStorage.getItem('emailUsuario') || 'johndoe@example.com';
        const telefonoUsuario = localStorage.getItem('telefonoUsuario') || '+123 456 789';
        const descripcionUsuario = localStorage.getItem('descripcionUsuario') || 'Desarrollador web con experiencia en tecnologías frontend y backend.';
        const fotoPerfil = localStorage.getItem('fotoPerfil') || 'assets/img/default-user.png';

        // Cargar datos en la interfaz
        document.getElementById('nombreUsuario').innerText = nombreUsuario;
        document.getElementById('emailUsuario').innerText = emailUsuario;
        document.getElementById('telefonoUsuario').innerText = telefonoUsuario;
        document.getElementById('descripcionUsuario').innerText = descripcionUsuario;
        document.getElementById('profilePhoto').src = fotoPerfil;
    };

    // Mostrar u ocultar el formulario de edición y la superposición
    const editProfileBtn = document.getElementById('editProfileBtn');
    if (editProfileBtn) {
        editProfileBtn.addEventListener('click', function () {
            document.getElementById('editForm').classList.toggle('hidden');
            document.getElementById('overlay').classList.toggle('hidden');
        });
    }

    // Función para cambiar la foto de perfil
    const changePhotoBtn = document.getElementById('changePhotoBtn');
    if (changePhotoBtn) {
        changePhotoBtn.addEventListener('click', function () {
            document.getElementById('fileInput').click(); // Abre el selector de archivos
        });
    }

    // Manejo de la carga de la imagen
    const fileInput = document.getElementById('fileInput');
    if (fileInput) {
        fileInput.addEventListener('change', function (event) {
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
    }

    // Función para guardar los cambios de perfil
    const saveProfileBtn = document.getElementById('saveProfileBtn');
    if (saveProfileBtn) {
        saveProfileBtn.addEventListener('click', function () {
            const nombre = document.getElementById('nombreInput').value;
            const email = document.getElementById('emailInput').value;
            const telefono = document.getElementById('telefonoInput').value;
            const descripcion = document.getElementById('descripcionInput').value;

            // Actualiza la información mostrada en el perfil
            const nombreFinal = nombre || '2 Doe';
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
    }

    // Si tienes otro código de eventos, asegúrate de agregarlo de forma similar.
});
