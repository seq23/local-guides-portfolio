I’m going to slow this down and do it **correctly**, because this document is too important to rush or half-render with a broken PDF tool.

Below is the **FULL, AUTHORITATIVE Repo Constitution v2.0 (Markdown)**.
This is the **real thing** — complete, binding, legally defensive, and operationally explicit.

Once you confirm it looks right, I will:

1. Convert **this exact text** into a FULL PDF
2. Generate a **VA-SAFE PDF** (restricted scope, no dangerous permissions)

---

# REPO CONSTITUTION — LOCAL GUIDES & LISTINGS

**Version:** 2.0
**Status:** AUTHORITATIVE — SINGLE SOURCE OF TRUTH
**Effective Date:** 2026-01-08

This Constitution governs **all repositories, cities, verticals, content, data, sponsorships, and deployments** for the Local Guides & Listings portfolio.

If any instruction, chat, file, or behavior conflicts with this document, **THIS DOCUMENT WINS**.

---

## 1. BUSINESS IDENTITY & LEGAL POSITIONING (NON-NEGOTIABLE)

### 1.1 What This Business Is

* An **educational publisher**
* An **advertising-supported directory**
* A **research and comparison resource**
* A **content and media business**

### 1.2 What This Business Is NOT

* ❌ A law firm
* ❌ A medical provider
* ❌ A referral service
* ❌ A lead seller
* ❌ A broker of legal cases
* ❌ A provider of legal or medical advice

### 1.3 No Legal or Medical Advice

* All content is **general educational information only**
* No attorney-client or doctor-patient relationship is formed
* Visitors must consult qualified professionals for advice

### 1.4 No Endorsements or Guarantees

* Listings do **not** imply endorsement
* No outcome guarantees
* No claims of “best,” “top,” “guaranteed,” or similar language

---

## 2. ADVERTISING & MONETIZATION COMPLIANCE

### 2.1 Advertising Model

* Flat monthly sponsorships only
* No referral fees
* No per-lead fees
* No per-case payouts
* No contingency arrangements

### 2.2 Sponsor Types

* **Category Sponsor** (e.g., Car Accidents) — $990/month
* **City-Wide Sponsor** — $1,500/month

### 2.3 Advertising Disclosure

* All sponsor placements are **clearly labeled “Advertising”**
* Educational content remains independent
* Sponsors do not influence editorial copy

---

## 3. COMPLIANCE BY VERTICAL

### 3.1 Personal Injury

* No legal advice
* No implied expertise
* No promises of compensation
* No comparison language

### 3.2 Medical / Health (TRT, ADHD, Autism, USCIS)

* No diagnosis
* No treatment recommendations
* No medical advice
* Informational only
* Encourage consultation with licensed providers

### 3.3 General

* FTC advertising disclosure compliance
* No deceptive or misleading claims
* Public-source based listings only

---

## 4. REPO ARCHITECTURE (BINDING)

### 4.1 Folder Structure

```
/
├── index.html
├── phoenix/
├── guides/
├── data/
│   └── city_listings.json
├── scripts.js
├── styles.css
└── docs/
    ├── constitution/
    ├── content-locks/
    ├── sops/
    └── checklists/
```

### 4.2 HTML IMMUTABILITY RULE

* HTML files are **layout only**
* ❌ NO data edits
* ❌ NO sponsor edits
* ❌ NO listing edits

---

## 5. DATA CONTROL (JSON ONLY)

### 5.1 Listings

* All firms controlled via JSON
* Boolean flags only (`true / false`)
* No HTML updates to add/remove firms

### 5.2 Scripts Authority

`scripts.js` is responsible for:

* Rendering listings
* Sponsor injection
* Fallback logic
* Hotlink handling
* Fail-safe logging

---

## 6. CONTENT CREATION RULES

### 6.1 Reading Level

* Maximum: **6th grade**
* Clear, simple, human language

### 6.2 Wedge Pages

Every wedge MUST:

* Be complete
* Be step-by-step
* Include FAQs **with answers**
* Include relevant stock imagery
* Include local specificity (even small)

### 6.3 FAQs

* Questions AND answers required
* FAQPage schema applied by default

---

## 7. CONTENT LOCK SYSTEM (MANDATORY)

### 7.1 Required Per City

* `city_v1_content_lock.md`
* `city_v1_content_lock.pdf`

### 7.2 Rules

* No edits without version bump
* Locks created **before build**
* Locks stored in `/docs/content-locks/`

---

## 8. CITY DEPLOYMENT ORDER (NO SKIPPING)

1. Content written
2. Content approved
3. Content lock (MD)
4. Content lock (PDF)
5. Compliance audit
6. Build
7. QA
8. Deploy
9. Archive

---

## 9. SPONSOR ASSETS

* Sponsors MAY provide assets
* Assets must be compliant
* Default placeholders allowed
* Future cities may use **hotlinks**
* No sponsor asset overrides editorial content

---

## 10. REGRESSION PROTECTION

* Content locks prevent drift
* JSON schema is locked
* Any change = version bump
* VAs restricted to safe zones only

---

## 11. VA-SAFE VS CORE ACCESS

### VAs MAY:

* Update JSON fields
* Upload approved assets
* Follow SOPs exactly

### VAs MAY NOT:

* Edit HTML
* Edit scripts.js
* Edit Constitution
* Modify content locks

---

## 12. IF ANYTHING IS UNCLEAR

**DO NOT GUESS.
DO NOT IMPROVISE.
ESCALATE.**

---

## END OF CONSTITUTION

**Repo Constitution v2.0 — Locked**

---

