import { skills } from "./data.js";   

const SKILL_KEY_MAP = {
  "HTML / CSS (SCSS)": "resume_skill_html", 
  "Web Design":        "resume_skill_web",
  "JavaScript (ES6+)": "resume_skill_js",
  "React JS":          "resume_skill_react",
  "Express JS":        "resume_skill_express",
  "TypeScript":        "resume_skill_ts",
};       

function annotateStaticI18n() {         
  document.querySelector(".contact-hero .ch-sub")?.setAttribute("data-text", "resume_hero_sub");
  document.querySelector(".contact-hero .ch-title")?.setAttribute("data-text", "resume_hero_title");
  document.querySelector("#education .education__title")?.setAttribute("data-text", "resume_education_title");
  document.querySelector("#skills .skills__subtitle")?.setAttribute("data-text", "resume_skills_subtitle");
  document.querySelector("#skills .skills__title")?.setAttribute("data-text", "resume_skills_title");

  const cards = document.querySelectorAll("#education .edu-card");
  cards.forEach((card, idx) => {
    card.querySelector(".edu-card__degree")?.setAttribute("data-text", `resume_degree_${idx + 1}`);
    card.querySelector(".edu-card__meta")?.setAttribute("data-text",   `resume_meta_${idx + 1}`);
    card.querySelector(".edu-card__desc")?.setAttribute("data-text",   `resume_desc_${idx + 1}`);
  });
}  


function renderSkills() {
  const ul = document.querySelector(".skills__list");
  if (!ul) return;

  ul.innerHTML = skills.map(s => {
    const key = SKILL_KEY_MAP[s.name] || ""; 
    return `
      <li class="skill">
        <div class="skill__head">
          <span class="skill__name" ${key ? `data-text="${key}"` : ""}>${s.name}</span>
          <span class="skill__value">${s.percent}%</span>
        </div>
        <div class="skill__bar"><span></span></div>
      </li>
    `;
  }).join("");
}


function initSkillAnimation() {
  const DURATION = 3000;
  const EASE = t => 1 - Math.pow(1 - t, 3); 

  function colorByPercent(p) {
    const hue = Math.round((120 * p) / 100);
    return `hsl(${hue} 70%, 45%)`;
  }

  function parseTarget(li) {    
    const valueEl = li.querySelector(".skill__value");
    if (valueEl) {
      const n = parseInt(valueEl.textContent.replace(/\D/g, ""), 10);
      if (!Number.isNaN(n)) return Math.max(0, Math.min(100, n));
    }
    return 0;
  }

  function animate(li) {
    if (li.dataset.animated === "1") return;
    li.dataset.animated = "1";

    const valueEl = li.querySelector(".skill__value");
    const fillEl  = li.querySelector(".skill__bar > span");
    const target  = parseTarget(li);

    valueEl.textContent = "0%";
    fillEl.style.width = "0%";
    fillEl.style.background = colorByPercent(0);

    const start = performance.now();
    function frame(now) {
      const t = Math.min(1, (now - start) / DURATION);
      const eased = EASE(t);
      const cur = Math.round(target * eased);

      valueEl.textContent = cur + "%";
      fillEl.style.width = cur + "%";
      fillEl.style.background = colorByPercent(cur);

      if (t < 1) requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
  }

  const items = document.querySelectorAll(".skills__list .skill");
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) animate(e.target);
    });
  }, { threshold: 0.25 });

  items.forEach(li => io.observe(li));
}


function applyI18nNow() {
  if (window.applyI18n) window.applyI18n();
}

document.addEventListener("DOMContentLoaded", () => {
  annotateStaticI18n();  
  renderSkills();       
  initSkillAnimation();  
  applyI18nNow();        
});

window.addEventListener("langchange", applyI18nNow);





















































