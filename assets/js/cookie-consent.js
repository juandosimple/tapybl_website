/* cookie-consent.js */
(function () {
  const DEFAULTS = {
    storageKey: "cookie_consent_v1",
    position: "bottom-right", // bottom-right | bottom-left
    brandName: "This site",
    policyUrl: "/privacy-policy/",
    palette: {
      bg: "#111827", // slate-900
      text: "#F9FAFB", // slate-50
      accent: "#10B981", // emerald-500
      border: "#1F2937", // slate-800
    },
    zIndex: 2147483646,
  };

  const html = (o) => `
    <div class="cc-wrap ${o.position}">
      <div class="cc-card" role="dialog" aria-live="polite" aria-label="Cookie consent">
        <div class="cc-text">
          <strong>Cookies & data consent</strong><br/>
          ${o.brandName} uses cookies and similar technologies to improve your experience and measure performance.
          You can accept or reject. You can change your choice later.
          <a class="cc-link" href="${o.policyUrl}" target="_blank" rel="noopener">Learn more</a>.
        </div>
        <div class="cc-actions">
          <button class="cc-btn cc-reject" type="button" aria-label="Reject cookies">Reject</button>
          <button class="cc-btn cc-accept" type="button" aria-label="Accept cookies">Accept</button>
        </div>
      </div>
    </div>
  `;

  const css = (o) => `
    :host { all: initial; }
    .cc-wrap {
      position: fixed; inset: auto 1rem 1rem auto;
      max-width: 360px; z-index: ${o.zIndex};
      font-family: system-ui, -apple-system, Segoe UI, Roboto, "Helvetica Neue", Arial, "Noto Sans", "Liberation Sans", sans-serif;
    }
    .cc-wrap.bottom-left { inset: auto auto 1rem 1rem; }
    .cc-card {
      box-sizing: border-box;
      background: ${o.palette.bg};
      color: ${o.palette.text};
      border: 1px solid ${o.palette.border};
      border-radius: 12px;
      padding: 14px;
      box-shadow: 0 10px 30px rgba(0,0,0,.35);
    }
    .cc-text { font-size: 14px; line-height: 1.45; margin-bottom: 12px; }
    .cc-link { color: ${o.palette.accent}; text-decoration: underline; }
    .cc-actions { display: flex; gap: 8px; justify-content: flex-end; }
    .cc-btn {
      cursor: pointer; font-size: 14px; border-radius: 10px; padding: 8px 12px; border: 1px solid ${o.palette.border};
      background: transparent; color: ${o.palette.text};
    }
    .cc-accept { background: ${o.palette.accent}; border-color: ${o.palette.accent}; color: #03130f; font-weight: 600; }
    .cc-btn:focus { outline: 2px solid ${o.palette.accent}; outline-offset: 2px; }
    @media (max-width: 480px) { .cc-wrap { inset: auto 0.75rem 0.75rem 0.75rem; max-width: unset; } }
  `;

  function getState(key) {
    try {
      return JSON.parse(localStorage.getItem(key) || "null");
    } catch {
      return null;
    }
  }
  function setState(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {}
  }

  function applyConsent(consented) {
    // —— Google Consent Mode v2
    if (typeof window.gtag === "function") {
      window.gtag("consent", "update", {
        ad_storage: consented ? "granted" : "denied",
        analytics_storage: consented ? "granted" : "denied",
        ad_user_data: consented ? "granted" : "denied",
        ad_personalization: consented ? "granted" : "denied",
        functionality_storage: consented ? "granted" : "denied",
        security_storage: "granted", // necesario para funcionamiento básico
      });
    }
    // —— Microsoft Clarity (si está)
    if (typeof window.clarity === "function") {
      try {
        window.clarity("consent", !!consented);
      } catch {}
    }
    // Podés añadir aquí otras integraciones (FB Pixel, Hotjar, etc.)
  }

  function mountBanner(opts) {
    const container = document.createElement("div");
    const root = container.attachShadow({ mode: "open" });
    const style = document.createElement("style");
    style.textContent = css(opts);
    root.appendChild(style);
    const slot = document.createElement("div");
    slot.innerHTML = html(opts);
    root.appendChild(slot);
    document.documentElement.appendChild(container);

    const acceptBtn = root.querySelector(".cc-accept");
    const rejectBtn = root.querySelector(".cc-reject");

    const close = () => container.remove();

    acceptBtn.addEventListener("click", () => {
      setState(opts.storageKey, { consented: true, ts: Date.now() });
      applyConsent(true);
      close();
    });

    rejectBtn.addEventListener("click", () => {
      setState(opts.storageKey, { consented: false, ts: Date.now() });
      applyConsent(false);
      close();
    });
  }

  function ensureDefaultsDenied(opts) {
    // En cuanto carga, deja todo en "denied" hasta que el usuario consienta.
    if (typeof window.gtag === "function") {
      window.gtag("consent", "default", {
        ad_storage: "denied",
        analytics_storage: "denied",
        ad_user_data: "denied",
        ad_personalization: "denied",
        functionality_storage: "denied",
        security_storage: "granted",
      });
    }
    if (typeof window.clarity === "function") {
      try {
        window.clarity("consent", false);
      } catch {}
    }
  }

  window.CookieConsent = {
    init(userOptions) {
      const opts = { ...DEFAULTS, ...(userOptions || {}) };
      const current = getState(opts.storageKey);

      // siempre aseguramos default denied al iniciar
      ensureDefaultsDenied(opts);

      if (current && typeof current.consented === "boolean") {
        // ya hay elección previa
        applyConsent(!!current.consented);
        return;
      }
      // si no hay elección, mostramos banner
      if (
        document.readyState === "complete" ||
        document.readyState === "interactive"
      ) {
        mountBanner(opts);
      } else {
        window.addEventListener("DOMContentLoaded", () => mountBanner(opts));
      }
    },
    // helper para abrir el banner manualmente (por si agregas enlace en footer)
    open: function (userOptions) {
      const opts = { ...DEFAULTS, ...(userOptions || {}) };
      mountBanner(opts);
    },
    // helper para resetear
    reset: function (storageKey = DEFAULTS.storageKey) {
      localStorage.removeItem(storageKey);
      // vuelve a negar por defecto
      applyConsent(false);
    },
  };
})();
