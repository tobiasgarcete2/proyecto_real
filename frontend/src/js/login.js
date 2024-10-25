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
                mode: "cors"
            });

            const data = await response.json();

            if (response.ok) {
                alert("Se inició sesión correctamente");

                // Redirigir al usuario según su rol
                if (data.role === 'empresa') {
                    console.log("hola en el servidor");
                    window.location.href = '/front_empresa/index.html'; // Página para empresas
                } else if (data.role === 'desempleado') {
                    window.location.href = '/front_usuario/index.html'; // Página para desempleados
                }
            } else {
                alert(data.message); // Mostrar alert con el mensaje de error
            }
        } catch (error) {
            console.error('Error al procesar la solicitud:', error);
            alert('Error al procesar la solicitud. Por favor, inténtelo de nuevo más tarde.');
        }
    }); 
});
