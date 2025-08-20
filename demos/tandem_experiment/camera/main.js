// Configura la cámara solicitando acceso y asignando el stream al elemento <video>
async function setupCamera() {
  const video = document.getElementById('video');
  const constraints = {
    video: {
      facingMode: { ideal: 'environment' }, // Usa la cámara trasera
      width: { ideal: 640 },  // Resolución reducida
      height: { ideal: 480 }
    }
  };
  try {
    const stream = await navigator.mediaDevices.getUserMedia(constraints);
    video.srcObject = stream;
    return new Promise(resolve => {
      video.onloadedmetadata = () => resolve(video);
    });
  } catch (error) {
    console.error("Error accediendo a la cámara:", error);
  }
}

// Carga el modelo personalizado que detecta puertas con picaporte.
// Asegúrate de haber entrenado y alojado tu modelo, y actualiza la ruta 'model/model.json'
async function loadCustomModel() {
  const modelUrl = 'model/model.json'; // <-- Actualiza esta ruta según corresponda
  try {
    const model = await tf.loadGraphModel(modelUrl);
    return model;
  } catch (error) {
    console.error("Error al cargar el modelo personalizado:", error);
  }
}

// Variables para controlar el intervalo de detección y estabilizar el overlay
let lastDetectionRun = 0;
const detectionInterval = 500; // Ejecuta detección cada 500 ms

let lastDetectedTime = 0;
let lastDetectedObjects = [];
const detectionStabilizationTime = 1000; // Mantiene el overlay 1 segundo después de la última detección

// Función para iniciar la detección de puertas con picaporte
async function detectDoor() {
  const model = await loadCustomModel();
  const video = await setupCamera();
  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext('2d');
  const overlayDiv = document.getElementById('objectLabel');

  // Ajusta el canvas al tamaño del video
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;

  // Función recursiva para procesar cada frame
  async function processFrame() {
    // Dibuja el frame actual del video en el canvas
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    // Ejecuta la detección cada 'detectionInterval' ms
    if (Date.now() - lastDetectionRun >= detectionInterval) {
      lastDetectionRun = Date.now();
      
      // Obtén las predicciones de tu modelo personalizado.
      // La forma de obtener y procesar las predicciones dependerá del modelo.
      // Aquí asumimos que 'predictions' es un array de objetos con { class, score, bbox }
      // **IMPORTANTE:** Asegúrate de que tu modelo devuelva resultados en este formato.
      const predictions = await model.executeAsync(tf.browser.fromPixels(video));
      
      // Si tu modelo devuelve un tensor, deberás convertirlo a un array y procesarlo.
      // Por simplicidad, asumiremos que 'predictions' ya es un array.
      let detectedObjects = [];

      predictions.forEach(prediction => {
        // Filtra para la categoría 'door' (o el nombre que hayas usado al entrenar)
        // y usa un umbral de confiabilidad (score) adecuado, por ejemplo 0.6.
        if (prediction.class === 'door' && prediction.score > 0.6) {
          // Dibuja un recuadro en verde alrededor de la puerta detectada
          ctx.strokeStyle = 'green';
          ctx.lineWidth = 4;
          ctx.strokeRect(...prediction.bbox);

          if (!detectedObjects.includes(prediction.class)) {
            detectedObjects.push(prediction.class);
          }
        }
      });

      // Si se detecta la puerta, actualiza la última detección
      if (detectedObjects.length > 0) {
        lastDetectedTime = Date.now();
        lastDetectedObjects = detectedObjects;
      }
    }

    // Muestra el overlay mientras la última detección sea reciente
    if (Date.now() - lastDetectedTime < detectionStabilizationTime) {
      overlayDiv.innerText = lastDetectedObjects.join(', ');
      overlayDiv.style.display = 'block';
    } else {
      overlayDiv.style.display = 'none';
    }

    requestAnimationFrame(processFrame);
  }

  processFrame();
}

// Inicia la detección al hacer clic en el botón
document.getElementById('startButton').addEventListener('click', () => {
  detectDoor();
  // Oculta el botón tras iniciar la cámara
  document.getElementById('startButton').style.display = 'none';
});