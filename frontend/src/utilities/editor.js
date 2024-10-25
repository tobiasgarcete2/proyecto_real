let quill = new Quill('#editor-container', {
    theme: 'snow',
    modules: {
        toolbar: [
            [{ 'header': [1, 2, false] }],
            ['bold', 'italic', 'underline'],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            [{ 'align': [] }],
            ['image']
        ]
    }
  });
  
  const form = document.getElementById('nueva-publicacion-form');
  
  form.addEventListener('submit',async (e) => {
    e.preventDefault();
  
    const title = document.getElementById('titulo').value;
    const description = document.querySelector('.ql-editor>p').textContent;
    console.log(description);
    try {
      const response = await fetch('http://localhost:4000/post', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          title,
          description
        })
      })
      if(!response.ok) {
          alert('Error al crear la publicacion')
      } else {
        window.location.href = 'http://localhost:4000/eventos.html'
      }
    } catch (error) {
      alert('Hubo un error al crear la publicacion')
      console.error(error)
    }
  })