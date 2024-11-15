document.getElementById('role').addEventListener('change', function() {
    const role = this.value;
    const nombreEmpresaGroup = document.getElementById('nombreEmpresaGroup');
    const cuitGroup = document.getElementById('cuitGroup');
    const nombreUsuarioGroup = document.getElementById('nombreUsuarioGroup');
    const cuilGroup = document.getElementById('cuilGroup');


    if (role === 'desempleado') {
        nombreUsuarioGroup.style.display = 'block';
        document.getElementById('nombre_desempleado').setAttribute('required', 'required');

        nombreEmpresaGroup.style.display = 'none';
        cuitGroup.style.display = 'none';
        document.getElementById('nombre_empresa').removeAttribute('required');
        document.getElementById('cuit').removeAttribute('required');

        cuilGroup.style.display = 'block';
        document.getElementById('cuil').setAttribute('required', 'required');
        cuilGroup.style.display = 'block';
        document.getElementById('perfil').setAttribute('required', 'required');

        cuilGroup.style.display = 'block';
        document.getElementById('descripcion').setAttribute('required', 'required');
    } else {
        nombreUsuarioGroup.style.display = 'none';
        document.getElementById('nombre_desempleado').removeAttribute('required');

        nombreEmpresaGroup.style.display = 'block';
        cuitGroup.style.display = 'block';
        document.getElementById('nombre_empresa').setAttribute('required', 'required');
        document.getElementById('cuit').setAttribute('required', 'required');

        cuilGroup.style.display = 'none';
        document.getElementById('cuil').removeAttribute('required');

        cuilGroup.style.display = 'none';
        document.getElementById('perfil').removeAttribute('required');

        
        cuilGroup.style.display = 'none';
        document.getElementById('descripcion').removeAttribute('required');
    }
});

// Inicializa la visibilidad de los campos al cargar la página
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('role').dispatchEvent(new Event('change'));
});

document.getElementById('signup-form').addEventListener('submit', async (event) => {
    event.preventDefault();

    const role = document.getElementById('role').value;
    const email = document.getElementById('correo').value;
    const password = document.getElementById('password').value;
    const perfil = document.getElementById('perfil').files[0];
    const descripcion = document.getElementById('descripcion').value;

    let username;  // Declaramos 'username' antes de usarla
    let docPers;   // Declaramos 'docPers' antes de usarla

    // Validar campos comunes
    if (!email || !password || !descripcion) {
        alert('Por favor complete todos los campos obligatorios.');
        return;
    }

    // Validación según el rol
    if (role === 'empresa') {
        username = document.getElementById('nombre_empresa').value;
        docPers = document.getElementById('cuit').value;
        if (!username || !docPers) {
            alert('Por favor complete todos los campos de la empresa.');
            return;
        }
    } else {
        username = document.getElementById('nombre_desempleado').value;
        docPers = document.getElementById('cuil').value;
        if (!username || !docPers) {
            alert('Por favor complete todos los campos del usuario.');
            return;
        }
    }

    // Validar el perfil (imagen de foto de perfil)
    if (!perfil) {
        alert('Por favor seleccione una foto de perfil.');
        return;
    }

    try {
        const formData = new FormData();
        formData.append('username', username);
        formData.append('email', email);
        formData.append('password', password);
        formData.append('role', role);
        formData.append('descripcion', descripcion);
        formData.append('docPers', docPers);

        if (perfil) {
            formData.append('perfil', perfil);
        }

        // Mostrar los datos enviados en la consola
        console.log('Datos enviados:');
        for (let pair of formData.entries()) {
            console.log(pair[0]+ ': ' + pair[1]);
        }

        const registerResponse = await fetch('http://localhost:4000/auth/register', {
            method: 'POST',
            body: formData,
        });

        if (!registerResponse.ok) {
            const errorMessage = await registerResponse.text();
            throw new Error(`Error en el registro: ${errorMessage}`);
        }

        alert("Se registró correctamente");
        window.location.href = 'http://localhost:5173/inicio.html';
    } catch (error) {
        console.error('Error:', error);
        alert('Hubo un error en el registro. Detalles: ' + error.message);
    }
});

