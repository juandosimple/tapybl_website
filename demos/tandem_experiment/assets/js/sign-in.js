document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("form");
    
    form.addEventListener("submit", async function (event) {
      event.preventDefault();
      
      const email = document.getElementById("floatingInput").value;
      const password = document.getElementById("floatingPassword").value;
      
      try {
        const response = await fetch("https://developer.api.autodesk.com/authentication/v2/token", {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded"
          },
          body: new URLSearchParams({
            client_id: "tYk6lTXZSSrhtD2KhS2b73vkPuPYwLbgek4dYd8WQIwJhtLF",
            client_secret: "a98fBG8xAGADARGWxU2g17eXtKnL5KbWvrTpYIqwGUaOIX4rI3R9Q4uGGawDHspb",
            grant_type: "client_credentials",
            scope: "data:read"
          })
        });
        
        if (!response.ok) {
          throw new Error("Error al obtener el token");
        }
        
        const data = await response.json();
        localStorage.setItem("access_token", data.access_token);
        
        window.location.href = "demo/buildings";
      } catch (error) {
        console.error("Error de autenticación:", error);
        alert("No se pudo iniciar sesión");
      }
    });
  });
  