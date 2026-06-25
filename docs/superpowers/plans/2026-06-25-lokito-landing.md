# Lokito Landing — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a dark premium-tech, trilingual (KA/RU/EN) single-page landing for Lokito (smart locks retailer) in plain HTML/CSS/JS, with a product catalog and multi-channel contact (phone, WhatsApp, Viber, form→messenger).

**Architecture:** Static site, no build step. One `index.html` with semantic sections; styling in `css/styles.css`; behavior in `js/main.js`. i18n is data-driven: every translatable node carries a `data-i18n` key, a JS dictionary holds KA/RU/EN strings, language persists in `localStorage`. Product photos are extracted from the source PDF into `img/`.

**Tech Stack:** HTML5, modern CSS (custom properties, grid, flexbox, IntersectionObserver-driven reveals), vanilla ES6 JS. No frameworks, no bundler. Verification via the Playwright MCP browser (open `file://` URL, run `browser_evaluate`, screenshot).

## Global Constraints

- Pure HTML/CSS/JS only — no build tooling, no npm dependencies, no external CDN/font/script requests (site must work opened directly via `file://`).
- Three languages: `ka` (default), `ru`, `en`. Language choice persists in `localStorage` key `lokito_lang`.
- Palette: navy gradient background `#0b1f2e`→`#0e2d44`, gold accent `#d4af37` / hover `#e8c66a`, text `#f5f7fa` / muted `#9fb3c2`.
- Phones: `+995 598 33 43 80`, `+995 599 71 97 40`. WhatsApp + Viber only (no Telegram).
- Prices verbatim from spec: T2302 450₾ +50₾ install; XG02 100₾; G02 100₾ +50₾ install; Gateway G3 80₾ / G3P 100₾. Currency symbol: ₾.
- All copy lives in the i18n dictionary in `js/main.js` (no hard-coded translatable text in HTML beyond `data-i18n` keys), except the default KA text may also sit in HTML as fallback.

---

### Task 1: Project skeleton + extracted assets

**Files:**
- Create: `index.html`
- Create: `css/styles.css`
- Create: `js/main.js`
- Create: `img/` (extracted images)

**Interfaces:**
- Consumes: source PDF `_E1_83_9A_E1_83_9D_E1_83_99_E1_83_98_E1_83_A2_E1_83_9D.pdf`
- Produces: a loadable page shell that links `css/styles.css` and `js/main.js`; image files under `img/` referenced by later tasks.

- [ ] **Step 1: Extract embedded images from the PDF**

```bash
cd "/Users/revazgiorgadze/Desktop/ლოკიტო"
mkdir -p img/raw
pdfimages -all "_E1_83_9A_E1_83_9D_E1_83_99_E1_83_98_E1_83_A2_E1_83_9D.pdf" img/raw/lokito
ls -la img/raw
```
Expected: several image files `lokito-000.*`, `lokito-001.*` …

- [ ] **Step 2: Identify and rename product photos**

Open the extracted files, match them to products, and copy the best ones to stable names. Expected mapping (verify visually, adjust if order differs):
- logo (door handle) → `img/logo.png`
- TAICHEN T2302 door lock (black + silver pair) → `img/t2302.png`
- TAICHEN XG02 padlock → `img/xg02.png`
- TAICHEN G02 glass-door lock → `img/g02.png`
- Gateway G3 / G3P → `img/gateway.png`
- a hero shot (any premium lock render) → `img/hero.png`

```bash
cd "/Users/revazgiorgadze/Desktop/ლოკიტო"
# inspect, then copy chosen files, e.g.:
# cp img/raw/lokito-000.png img/logo.png   (adjust indices after viewing)
ls img/*.png
```
Verify: use the Playwright MCP to open each candidate (`browser_navigate` to `file://…/img/raw/<file>`) or read them, confirm the mapping before finalizing. Keep `img/raw/` for now.

- [ ] **Step 3: Create `index.html` shell**

```html
<!DOCTYPE html>
<html lang="ka">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>ლოკიტო — ჭკვიანი საკეტები</title>
  <link rel="stylesheet" href="css/styles.css">
</head>
<body>
  <!-- header, main sections, footer added in later tasks -->
  <main id="app"></main>
  <script src="js/main.js" defer></script>
</body>
</html>
```

- [ ] **Step 4: Create `css/styles.css` with design tokens + reset**

```css
:root{
  --bg-1:#0b1f2e; --bg-2:#0e2d44; --gold:#d4af37; --gold-hi:#e8c66a;
  --text:#f5f7fa; --muted:#9fb3c2; --card:#11293c; --radius:16px;
  --maxw:1200px;
}
*{box-sizing:border-box;margin:0;padding:0}
html{scroll-behavior:smooth}
body{
  font-family:system-ui,-apple-system,"Segoe UI",Roboto,sans-serif;
  color:var(--text);
  background:linear-gradient(160deg,var(--bg-1),var(--bg-2));
  min-height:100vh;line-height:1.5;
}
.container{max-width:var(--maxw);margin:0 auto;padding:0 20px}
img{max-width:100%;display:block}
a{color:inherit;text-decoration:none}
```

- [ ] **Step 5: Create `js/main.js` stub**

```js
"use strict";
document.addEventListener("DOMContentLoaded", () => {
  console.log("Lokito landing loaded");
});
```

- [ ] **Step 6: Verify the shell loads with no console errors**

Use Playwright MCP: `browser_navigate` to `file:///Users/revazgiorgadze/Desktop/ლოკიტო/index.html`, then `browser_console_messages`.
Expected: console shows "Lokito landing loaded", no errors.

- [ ] **Step 7: Commit**

```bash
git add index.html css/styles.css js/main.js img
git commit -m "feat: project skeleton and extracted product images"
```

---

### Task 2: i18n engine

**Files:**
- Modify: `js/main.js`

**Interfaces:**
- Produces:
  - `I18N` — object `{ ka:{}, ru:{}, en:{} }` mapping key→string.
  - `applyLang(lang)` — sets `<html lang>`, replaces text of every `[data-i18n]` node with `I18N[lang][key]`, updates `[data-i18n-attr]` (for `placeholder`/`aria-label`), persists `localStorage.lokito_lang`, marks active switcher button.
  - `getLang()` — returns saved lang or `"ka"`.
  - Convention: translatable text node carries `data-i18n="key"`; translatable attribute carries `data-i18n-attr="attr:key"`.

- [ ] **Step 1: Write the i18n dictionary and functions**

```js
const I18N = {
  ka:{ nav_catalog:"კატალოგი", nav_unlock:"გაღების მეთოდები",
       nav_how:"როგორ ვმუშაობთ", nav_contact:"კონტაქტი",
       cta_call:"დარეკვა", hero_title:"ჭკვიანი საკეტები და სხვა სისტემები" },
  ru:{ nav_catalog:"Каталог", nav_unlock:"Способы открытия",
       nav_how:"Как работаем", nav_contact:"Контакты",
       cta_call:"Позвонить", hero_title:"Умные замки и другие системы" },
  en:{ nav_catalog:"Catalog", nav_unlock:"Unlock methods",
       nav_how:"How we work", nav_contact:"Contact",
       cta_call:"Call", hero_title:"Smart locks and other systems" },
};
function getLang(){ return localStorage.getItem("lokito_lang") || "ka"; }
function applyLang(lang){
  const dict = I18N[lang] || I18N.ka;
  document.documentElement.lang = lang;
  document.querySelectorAll("[data-i18n]").forEach(el=>{
    const k = el.getAttribute("data-i18n");
    if (dict[k] != null) el.textContent = dict[k];
  });
  document.querySelectorAll("[data-i18n-attr]").forEach(el=>{
    const [attr,k] = el.getAttribute("data-i18n-attr").split(":");
    if (dict[k] != null) el.setAttribute(attr, dict[k]);
  });
  localStorage.setItem("lokito_lang", lang);
  document.querySelectorAll("[data-lang-btn]").forEach(b=>{
    b.classList.toggle("active", b.getAttribute("data-lang-btn")===lang);
  });
}
```
(Keys above are the starter set; later tasks ADD keys to all three locales as they add sections — every new `data-i18n` key MUST exist in `ka`, `ru`, and `en`.)

- [ ] **Step 2: Wire it on load**

```js
document.addEventListener("DOMContentLoaded", () => {
  applyLang(getLang());
});
```

- [ ] **Step 3: Verify in browser**

Playwright MCP: navigate to the page, then `browser_evaluate` running:
`applyLang('ru'); return document.documentElement.lang;`
Expected: `"ru"`. Then evaluate `localStorage.getItem('lokito_lang')` → `"ru"`. Reset with `applyLang('ka')`.

- [ ] **Step 4: Commit**

```bash
git add js/main.js
git commit -m "feat: data-driven i18n engine (ka/ru/en)"
```

---

### Task 3: Header, nav, language switcher

**Files:**
- Modify: `index.html`, `css/styles.css`, `js/main.js`

**Interfaces:**
- Consumes: `applyLang`, `getLang` (Task 2).
- Produces: sticky header with `#nav` anchors, `[data-lang-btn]` buttons (ka/ru/en), a `.burger` toggle, and a call CTA `tel:` link.

- [ ] **Step 1: Add header markup inside `<body>` (before `<main>`)**

```html
<header class="site-header">
  <div class="container header-inner">
    <a href="#hero" class="brand"><img src="img/logo.png" alt="Lokito" class="brand-logo"><span>ლოკიტო</span></a>
    <nav class="nav" id="nav">
      <a href="#catalog" data-i18n="nav_catalog">კატალოგი</a>
      <a href="#unlock" data-i18n="nav_unlock">გაღების მეთოდები</a>
      <a href="#how" data-i18n="nav_how">როგორ ვმუშაობთ</a>
      <a href="#contact" data-i18n="nav_contact">კონტაქტი</a>
    </nav>
    <div class="header-actions">
      <div class="lang-switch">
        <button data-lang-btn="ka">KA</button>
        <button data-lang-btn="ru">RU</button>
        <button data-lang-btn="en">EN</button>
      </div>
      <a class="btn btn-gold" href="tel:+995598334380" data-i18n="cta_call">დარეკვა</a>
      <button class="burger" aria-label="menu">☰</button>
    </div>
  </div>
</header>
```

- [ ] **Step 2: Style header + buttons + responsive nav**

```css
.site-header{position:sticky;top:0;z-index:50;background:rgba(11,31,46,.85);
  backdrop-filter:blur(8px);border-bottom:1px solid rgba(212,175,55,.2)}
.header-inner{display:flex;align-items:center;gap:24px;padding:12px 20px}
.brand{display:flex;align-items:center;gap:10px;font-weight:700;font-size:20px}
.brand-logo{height:34px;width:auto}
.nav{display:flex;gap:22px;margin-left:auto}
.nav a:hover{color:var(--gold-hi)}
.header-actions{display:flex;align-items:center;gap:14px}
.lang-switch button{background:none;border:1px solid transparent;color:var(--muted);
  cursor:pointer;padding:4px 8px;border-radius:8px;font:inherit}
.lang-switch button.active{color:var(--gold);border-color:var(--gold)}
.btn{display:inline-block;padding:10px 18px;border-radius:999px;font-weight:600;cursor:pointer}
.btn-gold{background:var(--gold);color:#10293c}
.btn-gold:hover{background:var(--gold-hi)}
.burger{display:none;background:none;border:none;color:var(--text);font-size:24px;cursor:pointer}
@media(max-width:820px){
  .nav{position:fixed;inset:64px 0 auto 0;flex-direction:column;background:var(--bg-2);
    padding:20px;display:none}
  .nav.open{display:flex}
  .burger{display:block}
}
```

- [ ] **Step 3: Wire language buttons + burger in `main.js`**

```js
document.querySelectorAll("[data-lang-btn]").forEach(btn=>{
  btn.addEventListener("click",()=>applyLang(btn.getAttribute("data-lang-btn")));
});
const burger=document.querySelector(".burger");
const nav=document.getElementById("nav");
if(burger&&nav){
  burger.addEventListener("click",()=>nav.classList.toggle("open"));
  nav.querySelectorAll("a").forEach(a=>a.addEventListener("click",()=>nav.classList.remove("open")));
}
```

- [ ] **Step 4: Verify**

Playwright MCP: navigate, click `RU` lang button (`browser_click`), confirm nav link "Каталог" via `browser_snapshot`; screenshot desktop. Resize to 390px (`browser_resize`), confirm burger appears and opens nav. Check `browser_console_messages` clean.

- [ ] **Step 5: Commit**

```bash
git add index.html css/styles.css js/main.js
git commit -m "feat: sticky header with nav, language switcher, mobile burger"
```

---

### Task 4: Hero + advantages sections

**Files:**
- Modify: `index.html`, `css/styles.css`, `js/main.js`

**Interfaces:**
- Consumes: i18n dictionary (adds keys), `img/hero.png`.
- Produces: `#hero` and `#advantages` sections; new i18n keys `hero_sub`, `cta_catalog`, `adv_title`, `adv_1_t/adv_1_d`, `adv_2_t/adv_2_d`, `adv_3_t/adv_3_d` in all three locales.

- [ ] **Step 1: Add hero + advantages markup inside `<main>`**

```html
<section id="hero" class="hero">
  <div class="container hero-grid">
    <div class="hero-copy">
      <h1 data-i18n="hero_title">ჭკვიანი საკეტები და სხვა სისტემები</h1>
      <p class="hero-sub" data-i18n="hero_sub">სრული მომსახურება შეკვეთიდან დაყენებამდე</p>
      <div class="hero-cta">
        <a class="btn btn-gold" href="#catalog" data-i18n="cta_catalog">კატალოგი</a>
        <a class="btn btn-outline" href="tel:+995598334380" data-i18n="cta_call">დარეკვა</a>
      </div>
    </div>
    <div class="hero-art"><img src="img/hero.png" alt=""></div>
  </div>
</section>

<section id="advantages" class="section">
  <div class="container">
    <h2 class="section-title" data-i18n="adv_title">ჩვენი უპირატესობები</h2>
    <div class="adv-grid">
      <article class="adv-card"><h3 data-i18n="adv_1_t"></h3><p data-i18n="adv_1_d"></p></article>
      <article class="adv-card"><h3 data-i18n="adv_2_t"></h3><p data-i18n="adv_2_d"></p></article>
      <article class="adv-card"><h3 data-i18n="adv_3_t"></h3><p data-i18n="adv_3_d"></p></article>
    </div>
  </div>
</section>
```

- [ ] **Step 2: Add the new keys to `I18N` (ka/ru/en)**

```js
// merge into each locale object:
// ka:
hero_sub:"სრული მომსახურება შეკვეთიდან დაყენებამდე",
cta_catalog:"კატალოგი", adv_title:"ჩვენი უპირატესობები",
adv_1_t:"საუკეთესო ფასი", adv_1_d:"უმაღლესი ხარისხის საკეტები ყველაზე დაბალ ფასად.",
adv_2_t:"სრული სერვისი", adv_2_d:"შეკვეთიდან მონტაჟამდე და დაყენებამდე.",
adv_3_t:"შეკვეთა მოთხოვნით", adv_3_d:"მოგიტანთ ნებისმიერ პროდუქტს მოთხოვნისამებრ.",
// ru:
hero_sub:"Полный сервис от заказа до установки",
cta_catalog:"Каталог", adv_title:"Наши преимущества",
adv_1_t:"Лучшая цена", adv_1_d:"Качественные замки по самой низкой цене.",
adv_2_t:"Полный сервис", adv_2_d:"От заказа до монтажа и настройки.",
adv_3_t:"Заказ под запрос", adv_3_d:"Привезём любой товар по вашему запросу.",
// en:
hero_sub:"Full service from order to installation",
cta_catalog:"Catalog", adv_title:"Why choose us",
adv_1_t:"Best price", adv_1_d:"High-quality locks at the lowest price.",
adv_2_t:"Full service", adv_2_d:"From ordering to installation and setup.",
adv_3_t:"Custom orders", adv_3_d:"We bring any product on request.",
```

- [ ] **Step 3: Style hero + advantages**

```css
.section{padding:72px 0}
.section-title{font-size:32px;margin-bottom:32px;text-align:center}
.hero{padding:72px 0}
.hero-grid{display:grid;grid-template-columns:1.1fr .9fr;gap:40px;align-items:center}
.hero h1{font-size:46px;line-height:1.1;margin-bottom:18px}
.hero-sub{color:var(--muted);font-size:18px;margin-bottom:28px}
.hero-cta{display:flex;gap:14px;flex-wrap:wrap}
.btn-outline{border:1px solid var(--gold);color:var(--gold)}
.btn-outline:hover{background:rgba(212,175,55,.1)}
.hero-art img{filter:drop-shadow(0 20px 50px rgba(212,175,55,.25));margin-inline:auto}
.adv-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:20px}
.adv-card{background:var(--card);border:1px solid rgba(212,175,55,.15);
  border-radius:var(--radius);padding:26px}
.adv-card h3{color:var(--gold);margin-bottom:10px}
@media(max-width:820px){.hero-grid{grid-template-columns:1fr}.hero h1{font-size:34px}
  .adv-grid{grid-template-columns:1fr}}
```

- [ ] **Step 4: Verify**

Playwright MCP: navigate, screenshot hero (desktop + 390px). Switch to EN, confirm `hero_title`="Smart locks and other systems" and advantage cards filled via `browser_snapshot`. Console clean.

- [ ] **Step 5: Commit**

```bash
git add index.html css/styles.css js/main.js
git commit -m "feat: hero and advantages sections with i18n"
```

---

### Task 5: Catalog section with product cards + T2302 color switch

**Files:**
- Modify: `index.html`, `css/styles.css`, `js/main.js`

**Interfaces:**
- Consumes: i18n dict, product images `img/t2302.png`, `img/xg02.png`, `img/g02.png`, `img/gateway.png`. If per-color T2302 photos were extracted, name them `img/t2302-black.png|silver.png|gold.png`; otherwise color buttons just set an accent ring and a label (no image swap) — pick the image-swap path only if distinct photos exist.
- Produces: `#catalog` with 4 `.product-card`s; each "Order" button has `data-product="<name>"` consumed by Task 7's form. New i18n keys: `cat_title`, `price_install`, `order_btn`, per-product `p_*_name`, `p_*_desc`, and unlock feature labels reused in Task 6.

- [ ] **Step 1: Add catalog markup**

```html
<section id="catalog" class="section">
  <div class="container">
    <h2 class="section-title" data-i18n="cat_title">კატალოგი</h2>
    <div class="product-grid">

      <article class="product-card">
        <div class="product-img"><img id="t2302-img" src="img/t2302.png" alt="TAICHEN T2302"></div>
        <h3>TAICHEN T2302</h3>
        <p class="product-desc" data-i18n="p_t2302_desc"></p>
        <div class="colors" data-for="t2302-img">
          <button class="dot dot-black active" data-color="black" aria-label="black"></button>
          <button class="dot dot-silver" data-color="silver" aria-label="silver"></button>
          <button class="dot dot-gold" data-color="gold" aria-label="gold"></button>
        </div>
        <div class="price">450 ₾ <span class="install" data-i18n="price_install"></span> 50 ₾</div>
        <button class="btn btn-gold order-btn" data-product="TAICHEN T2302" data-i18n="order_btn"></button>
      </article>

      <article class="product-card">
        <div class="product-img"><img src="img/xg02.png" alt="TAICHEN XG02"></div>
        <h3>TAICHEN XG02</h3>
        <p class="product-desc" data-i18n="p_xg02_desc"></p>
        <div class="price">100 ₾</div>
        <button class="btn btn-gold order-btn" data-product="TAICHEN XG02" data-i18n="order_btn"></button>
      </article>

      <article class="product-card">
        <div class="product-img"><img src="img/g02.png" alt="TAICHEN G02"></div>
        <h3>TAICHEN G02</h3>
        <p class="product-desc" data-i18n="p_g02_desc"></p>
        <div class="price">100 ₾ <span class="install" data-i18n="price_install"></span> 50 ₾</div>
        <button class="btn btn-gold order-btn" data-product="TAICHEN G02" data-i18n="order_btn"></button>
      </article>

      <article class="product-card">
        <div class="product-img"><img src="img/gateway.png" alt="Gateway G3"></div>
        <h3>Gateway G3 / G3P</h3>
        <p class="product-desc" data-i18n="p_gw_desc"></p>
        <div class="price">G3 — 80 ₾ · G3P — 100 ₾</div>
        <button class="btn btn-gold order-btn" data-product="Gateway G3/G3P" data-i18n="order_btn"></button>
      </article>

    </div>
  </div>
</section>
```

- [ ] **Step 2: Add catalog i18n keys (ka/ru/en)**

```js
// ka:
cat_title:"კატალოგი", order_btn:"შეკვეთა", price_install:"+ მონტაჟი",
p_t2302_desc:"კარის ჭკვიანი საკეტი, გაღების 5 მეთოდი. ფერები: შავი, ვერცხლი, ოქრო.",
p_xg02_desc:"ჭკვიანი ბოქლომი, 50-მდე თითის ანაბეჭდი.",
p_g02_desc:"შუშის კარის ჭკვიანი საკეტი.",
p_gw_desc:"გეითვეი დისტანციური მართვისთვის. G3P-ს აქვს PoE.",
// ru:
cat_title:"Каталог", order_btn:"Заказать", price_install:"+ установка",
p_t2302_desc:"Умный дверной замок, 5 способов открытия. Цвета: чёрный, серебро, золото.",
p_xg02_desc:"Умный навесной замок, до 50 отпечатков.",
p_g02_desc:"Умный замок для стеклянной двери.",
p_gw_desc:"Шлюз для удалённого управления. G3P с PoE.",
// en:
cat_title:"Catalog", order_btn:"Order", price_install:"+ install",
p_t2302_desc:"Smart door lock, 5 unlock methods. Colors: black, silver, gold.",
p_xg02_desc:"Smart padlock, up to 50 fingerprints.",
p_g02_desc:"Smart glass-door lock.",
p_gw_desc:"Gateway for remote control. G3P has PoE.",
```

- [ ] **Step 3: Style cards + color dots**

```css
.product-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:22px}
.product-card{background:var(--card);border:1px solid rgba(212,175,55,.15);
  border-radius:var(--radius);padding:20px;display:flex;flex-direction:column;gap:12px;
  transition:transform .2s,box-shadow .2s}
.product-card:hover{transform:translateY(-6px);box-shadow:0 16px 40px rgba(0,0,0,.4)}
.product-img{height:200px;display:flex;align-items:center;justify-content:center;
  background:radial-gradient(circle at 50% 40%,rgba(212,175,55,.12),transparent 70%)}
.product-img img{max-height:100%;object-fit:contain}
.product-desc{color:var(--muted);font-size:14px;flex:1}
.price{font-size:18px;font-weight:700;color:var(--gold)}
.install{color:var(--muted);font-weight:400;font-size:13px}
.colors{display:flex;gap:8px}
.dot{width:22px;height:22px;border-radius:50%;border:2px solid transparent;cursor:pointer}
.dot.active{border-color:var(--gold)}
.dot-black{background:#1b1b1b}.dot-silver{background:#c8ccd0}.dot-gold{background:#cBA04a}
.order-btn{margin-top:auto}
@media(max-width:1000px){.product-grid{grid-template-columns:repeat(2,1fr)}}
@media(max-width:560px){.product-grid{grid-template-columns:1fr}}
```

- [ ] **Step 4: Wire T2302 color switch**

```js
document.querySelectorAll(".colors").forEach(group=>{
  const imgId=group.getAttribute("data-for");
  const img=document.getElementById(imgId);
  group.querySelectorAll(".dot").forEach(dot=>{
    dot.addEventListener("click",()=>{
      group.querySelectorAll(".dot").forEach(d=>d.classList.remove("active"));
      dot.classList.add("active");
      const color=dot.getAttribute("data-color");
      // image-swap path ONLY if per-color files exist; else accent ring only:
      const candidate=`img/${imgId.replace("-img","")}-${color}.png`;
      // optimistic swap; keep base image if file missing
      const probe=new Image();
      probe.onload=()=>{img.src=candidate;};
      probe.src=candidate;
    });
  });
});
```

- [ ] **Step 5: Verify**

Playwright MCP: navigate, screenshot catalog (desktop, 768px, 390px). Click T2302 silver dot (`browser_click`), confirm `.active` moved via `browser_snapshot`. Switch language to RU, confirm "Заказать" buttons. Console clean.

- [ ] **Step 6: Commit**

```bash
git add index.html css/styles.css js/main.js
git commit -m "feat: product catalog with cards, prices, color switch"
```

---

### Task 6: Unlock-methods + how-we-work sections

**Files:**
- Modify: `index.html`, `css/styles.css`, `js/main.js`

**Interfaces:**
- Consumes: i18n dict.
- Produces: `#unlock` (5 methods with inline-SVG icons) and `#how` (4 steps). New i18n keys: `unlock_title`, `u_pin`,`u_finger`,`u_app`,`u_card`,`u_key`; `how_title`, `how_1..how_4`.

- [ ] **Step 1: Add markup (inline SVG icons — no external assets)**

```html
<section id="unlock" class="section section-alt">
  <div class="container">
    <h2 class="section-title" data-i18n="unlock_title">გაღების 5 მეთოდი</h2>
    <div class="unlock-grid">
      <div class="unlock-item"><svg viewBox="0 0 24 24" class="ico"><rect x="4" y="3" width="16" height="18" rx="2" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="8" cy="8" r="1"/><circle cx="12" cy="8" r="1"/><circle cx="16" cy="8" r="1"/></svg><span data-i18n="u_pin"></span></div>
      <div class="unlock-item"><svg viewBox="0 0 24 24" class="ico"><path d="M12 4c4 0 7 3 7 7v3M5 11a7 7 0 0 1 7-7M8 20c-1-2-1-5-1-7a5 5 0 0 1 10 0" fill="none" stroke="currentColor" stroke-width="1.5"/></svg><span data-i18n="u_finger"></span></div>
      <div class="unlock-item"><svg viewBox="0 0 24 24" class="ico"><rect x="7" y="2" width="10" height="20" rx="2" fill="none" stroke="currentColor" stroke-width="1.5"/><line x1="11" y1="18" x2="13" y2="18" stroke="currentColor" stroke-width="1.5"/></svg><span data-i18n="u_app"></span></div>
      <div class="unlock-item"><svg viewBox="0 0 24 24" class="ico"><rect x="3" y="6" width="18" height="12" rx="2" fill="none" stroke="currentColor" stroke-width="1.5"/><line x1="3" y1="10" x2="21" y2="10" stroke="currentColor" stroke-width="1.5"/></svg><span data-i18n="u_card"></span></div>
      <div class="unlock-item"><svg viewBox="0 0 24 24" class="ico"><circle cx="8" cy="8" r="4" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M11 11l8 8M16 16l2-2M18 18l2-2" fill="none" stroke="currentColor" stroke-width="1.5"/></svg><span data-i18n="u_key"></span></div>
    </div>
  </div>
</section>

<section id="how" class="section">
  <div class="container">
    <h2 class="section-title" data-i18n="how_title">როგორ ვმუშაობთ</h2>
    <ol class="how-grid">
      <li class="how-step"><span class="how-num">1</span><p data-i18n="how_1"></p></li>
      <li class="how-step"><span class="how-num">2</span><p data-i18n="how_2"></p></li>
      <li class="how-step"><span class="how-num">3</span><p data-i18n="how_3"></p></li>
      <li class="how-step"><span class="how-num">4</span><p data-i18n="how_4"></p></li>
    </ol>
  </div>
</section>
```

- [ ] **Step 2: Add i18n keys (ka/ru/en)**

```js
// ka:
unlock_title:"გაღების 5 მეთოდი", u_pin:"სენსორული პინკოდი", u_finger:"თითის ანაბეჭდი",
u_app:"აპლიკაცია", u_card:"უკონტაქტო ბარათი", u_key:"მექანიკური გასაღები",
how_title:"როგორ ვმუშაობთ", how_1:"შეკვეთა", how_2:"მიწოდება", how_3:"მონტაჟი", how_4:"დაყენება",
// ru:
unlock_title:"5 способов открытия", u_pin:"Сенсорный пинкод", u_finger:"Отпечаток пальца",
u_app:"Приложение", u_card:"Бесконтактная карта", u_key:"Механический ключ",
how_title:"Как мы работаем", how_1:"Заказ", how_2:"Доставка", how_3:"Монтаж", how_4:"Настройка",
// en:
unlock_title:"5 ways to unlock", u_pin:"Touch PIN code", u_finger:"Fingerprint",
u_app:"Mobile app", u_card:"Contactless card", u_key:"Mechanical key",
how_title:"How we work", how_1:"Order", how_2:"Delivery", how_3:"Installation", how_4:"Setup",
```

- [ ] **Step 3: Style**

```css
.section-alt{background:rgba(0,0,0,.18)}
.unlock-grid{display:grid;grid-template-columns:repeat(5,1fr);gap:18px}
.unlock-item{background:var(--card);border-radius:var(--radius);padding:22px;text-align:center;
  display:flex;flex-direction:column;align-items:center;gap:12px;
  border:1px solid rgba(212,175,55,.15)}
.ico{width:44px;height:44px;color:var(--gold)}
.how-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:18px;list-style:none}
.how-step{background:var(--card);border-radius:var(--radius);padding:24px;text-align:center;
  border:1px solid rgba(212,175,55,.15)}
.how-num{display:inline-flex;width:42px;height:42px;border-radius:50%;background:var(--gold);
  color:#10293c;font-weight:700;align-items:center;justify-content:center;margin-bottom:12px}
@media(max-width:820px){.unlock-grid{grid-template-columns:repeat(2,1fr)}
  .how-grid{grid-template-columns:repeat(2,1fr)}}
```

- [ ] **Step 4: Verify**

Playwright MCP: navigate, screenshot both sections (desktop + 390px). Switch RU/EN, confirm labels translate via `browser_snapshot`. Console clean.

- [ ] **Step 5: Commit**

```bash
git add index.html css/styles.css js/main.js
git commit -m "feat: unlock methods and how-we-work sections"
```

---

### Task 7: Contact section — phones, WhatsApp, Viber, form→messenger

**Files:**
- Modify: `index.html`, `css/styles.css`, `js/main.js`

**Interfaces:**
- Consumes: i18n dict, `.order-btn[data-product]` (Task 5), phone numbers (Global Constraints).
- Produces:
  - Contact section `#contact` with two `tel:` links, a WhatsApp link, a Viber link, and a form `#order-form` (name, phone, product `<select>`, messenger choice).
  - `buildMessage({name,phone,product})` → returns a single-line order string using current lang labels.
  - `openMessenger(channel, text)` → opens `https://wa.me/995598334380?text=…` or `viber://chat?...`/`viber://forward?text=…`.
  - Order buttons preselect the product `<select>` and scroll to `#contact`.

- [ ] **Step 1: Add contact markup**

```html
<section id="contact" class="section section-alt">
  <div class="container contact-grid">
    <div class="contact-info">
      <h2 class="section-title" data-i18n="contact_title">კონტაქტი</h2>
      <a class="contact-line" href="tel:+995598334380">+995 598 33 43 80</a>
      <a class="contact-line" href="tel:+995599719740">+995 599 71 97 40</a>
      <div class="msg-buttons">
        <a class="btn btn-wa" href="https://wa.me/995598334380" target="_blank" rel="noopener">WhatsApp</a>
        <a class="btn btn-viber" href="viber://chat?number=%2B995598334380" target="_blank" rel="noopener">Viber</a>
      </div>
    </div>
    <form id="order-form" class="order-form">
      <input name="name" required data-i18n-attr="placeholder:f_name">
      <input name="phone" required data-i18n-attr="placeholder:f_phone">
      <select name="product">
        <option value="TAICHEN T2302">TAICHEN T2302</option>
        <option value="TAICHEN XG02">TAICHEN XG02</option>
        <option value="TAICHEN G02">TAICHEN G02</option>
        <option value="Gateway G3/G3P">Gateway G3/G3P</option>
      </select>
      <div class="msg-choice">
        <label><input type="radio" name="channel" value="wa" checked> WhatsApp</label>
        <label><input type="radio" name="channel" value="viber"> Viber</label>
      </div>
      <button type="submit" class="btn btn-gold" data-i18n="f_submit"></button>
    </form>
  </div>
</section>
```

- [ ] **Step 2: Add i18n keys (ka/ru/en)**

```js
// ka:
contact_title:"კონტაქტი", f_name:"სახელი", f_phone:"ტელეფონი", f_submit:"გაგზავნა",
m_order:"შეკვეთა", m_name:"სახელი", m_phone:"ტელეფონი", m_product:"პროდუქტი",
// ru:
contact_title:"Контакты", f_name:"Имя", f_phone:"Телефон", f_submit:"Отправить",
m_order:"Заявка", m_name:"Имя", m_phone:"Телефон", m_product:"Товар",
// en:
contact_title:"Contact", f_name:"Name", f_phone:"Phone", f_submit:"Send",
m_order:"Order", m_name:"Name", m_phone:"Phone", m_product:"Product",
```

- [ ] **Step 3: Style contact + form + messenger buttons**

```css
.contact-grid{display:grid;grid-template-columns:1fr 1fr;gap:40px;align-items:start}
.contact-line{display:block;font-size:22px;font-weight:700;margin:6px 0}
.contact-line:hover{color:var(--gold-hi)}
.msg-buttons{display:flex;gap:12px;margin-top:18px}
.btn-wa{background:#25d366;color:#06340f}
.btn-viber{background:#7360f2;color:#fff}
.order-form{display:flex;flex-direction:column;gap:12px;background:var(--card);
  padding:24px;border-radius:var(--radius);border:1px solid rgba(212,175,55,.15)}
.order-form input,.order-form select{padding:12px;border-radius:10px;border:1px solid #244;
  background:#0d2334;color:var(--text);font:inherit}
.msg-choice{display:flex;gap:18px;color:var(--muted)}
@media(max-width:820px){.contact-grid{grid-template-columns:1fr}}
```

- [ ] **Step 4: Implement message builder + form submit + order-button prefill**

```js
const PHONE_WA="995598334380";
function buildMessage({name,phone,product}){
  const d=I18N[getLang()];
  return `${d.m_order}: ${d.m_name}: ${name}, ${d.m_phone}: ${phone}, ${d.m_product}: ${product}`;
}
function openMessenger(channel,text){
  const enc=encodeURIComponent(text);
  const url = channel==="viber"
    ? `viber://forward?text=${enc}`
    : `https://wa.me/${PHONE_WA}?text=${enc}`;
  window.open(url,"_blank");
}
const form=document.getElementById("order-form");
if(form){
  form.addEventListener("submit",e=>{
    e.preventDefault();
    const fd=new FormData(form);
    const text=buildMessage({
      name:fd.get("name"),phone:fd.get("phone"),product:fd.get("product")});
    openMessenger(fd.get("channel"),text);
  });
}
document.querySelectorAll(".order-btn").forEach(btn=>{
  btn.addEventListener("click",()=>{
    const sel=form&&form.querySelector('select[name="product"]');
    if(sel) sel.value=btn.getAttribute("data-product");
    document.getElementById("contact").scrollIntoView({behavior:"smooth"});
  });
});
```

- [ ] **Step 5: Verify**

Playwright MCP: navigate. `browser_evaluate`:
`return buildMessage({name:'A',phone:'5',product:'TAICHEN XG02'});`
Expected (ka default): starts with `"შეკვეთა: სახელი: A, ტელეფონი: 5, პროდუქტი: TAICHEN XG02"`.
Switch to RU (`applyLang('ru')`), re-evaluate → starts with `"Заявка:"`.
Click a catalog "Order" button (`browser_click`), confirm select preselected and page scrolled to contact (`browser_snapshot`). Screenshot. Console clean.

- [ ] **Step 6: Commit**

```bash
git add index.html css/styles.css js/main.js
git commit -m "feat: contact section with phones, messengers, form→messenger"
```

---

### Task 8: Scroll reveal, footer, polish, final QA

**Files:**
- Modify: `index.html`, `css/styles.css`, `js/main.js`

**Interfaces:**
- Consumes: all prior sections, i18n dict.
- Produces: footer, IntersectionObserver reveal animation, final responsive/console QA. New i18n keys: `footer_rights`.

- [ ] **Step 1: Add footer**

```html
<footer class="site-footer">
  <div class="container footer-inner">
    <a href="#hero" class="brand"><img src="img/logo.png" class="brand-logo" alt="Lokito"><span>ლოკიტო</span></a>
    <div class="footer-contacts">
      <a href="tel:+995598334380">+995 598 33 43 80</a>
      <a href="tel:+995599719740">+995 599 71 97 40</a>
    </div>
    <p class="footer-rights"><span data-i18n="footer_rights">ყველა უფლება დაცულია</span> · Lokito 2026</p>
  </div>
</footer>
```

- [ ] **Step 2: i18n + footer styles + reveal CSS**

```js
// ka: footer_rights:"ყველა უფლება დაცულია",
// ru: footer_rights:"Все права защищены",
// en: footer_rights:"All rights reserved",
```
```css
.site-footer{border-top:1px solid rgba(212,175,55,.2);padding:30px 0;margin-top:40px}
.footer-inner{display:flex;justify-content:space-between;align-items:center;gap:20px;flex-wrap:wrap}
.footer-contacts{display:flex;gap:18px}
.footer-rights{color:var(--muted);font-size:14px}
.reveal{opacity:0;transform:translateY(24px);transition:opacity .6s,transform .6s}
.reveal.visible{opacity:1;transform:none}
```

- [ ] **Step 3: Add `.reveal` to sections + IntersectionObserver**

In `index.html` add class `reveal` to each `<section>`. In `main.js`:
```js
const io=new IntersectionObserver(entries=>{
  entries.forEach(en=>{ if(en.isIntersecting){en.target.classList.add("visible");io.unobserve(en.target);} });
},{threshold:.12});
document.querySelectorAll(".reveal").forEach(el=>io.observe(el));
```

- [ ] **Step 4: Final QA pass**

Playwright MCP:
- Navigate fresh; `browser_console_messages` → no errors/warnings.
- Full-page screenshot at 1280px, 768px, 390px.
- Cycle languages KA→RU→EN; confirm NO element shows an empty string or a raw key (spot-check via `browser_snapshot`). Every `data-i18n` key must resolve in all three locales.
- Reload; confirm last language persisted (`localStorage.lokito_lang`).
- Click each catalog Order button; confirm scroll + preselect.

- [ ] **Step 5: Remove `img/raw/` scratch and commit**

```bash
git rm -r --cached img/raw 2>/dev/null; rm -rf img/raw
git add -A
git commit -m "feat: footer, scroll reveal, final responsive QA"
```

---

## Self-Review

**Spec coverage:**
- Languages KA/RU/EN + switch + persistence → Tasks 2,3 ✓
- Dark premium-tech palette → Task 1 tokens, applied throughout ✓
- Header/nav/CTA → Task 3 ✓
- Hero → Task 4 ✓
- Advantages (3 points) → Task 4 ✓
- Catalog 4 products + prices + T2302 colors → Task 5 ✓
- 5 unlock methods → Task 6 ✓
- How we work → Task 6 ✓
- Contact: phones + WhatsApp + Viber + form→messenger → Task 7 ✓
- Footer → Task 8 ✓
- Photos from PDF → Task 1 ✓
- Reveal animations, responsive → Tasks 4–8 ✓
- No backend / no Telegram / no cart → respected (YAGNI) ✓

**Placeholder scan:** No TBD/TODO in steps; all code blocks concrete. The only conditional is T2302 per-color images (Task 5 Step 4) — handled gracefully (probe-load, fallback to base image), not a placeholder.

**Type consistency:** `applyLang`/`getLang`/`I18N` consistent across Tasks 2–8. `buildMessage`/`openMessenger` signatures consistent in Task 7. `data-i18n`/`data-i18n-attr` conventions consistent. Image filenames consistent (`img/{logo,hero,t2302,xg02,g02,gateway}.png`).
