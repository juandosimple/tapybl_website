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