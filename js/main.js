"use strict";

const I18N = {
  ka:{ company_name: "ლოკიტო", nav_catalog:"კატალოგი", nav_unlock:"გაღების მეთოდები",
       nav_how:"როგორ ვმუშაობთ", nav_contact:"კონტაქტი",
       cta_call:"დარეკვა", hero_title:"ჭკვიანი საკეტები და სხვა სისტემები",
       hero_sub:"სრული მომსახურება შეკვეთიდან დაყენებამდე",
       cta_catalog:"კატალოგი", adv_title:"ჩვენი უპირატესობები",
       adv_1_t:"საუკეთესო ფასი", adv_1_d:"უმაღლესი ხარისხის საკეტები ყველაზე დაბალ ფასად.",
       adv_2_t:"სრული სერვისი", adv_2_d:"შეკვეთიდან მონტაჟამდე და დაყენებამდე.",
       adv_3_t:"შეკვეთა მოთხოვნით", adv_3_d:"მოგიტანთ ნებისმიერ პროდუქტს მოთხოვნისამებრ.",
       cat_title:"კატალოგი",
       catalog_lead:"ლოკიტოს კატალოგში — TAICHEN-ის ჭკვიანი საკეტები კარებისთვის, ჭკვიანი ბოქლომები, შუშის კარის საკეტები და გეითვეი დისტანციური მართვისთვის. გაღება პინკოდით, თითის ანაბეჭდით, აპლიკაციით, ბარათით ან გასაღებით. მიწოდება და მონტაჟი მთელ საქართველოში.",
       order_btn:"შეკვეთა", price_install:"+ მონტაჟი",
       p_t2302_desc:"კარის ჭკვიანი საკეტი, გაღების 5 მეთოდი. ფერები: შავი, ვერცხლი, ოქრო.",
       p_xg02_desc:"ჭკვიანი ბოქლომი, 50-მდე თითის ანაბეჭდი.",
       p_g02_desc:"შუშის კარის ჭკვიანი საკეტი.",
       p_gw_desc:"გეითვეი დისტანციური მართვისთვის. G3P-ს აქვს PoE.",
       price_request:"ფასი მოთხოვნით",
       p_f2_desc:"ალუმინის/სასრიალე კარის ჭკვიანი საკეტი. გაღება: პინკოდი, თითის ანაბეჭდი, აპლიკაცია, ბარათი. ფერები: შავი, ვერცხლი.",
       p_l04_desc:"ალუმინის კარის წვრილი ჭკვიანი საკეტი, Tuya/TT Lock აპლიკაცია. გაღება: პინკოდი, თითის ანაბეჭდი, ბარათი. ფერები: შავი, ვერცხლი, ოქრო.",
       p_nt03_desc:"ჭკვიანი ორმხრივი ზედდებული საკეტი (rim lock). გაღება: პინკოდი, თითის ანაბეჭდი, ბარათი, მექანიკური გასაღები, აპლიკაცია.",
       p_d12_desc:"ჭკვიანი სახელური თითის ანაბეჭდით — შიდა და ოფისის კარებისთვის. გაღება: თითის ანაბეჭდი, პინკოდი, აპლიკაცია.",
       p_k36_desc:"პრემიუმ ჭკვიანი საკეტი სახის ამოცნობით და ვიდეო-ინტერკომით. ეკრანი, კამერა, Tuya. გაღება: სახე, თითის ანაბეჭდი, პინკოდი, ბარათი, აპლიკაცია.",
       p_kl01_desc:"პრემიუმ ჭკვიანი საკეტი 3D სახის ამოცნობით. კამერა, ეკრანი, Tuya Wi-Fi. გაღება: სახე, თითის ანაბეჭდი, პინკოდი, აპლიკაცია.",
       p_y02_desc:"სასრიალე/ალუმინის კარის ჭკვიანი საკეტი 3D სახის ამოცნობით. კამერა, ეკრანი, Tuya Wi-Fi, NFC. გაღება: სახე, თითის ანაბეჭდი, პინკოდი.",
       unlock_title:"გაღების 5 მეთოდი", u_pin:"სენსორული პინკოდი", u_finger:"თითის ანაბეჭდი",
       u_app:"აპლიკაცია", u_card:"უკონტაქტო ბარათი", u_key:"მექანიკური გასაღები",
       how_title:"როგორ ვმუშაობთ", how_1:"შეკვეთა", how_2:"მიწოდება", how_3:"მონტაჟი", how_4:"პროგრამული უზრუნველყოფა",
       contact_title:"კონტაქტი", f_name:"სახელი", f_phone:"ტელეფონი", f_note:"კომენტარი (არასავალდებულო)", f_submit:"გაგზავნა",
       m_greeting:"გამარჯობა! 👋", m_intro:"მინდა შეკვეთა Lockito-დან:", m_closing:"გთხოვთ დამიკავშირდეთ. გმადლობთ! 🙏",
       m_order:"შეკვეთა", m_name:"სახელი", m_phone:"ტელეფონი", m_product:"პროდუქტი", m_note:"კომენტარი",
       footer_rights:"ყველა უფლება დაცულია" },
  ru:{ company_name: "локито", nav_catalog:"Каталог", nav_unlock:"Способы открытия",
       nav_how:"Как работаем", nav_contact:"Контакты",
       cta_call:"Позвонить", hero_title:"Умные замки и другие системы",
       hero_sub:"Полный сервис от заказа до установки",
       cta_catalog:"Каталог", adv_title:"Наши преимущества",
       adv_1_t:"Лучшая цена", adv_1_d:"Качественные замки по самой низкой цене.",
       adv_2_t:"Полный сервис", adv_2_d:"От заказа до монтажа и настройки.",
       adv_3_t:"Заказ под запрос", adv_3_d:"Привезём любой товар по вашему запросу.",
       cat_title:"Каталог",
       catalog_lead:"В каталоге Lockito — умные замки TAICHEN для дверей, умные навесные замки, замки для стеклянных дверей и шлюзы для удалённого управления. Открытие пинкодом, отпечатком пальца, через приложение, картой или ключом. Доставка и установка по всей Грузии.",
       order_btn:"Заказать", price_install:"+ установка",
       p_t2302_desc:"Умный дверной замок, 5 способов открытия. Цвета: чёрный, серебро, золото.",
       p_xg02_desc:"Умный навесной замок, до 50 отпечатков.",
       p_g02_desc:"Умный замок для стеклянной двери.",
       p_gw_desc:"Шлюз для удалённого управления. G3P с PoE.",
       price_request:"Цена по запросу",
       p_f2_desc:"Умный замок для алюминиевых/раздвижных дверей. Открытие: пинкод, отпечаток, приложение, карта. Цвета: чёрный, серебро.",
       p_l04_desc:"Тонкий умный замок для алюминиевых дверей, приложение Tuya/TT Lock. Открытие: пинкод, отпечаток, карта. Цвета: чёрный, серебро, золото.",
       p_nt03_desc:"Умный накладной двусторонний замок (rim lock). Открытие: пинкод, отпечаток, карта, ключ, приложение.",
       p_d12_desc:"Умная ручка с отпечатком пальца — для межкомнатных и офисных дверей. Открытие: отпечаток, пинкод, приложение.",
       p_k36_desc:"Премиум умный замок с распознаванием лица и видеодомофоном. Экран, камера, Tuya. Открытие: лицо, отпечаток, пинкод, карта, приложение.",
       p_kl01_desc:"Премиум умный замок с 3D-распознаванием лица. Камера, экран, Tuya Wi-Fi. Открытие: лицо, отпечаток, пинкод, приложение.",
       p_y02_desc:"Умный замок для раздвижных/алюминиевых дверей с 3D-распознаванием лица. Камера, экран, Tuya Wi-Fi, NFC. Открытие: лицо, отпечаток, пинкод.",
       unlock_title:"5 способов открытия", u_pin:"Сенсорный пинкод", u_finger:"Отпечаток пальца",
       u_app:"Приложение", u_card:"Бесконтактная карта", u_key:"Механический ключ",
       how_title:"Как мы работаем", how_1:"Заказ", how_2:"Доставка", how_3:"Монтаж", how_4:"Настройка",
       contact_title:"Контакты", f_name:"Имя", f_phone:"Телефон", f_note:"Комментарий (необязательно)", f_submit:"Отправить",
       m_greeting:"Здравствуйте! 👋", m_intro:"Хочу оформить заказ в Lockito:", m_closing:"Пожалуйста, свяжитесь со мной. Спасибо! 🙏",
       m_order:"Заявка", m_name:"Имя", m_phone:"Телефон", m_product:"Товар", m_note:"Комментарий",
       footer_rights:"Все права защищены" },
  en:{ company_name: "lockito", nav_catalog:"Catalog", nav_unlock:"Unlock methods",
       nav_how:"How we work", nav_contact:"Contact",
       cta_call:"Call", hero_title:"Smart locks and other systems",
       hero_sub:"Full service from order to installation",
       cta_catalog:"Catalog", adv_title:"Why choose us",
       adv_1_t:"Best price", adv_1_d:"High-quality locks at the lowest price.",
       adv_2_t:"Full service", adv_2_d:"From ordering to installation and setup.",
       adv_3_t:"Custom orders", adv_3_d:"We bring any product on request.",
       cat_title:"Catalog",
       catalog_lead:"The Lockito catalog features TAICHEN smart door locks, smart padlocks, glass-door locks and gateways for remote control. Unlock by PIN code, fingerprint, mobile app, card or key. Delivery and installation across Georgia.",
       order_btn:"Order", price_install:"+ install",
       p_t2302_desc:"Smart door lock, 5 unlock methods. Colors: black, silver, gold.",
       p_xg02_desc:"Smart padlock, up to 50 fingerprints.",
       p_g02_desc:"Smart glass-door lock.",
       p_gw_desc:"Gateway for remote control. G3P has PoE.",
       price_request:"Price on request",
       p_f2_desc:"Smart lock for aluminium/sliding doors. Unlock: PIN, fingerprint, app, card. Colors: black, silver.",
       p_l04_desc:"Slim smart lock for aluminium doors, Tuya/TT Lock app. Unlock: PIN, fingerprint, card. Colors: black, silver, gold.",
       p_nt03_desc:"Smart double-sided rim lock. Unlock: PIN, fingerprint, card, key, app.",
       p_d12_desc:"Smart fingerprint handle — for interior and office doors. Unlock: fingerprint, PIN, app.",
       p_k36_desc:"Premium smart lock with face recognition and video intercom. Screen, camera, Tuya. Unlock: face, fingerprint, PIN, card, app.",
       p_kl01_desc:"Premium smart lock with 3D face recognition. Camera, screen, Tuya Wi-Fi. Unlock: face, fingerprint, PIN, app.",
       p_y02_desc:"Smart lock for sliding/aluminium doors with 3D face recognition. Camera, screen, Tuya Wi-Fi, NFC. Unlock: face, fingerprint, PIN.",
       unlock_title:"5 ways to unlock", u_pin:"Touch PIN code", u_finger:"Fingerprint",
       u_app:"Mobile app", u_card:"Contactless card", u_key:"Mechanical key",
       how_title:"How we work", how_1:"Order", how_2:"Delivery", how_3:"Installation", how_4:"Setup",
       contact_title:"Contact", f_name:"Name", f_phone:"Phone", f_note:"Comment (optional)", f_submit:"Send",
       m_greeting:"Hello! 👋", m_intro:"I'd like to place an order at Lockito:", m_closing:"Please get in touch. Thank you! 🙏",
       m_order:"Order", m_name:"Name", m_phone:"Phone", m_product:"Product", m_note:"Comment",
       footer_rights:"All rights reserved" },
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
        probe.onerror=()=>{};
        probe.src=candidate;
      });
    });
  });
});

const PHONE_WA="995598334380";
function buildMessage({name,phone,product,note}){
  const d=I18N[getLang()];
  let msg = `${d.m_greeting}\n${d.m_intro}\n\n`;
  msg += `🔒 ${d.m_product}: ${product}\n`;
  msg += `👤 ${d.m_name}: ${name}\n`;
  msg += `📞 ${d.m_phone}: ${phone}`;
  if (note && note.trim()) msg += `\n📝 ${d.m_note}: ${note.trim()}`;
  msg += `\n\n${d.m_closing}`;
  return msg;
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
      name:fd.get("name"),phone:fd.get("phone"),product:fd.get("product"),note:fd.get("note")});
    openMessenger("wa",text);
  });
}
document.querySelectorAll(".order-btn").forEach(btn=>{
  btn.addEventListener("click",()=>{
    const sel=form&&form.querySelector('select[name="product"]');
    if(sel) sel.value=btn.getAttribute("data-product");
    document.getElementById("contact").scrollIntoView({behavior:"smooth"});
  });
});

if ('IntersectionObserver' in window) {
  const io=new IntersectionObserver(entries=>{
    entries.forEach(en=>{ if(en.isIntersecting){en.target.classList.add("visible");io.unobserve(en.target);} });
  },{threshold:.12});
  document.querySelectorAll(".reveal").forEach(el=>io.observe(el));
} else {
  document.querySelectorAll(".reveal").forEach(el=>el.classList.add("visible"));
}
