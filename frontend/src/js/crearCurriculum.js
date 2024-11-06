document.addEventListener('DOMContentLoaded', function () {
    const fotoInput = document.getElementById('foto');
    const fotoPreview = document.getElementById('fotoPreview');
    const videoInput = document.getElementById('video');
    const videoPreview = document.getElementById('videoPreview');
    const cvForm = document.getElementById('cvForm');
    const crearCVButton = document.getElementById('crearCVButton');

    // Previsualización de la foto
    fotoInput.addEventListener('change', function () {
        const file = fotoInput.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
                fotoPreview.style.display = 'block';
                fotoPreview.src = e.target.result;
            };
            reader.readAsDataURL(file);
        }
    });

    // Previsualización del video
    videoInput.addEventListener('change', function () {
        const file = videoInput.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
                videoPreview.style.display = 'block';
                videoPreview.src = e.target.result;
            };
            reader.readAsDataURL(file);
        }
    });

    // Manejo de la creación y descarga del CV en formato PDF
    crearCVButton.addEventListener('click', function () {
        const habilidades = document.getElementById('habilidades').value;
        const estudios = document.getElementById('estudios').value;
        const idiomas = document.getElementById('idiomas').value;
        const experiencia = document.getElementById('experiencia').value;
        const formacionAdicional = document.getElementById('formacion_adicional').value;
        const referencias = document.getElementById('referencias').value;
        const intereses = document.getElementById('intereses').value;
        const objetivos = document.getElementById('objetivos').value;

        // Crear un nuevo PDF con jsPDF
        const pdf = new jsPDF();
        
        // Agregar contenido al PDF
        pdf.setFontSize(18);
        pdf.text('Currículum Vitae', 20, 20);
        
        pdf.setFontSize(12);
        pdf.text('Habilidades: ' + habilidades, 20, 30);
        pdf.text('Mis estudios: ' + estudios, 20, 40);
        pdf.text('Idiomas: ' + idiomas, 20, 50);
        pdf.text('Experiencia laboral: ' + experiencia, 20, 60);
        pdf.text('Formación adicional: ' + formacionAdicional, 20, 70);
        pdf.text('Referencias: ' + referencias, 20, 80);
        pdf.text('Intereses: ' + intereses, 20, 90);
        pdf.text('Objetivos profesionales: ' + objetivos, 20, 100);

        // Previsualización de la foto
        if (fotoInput.files.length > 0) {
            const fotoFile = fotoInput.files[0];
            const reader = new FileReader();
            reader.onload = function (e) {
                const imgData = e.target.result;
                pdf.addImage(imgData, 'JPEG', 20, 110, 50, 50);
                pdf.text('Foto de perfil', 20, 170);
                // Generar el PDF con la imagen
                pdf.save('curriculum.pdf');
            };
            reader.readAsDataURL(fotoFile);
        } else {
            // Si no hay foto, solo generar el PDF sin la foto
            pdf.save('curriculum.pdf');
        }

        // Aquí podrías agregar la lógica para el video si es necesario.
        // Por ejemplo, podrías agregar un enlace al archivo de video subido:
        if (videoInput.files.length > 0) {
            const videoFile = videoInput.files[0];
            const videoUrl = URL.createObjectURL(videoFile);
            pdf.text('Video de presentación: ' + videoUrl, 20, 180);
        }
    });
});
