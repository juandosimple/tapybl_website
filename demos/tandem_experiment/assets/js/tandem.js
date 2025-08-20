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
                modalContent = "<h5>Elevator door</h5><ul>   <li><strong>Conducted on:</strong> 17 Oct 2024</li>   <li><strong>Conducted by:</strong> Matt Sillitoe</li>   <li><strong>Check Reference:</strong>BST - FEDC - 011922</li>   <li><strong>Are you able to check both sides of the door and its frame?</strong> No</li> </ul><div class='action-buttons'><button>Check certificate</button><button>Download certificate</button></div>";
                break;
              case 983:
                modalContent = "<h5>Elevator door</h5><ul>   <li><strong>Conducted on:</strong> 17 Oct 2024</li>   <li><strong>Conducted by:</strong> Matt Sillitoe</li>   <li><strong>Check Reference:</strong>BST - FEDC - 011922</li>   <li><strong>Are you able to check both sides of the door and its frame?</strong> No</li> </ul><div class='action-buttons'><button>Check certificate</button><button>Download certificate</button></div>";
                break;
              case 282:
                modalContent = "<h5>Double door</h5><ul>   <li><strong>Conducted on:</strong> 17 Oct 2024</li>   <li><strong>Conducted by:</strong> Matt Sillitoe</li>   <li><strong>Check Reference:</strong>BST - FEDC - 011922</li>   <li><strong>Are you able to check both sides of the door and its frame?</strong> No</li> </ul><div class='action-buttons'><button>Check certificate</button><button>Download certificate</button></div>";
                break;
              case 117:
                modalContent = "<h5>Specifications of the wall</h5><ul>   <li><strong>Solid Walls:</strong></li>   <li>Brick: Minimum 215 mm thick.</li>   <li>Block: Minimum 190 mm thick.</li>   <li>External or internal insulation required.</li> </ul><div class='action-buttons'><button>Check certificate</button><button>Download certificate</button></div>";
                break;
              case 297:
                modalContent = "<h5>Specifications of the wall</h5><ul>   <li><strong>Solid Walls:</strong></li>   <li>Brick: Minimum 215 mm thick.</li>   <li>Block: Minimum 190 mm thick.</li>   <li>External or internal insulation required.</li> </ul><div class='action-buttons'><button>Check certificate</button><button>Download certificate</button></div>";
                break;
              case 277:
                modalContent = "<h5>Door</h5><p>Flat Entrance Door Check</p> <ul>   <li><strong>Conducted on:</strong> 17 Oct 2024</li>   <li><strong>Conducted by:</strong> Matt Sillitoe</li>   <li><strong>Check Reference:</strong>BST - FEDC - 011922</li>   <li><strong>Are you able to check both sides of the door and its frame?</strong> No</li> </ul><div class='action-buttons'><button>Check certificate</button><button>Download certificate</button></div>";
                break;
              case 276:
                modalContent = "<h5>Door</h5><p>Flat Entrance Door Check</p> <ul>   <li><strong>Conducted on:</strong> 17 Oct 2024</li>   <li><strong>Conducted by:</strong> Matt Sillitoe</li>   <li><strong>Check Reference:</strong>BST - FEDC - 011922</li>   <li><strong>Are you able to check both sides of the door and its frame?</strong> No</li> </ul><div class='action-buttons'><button>Check certificate</button><button>Download certificate</button></div>";
                break;
              case 274:
                modalContent = "<h5>Fire emergency Door</h5><p>Flat Entrance Door Check</p> <ul>   <li><strong>Conducted on:</strong> 17 Oct 2024</li>   <li><strong>Conducted by:</strong> Matt Sillitoe</li>   <li><strong>Check Reference:</strong>BST - FEDC - 011922</li>   <li><strong>Are you able to check both sides of the door and its frame?</strong> No</li> </ul><div class='action-buttons'><button>Check certificate</button><button>Download certificate</button></div>";
                break;
              case 263:
                modalContent = "<h5>Floor</h5><ul> <li><strong>Solid Floor:</strong></li> <li>Minimum 100 mm concrete slab over a damp-proof membrane (DPM).</li> <li>Insulation above or below the slab to achieve a U-value ≤ 0.18 W/m²K.</li> <li>Screed finish (50-75 mm) for leveling.</li> </ul><div class='action-buttons'><button>Check certificate</button><button>Download certificate</button></div>";
                break;
              case 5:
                modalContent = "<h5>Window</h5><ul> <li><strong>Glazing:</strong>Must be double-glazed with low-emissivity glass.</li> <li><strong>U-value:</strong> ≤ 1.4 W/m²K for energy efficiency (Approved Document L).</li> <li><strong>Frame Materials:</strong>PVCu, timber, or aluminum with thermal breaks.</li> <li><strong>Safety Glazing:</strong>Required in critical areas (below 800 mm from floor or near doors). Must use toughened or laminated glass (Approved Document K).</li> </ul><div class='action-buttons'><button>Check certificate</button><button>Download certificate</button></div>";
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