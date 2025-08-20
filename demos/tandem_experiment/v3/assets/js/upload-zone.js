document.addEventListener('DOMContentLoaded', () => {
  const dropZone = document.getElementById('drop-zone');
  const fileInput = document.getElementById('file-input');
  const fileInfo = document.getElementById('file-info');
  const levelSelect = document.getElementById('level-select');

  dropZone.addEventListener('dragover', (e) => {
    e.preventDefault();
    dropZone.classList.add('dragover');
  });

  dropZone.addEventListener('dragleave', () => {
    dropZone.classList.remove('dragover');
  });

  dropZone.addEventListener('drop', (e) => {
    e.preventDefault();
    dropZone.classList.remove('dragover');
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      uploadFile(files[0]);
    }
  });

  dropZone.addEventListener('click', () => {
    fileInput.click();
  });

  fileInput.addEventListener('change', (e) => {
    const files = e.target.files;
    if (files.length > 0) {
      uploadFile(files[0]);
    }
  });

  function uploadFile(file) {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('level', levelSelect.value.trim());  // Eliminar espacios extra

    // Mostrar el spinner de carga
    fileInfo.innerHTML = `<p><strong>Uploading:</strong> ${file.name}</p><div class="loader"></div><p>Please wait...</p>`;

    fetch('upload.php', {
      method: 'POST',
      body: formData
    })
    .then(response => {
      if (!response.ok) {
        throw new Error(`Error al subir el archivo: ${response.statusText}`);
      }
      return response.json();
    })
    .then(data => {
      setTimeout(() => {
        fileInfo.innerHTML = `
          <p><strong>File uploaded successfully:</strong> ${data.filename}</p>
          <p><strong>Server message:</strong> ${data.message}</p>
        `;
        setTimeout(() => {
          location.reload();  // Recargar la página después de un pequeño delay
        }, 1000);
      }, 1500);
    })
    .catch(error => {
      setTimeout(() => {
        fileInfo.innerHTML = `
          <p style="color: red;"><strong>Error:</strong> ${error.message}</p>
        `;
      }, 1500);
    });
  }
});