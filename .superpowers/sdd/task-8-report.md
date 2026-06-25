# Task 8 Report: Footer, Scroll Reveal, Final QA

## Commit

Hash: `5b03473`
Message: `feat: footer, scroll reveal, final responsive QA`

## Changes Made

### index.html
- Added `reveal` class to all 6 sections: `#hero`, `#advantages`, `#catalog`, `#unlock`, `#how`, `#contact`
- Added `<footer class="site-footer">` after `</main>` (before scripts), containing brand logo/name, two phone links, and `footer_rights` i18n span

### css/styles.css
- Appended footer styles: `.site-footer`, `.footer-inner`, `.footer-contacts`, `.footer-rights`
- Appended reveal animation: `.reveal` (opacity:0, translateY 24px) and `.reveal.visible` (opacity:1, no transform)

### js/main.js
- Added `footer_rights` key to all three locales in `I18N`:
  - ka: `"ყველა უფლება დაცულია"`
  - ru: `"Все права защищены"`
  - en: `"All rights reserved"`
- Appended `IntersectionObserver` (threshold 0.12) that adds `.visible` to each `.reveal` element when it enters the viewport, then unobserves it

### img/raw/ removed
- Removed 9 scratch JPEG files via `git rm -r --cached img/raw` + `rm -rf img/raw`

---

## QA Results

### 1. Console Messages (on plain load)
- **Errors: 0, Warnings: 0** on fresh navigation
- Only 404s observed (all accepted/expected): `favicon.ico` (browser fallback, page has `data:,` icon), `t2302-silver.png` (triggered by clicking color dot — known accepted behavior per brief)
- No JS errors

### 2. Screenshots

**1280px (full page):** All sections visible and well-structured. Header sticky at top. Hero grid 2-column. Advantages 3-column. Catalog 4-column. Unlock 5-column. How 4-column. Contact 2-column. Footer with brand, phones, rights line. No horizontal overflow.

**768px (full page):** Responsive breakpoints active. Hero stacks to 1 column, product grid 2-column, unlock grid 2-column, how grid 2-column, contact 1-column. Footer wraps gracefully. No overflow.

**390px (full page):** Mobile layout. Burger menu shown. Product grid 1-column, all sections stack. Footer wraps to column. All text legible, no overflow.

### 3. Language Sweep

Programmatic check via `browser_evaluate` iterating all `[data-i18n]` and `[data-i18n-attr]` elements for empty/raw-key text:

| Locale | Missing keys | Action |
|--------|-------------|--------|
| ka     | 0           | none   |
| ru     | 0           | none   |
| en     | 0           | none   |

`footer_rights` verified to return the correct string in all three locales:
- KA: `ყველა უფლება დაცულია`
- RU: `Все права защищены`
- EN: `All rights reserved`

No keys had to be fixed; all were present from prior tasks plus the new `footer_rights` key added in this task.

### 4. Scroll-Reveal Verification

- On fresh load (page at top): `hero` immediately gains `.visible` (it is in viewport); remaining 5 sections have `.reveal` without `.visible` — confirmed via `document.querySelectorAll('.reveal.visible').length === 1`
- After `window.scrollTo(0, document.body.scrollHeight)`: all 6 sections have `.visible` — confirmed `length === 6`
- IntersectionObserver fires correctly and unobserves after first intersection

### 5. Language Persistence

- Set lang to `ru` via `applyLang('ru')` → `localStorage.lokito_lang = "ru"`
- Reloaded page → `storedLang: "ru"`, active button: `"ru"`, nav shows `"Каталог"`
- Persistence confirmed

### 6. Order Button Check

All 4 catalog Order buttons tested. Each correctly:
- Preselects the matching product in `select[name="product"]`
- Triggers smooth scroll to `#contact`

| Product | select.value match |
|---------|-------------------|
| TAICHEN T2302 | ✓ |
| TAICHEN XG02  | ✓ |
| TAICHEN G02   | ✓ |
| Gateway G3/G3P | ✓ |

### 7. Defects Found in Earlier Tasks

None. All sections, translations, and interactivity from Tasks 1–7 passed QA without requiring fixes.

---

## Summary

Task 8 complete. Footer added, scroll-reveal wired, img/raw removed, all QA checks passed with zero defects.

---

## Pre-merge fixes

**Commit:** `60e8dbd`
**Message:** `fix: whatsapp-only order form, IO guard, silence color probe, normalize hex`

### Changes applied

| Fix | File | Change |
|-----|------|--------|
| FIX 1 — WhatsApp-only form | `index.html` | Removed `.msg-choice` radio block (WhatsApp + Viber radios) from `#order-form` |
| FIX 1 — WhatsApp-only form | `js/main.js` | Form submit now calls `openMessenger("wa", text)` instead of reading `fd.get("channel")` |
| FIX 2 — IO guard | `js/main.js` | Wrapped IntersectionObserver in `if ('IntersectionObserver' in window)` with `else` fallback adding `.visible` directly |
| FIX 3 — Silence color probe | `js/main.js` | Added `probe.onerror = () => {};` before `probe.src = candidate` |
| FIX 4 — Normalize hex | `css/styles.css` | `.dot-gold` background changed from `#cBA04a` to `#cba04a` |

### Verification results

**1. Console errors on plain load**
`browser_console_messages` after navigation: **0 errors, 0 warnings**

**2. IO guard + reveal elements**
- `'IntersectionObserver' in window` → `true` (Chromium)
- After scroll to bottom + 800ms delay: `document.querySelectorAll('.reveal.visible').length` → **6/6** ✓

**3. Form submit — WhatsApp only**
- `document.querySelectorAll('input[name="channel"]').length` → **0** (radio block removed) ✓
- `.msg-choice` present → **false** ✓
- Form fields: `["name", "phone", "product"]` only ✓
- `buildMessage({name:'A', phone:'5', product:'TAICHEN XG02'})` → `"შეკვეთა: სახელი: A, ტელეფონი: 5, პროდუქტი: TAICHEN XG02"` ✓
- Form submit (window.open intercepted) → `https://wa.me/995598334380?text=...` (Georgian-encoded) ✓

**4. Color dot probe — error silenced**
- Gold dot click: `activeDotColor` → `"gold"`, `jsErrors` → `[]` ✓
- Browser logs one network 404 for `t2302-gold.png` (expected — file doesn't exist; this is an unavoidable browser-level network log, not a JS error; `probe.onerror` correctly silences the JS handler)

**5. Standalone Viber/WhatsApp contact links intact**
- `.msg-buttons a.btn-viber` href → `viber://chat?number=%2B995598334380` ✓
- `.msg-buttons a.btn-wa` href → `https://wa.me/995598334380` ✓

**6. Language**
- Reset to `ka` at end of verification ✓
