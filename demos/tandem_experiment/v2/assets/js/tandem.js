// This example demonstrates how to Load a Facility/Model from Tandem, using 2-Legged Auth

async function main() {
  const div = document.getElementById("viewer");

  const tandem = await new tandemViewer(div);

  // Get a list of facilities and open the first one
  const FacilityList = await tandem.fetchFacilities();
  const facilityNumber = 1;
  await tandem.openFacility(FacilityList[facilityNumber]);
}

// initialize Tandem Viewer and load different facilities
class tandemViewer {
  constructor(div) {
    return new Promise(async (resolve) => {
      // Obtener el token de localStorage
      const _access_token = localStorage.getItem("access_token");

      if (!_access_token) {
        console.error("No access token found in localStorage");
        return;
      }

      // Open Tandem Viewer
      const options = {
        env: "DtProduction",
        api: "dt",
        accessToken: _access_token, // Usa el token almacenado
        productId: "Digital Twins",
        corsWorker: true,
      };

      const av = Autodesk.Viewing;
      av.Initializer(options, () => {
        this.viewer = new av.GuiViewer3D(div, {
          extensions: ["Autodesk.BoxSelection"],
          screenModeDelegate: av.NullScreenModeDelegate,
          theme: "light-theme",
        });
        this.viewer.start();
        this.app = new Autodesk.Tandem.DtApp();
        window.DT_APP = this.app;
        resolve(this);
      });
    });
  }

  async fetchFacilities(URN) {
    const FacilitiesSharedWithMe = await this.app.getCurrentTeamsFacilities();
    const myFacilities = await this.app.getUsersFacilities();
    return [].concat(FacilitiesSharedWithMe, myFacilities);
  }

  async openFacility(facility) {
    this.app.displayFacility(facility, false, this.viewer);
  }
}

// // Establecer un timeout de 5 segundos antes de ejecutar el querySelectorAll y el forEach
// setTimeout(() => {
//   const canvas = document.querySelector('canvas[data-viewer-canvas="true"]');
//   if (canvas) {
//     const ctx = canvas.getContext("2d");
//     // Escuchar clics en el canvas
//     canvas.addEventListener("click", function (event) {
//       const rect = canvas.getBoundingClientRect();
//       const clickX = event.clientX - rect.left;
//       const clickY = event.clientY - rect.top;

//       // Obtener el color del píxel clickeado
//       const pixel = ctx.getImageData(clickX, clickY, 1, 1).data;
//       const color = `rgb(${pixel[0]}, ${pixel[1]}, ${pixel[2]})`;

//       console.log(`Hiciste clic en el color: ${color}`);
//     });
//     // Manejar la selección de un nivel
//     console.log("Canvas encontrado:", canvas);
//   } else {
//     console.error("No se encontró el canvas.");
//   }

// }, 6000); // 5000 ms = 5 segundos

// Función para manejar la detección del canvas y asignar el evento de clic
// setTimeout(() => {
//   const canvas = document.querySelector('canvas[data-viewer-canvas="true"]');
//   if (canvas) {
//     console.log("Probando contextos...");
//     console.log("2D:", canvas.getContext("2d"));
//     console.log("WebGL:", canvas.getContext("webgl"));
//     console.log("WebGL2:", canvas.getContext("webgl2"));
//     console.log("WebGPU:", navigator.gpu ? "Disponible" : "No disponible");
//   } else {
//     console.error("No se encontró el canvas.");
//   }

//   // console.log("Autodesk:", window.Autodesk);
//   console.log("Tandem API:", window.Autodesk?.Tandem);
//   console.log("Autodesk.Tandem exists:", !!window.Autodesk?.Tandem);
//   window.Autodesk?.Tandem?.onReady?.().then(() => {
//     console.log("Tandem API is ready");
//     console.log("Viewer:", window.Autodesk?.Tandem?.getViewer?.());
// });
//   console.log("Viewer:", window.Autodesk?.Tandem?.getViewer?.());

// }, 8000); // 5000 ms = 5 segundos

function waitForViewer(callback) {
  const interval = setInterval(() => {
      const viewer = window.Autodesk?.Tandem?.getViewer?.();
      if (viewer) {
          clearInterval(interval);
          console.log("Viewer encontrado:", viewer);
          callback(viewer);
      }else{
        console.error('nothing found')
      }
  }, 500); // Verifica cada 500ms
}

// Llamar a la función
waitForViewer((viewer) => {
  console.log("¡Listo para usar el visor!", viewer);
});