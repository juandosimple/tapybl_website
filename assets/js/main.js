window.addEventListener("scroll", function () {
  const navbar = document.querySelector(".navbar");

  if (window.scrollY > 0) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});

// TITLE ANIMATION
const texts = document.querySelectorAll(".animated-text");
let index = 0;

function changeText() {
  if (index > 0) {
    texts[index - 1].classList.remove("show"); // Oculta la palabra anterior
  }

  texts[index].classList.add("show"); // Muestra la palabra actual
  index++;

  if (index < texts.length) {
    setTimeout(changeText, 2000); // Cambia cada 2 segundos
  }
}

setTimeout(changeText, 000); // Espera antes de iniciar el primer cambio


const navbarCollapse = document.querySelector(".navbar-collapse");

navbarCollapse.addEventListener("show.bs.collapse", () => {
  document.body.classList.add("no-scroll");
});

navbarCollapse.addEventListener("hide.bs.collapse", () => {
  document.body.classList.remove("no-scroll");
});

// Boxes ANIMATION
// document.querySelectorAll("#platform .box").forEach((box) => {
//   box.addEventListener("mouseenter", () => {
//     const heading = box.querySelector("h1");

//     // Calcular el ancho necesario para que el h1 quepa completamente
//     const requiredWidth = heading.scrollWidth + 50; // Margen adicional
//     box.style.maxWidth = `${requiredWidth}px`;

//     // Rotar el h1
//     heading.style.transform = "rotate(360deg)";

//     // Mostrar el párrafo
//     const paragraph = box.querySelector("p");
//     paragraph.style.opacity = "1";
//     paragraph.style.transform = "translateY(0)";
//     paragraph.style.bottom = "10px";
//   });

//   box.addEventListener("mouseleave", () => {
//     // Restaurar la columna
//     box.style.maxWidth = "150px";

//     // Rotar el h1 nuevamente
//     const heading = box.querySelector("h1");
//     heading.style.transform = "rotate(270deg)";

//     // Ocultar el párrafo
//     const paragraph = box.querySelector("p");
//     paragraph.style.opacity = "0";
//     paragraph.style.transform = "translateY(20px)";
//     paragraph.style.bottom = "-50px";
//   });
// });


document.addEventListener("DOMContentLoaded", function () {
  const boxes = document.querySelectorAll(".box");
  let lastExpandedBox = document.querySelector(".box.expanded"); // Initialize with the first box

  boxes.forEach((box) => {
    box.addEventListener("click", () => {
      // If there's an expanded box and it's not the clicked one, collapse it
      if (lastExpandedBox && lastExpandedBox !== box) {
        lastExpandedBox.classList.remove("expanded");
      }
      // Toggle expand on the clicked box
      box.classList.toggle("expanded");
      // Update the reference to the last expanded box
      lastExpandedBox = box.classList.contains("expanded") ? box : null;
    });
  });

  // MENU CLOSE
  // Selecciona todos los enlaces dentro del menú
  const menuLinks = document.querySelectorAll(".nav-link");

  // Recorre todos los enlaces y agrega un evento de clic
  menuLinks.forEach((link) => {
    link.addEventListener("click", function () {
      // Selecciona el contenedor del menú
      const navbarCollapse = document.getElementById("navbarSupportedContent");

      // Si el menú está abierto, ciérralo
      if (navbarCollapse.classList.contains("show")) {
        const collapse = new bootstrap.Collapse(navbarCollapse, {
          toggle: false, // No alterna el estado, solo lo cierra
        });
        collapse.hide(); // Cierra el menú
      }
    });
  });

  // VIDEO BUTTON
  const videoContainers = document.querySelectorAll(".video-container");

  // Verifica si hay contenedores de video antes de continuar
  if (videoContainers.length > 0) {
    videoContainers.forEach((container) => {
      const video = container.querySelector(".video");
      const playButton = container.querySelector(".play-button");

      // Si no hay video o botón de reproducción, pasa al siguiente contenedor
      if (!video || !playButton) return;

      // Inicialmente, los controles están ocultos
      video.controls = false;

      playButton.addEventListener("click", (event) => {
        event.preventDefault(); // Evita la acción predeterminada del enlace
        video.play();
        video.controls = true; // Muestra los controles
        playButton.classList.add("hidden"); // Oculta el botón de reproducción
      });

      video.addEventListener("pause", () => {
        playButton.classList.remove("hidden");
      });

      video.addEventListener("ended", () => {
        playButton.classList.remove("hidden");
        video.controls = false; // Oculta los controles nuevamente al terminar
      });
    });
  }
});
