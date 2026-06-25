"use strict";

const I18N = {
  ka:{ nav_catalog:"კატალოგი", nav_unlock:"გაღების მეთოდები",
       nav_how:"როგორ ვმუშაობთ", nav_contact:"კონტაქტი",
       cta_call:"დარეკვა", hero_title:"ჭკვიანი საკეტები და სხვა სისტემები",
       hero_sub:"სრული მომსახურება შეკვეთიდან დაყენებამდე",
       cta_catalog:"კატალოგი", adv_title:"ჩვენი უპირატესობები",
       adv_1_t:"საუკეთესო ფასი", adv_1_d:"უმაღლესი ხარისხის საკეტები ყველაზე დაბალ ფასად.",
       adv_2_t:"სრული სერვისი", adv_2_d:"შეკვეთიდან მონტაჟამდე და დაყენებამდე.",
       adv_3_t:"შეკვეთა მოთხოვნით", adv_3_d:"მოგიტანთ ნებისმიერ პროდუქტს მოთხოვნისამებრ.",
       cat_title:"კატალოგი", order_btn:"შეკვეთა", price_install:"+ მონტაჟი",
       p_t2302_desc:"კარის ჭკვიანი საკეტი, გაღების 5 მეთოდი. ფერები: შავი, ვერცხლი, ოქრო.",
       p_xg02_desc:"ჭკვიანი ბოქლომი, 50-მდე თითის ანაბეჭდი.",
       p_g02_desc:"შუშის კარის ჭკვიანი საკეტი.",
       p_gw_desc:"გეითვეი დისტანციური მართვისთვის. G3P-ს აქვს PoE." },
  ru:{ nav_catalog:"Каталог", nav_unlock:"Способы открытия",
       nav_how:"Как работаем", nav_contact:"Контакты",
       cta_call:"Позвонить", hero_title:"Умные замки и другие системы",
       hero_sub:"Полный сервис от заказа до установки",
       cta_catalog:"Каталог", adv_title:"Наши преимущества",
       adv_1_t:"Лучшая цена", adv_1_d:"Качественные замки по самой низкой цене.",
       adv_2_t:"Полный сервис", adv_2_d:"От заказа до монтажа и настройки.",
       adv_3_t:"Заказ под запрос", adv_3_d:"Привезём любой товар по вашему запросу.",
       cat_title:"Каталог", order_btn:"Заказать", price_install:"+ установка",
       p_t2302_desc:"Умный дверной замок, 5 способов открытия. Цвета: чёрный, серебро, золото.",
       p_xg02_desc:"Умный навесной замок, до 50 отпечатков.",
       p_g02_desc:"Умный замок для стеклянной двери.",
       p_gw_desc:"Шлюз для удалённого управления. G3P с PoE." },
  en:{ nav_catalog:"Catalog", nav_unlock:"Unlock methods",
       nav_how:"How we work", nav_contact:"Contact",
       cta_call:"Call", hero_title:"Smart locks and other systems",
       hero_sub:"Full service from order to installation",
       cta_catalog:"Catalog", adv_title:"Why choose us",
       adv_1_t:"Best price", adv_1_d:"High-quality locks at the lowest price.",
       adv_2_t:"Full service", adv_2_d:"From ordering to installation and setup.",
       adv_3_t:"Custom orders", adv_3_d:"We bring any product on request.",
       cat_title:"Catalog", order_btn:"Order", price_install:"+ install",
       p_t2302_desc:"Smart door lock, 5 unlock methods. Colors: black, silver, gold.",
       p_xg02_desc:"Smart padlock, up to 50 fingerprints.",
       p_g02_desc:"Smart glass-door lock.",
       p_gw_desc:"Gateway for remote control. G3P has PoE." },
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

document.addEventListener("DOMContentLoaded", () => {
  applyLang(getLang());

  document.querySelectorAll("[data-lang-btn]").forEach(btn=>{
    btn.addEventListener("click",()=>applyLang(btn.getAttribute("data-lang-btn")));
  });
  const burger=document.querySelector(".burger");
  const nav=document.getElementById("nav");
  if(burger&&nav){
    burger.addEventListener("click",()=>nav.classList.toggle("open"));
    nav.querySelectorAll("a").forEach(a=>a.addEventListener("click",()=>nav.classList.remove("open")));
  }

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
});
