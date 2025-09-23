/* cookie-consent.init.js */
(function () {
  // Si cambias sustancialmente la política, cambia este key para forzar re-consent
  const STORAGE_KEY = "cookie_consent_v2";

  window.CookieConsent.init({
    storageKey: STORAGE_KEY,
    position: "bottom-right",
    brandName: "tapybl",
    policyUrl: "/full-terms-and-conditions/", // cámbialo si tienes una página de privacidad
    palette: {
      bg: "#0b1220", // fondo
      text: "#e5e7eb", // texto
      accent: "#22c55e",
      border: "#1f2937",
    },
    zIndex: 2147483646,
  });

  // (Opcional) añade un comando global para reabrir el banner desde la consola:
  window.openCookieBanner = () =>
    window.CookieConsent.open({ storageKey: STORAGE_KEY });

  // (Opcional) si quieres un enlace en el footer que reabra el banner:
  // document.querySelector('#open-consent')?.addEventListener('click', (e) => {
  //   e.preventDefault();
  //   window.CookieConsent.open({ storageKey: STORAGE_KEY });
  // });
})();
