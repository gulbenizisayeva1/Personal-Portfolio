import { aboutData } from "./data.js";           

const container = document.querySelector("#about .about__wrap.container");
if (!container) {
  console.warn("#about .about__wrap.container tapılmadı");
}


const ICONS = {
  Twitter: `<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M3 3h3.7l5.2 6.9L18.5 3H21l-7.1 8.9L21 21h-3.7l-5.6-7.5L7 21H3l7.4-9.3L3 3z"/></svg>`,
  Instagram: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none"><rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" stroke-width="2"/><circle cx="12" cy="12" r="3.5" stroke="currentColor" stroke-width="2"/><circle cx="17.3" cy="6.7" r="1.2" fill="currentColor"/></svg>`,
  LinkedIn: `<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M4 3.5A1.5 1.5 0 0 1 5.5 2H6.5A1.5 1.5 0 0 1 8 3.5 1.5 1.5 0 0 1 6.5 5H5.5A1.5 1.5 0 0 1 4 3.5ZM4 8H8V21H4V8ZM10 8H14V9.9h.1c.6-1.1 2-2.2 4.1-2.2 3.4 0 4.8 2.1 4.8 5.4V21h-4v-6.1c0-1.5-.1-3.4-2.1-3.4-2.1 0-2.4 1.6-2.4 3.3V21h-4V8Z"/></svg>`,
  GitHub: `<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a10 10 0 0 0-3.2 19.5c.5.1.7-.2.7-.5v-1.9c-2.8.6-3.4-1.3-3.4-1.3-.5-1.1-1.2-1.4-1.2-1.4-1-.7.1-.7.1-.7 1.1.1 1.7 1.2 1.7 1.2 1 1.7 2.7 1.2 3.4.9.1-.7.4-1.2.7-1.5-2.2-.2-4.6-1.1-4.6-5a3.9 3.9 0 0 1 1-2.7c-.1-.2-.4-1.3.1-2.7 0 0 .8-.3 2.8 1a9.6 9.6 0 0 1 5.1 0c2-1.3 2.8-1 2.8-1 .5 1.4.2 2.5.1 2.7a3.9 3.9 0 0 1 1 2.7c0 3.9-2.4 4.9-4.6 5 .4.3.7.9.7 1.9v2.8c0 .3.2.6.7.5A10 10 0 0 0 12 2z"/></svg>`,
  Facebook: `<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M13.5 22v-8h2.6l.4-3h-3V9.3c0-.9.3-1.5 1.6-1.5h1.4V5.1c-.7-.1-1.5-.1-2.2-.1-2.2 0-3.7 1.3-3.7 3.8V11H8v3h2.6v8h2.9z"/></svg>`
};

function render() {
  const nameVal  = aboutData?.info?.find(i => i.label?.toLowerCase().includes("name"))?.value  || "Isayeva Gulbeniz";
  const emailVal = aboutData?.info?.find(i => i.label?.toLowerCase().includes("email"))?.value || "gulbenizisayeva1@gmail.com";
  const ageVal   = aboutData?.info?.find(i => i.label?.toLowerCase().includes("age"))?.value   || "22";
  const fromVal  = aboutData?.info?.find(i => i.label?.toLowerCase().includes("from"))?.value  || "Baku, Azerbaijan";

  const socialsHTML = (aboutData.socials || []).map(s => `
    <li>
      <a href="${s.url}" target="_blank" rel="noopener" aria-label="${s.name}">
        ${ICONS[s.name] || ""}
      </a>
    </li>
  `).join("");

  container.innerHTML = `
    <figure class="about__photo">
      <img src="${aboutData.photo || './assets/image/profil.image.jpg'}" alt="${aboutData.alt || 'Isayeva Gulbeniz'}">
    </figure>

    <div class="about__content">
      <p class="eyebrow" data-text="about_eyebrow">Who am I?</p>

      <h1 class="about__title" data-text="about_title">
        I’m Isayeva Gulbeniz — a Frontend Developer
      </h1>

      <p class="about__lead" data-text="about_lead">
        I am Gulbeniz Isayeva — a growing frontend developer...
      </p>

      <span class="about__rule" aria-hidden="true"></span>

      <div class="about__info">
        <div class="pair">
          <span class="label" data-text="about_label_name">Name:</span>
          <span class="value">${nameVal}</span>
        </div>
        <div class="pair">
          <span class="label" data-text="about_label_email">Email:</span>
          <span class="value"><a href="mailto:${emailVal}">${emailVal}</a></span>
        </div>
        <div class="pair">
          <span class="label" data-text="about_label_age">Age:</span>
          <span class="value">${ageVal}</span>
        </div>
        <div class="pair">
          <span class="label" data-text="about_label_from">From:</span>
          <span class="value" data-text="about_value_from">${fromVal}</span>
        </div>
      </div>

      <div class="about__cta">
        <a class="btn" href="${aboutData.cvUrl || './assets/icons/IsayevaGulbeniz1CV.pdf.pdf'}" download data-text="about_download">
          Download CV
        </a>
        <span class="about__sep" aria-hidden="true"></span>
        <ul class="socials">${socialsHTML}</ul>
      </div>
    </div>
  `;

 
  if (window.applyI18n) window.applyI18n();
}


if (container) render();


// window.addEventListener("langchange", () => {
//   if (window.applyI18n) window.applyI18n();
// });










