document.addEventListener('DOMContentLoaded', function () {
    const { jsPDF } = window.jspdf;

    const fotoInput = document.getElementById('foto');
    const fotoPreview = document.getElementById('fotoPreview');
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

    // Manejo de la creación y descarga del CV en formato PDF
    crearCVButton.addEventListener('click', function (event) {
        event.preventDefault(); // Prevenir el comportamiento de envío del formulario

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
        pdf.setFont('helvetica');
        pdf.setFontSize(22);

        // Fondo y color de encabezado
        pdf.setFillColor(0, 51, 102); // Color azul oscuro
        pdf.rect(0, 0, pdf.internal.pageSize.width, 30, 'F'); // Fondo azul en la parte superior
        pdf.setTextColor(255, 255, 255);  // Texto blanco para el encabezado
        pdf.text('Currículum Vitae', 20, 20);

        pdf.setFontSize(14);
        pdf.setTextColor(0, 0, 0);  // Color de texto negro para el contenido

        // Secciones con bordes redondeados
        function drawSection(title, content, yPosition) {
            pdf.setFont('helvetica', 'bold');
            pdf.text(title, 20, yPosition);
            pdf.setFont('helvetica', 'normal');
            pdf.setTextColor(100, 100, 100);  // Color gris suave para el contenido
            pdf.text(content, 20, yPosition + 10);
            pdf.setTextColor(0, 0, 0);  // Volver al negro para siguientes secciones
            pdf.line(20, yPosition + 12, pdf.internal.pageSize.width - 20, yPosition + 12);  // Línea de separación
        }

        // Llamada a la función para cada sección
        let yPos = 40; // Establecemos la posición inicial en el eje Y
        drawSection('Habilidades:', habilidades, yPos);
        yPos += 20;
        drawSection('Mis estudios:', estudios, yPos);
        yPos += 20;
        drawSection('Idiomas:', idiomas, yPos);
        yPos += 20;
        drawSection('Experiencia laboral:', experiencia, yPos);
        yPos += 20;
        drawSection('Formación adicional:', formacionAdicional, yPos);
        yPos += 20;
        drawSection('Referencias:', referencias, yPos);
        yPos += 20;
        drawSection('Intereses:', intereses, yPos);
        yPos += 20;
        drawSection('Objetivos profesionales:', objetivos, yPos);

        // Previsualización de la foto
        if (fotoInput.files.length > 0) {
            const fotoFile = fotoInput.files[0];
            const reader = new FileReader();
            reader.onload = function (e) {
                const imgData = e.target.result;
                pdf.addImage(imgData, 'JPEG', 150, 40, 40, 40);  // Foto de perfil con un tamaño adecuado
                pdf.text('Foto de perfil', 150, 90);
            };
            reader.readAsDataURL(fotoFile);
        }

        // Agregar texto en el footer
        const pageHeight = pdf.internal.pageSize.height;
        pdf.setFontSize(10);
        pdf.setTextColor(100, 100, 100);  // Color gris para el footer
        const footerText = 'JobHunter 2024';
        
        // Ajuste de la posición horizontal para centrar el texto
        const footerWidth = pdf.getTextWidth(footerText);
        const footerX = (pdf.internal.pageSize.width - footerWidth) / 2;
        
        // Ajuste de la posición vertical para asegurar que no se sobreponga con el contenido
        const footerY = pageHeight - 10;

        pdf.text(footerText, footerX, footerY);

        // Descargar PDF
        pdf.save('curriculum.pdf');
    });
});
