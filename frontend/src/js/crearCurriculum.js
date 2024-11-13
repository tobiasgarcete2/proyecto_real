document.addEventListener('DOMContentLoaded', function () {
    const { jsPDF } = window.jspdf;

    const fotoInput = document.getElementById('foto');
    const fotoPreview = document.getElementById('fotoPreview');
    const crearCVButton = document.getElementById('crearCVButton');

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

    crearCVButton.addEventListener('click', function (event) {
        event.preventDefault();

        const habilidades = document.getElementById('habilidades').value;
        const estudios = document.getElementById('estudios').value;
        const idiomas = document.getElementById('idiomas').value;
        const experiencia = document.getElementById('experiencia').value;
        const formacionAdicional = document.getElementById('formacion_adicional').value;
        const referencias = document.getElementById('referencias').value;
        const intereses = document.getElementById('intereses').value;
        const objetivos = document.getElementById('objetivos').value;

        const pdf = new jsPDF();
        pdf.setFont('helvetica');
        pdf.setFontSize(22);
        pdf.setFillColor(0, 51, 102);
        pdf.rect(0, 0, pdf.internal.pageSize.width, 30, 'F');
        pdf.setTextColor(255, 255, 255);
        pdf.text('Currículum Vitae', 20, 20);

        pdf.setFontSize(14);
        pdf.setTextColor(0, 0, 0);

        function drawSection(title, content, yPosition) {
            pdf.setFont('helvetica', 'bold');
            pdf.text(title, 20, yPosition);
            pdf.setFont('helvetica', 'normal');
            pdf.setTextColor(100, 100, 100);
            pdf.text(content, 20, yPosition + 10);
            pdf.setTextColor(0, 0, 0);
            pdf.line(20, yPosition + 12, pdf.internal.pageSize.width - 20, yPosition + 12);
        }

        let yPos = 40;
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

        if (fotoInput.files.length > 0) {
            const fotoFile = fotoInput.files[0];
            const reader = new FileReader();
            reader.onload = function (e) {
                const imgData = e.target.result;
                pdf.addImage(imgData, 'JPEG', 150, 40, 40, 40);
                pdf.text('Foto de perfil', 150, 90);
                pdf.save('curriculum.pdf');
            };
            reader.readAsDataURL(fotoFile);
        } else {
            pdf.save('curriculum.pdf');
        }
    });
});
