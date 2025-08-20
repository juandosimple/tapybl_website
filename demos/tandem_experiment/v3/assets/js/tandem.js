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

        // EXPERIMENT
        // EXPERIMENT
                // Agrega el listener para el cambio de selección
        // Agrega el listener para el cambio de selección
        this.viewer.addEventListener(Autodesk.Viewing.SELECTION_CHANGED_EVENT, (event) => {
          if (event.dbIdArray && event.dbIdArray.length > 0) {
            const selectedDbId = event.dbIdArray[0];
            console.log("Elemento seleccionado:", selectedDbId);
            
            // Define el contenido del modal según el id seleccionado
            let modalContent = "";
            switch(selectedDbId) {
              case 984:
                modalContent = "<h5>Lift</h5><ul>   <li><strong>Last inspection</strong><p>…./…./2025</p></li><li><strong>Next inspection due</strong><p>…./…./2025</p></li></ul><div class='action-buttons'><button>Last Inspection Report</button><button>Record of works reports</button><button>Specification details</button><button>Archive data</button><button>JPI Guidance Note</button><button>BSR Communication</button></div>";
                break;
              case 983:
                modalContent = "<h5>Lift</h5><ul>   <li><strong>Last inspection</strong><p>…./…./2025</p></li><li><strong>Next inspection due</strong><p>…./…./2025</p></li></ul><div class='action-buttons'><button>Last Inspection Report</button><button>Record of works reports</button><button>Specification details</button><button>Archive data</button><button>JPI Guidance Note</button><button>BSR Communication</button></div>";
                break;
              case 282:
                modalContent = "<h5>Flat 21</h5> <ul> <li> <strong>Door Fire Rating</strong> <p>…. minutes</p> </li> </ul> <div class='action-buttons'> <a href='https://tapybl.com/demos/tandem_experiment/v3/demo/uploads/building/fire-strategy/woodhouse-court-fire-strategy.pdf'  class='cert-link'target='_blank'>Last Inspection Report</a> <a href='#' data-bs-target='#customModal2' class='cert-link' data-bs-toggle='modal'>Minor repair reports</a> <a href='https://tapybl.com/demos/tandem_experiment/v3/demo/uploads/building/fire-strategy/woodhouse-court-fire-strategy.pdf'  class='cert-link'target='_blank'>Door Specification & Test Data</a> <a href='#' data-bs-target='#customModal3' class='cert-link' data-bs-toggle='modal'>Archive data</a> <a href='https://tapybl.com/demos/tandem_experiment/v3/demo/uploads/building/fire-strategy/woodhouse-court-fire-strategy.pdf'  class='cert-link'target='_blank'>JPI Guidance Note</a> <a href='https://tapybl.com/demos/tandem_experiment/v3/demo/uploads/building/fire-strategy/woodhouse-court-fire-strategy.pdf'  class='cert-link'target='_blank'>BSR Communication</a> </div>";
                simulateTemperatureData(33, 'Flat 21 Temperature');
                simulateHumidityData(90, 'Flat 21 Humidity');
                break;
              case 117:
                modalContent = "<h5>Walls</h5> <ul> <li> <strong>Fire rating</strong> <p>200 Minutes</p> </li> </ul> <div class='action-buttons'> <a href='https://tapybl.com/demos/tandem_experiment/v3/demo/uploads/building/fire-strategy/woodhouse-court-fire-strategy.pdf' class='cert-link' target='_blank' >Fire Strategy</a > <a href='https://tapybl.com/demos/tandem_experiment/v3/demo/uploads/building/building-safety-case-report/building-safety-case-report.pdf' class='cert-link' target='_blank' >Record of works reports</a > <a href='https://tapybl.com/demos/tandem_experiment/v3/demo/uploads/building/building-safety-case-report/building-safety-case-report.pdf' class='cert-link' target='_blank' >Wall Specification and Build-up</a > <a href='https://tapybl.com/demos/tandem_experiment/v3/demo/uploads/building/building-safety-case-report/building-safety-case-report.pdf' class='cert-link' target='_blank' >Archive data</a > <a href='https://tapybl.com/demos/tandem_experiment/v3/demo/uploads/building/building-safety-case-report/building-safety-case-report.pdf' class='cert-link' target='_blank' >JPI Guidance Note</a > <a href='https://tapybl.com/demos/tandem_experiment/v3/demo/uploads/building/building-safety-case-report/building-safety-case-report.pdf' class='cert-link' target='_blank' >BSR Communication</a > </div>";
                break;
              case 118:
                modalContent = "<h5>Walls</h5> <ul> <li> <strong>Fire rating</strong> <p>200 Minutes</p> </li> </ul> <div class='action-buttons'> <a href='https://tapybl.com/demos/tandem_experiment/v3/demo/uploads/building/fire-strategy/woodhouse-court-fire-strategy.pdf' class='cert-link' target='_blank' >Fire Strategy</a > <a href='https://tapybl.com/demos/tandem_experiment/v3/demo/uploads/building/building-safety-case-report/building-safety-case-report.pdf' class='cert-link' target='_blank' >Record of works reports</a > <a href='https://tapybl.com/demos/tandem_experiment/v3/demo/uploads/building/building-safety-case-report/building-safety-case-report.pdf' class='cert-link' target='_blank' >Wall Specification and Build-up</a > <a href='https://tapybl.com/demos/tandem_experiment/v3/demo/uploads/building/building-safety-case-report/building-safety-case-report.pdf' class='cert-link' target='_blank' >Archive data</a > <a href='https://tapybl.com/demos/tandem_experiment/v3/demo/uploads/building/building-safety-case-report/building-safety-case-report.pdf' class='cert-link' target='_blank' >JPI Guidance Note</a > <a href='https://tapybl.com/demos/tandem_experiment/v3/demo/uploads/building/building-safety-case-report/building-safety-case-report.pdf' class='cert-link' target='_blank' >BSR Communication</a > </div>";
                break;
              case 265:
                modalContent = "<h5>Walls</h5> <ul> <li> <strong>Fire rating</strong> <p>200 Minutes</p> </li> </ul> <div class='action-buttons'> <a href='https://tapybl.com/demos/tandem_experiment/v3/demo/uploads/building/fire-strategy/woodhouse-court-fire-strategy.pdf' class='cert-link' target='_blank' >Fire Strategy</a > <a href='https://tapybl.com/demos/tandem_experiment/v3/demo/uploads/building/building-safety-case-report/building-safety-case-report.pdf' class='cert-link' target='_blank' >Record of works reports</a > <a href='https://tapybl.com/demos/tandem_experiment/v3/demo/uploads/building/building-safety-case-report/building-safety-case-report.pdf' class='cert-link' target='_blank' >Wall Specification and Build-up</a > <a href='https://tapybl.com/demos/tandem_experiment/v3/demo/uploads/building/building-safety-case-report/building-safety-case-report.pdf' class='cert-link' target='_blank' >Archive data</a > <a href='https://tapybl.com/demos/tandem_experiment/v3/demo/uploads/building/building-safety-case-report/building-safety-case-report.pdf' class='cert-link' target='_blank' >JPI Guidance Note</a > <a href='https://tapybl.com/demos/tandem_experiment/v3/demo/uploads/building/building-safety-case-report/building-safety-case-report.pdf' class='cert-link' target='_blank' >BSR Communication</a > </div>";
                break;
              case 266:
                modalContent = "<h5>Walls</h5> <ul> <li> <strong>Fire rating</strong> <p>200 Minutes</p> </li> </ul> <div class='action-buttons'> <a href='https://tapybl.com/demos/tandem_experiment/v3/demo/uploads/building/fire-strategy/woodhouse-court-fire-strategy.pdf' class='cert-link' target='_blank' >Fire Strategy</a > <a href='https://tapybl.com/demos/tandem_experiment/v3/demo/uploads/building/building-safety-case-report/building-safety-case-report.pdf' class='cert-link' target='_blank' >Record of works reports</a > <a href='https://tapybl.com/demos/tandem_experiment/v3/demo/uploads/building/building-safety-case-report/building-safety-case-report.pdf' class='cert-link' target='_blank' >Wall Specification and Build-up</a > <a href='https://tapybl.com/demos/tandem_experiment/v3/demo/uploads/building/building-safety-case-report/building-safety-case-report.pdf' class='cert-link' target='_blank' >Archive data</a > <a href='https://tapybl.com/demos/tandem_experiment/v3/demo/uploads/building/building-safety-case-report/building-safety-case-report.pdf' class='cert-link' target='_blank' >JPI Guidance Note</a > <a href='https://tapybl.com/demos/tandem_experiment/v3/demo/uploads/building/building-safety-case-report/building-safety-case-report.pdf' class='cert-link' target='_blank' >BSR Communication</a > </div>";
                break;
              case 264:
                modalContent = "<h5>Walls</h5> <ul> <li> <strong>Fire rating</strong> <p>200 Minutes</p> </li> </ul> <div class='action-buttons'> <a href='https://tapybl.com/demos/tandem_experiment/v3/demo/uploads/building/fire-strategy/woodhouse-court-fire-strategy.pdf' class='cert-link' target='_blank' >Fire Strategy</a > <a href='https://tapybl.com/demos/tandem_experiment/v3/demo/uploads/building/building-safety-case-report/building-safety-case-report.pdf' class='cert-link' target='_blank' >Record of works reports</a > <a href='https://tapybl.com/demos/tandem_experiment/v3/demo/uploads/building/building-safety-case-report/building-safety-case-report.pdf' class='cert-link' target='_blank' >Wall Specification and Build-up</a > <a href='https://tapybl.com/demos/tandem_experiment/v3/demo/uploads/building/building-safety-case-report/building-safety-case-report.pdf' class='cert-link' target='_blank' >Archive data</a > <a href='https://tapybl.com/demos/tandem_experiment/v3/demo/uploads/building/building-safety-case-report/building-safety-case-report.pdf' class='cert-link' target='_blank' >JPI Guidance Note</a > <a href='https://tapybl.com/demos/tandem_experiment/v3/demo/uploads/building/building-safety-case-report/building-safety-case-report.pdf' class='cert-link' target='_blank' >BSR Communication</a > </div>";
                break;
              case 267:
                modalContent = "<h5>Walls</h5> <ul> <li> <strong>Fire rating</strong> <p>200 Minutes</p> </li> </ul> <div class='action-buttons'> <a href='https://tapybl.com/demos/tandem_experiment/v3/demo/uploads/building/fire-strategy/woodhouse-court-fire-strategy.pdf' class='cert-link' target='_blank' >Fire Strategy</a > <a href='https://tapybl.com/demos/tandem_experiment/v3/demo/uploads/building/building-safety-case-report/building-safety-case-report.pdf' class='cert-link' target='_blank' >Record of works reports</a > <a href='https://tapybl.com/demos/tandem_experiment/v3/demo/uploads/building/building-safety-case-report/building-safety-case-report.pdf' class='cert-link' target='_blank' >Wall Specification and Build-up</a > <a href='https://tapybl.com/demos/tandem_experiment/v3/demo/uploads/building/building-safety-case-report/building-safety-case-report.pdf' class='cert-link' target='_blank' >Archive data</a > <a href='https://tapybl.com/demos/tandem_experiment/v3/demo/uploads/building/building-safety-case-report/building-safety-case-report.pdf' class='cert-link' target='_blank' >JPI Guidance Note</a > <a href='https://tapybl.com/demos/tandem_experiment/v3/demo/uploads/building/building-safety-case-report/building-safety-case-report.pdf' class='cert-link' target='_blank' >BSR Communication</a > </div>";
                break;
              case 272:
                modalContent = "<h5>Walls</h5> <ul> <li> <strong>Fire rating</strong> <p>200 Minutes</p> </li> </ul> <div class='action-buttons'> <a href='https://tapybl.com/demos/tandem_experiment/v3/demo/uploads/building/fire-strategy/woodhouse-court-fire-strategy.pdf' class='cert-link' target='_blank' >Fire Strategy</a > <a href='https://tapybl.com/demos/tandem_experiment/v3/demo/uploads/building/building-safety-case-report/building-safety-case-report.pdf' class='cert-link' target='_blank' >Record of works reports</a > <a href='https://tapybl.com/demos/tandem_experiment/v3/demo/uploads/building/building-safety-case-report/building-safety-case-report.pdf' class='cert-link' target='_blank' >Wall Specification and Build-up</a > <a href='https://tapybl.com/demos/tandem_experiment/v3/demo/uploads/building/building-safety-case-report/building-safety-case-report.pdf' class='cert-link' target='_blank' >Archive data</a > <a href='https://tapybl.com/demos/tandem_experiment/v3/demo/uploads/building/building-safety-case-report/building-safety-case-report.pdf' class='cert-link' target='_blank' >JPI Guidance Note</a > <a href='https://tapybl.com/demos/tandem_experiment/v3/demo/uploads/building/building-safety-case-report/building-safety-case-report.pdf' class='cert-link' target='_blank' >BSR Communication</a > </div>";
                break;
              case 268:
                modalContent = "<h5>Walls</h5> <ul> <li> <strong>Fire rating</strong> <p>200 Minutes</p> </li> </ul> <div class='action-buttons'> <a href='https://tapybl.com/demos/tandem_experiment/v3/demo/uploads/building/fire-strategy/woodhouse-court-fire-strategy.pdf' class='cert-link' target='_blank' >Fire Strategy</a > <a href='https://tapybl.com/demos/tandem_experiment/v3/demo/uploads/building/building-safety-case-report/building-safety-case-report.pdf' class='cert-link' target='_blank' >Record of works reports</a > <a href='https://tapybl.com/demos/tandem_experiment/v3/demo/uploads/building/building-safety-case-report/building-safety-case-report.pdf' class='cert-link' target='_blank' >Wall Specification and Build-up</a > <a href='https://tapybl.com/demos/tandem_experiment/v3/demo/uploads/building/building-safety-case-report/building-safety-case-report.pdf' class='cert-link' target='_blank' >Archive data</a > <a href='https://tapybl.com/demos/tandem_experiment/v3/demo/uploads/building/building-safety-case-report/building-safety-case-report.pdf' class='cert-link' target='_blank' >JPI Guidance Note</a > <a href='https://tapybl.com/demos/tandem_experiment/v3/demo/uploads/building/building-safety-case-report/building-safety-case-report.pdf' class='cert-link' target='_blank' >BSR Communication</a > </div>";
                break;
              case 271:
                modalContent = "<h5>Walls</h5> <ul> <li> <strong>Fire rating</strong> <p>200 Minutes</p> </li> </ul> <div class='action-buttons'> <a href='https://tapybl.com/demos/tandem_experiment/v3/demo/uploads/building/fire-strategy/woodhouse-court-fire-strategy.pdf' class='cert-link' target='_blank' >Fire Strategy</a > <a href='https://tapybl.com/demos/tandem_experiment/v3/demo/uploads/building/building-safety-case-report/building-safety-case-report.pdf' class='cert-link' target='_blank' >Record of works reports</a > <a href='https://tapybl.com/demos/tandem_experiment/v3/demo/uploads/building/building-safety-case-report/building-safety-case-report.pdf' class='cert-link' target='_blank' >Wall Specification and Build-up</a > <a href='https://tapybl.com/demos/tandem_experiment/v3/demo/uploads/building/building-safety-case-report/building-safety-case-report.pdf' class='cert-link' target='_blank' >Archive data</a > <a href='https://tapybl.com/demos/tandem_experiment/v3/demo/uploads/building/building-safety-case-report/building-safety-case-report.pdf' class='cert-link' target='_blank' >JPI Guidance Note</a > <a href='https://tapybl.com/demos/tandem_experiment/v3/demo/uploads/building/building-safety-case-report/building-safety-case-report.pdf' class='cert-link' target='_blank' >BSR Communication</a > </div>";
                break;
              case 269:
                modalContent = "<h5>Walls</h5> <ul> <li> <strong>Fire rating</strong> <p>200 Minutes</p> </li> </ul> <div class='action-buttons'> <a href='https://tapybl.com/demos/tandem_experiment/v3/demo/uploads/building/fire-strategy/woodhouse-court-fire-strategy.pdf' class='cert-link' target='_blank' >Fire Strategy</a > <a href='https://tapybl.com/demos/tandem_experiment/v3/demo/uploads/building/building-safety-case-report/building-safety-case-report.pdf' class='cert-link' target='_blank' >Record of works reports</a > <a href='https://tapybl.com/demos/tandem_experiment/v3/demo/uploads/building/building-safety-case-report/building-safety-case-report.pdf' class='cert-link' target='_blank' >Wall Specification and Build-up</a > <a href='https://tapybl.com/demos/tandem_experiment/v3/demo/uploads/building/building-safety-case-report/building-safety-case-report.pdf' class='cert-link' target='_blank' >Archive data</a > <a href='https://tapybl.com/demos/tandem_experiment/v3/demo/uploads/building/building-safety-case-report/building-safety-case-report.pdf' class='cert-link' target='_blank' >JPI Guidance Note</a > <a href='https://tapybl.com/demos/tandem_experiment/v3/demo/uploads/building/building-safety-case-report/building-safety-case-report.pdf' class='cert-link' target='_blank' >BSR Communication</a > </div>";
                break;
              case 273:
                modalContent = "<h5>Walls</h5> <ul> <li> <strong>Fire rating</strong> <p>200 Minutes</p> </li> </ul> <div class='action-buttons'> <a href='https://tapybl.com/demos/tandem_experiment/v3/demo/uploads/building/fire-strategy/woodhouse-court-fire-strategy.pdf' class='cert-link' target='_blank' >Fire Strategy</a > <a href='https://tapybl.com/demos/tandem_experiment/v3/demo/uploads/building/building-safety-case-report/building-safety-case-report.pdf' class='cert-link' target='_blank' >Record of works reports</a > <a href='https://tapybl.com/demos/tandem_experiment/v3/demo/uploads/building/building-safety-case-report/building-safety-case-report.pdf' class='cert-link' target='_blank' >Wall Specification and Build-up</a > <a href='https://tapybl.com/demos/tandem_experiment/v3/demo/uploads/building/building-safety-case-report/building-safety-case-report.pdf' class='cert-link' target='_blank' >Archive data</a > <a href='https://tapybl.com/demos/tandem_experiment/v3/demo/uploads/building/building-safety-case-report/building-safety-case-report.pdf' class='cert-link' target='_blank' >JPI Guidance Note</a > <a href='https://tapybl.com/demos/tandem_experiment/v3/demo/uploads/building/building-safety-case-report/building-safety-case-report.pdf' class='cert-link' target='_blank' >BSR Communication</a > </div>";
                break;
              case 259:
                modalContent = "<h5>Walls</h5> <ul> <li> <strong>Fire rating</strong> <p>200 Minutes</p> </li> </ul> <div class='action-buttons'> <a href='https://tapybl.com/demos/tandem_experiment/v3/demo/uploads/building/fire-strategy/woodhouse-court-fire-strategy.pdf' class='cert-link' target='_blank' >Fire Strategy</a > <a href='https://tapybl.com/demos/tandem_experiment/v3/demo/uploads/building/building-safety-case-report/building-safety-case-report.pdf' class='cert-link' target='_blank' >Record of works reports</a > <a href='https://tapybl.com/demos/tandem_experiment/v3/demo/uploads/building/building-safety-case-report/building-safety-case-report.pdf' class='cert-link' target='_blank' >Wall Specification and Build-up</a > <a href='https://tapybl.com/demos/tandem_experiment/v3/demo/uploads/building/building-safety-case-report/building-safety-case-report.pdf' class='cert-link' target='_blank' >Archive data</a > <a href='https://tapybl.com/demos/tandem_experiment/v3/demo/uploads/building/building-safety-case-report/building-safety-case-report.pdf' class='cert-link' target='_blank' >JPI Guidance Note</a > <a href='https://tapybl.com/demos/tandem_experiment/v3/demo/uploads/building/building-safety-case-report/building-safety-case-report.pdf' class='cert-link' target='_blank' >BSR Communication</a > </div>";
                break;
              case 278:
                modalContent = "<h5>Walls</h5> <ul> <li> <strong>Fire rating</strong> <p>200 Minutes</p> </li> </ul> <div class='action-buttons'> <a href='https://tapybl.com/demos/tandem_experiment/v3/demo/uploads/building/fire-strategy/woodhouse-court-fire-strategy.pdf' class='cert-link' target='_blank' >Fire Strategy</a > <a href='https://tapybl.com/demos/tandem_experiment/v3/demo/uploads/building/building-safety-case-report/building-safety-case-report.pdf' class='cert-link' target='_blank' >Record of works reports</a > <a href='https://tapybl.com/demos/tandem_experiment/v3/demo/uploads/building/building-safety-case-report/building-safety-case-report.pdf' class='cert-link' target='_blank' >Wall Specification and Build-up</a > <a href='https://tapybl.com/demos/tandem_experiment/v3/demo/uploads/building/building-safety-case-report/building-safety-case-report.pdf' class='cert-link' target='_blank' >Archive data</a > <a href='https://tapybl.com/demos/tandem_experiment/v3/demo/uploads/building/building-safety-case-report/building-safety-case-report.pdf' class='cert-link' target='_blank' >JPI Guidance Note</a > <a href='https://tapybl.com/demos/tandem_experiment/v3/demo/uploads/building/building-safety-case-report/building-safety-case-report.pdf' class='cert-link' target='_blank' >BSR Communication</a > </div>";
                break;
              case 260:
                modalContent = "<h5>Walls</h5> <ul> <li> <strong>Fire rating</strong> <p>200 Minutes</p> </li> </ul> <div class='action-buttons'> <a href='https://tapybl.com/demos/tandem_experiment/v3/demo/uploads/building/fire-strategy/woodhouse-court-fire-strategy.pdf' class='cert-link' target='_blank' >Fire Strategy</a > <a href='https://tapybl.com/demos/tandem_experiment/v3/demo/uploads/building/building-safety-case-report/building-safety-case-report.pdf' class='cert-link' target='_blank' >Record of works reports</a > <a href='https://tapybl.com/demos/tandem_experiment/v3/demo/uploads/building/building-safety-case-report/building-safety-case-report.pdf' class='cert-link' target='_blank' >Wall Specification and Build-up</a > <a href='https://tapybl.com/demos/tandem_experiment/v3/demo/uploads/building/building-safety-case-report/building-safety-case-report.pdf' class='cert-link' target='_blank' >Archive data</a > <a href='https://tapybl.com/demos/tandem_experiment/v3/demo/uploads/building/building-safety-case-report/building-safety-case-report.pdf' class='cert-link' target='_blank' >JPI Guidance Note</a > <a href='https://tapybl.com/demos/tandem_experiment/v3/demo/uploads/building/building-safety-case-report/building-safety-case-report.pdf' class='cert-link' target='_blank' >BSR Communication</a > </div>";
                break;
              case 270:
                modalContent = "<h5>Walls</h5> <ul> <li> <strong>Fire rating</strong> <p>200 Minutes</p> </li> </ul> <div class='action-buttons'> <a href='https://tapybl.com/demos/tandem_experiment/v3/demo/uploads/building/fire-strategy/woodhouse-court-fire-strategy.pdf' class='cert-link' target='_blank' >Fire Strategy</a > <a href='https://tapybl.com/demos/tandem_experiment/v3/demo/uploads/building/building-safety-case-report/building-safety-case-report.pdf' class='cert-link' target='_blank' >Record of works reports</a > <a href='https://tapybl.com/demos/tandem_experiment/v3/demo/uploads/building/building-safety-case-report/building-safety-case-report.pdf' class='cert-link' target='_blank' >Wall Specification and Build-up</a > <a href='https://tapybl.com/demos/tandem_experiment/v3/demo/uploads/building/building-safety-case-report/building-safety-case-report.pdf' class='cert-link' target='_blank' >Archive data</a > <a href='https://tapybl.com/demos/tandem_experiment/v3/demo/uploads/building/building-safety-case-report/building-safety-case-report.pdf' class='cert-link' target='_blank' >JPI Guidance Note</a > <a href='https://tapybl.com/demos/tandem_experiment/v3/demo/uploads/building/building-safety-case-report/building-safety-case-report.pdf' class='cert-link' target='_blank' >BSR Communication</a > </div>";
                break;
              case 297:
                modalContent = "<h5>Specifications of the wall</h5><ul>   <li><strong>Solid Walls:</strong></li>   <li>Brick: Minimum 215 mm thick.</li>   <li>Block: Minimum 190 mm thick.</li>   <li>External or internal insulation required.</li> </ul><div class='action-buttons'><button>Check certificate</button><button>Download certificate</button></div>";
                break;
              case 277:
                modalContent = "<h5>Flat 23</h5> <ul> <li> <strong>Door Fire Rating</strong> <p>…. minutes</p> </li> </ul> <div class='action-buttons'> <a href='https://tapybl.com/demos/tandem_experiment/v3/demo/uploads/building/fire-strategy/woodhouse-court-fire-strategy.pdf'  class='cert-link'target='_blank'>Last Inspection Report</a> <a href='#' data-bs-target='#customModal2' class='cert-link' data-bs-toggle='modal'>Minor repair reports</a> <a href='https://tapybl.com/demos/tandem_experiment/v3/demo/uploads/building/fire-strategy/woodhouse-court-fire-strategy.pdf'  class='cert-link'target='_blank'>Door Specification & Test Data</a> <a href='#' data-bs-target='#customModal3' class='cert-link' data-bs-toggle='modal'>Archive data</a> <a href='https://tapybl.com/demos/tandem_experiment/v3/demo/uploads/building/fire-strategy/woodhouse-court-fire-strategy.pdf'  class='cert-link'target='_blank'>JPI Guidance Note</a> <a href='https://tapybl.com/demos/tandem_experiment/v3/demo/uploads/building/fire-strategy/woodhouse-court-fire-strategy.pdf'  class='cert-link'target='_blank'>BSR Communication</a> </div>";
                simulateTemperatureData(30, 'Flat 23 Temperature');
                simulateHumidityData(50, 'Flat 23 Humidity');
                break;
              case 276:
                modalContent = "<h5>Flat 24</h5> <ul> <li> <strong>Door Fire Rating</strong> <p>…. minutes</p> </li> </ul> <div class='action-buttons'> <a href='https://tapybl.com/demos/tandem_experiment/v3/demo/uploads/building/fire-strategy/woodhouse-court-fire-strategy.pdf'  class='cert-link'target='_blank'>Last Inspection Report</a> <a href='#' data-bs-target='#customModal2' class='cert-link' data-bs-toggle='modal'>Minor repair reports</a> <a href='https://tapybl.com/demos/tandem_experiment/v3/demo/uploads/building/fire-strategy/woodhouse-court-fire-strategy.pdf'  class='cert-link'target='_blank'>Door Specification & Test Data</a> <a href='#' data-bs-target='#customModal3' class='cert-link' data-bs-toggle='modal'>Archive data</a> <a href='https://tapybl.com/demos/tandem_experiment/v3/demo/uploads/building/fire-strategy/woodhouse-court-fire-strategy.pdf'  class='cert-link'target='_blank'>JPI Guidance Note</a> <a href='https://tapybl.com/demos/tandem_experiment/v3/demo/uploads/building/fire-strategy/woodhouse-court-fire-strategy.pdf'  class='cert-link'target='_blank'>BSR Communication</a> </div>";
                simulateTemperatureData(32, 'Flat 24 Temperature');
                simulateHumidityData(70, 'Flat 24 Humidity');
                break;
              case 274:
                modalContent = "<h5>Fire Doors</h5> <ul> <li> <strong>Flat Number</strong> <p>….….</p> </li> <li> <strong>Door Fire Rating</strong> <p>…. minutes</p> </li> <li> <strong>Last inspection</strong> <p>…./…./2025</p> </li> <li> <strong>Next inspection due</strong> <p>…./…./2025</p> </li> </ul> <div class='action-buttons'> <button>Last Inspection Report</button><button>Minor repair reports</button ><button>Door Specification & Test Data</button><button>Archive data</button ><button>JPI Guidance Note</button><button>BSR Communication</button> </div>";
                break;
              case 263:
                modalContent = "<h5>Floors</h5><ul><li><strong>Fire Rating</strong><p>…. minutes</p> </li> </ul> <div class='action-buttons'><button>Fire Strategy</button><button>Record of works reports</button ><button>Floor Specification & Build-up</button><button>Archive data</button ><button>JPI Guidance Note</button><button>BSR Communication</button> </div>";
                break;
              case 320:
                modalContent = "<h5>Sprinklers</h5><ul>   <li><strong>Last inspection</strong><p>…./…./2025</p></li><li><strong>Next inspection due</strong><p>…./…./2025</p></li></ul><div class='action-buttons'><button>Fire Strategy</button><button>Record of works reports</button><button>Specification & commissioning certificate</button><button>Archive data</button><button>JPI Guidance Note</button><button>BSR Communication</button></div>";
                break;
              case 327:
                modalContent = "<h5>Sprinklers</h5><ul>   <li><strong>Last inspection</strong><p>…./…./2025</p></li><li><strong>Next inspection due</strong><p>…./…./2025</p></li></ul><div class='action-buttons'><button>Fire Strategy</button><button>Record of works reports</button><button>Specification & commissioning certificate</button><button>Archive data</button><button>JPI Guidance Note</button><button>BSR Communication</button></div>";
                break;
              case 329:
                modalContent = "<h5>Sprinklers</h5><ul>   <li><strong>Last inspection</strong><p>…./…./2025</p></li><li><strong>Next inspection due</strong><p>…./…./2025</p></li></ul><div class='action-buttons'><button>Fire Strategy</button><button>Record of works reports</button><button>Specification & commissioning certificate</button><button>Archive data</button><button>JPI Guidance Note</button><button>BSR Communication</button></div>";
                break;
              case 322:
                modalContent = "<h5>Sprinklers</h5><ul>   <li><strong>Last inspection</strong><p>…./…./2025</p></li><li><strong>Next inspection due</strong><p>…./…./2025</p></li></ul><div class='action-buttons'><button>Fire Strategy</button><button>Record of works reports</button><button>Specification & commissioning certificate</button><button>Archive data</button><button>JPI Guidance Note</button><button>BSR Communication</button></div>";
                break;
              case 5:
                modalContent = "<h5>Windows</h5><ul><li><strong>Last inspection</strong><p>…./…./2025</p></li><li><strong>Next inspection due</strong><p>…./…./2025</p></li></ul><div class='action-buttons'><button>Last Inspection Report</button><button>Record of works reports</button><button>Specification details</button><button>Archive data</button><button>JPI Guidance Note</button><button>BSR Communication</button></div>";
                break;
              default:
                modalContent = `<h5>Details for ${selectedDbId}</h5><p>Some content</p>`;
                break;
            }
            
            // Actualiza el contenido del modal en el contenedor con id "customModalBody"
            const modalBody = document.getElementById("customModalBody");
            if (modalBody) {
              modalBody.innerHTML = modalContent;
            }
            
            // Obtén la instancia del modal (Bootstrap 5) usando el id "customModal"
            const modalElement = document.getElementById("customModal");
            const modalInstance = new bootstrap.Modal(modalElement);
            modalInstance.show();
          }
        });
        // Agrega el listener para el cambio de selección
        // Agrega el listener para el cambio de selección
        // EXPERIMENT
        // EXPERIMENT


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