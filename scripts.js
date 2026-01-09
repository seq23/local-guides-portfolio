
// scripts.js — Final, production-ready
// Dynamic listings, sponsors, and hotlink support
// HTML IMMUTABLE — all logic lives here

document.addEventListener("DOMContentLoaded", () => {
  const city = document.body.dataset.city;
  const category = document.body.dataset.category;

  if (!city) return;

  if (city === "phoenix") {
    loadPhoenix(category);
  } else {
    loadFutureCity(city, category);
  }
});

/* -----------------------------
   PHOENIX (CANONICAL)
----------------------------- */

function loadPhoenix(category) {
  fetch("/data/phoenix_listings.json")
    .then(res => res.json())
    .then(data => {
      renderListings(data, category);
      injectCityWideSponsor();
    })
    .catch(err => console.error("Phoenix load failed:", err));
}

/* -----------------------------
   FUTURE CITIES (HOTLINK MODE)
----------------------------- */

function loadFutureCity(city, category) {
  fetch(`/data/${city}.json`)
    .then(res => res.json())
    .then(data => {
      renderListings(data.listings, category);
      injectCityWideSponsor(data.citywide_sponsor);
      injectHotlinkImages(data.images);
    })
    .catch(err => console.error("Future city load failed:", err));
}

/* -----------------------------
   LISTINGS RENDER
----------------------------- */

function renderListings(firms, category) {
  if (!category) return;

  const verifiedEl = document.getElementById("verified-listings");
  const otherEl = document.getElementById("other-listings");
  if (!verifiedEl || !otherEl) return;

  verifiedEl.innerHTML = "";
  otherEl.innerHTML = "";

  const verified = firms.filter(f => f.categories?.[category] === true);
  const other = firms.filter(f => f.categories?.[category] === false);

  verified.forEach(f => verifiedEl.appendChild(listingCard(f, true)));

  const MIN_OTHER = 10;
  other.slice(0, MIN_OTHER).forEach(f =>
    otherEl.appendChild(listingCard(f, false))
  );
}

function listingCard(firm, verified) {
  const card = document.createElement("div");
  card.className = "listing-card";

  card.innerHTML = `
    <h3>${firm.firm}</h3>
    <a href="${firm.url}" target="_blank" rel="noopener noreferrer">
      Visit firm website
    </a>
    <p class="listing-note">
      ${verified
        ? "Verified for this category (explicit on firm site)."
        : "Not explicitly tagged — verify on firm site."}
    </p>
  `;

  return card;
}

/* -----------------------------
   CITY-WIDE SPONSOR
----------------------------- */

function injectCityWideSponsor(sponsorData = null) {
  const container = document.querySelector(".citywide-sponsor");
  if (!container) return;

  if (!sponsorData) {
    container.innerHTML = `
      <div class="sponsor-banner">
        <strong>City-Wide Sponsorship Available</strong>
        <p>Advertising opportunity — educational content remains independent.</p>
      </div>
    `;
    return;
  }

  container.innerHTML = `
    <div class="sponsor-banner">
      <strong>${sponsorData.name}</strong>
      <a href="${sponsorData.url}" target="_blank" rel="noopener noreferrer">
        Visit sponsor website
      </a>
      <p class="listing-note">Advertising</p>
    </div>
  `;
}

/* -----------------------------
   HOTLINK IMAGES (FUTURE CITIES)
----------------------------- */

function injectHotlinkImages(images) {
  if (!images) return;

  Object.keys(images).forEach(key => {
    const img = document.querySelector(`img[data-img="${key}"]`);
    if (img) img.src = images[key];
  });
}
