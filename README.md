Proceeding with **Phase 4 — README + Cloudflare Deploy Checklist**.

This is the **lock-it-down phase**. After this, the repo is understandable to:

* future you
* VAs
* contractors
* potential buyers / partners

No ambiguity. No tribal knowledge.

---

# ✅ FILE — `README.md` (FINAL, Repo-Level)

````md
# The Accident Guides — Local Guides Portfolio

The Accident Guides is a static, educational publishing platform that provides
general information about accidents, injury-related topics, and commonly
researched questions.

This project is intentionally **not** a law firm website, **not** a medical site,
and **not** a referral or lead-generation platform.

---

## What This Site Is

- An **independent educational publisher**
- A library of **general accident & injury guides**
- A collection of **city-specific resource pages**
- A platform for **clearly labeled advertising**

All content is informational only.

---

## What This Site Is NOT

- ❌ Legal advice
- ❌ Medical advice
- ❌ A law firm or medical provider
- ❌ A referral service
- ❌ A pay-per-lead marketplace
- ❌ Endorsements or guarantees of outcome

Advertising placements do **not** imply recommendation.

---

## Tech Stack

- **Static HTML**
- **CSS (no framework)**
- **Vanilla JavaScript**
- **JSON-driven data**
- **Cloudflare Pages** for hosting

No server, no CMS, no database.

---

## Repo Structure

```txt
/
├── index.html                # Homepage
├── guides/
│   ├── index.html            # Guides hub
│   ├── what-to-do-after-*/
│   ├── evidence-checklist/
│   ├── claim-timeline/
│   └── wrongful-death-overview/
├── phoenix/
│   ├── index.html            # Phoenix city hub (directory + sponsors)
│   ├── car-accidents/
│   ├── truck-accidents/
│   ├── motorcycle-accidents/
│   ├── bicycle-accidents/
│   ├── pedestrian-accidents/
│   ├── rideshare-accidents/
│   ├── slip-and-fall/
│   ├── construction-accidents/
│   ├── wrongful-death/
│   ├── how-to-choose-a-lawyer/
│   ├── when-to-call-an-attorney/
│   ├── evidence-checklist/
│   ├── arizona-injury-claim-timeline/
│   └── faq/
├── data/
│   ├── phoenix_listings.json     # Canonical Phoenix directory
│   ├── phoenix_sponsors.json     # Phoenix sponsor stacks
│   └── global_sponsors.json      # Global guide sponsors
├── assets/
│   ├── css/styles.css
│   ├── js/scripts.js
│   ├── images/
│   └── sponsors/
└── README.md
````

---

## JSON-Driven Architecture (IMPORTANT)

### Listings

* **All directories are JSON-driven**
* HTML is **immutable**
* No firm data lives in HTML

Example:

```js
/data/phoenix_listings.json
```

Controls:

* firm name
* display status
* category eligibility (true / false)
* verification flags
* sponsorship flags

---

### Sponsor Stacks

Sponsors are injected via JSON and JavaScript.

HTML only defines **slots**, never sponsor content.

Example stack:

```html
<section class="sponsor-stack" data-stack="global-guides">
  <div class="sponsor-items"></div>
</section>
```

Sponsors are managed in:

```txt
/data/phoenix_sponsors.json
/data/global_sponsors.json
```

No code changes required to add or remove sponsors.

---

## Monetization Model (Locked)

### Phoenix Citywide Sponsorship — $1,500

* Appears **3 times** on `/phoenix/index.html`
* Exclusive (1 sponsor only)
* Highest visibility

### Phoenix Category Sponsorship — $1,500

* Appears on a single category page
* Top / mid / bottom placement
* Exclusive per category

### Editorial / Guide Sponsorship — $990

* Multi-sponsor stack
* Used on:

  * Phoenix guides
  * Phoenix FAQ
  * All global guides
* Clearly labeled as advertising

**Directories are never polluted with ads.**

---

## Compliance & Editorial Policy

* Educational purpose stated on every page
* Advertising clearly labeled
* No legal outcomes promised
* No endorsements
* No claims of specialization
* No medical or legal instruction

This structure is designed to be:

* compliant
* scalable
* defensible

---

## Deployment (Cloudflare Pages)

This site is deployed via **Cloudflare Pages**.

Build settings:

* Framework preset: **None**
* Build command: **None**
* Output directory: **/**

Push to `main` → automatic deploy.

---

## Editing Rules (DO NOT BREAK)

* ❌ Do not hardcode firms into HTML
* ❌ Do not add sponsors directly into HTML
* ❌ Do not add cities into global guides
* ❌ Do not remove compliance language
* ✅ Use JSON for all dynamic content
* ✅ Keep HTML static and immutable

---

## License / Usage

This project is proprietary.
All rights reserved.

```

---

# ✅ Cloudflare Pages Deploy Checklist (LOCKED)

Use this **every time** you deploy.

### 1. Repo Sanity Check
- [ ] `styles.css` is in `/assets/css/`
- [ ] `scripts.js` is in `/assets/js/`
- [ ] All links are root-relative (`/guides/...`)
- [ ] No broken folder paths

### 2. JSON Validation
- [ ] `phoenix_listings.json` loads in browser
- [ ] `phoenix_sponsors.json` loads in browser
- [ ] `global_sponsors.json` loads in browser
- [ ] No trailing commas
- [ ] Boolean values only (`true` / `false`)

### 3. Sponsor Injection Check
- [ ] Sponsor stacks appear where expected
- [ ] No sponsors appear in directories
- [ ] Labels say “Advertising”
- [ ] Multiple sponsors stack correctly

### 4. Navigation Check
- [ ] Global nav consistent across pages
- [ ] `/guides/` links to hub, not a single article
- [ ] City links appear only where appropriate

### 5. Compliance Check
- [ ] “Educational content only” footer present
- [ ] No advice language
- [ ] No guarantees
- [ ] No endorsements

### 6. Final Visual Check
- [ ] Desktop readable
- [ ] Mobile spacing acceptable
- [ ] Font sizes calm and legible
- [ ] No layout regressions

### 7. Deploy
- [ ] Push to `main`
- [ ] Confirm Cloudflare build success
- [ ] Spot-check 3 random pages live

---

## ✅ PHASE 4 COMPLETE

You now have:
- A **fully documented system**
- A **defensible monetization model**
- A **handoff-ready repo**
- A site that finally feels **intentional and enterprise-grade**
