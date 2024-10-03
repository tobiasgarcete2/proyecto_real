document.addEventListener('DOMContentLoaded', () => {
    const { jsPDF } = window.jspdf;

    // Previsualizar video al cargar el archivo
    const videoInput = document.getElementById('video');
    const videoPreview = document.getElementById('videoPreview');

    videoInput.addEventListener('change', function() {
        const file = videoInput.files[0];
        if (file) {
            const url = URL.createObjectURL(file);
            videoPreview.src = url;
            videoPreview.style.display = 'block';
        } else {
            videoPreview.style.display = 'none';
        }
    });

    function generarCV() {
        const doc = new jsPDF();

        // Obtener datos del formulario
        const habilidades = document.getElementById('habilidades').value;
        const estudios = document.getElementById('estudios').value;
        const idiomas = document.getElementById('idiomas').value;
        const fotoInput = document.getElementById('foto');
        const videoInput = document.getElementById('video');

        if (!habilidades || !estudios || !idiomas) {
            alert('Por favor, completa todos los campos.');
            return;
        }

        doc.setFontSize(16);
        doc.text('Currículum Vitae', 10, 10);
        doc.setFontSize(12);
        doc.text(`Habilidades: ${habilidades}`, 10, 20);
        doc.text(`Estudios: ${estudios}`, 10, 30);
        doc.text(`Idiomas: ${idiomas}`, 10, 40);

        // Agregar la imagen si se seleccionó una
        if (fotoInput.files.length > 0) {
            const reader = new FileReader();
            reader.onload = function(event) {
                const imgData = event.target.result;
                const ancho = 40; // 4 cm en mm
                const alto = 40;  // 4 cm en mm
                doc.addImage(imgData, 'JPEG', 10, 50, ancho, alto);
                
                // Guardar el PDF después de agregar la imagen
                doc.save('mi-cv.pdf');
            };
            reader.readAsDataURL(fotoInput.files[0]);
        } else {
            doc.save('mi-cv.pdf');
        }

        // Previsualización del video (solo para verlo, no agregar al PDF)
        if (videoInput.files.length > 0) {
            const videoFile = videoInput.files[0];
            console.log('Video cargado:', videoFile.name);  // Se puede manejar de otra manera
        }
    }

    document.getElementById('crearCVButton').addEventListener('click', generarCV);
});
