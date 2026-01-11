document.addEventListener("DOMContentLoaded", () => {
  const city = (document.body.dataset.city || "").trim();
  const category = (document.body.dataset.category || "").trim();

  // Sponsor stacks can exist on global pages too (e.g., /guides/)
  initSponsorStacks(city);

  if (!city) return;

  // Listings are only expected on pages that include the directory containers
  initCityListings(city, category);
});

/* -----------------------------
   CITY LISTINGS LOADER (FULL CITY → FALLBACK HOTLINK)
----------------------------- */

async function initCityListings(city, category) {
  const fullListingsUrl = `/data/${city}_listings.json`;
  try {
    const res = await fetch(fullListingsUrl, { cache: "no-store" });
    if (res.ok) {
      const firms = await res.json();
      renderFullCityListings(firms, category);
      return;
    }
  } catch (e) {
    // fall through to hotlink
  }

  // Fallback: legacy hotlink mode (/data/${city}.json)
  try {
    const res = await fetch(`/data/${city}.json`, { cache: "no-store" });
    if (!res.ok) throw new Error("Hotlink JSON not found");
    const data = await res.json();
    renderHotlinkListings(data.listings, category);
    injectHotlinkImages(data.images);
  } catch (err) {
    console.error("City listings load failed:", err);
  }
}

/* -----------------------------
   FULL CITY RENDER (PHOENIX MODEL)
   - Works for Phoenix + all full cities
   - If category-specific flags exist later, we can filter safely
----------------------------- */

function renderFullCityListings(firms, category) {
  const verifiedEl = document.getElementById("verified-listings");
  const otherEl = document.getElementById("other-listings");
  if (!verifiedEl || !otherEl) return;

  verifiedEl.innerHTML = "";
  otherEl.innerHTML = "";

  // Only show firms explicitly marked display=true
  const visible = Array.isArray(firms) ? firms.filter(f => f && f.display === true) : [];

  // Optional future compatibility: if firm.categories exists, allow category filtering
  const filtered = category
    ? visible.filter(f => {
        if (!f.categories) return true; // if not categorized, keep visible
        return f.categories?.[category] === true || f.categories?.[category] === false;
      })
    : visible;

  const verified = filtered.filter(f => f.verified === true);
  const other = filtered.filter(f => f.verified !== true);

  verified.forEach(f => verifiedEl.appendChild(listingCard(f)));
  other.forEach(f => otherEl.appendChild(listingCard(f)));
}

/* -----------------------------
   LEGACY HOTLINK RENDER (FUTURE CITIES MODE)
----------------------------- */

function renderHotlinkListings(firms, category) {
  if (!category) return;

  const verifiedEl = document.getElementById("verified-listings");
  const otherEl = document.getElementById("other-listings");
  if (!verifiedEl || !otherEl) return;

  verifiedEl.innerHTML = "";
  otherEl.innerHTML = "";

  const arr = Array.isArray(firms) ? firms : [];

  const verified = arr.filter(f => f?.categories?.[category] === true);
  const other = arr.filter(f => f?.categories?.[category] === false);

  verified.forEach(f => verifiedEl.appendChild(listingCard(f)));

  const MIN_OTHER = 10;
  other.slice(0, MIN_OTHER).forEach(f => otherEl.appendChild(listingCard(f)));
}

/* -----------------------------
   LISTING CARD (NEUTRAL)
----------------------------- */

function listingCard(firm) {
  const card = document.createElement("div");
  card.className = "listing-card";

  const websiteLink = firm.website
    ? `<a href="${firm.website}" target="_blank" rel="noopener noreferrer">Visit firm website</a>`
    : "";

  const labels = [];
  if (firm.sponsored) labels.push("Advertising");
  if (firm.verified) labels.push("Verified listing");

  card.innerHTML = `
    <h3>${escapeHtml(firm.name || "Firm")}</h3>
    ${websiteLink}
    ${
      labels.length
        ? `<p class="listing-note">${labels.map(escapeHtml).join(" · ")}</p>`
        : `<p class="listing-note">Directory listing — no endorsement implied.</p>`
    }
  `;

  return card;
}

function escapeHtml(str) {
  return String(str).replace(/[&<>"']/g, (m) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  }[m]));
}

/* -----------------------------
   SPONSOR STACK LOADER (CITY SPONSORS → GLOBAL → PHOENIX FALLBACK)
   Supports BOTH attributes:
   - data-sponsor-stack="key"
   - data-stack="key" (legacy)
----------------------------- */

async function initSponsorStacks(city) {
  const sponsorData = await loadSponsorData(city);

  const stacks = document.querySelectorAll("[data-sponsor-stack], [data-stack]");
  if (!stacks.length) return;

  stacks.forEach(stack => {
    const keyRaw = (stack.dataset.sponsorStack || stack.dataset.stack || "").trim();
    if (!keyRaw) return;

    const candidates = buildSponsorKeyCandidates(keyRaw, city);

    let items = null;
    for (const k of candidates) {
      if (sponsorData && Object.prototype.hasOwnProperty.call(sponsorData, k)) {
        items = sponsorData[k];
        break;
      }
    }

    // If stack exists but no items, leave it empty (no stubs)
    if (!Array.isArray(items) || !items.length) return;

    const container = stack.querySelector(".sponsor-items");
    if (!container) return;

    container.innerHTML = "";

    items.forEach(s => {
      const div = document.createElement("div");
      div.className = "sponsor-item";
      div.innerHTML = `
        <strong>${escapeHtml(s.name || "Sponsor")}</strong>
        ${s.url ? `<a href="${s.url}" target="_blank" rel="noopener noreferrer">Visit sponsor website</a>` : ""}
        <p class="listing-note">${escapeHtml(s.label || "Advertising")}</p>
      `;
      container.appendChild(div);
    });
  });
}

async function loadSponsorData(city) {
  const candidates = [];

  if (city) candidates.push(`/data/${city}_sponsors.json`);

  // Optional global sponsor file (if you add later)
  candidates.push(`/data/global_sponsors.json`);

  // Safe fallback for older repos
  candidates.push(`/data/phoenix_sponsors.json`);

  for (const url of candidates) {
    try {
      const res = await fetch(url, { cache: "no-store" });
      if (!res.ok) continue;
      const data = await res.json();
      if (data && typeof data === "object") return data;
    } catch (e) {
      // keep trying
    }
  }

  return {};
}

function buildSponsorKeyCandidates(key, city) {
  const out = [];

  // 1) as-is
  out.push(key);

  // 2) Legacy shorthand normalization (phoenix-car-top -> phoenix-car-accidents-top)
  const normalized = normalizeLegacySponsorKey(key);
  if (normalized && normalized !== key) out.push(normalized);

  // 3) Global guide compatibility (global-guides -> phoenix-guides -> guides)
  if (key === "global-guides") {
    out.push("phoenix-guides");
    out.push("guides");
  }

  // 4) If city is present and key starts with city but uses underscore (rare), normalize
  if (city && key.startsWith(city.replace("-", "_"))) {
    out.push(key.replace(/_/g, "-"));
  }

  return out;
}

function normalizeLegacySponsorKey(key) {
  // Matches: "{prefix}-{short}-{pos}" where short is old category shorthand
  const m = key.match(/^(.+)-(car|truck|slip|bicycle|motorcycle|pedestrian|rideshare|construction|wrongful)-(top|mid|bottom)$/);
  if (!m) return null;

  const prefix = m[1];
  const short = m[2];
  const pos = m[3];

  const map = {
    car: "car-accidents",
    truck: "truck-accidents",
    slip: "slip-and-fall",
    bicycle: "bicycle-accidents",
    motorcycle: "motorcycle-accidents",
    pedestrian: "pedestrian-accidents",
    rideshare: "rideshare-accidents",
    construction: "construction-accidents",
    wrongful: "wrongful-death"
  };

  const full = map[short];
  if (!full) return null;

  return `${prefix}-${full}-${pos}`;
}

/* -----------------------------
   HOTLINK IMAGES (LEGACY)
----------------------------- */

function injectHotlinkImages(images) {
  if (!images || typeof images !== "object") return;

  Object.keys(images).forEach(key => {
    const img = document.querySelector(`img[data-img="${key}"]`);
    if (img) img.src = images[key];
  });
}
