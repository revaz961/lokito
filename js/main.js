"use strict";

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

document.addEventListener("DOMContentLoaded", () => {
  applyLang(getLang());
});
