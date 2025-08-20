// Configuración del gráfico de Temblores
function setupQuakeChart() {
  const quakeCtx = document.getElementById("quakeChart").getContext("2d");
  return new Chart(quakeCtx, {
    type: "line",
    data: {
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
    },
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
}

function simulateEarthquakeData(chart) {
  const isBigQuake = Math.random() < 0.1;
  const magnitude = isBigQuake ? (Math.random() * 2 + 5).toFixed(1) : (Math.random() * 2 + 1).toFixed(1);
  let status = "No Risk";
  if (magnitude >= 4 && magnitude < 6) status = "Small Tremour";
  else if (magnitude >= 6 && magnitude < 7) status = "Medium Tremour";
  else if (magnitude >= 7) status = "Tremour Alert";

  if (chart.data.labels.length >= 10) {
    chart.data.labels.shift();
    chart.data.datasets[0].data.shift();
  }
  chart.data.labels.push(new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }));
  chart.data.datasets[0].data.push(magnitude);
  chart.update();

  document.getElementById("quakeStatus").textContent = status;
}

// Configuración de la Temperatura
let currentTemperature;
let tempLabel = "Building Temp"; // Variable global para mantener el nombre

function simulateTemperatureData(initialTemperature, initialFlat) {
  if (initialTemperature !== undefined) currentTemperature = initialTemperature; // Actualizar temperatura inicial
  if (initialFlat !== undefined) tempLabel = initialFlat; // Actualizar etiqueta inicial
  if (currentTemperature === undefined) currentTemperature = 22; // Valor por defecto si no hay inicialización
  
  currentTemperature += (Math.random() * 0.5 - 0.25).toFixed(1) * 1; // Variación pequeña

  const tempWidget = document.getElementById("tempWidget");
  if (tempWidget) {
    tempWidget.innerHTML = `
      <h4><span class="temperature-icon temperature-pulse"></span>${tempLabel}</h4>
      <div class="status">
        <span id="tempStatus">${currentTemperature.toFixed(1)}</span>
        <span class="degrees">%</span>
      </div>`;
  }


}

// Configuración del Sensor de Humedad
let currentHumidity;
let humidityLabel = "Building Humidity"; // Variable global para mantener el nombre

function simulateHumidityData(initialHumidity, initialFlat) {
  if (initialHumidity !== undefined) currentHumidity = initialHumidity; // Actualizar humedad inicial
  if (initialFlat !== undefined) humidityLabel = initialFlat; // Actualizar etiqueta inicial
  if (currentHumidity === undefined) currentHumidity = 50; // Valor por defecto si no hay inicialización
  
  currentHumidity += (Math.random() * 1 - 0.5).toFixed(1) * 1; // Variación pequeña
  
  const humidityWidget = document.getElementById("humidityWidget");
  if (humidityWidget) {
    humidityWidget.innerHTML = `
      <h4><span class="humidity-icon humidity-pulse"></span>${humidityLabel}</h4>
      <div class="status">
        <span id="humidityStatus">${currentHumidity.toFixed(1)}</span>
        <span class="degrees">%</span>
      </div>`;
  }
}

// Inicialización
document.addEventListener("DOMContentLoaded", () => {
  let quakeChartcontainer = document.getElementById("quakeChart");
  if(quakeChartcontainer){
    const quakeChart = setupQuakeChart();
    setInterval(() => simulateEarthquakeData(quakeChart), 3000);
    simulateEarthquakeData(quakeChart);
  }
  setInterval(() => simulateTemperatureData(currentTemperature), 3000);
  setInterval(() => simulateHumidityData(currentHumidity), 3000);
  
  simulateTemperatureData(22);
  simulateHumidityData(50);
});



document.addEventListener("DOMContentLoaded", function () {
  // Select menu items
  const admin = document.getElementById("admin-view");
  const contractor = document.getElementById("contractor-view");
  const tenant = document.getElementById("tentant-view"); // Ensure correct ID

  // Select elements to update
  const documentsList = document.getElementById("documentsList");
  const buildingsLink = document.getElementById("buildings-link");

  // Function to handle class changes
  function setViewClass(role) {
      // Remove previous role classes
      if (documentsList) {
          documentsList.classList.remove("admin-view", "tenant-view");
      }
      if (buildingsLink) {
          buildingsLink.classList.remove("admin-view", "tenant-view", "contractor-view");
      }

      // Add new class based on selection
      if (role === "contractor") {
          buildingsLink?.classList.add("contractor-view");
      } else {
          documentsList?.classList.add(role + "-view");
          buildingsLink?.classList.add(role + "-view");
      }
  }

  // Attach event listeners
  admin.addEventListener("click", () => setViewClass("admin"));
  contractor.addEventListener("click", () => setViewClass("contractor"));
  tenant.addEventListener("click", () => setViewClass("tenant"));
});