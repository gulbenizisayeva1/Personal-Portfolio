import { contactInfo } from "./data.js";
import { texts } from "./lang/texts.js"; 


const LS_KEY = "lang";
const getLang = () => localStorage.getItem(LS_KEY) || "az";
const tr = (key, lang = getLang()) => {
  const pack = texts[key];
  return pack && typeof pack === "object" ? (pack[lang] ?? pack.en ?? "") : "";
};

const LABEL_KEY_MAP = {
  "Name":      "contact_info_name_label",
  "Location":  "contact_info_location_label",
  "Call Me":   "contact_info_call_label",
  "Email Me":  "contact_info_email_label",
};


function renderContactInfo() {
  const list = document.querySelector(".list-info");
  if (!list) return;


  const existingName = list.querySelector("li");
  list.innerHTML = existingName ? existingName.outerHTML : "";

  
  const firstStrong = list.querySelector("li .info-details strong");
  if (firstStrong) firstStrong.setAttribute("data-text", "contact_info_name_label");

 
  list.innerHTML += (contactInfo || []).map(item => {
    const labelKey = item.labelKey || LABEL_KEY_MAP[item.label?.trim()] || "";
    const strongAttr = labelKey ? ` data-text="${labelKey}"` : "";
    return `
      <li>
        <span class="info-icon">${item.icon ?? ""}</span>
        <div class="info-details">
          <strong${strongAttr}>${item.label ?? ""}</strong>
          ${item.value ?? ""}
        </div>
      </li>
    `;
  }).join("");

 
  if (window.applyI18n) window.applyI18n();
}


function annotateStaticI18n() {
  document.querySelector(".contact-hero .ch-sub")?.setAttribute("data-text", "contact_hero_sub");
  document.querySelector(".contact-hero .ch-title")?.setAttribute("data-text", "contact_hero_title");

  document.querySelector(".contact-left .form-title")?.setAttribute("data-text", "contact_form_title");

  document.querySelector(".contact-info .info-title")?.setAttribute("data-text", "contact_info_title");
  document.querySelector(".contact-info .info-desc")?.setAttribute("data-text", "contact_info_desc");

  document.querySelector(".btn-submit")?.setAttribute("data-text", "contact_btn_send");
}


function applyPlaceholders(lang = getLang()) {
  const name    = document.querySelector('input[name="name"]');
  const email   = document.querySelector('input[name="email"]');
  const subject = document.querySelector('input[name="subject"]');
  const message = document.querySelector('textarea[name="message"]');

  if (name)    name.placeholder    = tr("contact_ph_name",    lang);
  if (email)   email.placeholder   = tr("contact_ph_email",   lang);
  if (subject) subject.placeholder = tr("contact_ph_subject", lang);
  if (message) message.placeholder = tr("contact_ph_message", lang);

  const btn = document.querySelector(".btn-submit");
  if (btn) btn.textContent = tr("contact_btn_send", lang);
}


(function () {
  try { emailjs.init("KuH2_aZ-EQrrWo2m6"); } catch (_) {}

  var form   = document.getElementById("contact-form");
  var status = document.getElementById("status");

  if (!form || !status) return;

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    const lang = getLang();
    status.textContent = tr("contact_status_sending", lang);

    var params = {
      name:    form.name.value,
      email:   form.email.value,
      subject: form.subject.value,
      message: form.message.value
    };

    var SERVICE_ID  = "service_mnarzic";
    var TEMPLATE_ID = "template_t59vhow";

    emailjs.send(SERVICE_ID, TEMPLATE_ID, params)
      .then(function () {
        status.textContent = tr("contact_status_success", lang);
        form.reset();
        setTimeout(() => { status.textContent = ""; }, 3000);
      })
      .catch(function (err) {
        status.textContent = tr("contact_status_error", lang);
        console.error("EmailJS error:", err);
      });
  });
})();


function boot() {
  annotateStaticI18n();                
  renderContactInfo();                 
  if (window.applyI18n) window.applyI18n(); 
  applyPlaceholders(getLang());        
}

document.addEventListener("DOMContentLoaded", boot);


window.addEventListener("langchange", (e) => {
  if (window.applyI18n) window.applyI18n();
  applyPlaceholders(e?.detail?.lang || getLang());
});







