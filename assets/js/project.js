import { projects } from "./data.js";

function renderProjects() {
  const container =
    document.getElementById("projects") ||
    document.querySelector("#projects .projects__wrap") ||
    document.querySelector(".projects.section-narrow") ||
    document.body;

  if (!container) {
    console.warn("Projects konteyneri tapılmadı.");
    return;
  }


  const sectionKeys = (idx) => ({
    title: `projects_title${idx + 1}`,
    lead:  `projects_lead${idx + 1}`,
  });

  const overlayBase = (i) => {
    const map = ["home", "category", "product", "details"];
    return map[i] || `item${i + 1}`;
  };

  const html = (projects || []).map((p, pi) => {
    const sk = sectionKeys(pi);

    return `
      <section class="projects section-narrow" aria-labelledby="${p.id}-title">
        <h2 id="${p.id}-title" data-text="${sk.title}">${p.title ?? "Project"}</h2>
        <p class="lead" data-text="${sk.lead}">${p.lead ?? ""}</p>

        <div class="project-grid">
          ${(p.images || []).map((img, i) => {
            const base = overlayBase(i);
            const labelKey = img.labelKey || `projects_${base}_title`;
            const descKey  = img.descKey  || `projects_${base}_sub`;

            return `
              <a class="project-card" href="#${p.id}-lb-${i + 1}" aria-label="Open ${img.label ?? (i + 1)}">
                <img src="${img.src}" alt="${img.alt || (p.title ?? "Project")}" width="640" height="400" loading="lazy">
                <span class="overlay">
                  <strong data-text="${labelKey}">${img.label ?? "Title"}</strong>
                  <em data-text="${descKey}">${img.desc ?? "Subtitle"}</em>
                </span>
              </a>
            `;
          }).join("")}
        </div>
      </section>
    `;
  }).join("");

  container.insertAdjacentHTML("beforeend", html);


  if (window.applyI18n) window.applyI18n();
}

document.addEventListener("DOMContentLoaded", renderProjects);

window.addEventListener("langchange", () => {
  if (window.applyI18n) window.applyI18n();
});
