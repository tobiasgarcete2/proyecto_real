document.getElementById('signup-form').addEventListener('submit', async (event) => {
    event.preventDefault();

    const role = document.getElementById('role').value;
    const email = document.getElementById('correo').value;
    const password = document.getElementById('password').value;

    let username;
    if (role === 'empresa') {
        username = document.getElementById('nombre_empresa').value;
        docPers= document.getElementById('cuit').value;
    } else {
        username = document.getElementById('nombre_desempleado').value;
        docPers= document.getElementById('cuil').value;
    }

    try {
        const registerResponse = await fetch('http://localhost:4000/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, email, password, role, docPers }),
            credentials: "include"
        });

        if (!registerResponse.ok) {
            const errorMessage = await registerResponse.text(); // Obtener el mensaje de error
            throw new Error(`Error en el registro: ${errorMessage}`);
        }

        alert("Se registró correctamente");
        window.location.href = 'http://localhost:5173/inicio.html';
    } catch (error) {
        console.error('Error:', error);
        alert('Hubo un error en el registro. Detalles: ' + error.message);
    }
});
