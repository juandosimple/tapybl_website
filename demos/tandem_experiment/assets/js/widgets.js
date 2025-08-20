// Configuración del gráfico de Temblores
const quakeCtx = document.getElementById("quakeChart").getContext("2d");
const quakeData = {
  labels: [],
  datasets: [
    {
      label: "Magnitude (°)",
      data: [],
      borderColor: "#e74c3c",
      backgroundColor: "rgba(231, 76, 60, 0.2)",
      fill: true,
      tension: 0.4,
    },
  ],
};

const quakeChart = new Chart(quakeCtx, {
  type: "line",
  data: quakeData,
  options: {
    scales: {
      y: {
        beginAtZero: true,
        suggestedMax: 6,
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
  },
});

function simulateEarthquakeData() {
  // Genera temblores suaves con ocasionales temblores fuertes
  const isBigQuake = Math.random() < 0.1; // 10% de probabilidad de temblor grande
  const magnitude = isBigQuake
    ? (Math.random() * 2 + 5).toFixed(1) // Entre 5.0 y 7.0
    : (Math.random() * 2 + 1).toFixed(1); // Entre 1.0 y 3.0

  let status = "No Risk";
  if (magnitude >= 4 && magnitude < 6) {
    status = "Small Tremour";
  } else if (magnitude >= 6 && magnitude < 7) {
    status = "Medium Tremour";
  } else if (magnitude >= 7) {
    status = "Tremour Alert";
  }

  const now = new Date();
  const timeString = now.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  if (quakeData.labels.length >= 10) {
    quakeData.labels.shift();
    quakeData.datasets[0].data.shift();
  }
  quakeData.labels.push(timeString);
  quakeData.datasets[0].data.push(magnitude);

  quakeChart.update();

  document.getElementById("quakeStatus").textContent = status;
  document.getElementById("quakeTime").textContent = timeString;
}

// Configuración de la Temperatura (solo números)
let currentTemperature = 22; // Temperatura inicial en °C

function simulateTemperatureData() {
  // Variación de 1 grado al azar
  const tempChange = Math.random() < 0.5 ? -1 : 1;
  currentTemperature += tempChange;

  const now = new Date();
  const timeString = now.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  document.getElementById("tempStatus").textContent = currentTemperature;
  document.getElementById("tempTime").textContent = timeString;
}

// Actualización cada 3 segundos para temblores y cada 1 minuto para temperatura
setInterval(simulateEarthquakeData, 3000);
setInterval(simulateTemperatureData, 60000);

// Datos iniciales
simulateEarthquakeData();
simulateTemperatureData();
