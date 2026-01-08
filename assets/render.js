
async function renderCategory(flagKey){
  const res = await fetch('/data/phoenix_listings.json');
  const data = await res.json();
  const explicit = data.filter(f => f[flagKey] === true);
  const broad = data.filter(f => f[flagKey] !== true);
  const container = document.getElementById('listings');

  if(explicit.length){
    container.innerHTML += '<h2>Verified for this category (explicit in source)</h2>';
    explicit.forEach(f => {
      container.innerHTML += `<p><a href="${f.URL}" target="_blank">${f.Firm}</a></p>`;
    });
  }

  const needed = Math.max(0, 10 - explicit.length);
  if(needed > 0){
    container.innerHTML += '<h2>Other Phoenix PI options</h2>';
    broad.slice(0, needed).forEach(f => {
      container.innerHTML += `<p><a href="${f.URL}" target="_blank">${f.Firm}</a> — Not explicitly tagged for this category; verify on firm site.</p>`;
    });
  }
}
