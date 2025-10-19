import { texts } from "./texts.js";
import { startTyping } from "../index.js";


const LS_KEY = "lang";
const getLang = () => localStorage.getItem(LS_KEY) || "az";  

function tr(key, lang = getLang()) {
  const pack = texts[key];
  if (pack && typeof pack === "object" && !Array.isArray(pack)) {
    return pack[lang] ?? pack.en ?? "";
  }
  return "";
}



function apply(lang = getLang()) {
 
  document.querySelectorAll("[data-text]").forEach(el => {
    const key = el.dataset.text;  
    const val = tr(key, lang);     
    if (val !== "") el.innerHTML = val; 
  });

  
  const roleWords = texts.roles?.[lang] || ["Frontend Developer"];
  startTyping(roleWords);
}

function setLang(lang) {
  localStorage.setItem(LS_KEY, lang);
  apply(lang);
  
  
}

document.addEventListener("DOMContentLoaded", () => {

  document.querySelectorAll("[data-lang]").forEach(btn => {
    btn.addEventListener("click", e => {
      e.preventDefault();
      const lang = btn.getAttribute("data-lang");
      if (lang) setLang(lang);
    });
  });

  
  apply(getLang());
});

window.applyI18n = () => apply(getLang());



































// window.dispatchEvent(new CustomEvent("langchange", { detail: { lang } }));