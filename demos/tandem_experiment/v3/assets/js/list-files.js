document.addEventListener("DOMContentLoaded", function () {
  const fileList = document.getElementById("fileList");
  const preloader = document.getElementById("preloader");

  // Función para cargar los archivos de un directorio
  function loadFiles(currentPath = "uploads") {
    preloader.style.display = "block"; // Muestra el preloader
    fileList.innerHTML = ""; // Limpia la lista

    fetch(`list_files.php?level=${encodeURIComponent(currentPath)}`)
      .then((response) => response.json())
      .then((data) => {
        preloader.style.display = "none"; // Oculta el preloader

        // Agregar opción para volver atrás si no estamos en el directorio raíz
        if (currentPath !== "uploads") {
          const backItem = document.createElement("li");
          backItem.innerHTML = "..";
          backItem.style.cursor = "pointer";
          backItem.addEventListener("click", function () {
            const parentPath = currentPath.substring(
              0,
              currentPath.lastIndexOf("/")
            );
            console.log("currentPath" , currentPath)
            loadFiles(parentPath || "uploads");
          });
          fileList.appendChild(backItem);
        }

        // Agregar cada directorio a la lista
        data.directories.forEach((directory) => {
          const listItem = document.createElement("li");
          listItem.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-6">
  <path d="M19.5 21a3 3 0 0 0 3-3v-4.5a3 3 0 0 0-3-3h-15a3 3 0 0 0-3 3V18a3 3 0 0 0 3 3h15ZM1.5 10.146V6a3 3 0 0 1 3-3h5.379a2.25 2.25 0 0 1 1.59.659l2.122 2.121c.14.141.331.22.53.22H19.5a3 3 0 0 1 3 3v1.146A4.483 4.483 0 0 0 19.5 9h-15a4.483 4.483 0 0 0-3 1.146Z" />
</svg> <strong>${directory}</strong>`;
          listItem.style.cursor = "pointer";
          listItem.addEventListener("click", function () {
            loadFiles(`${currentPath}/${directory}`);
          });
          fileList.appendChild(listItem);
        });

        // Agregar cada archivo a la lista
        data.files.forEach((file) => {
          const listItem = document.createElement("li");
          listItem.textContent = file;
          listItem.style.cursor = "pointer";

          const fileExtension = file.split(".").pop().toLowerCase();
          let icon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-6 fileIconType">
          <path d="M5.625 1.5c-1.036 0-1.875.84-1.875 1.875v17.25c0 1.035.84 1.875 1.875 1.875h12.75c1.035 0 1.875-.84 1.875-1.875V12.75A3.75 3.75 0 0 0 16.5 9h-1.875a1.875 1.875 0 0 1-1.875-1.875V5.25A3.75 3.75 0 0 0 9 1.5H5.625Z" />
          <path d="M12.971 1.816A5.23 5.23 0 0 1 14.25 5.25v1.875c0 .207.168.375.375.375H16.5a5.23 5.23 0 0 1 3.434 1.279 9.768 9.768 0 0 0-6.963-6.963Z" />
        </svg>`;
          if (["jpg", "jpeg", "png", "gif"].includes(fileExtension)) {
            icon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-6 fileIconType">
            <path fill-rule="evenodd" d="M1.5 6a2.25 2.25 0 0 1 2.25-2.25h16.5A2.25 2.25 0 0 1 22.5 6v12a2.25 2.25 0 0 1-2.25 2.25H3.75A2.25 2.25 0 0 1 1.5 18V6ZM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0 0 21 18v-1.94l-2.69-2.689a1.5 1.5 0 0 0-2.12 0l-.88.879.97.97a.75.75 0 1 1-1.06 1.06l-5.16-5.159a1.5 1.5 0 0 0-2.12 0L3 16.061Zm10.125-7.81a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0Z" clip-rule="evenodd" />
          </svg>`;
          } else if (fileExtension === "pdf") {
            icon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-6 fileIconType">
  <path fill-rule="evenodd" d="M5.625 1.5c-1.036 0-1.875.84-1.875 1.875v17.25c0 1.035.84 1.875 1.875 1.875h12.75c1.035 0 1.875-.84 1.875-1.875V12.75A3.75 3.75 0 0 0 16.5 9h-1.875a1.875 1.875 0 0 1-1.875-1.875V5.25A3.75 3.75 0 0 0 9 1.5H5.625ZM7.5 15a.75.75 0 0 1 .75-.75h7.5a.75.75 0 0 1 0 1.5h-7.5A.75.75 0 0 1 7.5 15Zm.75 2.25a.75.75 0 0 0 0 1.5H12a.75.75 0 0 0 0-1.5H8.25Z" clip-rule="evenodd" />
  <path d="M12.971 1.816A5.23 5.23 0 0 1 14.25 5.25v1.875c0 .207.168.375.375.375H16.5a5.23 5.23 0 0 1 3.434 1.279 9.768 9.768 0 0 0-6.963-6.963Z" />
</svg>`;
          }

          listItem.innerHTML = `${icon} <a href="${currentPath}/${file}" class="fileLink" target="_blank">${file}</a>`;
          
        if (data.directories.length === 0 && data.files.length === 0) {
          fileList.innerHTML = "<li><span class='noDocuments'>No documents available.</span></li>";
        }



// Agregar botón de descarga
const downloadBtn = document.createElement("a");
downloadBtn.classList.add('fileDownload');
downloadBtn.href = `${currentPath}/${file}`;
downloadBtn.download = file;
downloadBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-6"> <path fill-rule="evenodd" d="M12 2.25a.75.75 0 0 1 .75.75v11.69l3.22-3.22a.75.75 0 1 1 1.06 1.06l-4.5 4.5a.75.75 0 0 1-1.06 0l-4.5-4.5a.75.75 0 1 1 1.06-1.06l3.22 3.22V3a.75.75 0 0 1 .75-.75Zm-9 13.5a.75.75 0 0 1 .75.75v2.25a1.5 1.5 0 0 0 1.5 1.5h13.5a1.5 1.5 0 0 0 1.5-1.5V16.5a.75.75 0 0 1 1.5 0v2.25a3 3 0 0 1-3 3H5.25a3 3 0 0 1-3-3V16.5a.75.75 0 0 1 .75-.75Z" clip-rule="evenodd" /> </svg>`;
listItem.appendChild(downloadBtn);

          fileList.appendChild(listItem);
        });
      })
      .catch((error) => {
        preloader.style.display = "none";
        console.error("Error loading files:", error);
      });
  }

  // Establecer un timeout de 5 segundos antes de ejecutar el querySelectorAll y el forEach
  setTimeout(() => {
    // Manejar la selección de un nivel
    console.log("READY:");

    const levels = document.querySelectorAll(".hud-level");
    let levelSelected = '';
    levels.forEach((level) => {
      level.addEventListener("click", function () {
        const hudLevelSelectedText = level
          ? level.textContent || level.innerText
          : null;
        // Transform the text: remove spaces, convert to lowercase, and replace spaces with hyphens
        if (hudLevelSelectedText) {
          const transformedText = hudLevelSelectedText
            .toLowerCase() // Convert to lowercase
            .replace(/\s+/g, "-") // Replace spaces with hyphens
            .replace(/[A-Z]/g, (match) => match.toLowerCase()); // Convert uppercase to lowercase (optional, since toLowerCase is used)

          // console.log("Transformed text:", transformedText);
          levelSelected = transformedText;
          simulateTemperatureData(22, 'Building Temp');
          simulateHumidityData(49, 'Building Humidity');
        } else {
          console.log(
            "No div found with the hud-level and hud-level-selected classes"
          );
        }
        // Eliminar la clase 'hud-level-selected' de todos los niveles
        levels.forEach((l) => l.classList.remove("hud-level-selected"));

        // Agregar la clase 'hud-level-selected' al nivel seleccionado
        this.classList.add("hud-level-selected");
        // Cargar los archivos de ese nivel
        loadFiles(`uploads/${levelSelected}`);
      });
    });
  }, 5000); // 5000 ms = 5 segundos

  // Cargar el listado inicial desde "uploads"
  loadFiles();
});
