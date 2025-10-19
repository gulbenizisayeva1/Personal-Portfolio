const p = prompt("Admin parolu: ");
if (p !== "admin34") {
  alert("Parol səhvdir!");
  location.href = "./index.html"; 
}

document.getElementById("btn-logout")?.addEventListener("click", () => {
  
  try {
    localStorage.setItem("aboutData",    JSON.stringify(state.aboutData   ?? {}));
    localStorage.setItem("skillsData",   JSON.stringify(state.skills      ?? []));
    localStorage.setItem("projectsData", JSON.stringify(state.projects    ?? []));
    localStorage.setItem("contactData",  JSON.stringify(state.contactInfo ?? []));
  } catch (e) {
    console.error("Yadda saxlama xətası:", e);
    alert("Dəyişiklikləri saxlamaq alınmadı!");
    return;
  }


  const ok = confirm("Dəyişikliklər yadda saxlanıldı ✅\nÇıxmaq istədiyinizə əminsiniz?");
  if (ok) {
    location.href = "./index.html"; 
  }
  
});


document.querySelector(".tabs")?.addEventListener("click", e=>{
  const b=e.target.closest(".tab"); if(!b) return;
  document.querySelectorAll(".tab").forEach(x=>x.classList.remove("active"));
  document.querySelectorAll(".panel").forEach(x=>x.classList.remove("active"));
  b.classList.add("active");
  document.getElementById( `panel-${b.dataset.tab}`)?.classList.add("active");
});


import * as DATA from "./data.js";

const state = {
  aboutData:   JSON.parse(JSON.stringify(DATA.aboutData   ?? {})),
  skills:      JSON.parse(JSON.stringify(DATA.skills      ?? [])),
  projects:    JSON.parse(JSON.stringify(DATA.projects    ?? [])),
  contactInfo: JSON.parse(JSON.stringify(DATA.contactInfo ?? [])),
};


const LS_KEY = "admin-autosave";
function saveLS(){ localStorage.setItem(LS_KEY, JSON.stringify(state)); }
function loadLS(){
  try{
    const raw = localStorage.getItem(LS_KEY);
    if(!raw) return;
    const obj = JSON.parse(raw);
    if(obj && typeof obj === "object"){
      state.aboutData   = obj.aboutData   ?? state.aboutData;
      state.skills      = obj.skills      ?? state.skills;
      state.projects    = obj.projects    ?? state.projects;
      state.contactInfo = obj.contactInfo ?? state.contactInfo;
    }
  }catch{}
}
loadLS();


const el = s => document.querySelector(s);
const make = (tag, attrs={}) => Object.assign(document.createElement(tag), attrs);
const move = (arr, from, to) => { if(to<0||to>=arr.length) return; const [x]=arr.splice(from,1); arr.splice(to,0,x); };
const confirmDel = () => confirm("Silmək istədiyinizə əminsiniz?");


const aboutForm = el("#form-about");
const infoWrap  = el("#about-info-rows");
const infoAddBtn= el("#about-info-add");

function renderAbout(){
  const a = state.aboutData ?? {};
  aboutForm.photo.value   = a.photo   ?? "";
  aboutForm.alt.value     = a.alt     ?? "";
  aboutForm.eyebrow.value = a.eyebrow ?? "";
  aboutForm.title.value   = a.title   ?? "";
  aboutForm.lead.value    = a.lead    ?? "";
  aboutForm.cvUrl.value   = a.cvUrl   ?? "";

  infoWrap.innerHTML = "";
  (a.info ?? []).forEach((p)=>addInfoRow(p));
}
function addInfoRow(data={}){
  const row = make("div",{className:"row"});
  row.innerHTML = `
    <input placeholder="Label" value="${data.label ?? ""}" required>
    <input placeholder="Value" value="${data.value ?? ""}" required>
    <input placeholder="Href (opsional)" value="${data.href ?? ""}">
    <div class="action-btn">
      <button type="button" class="btn" data-act="up">↑</button>
      <button type="button" class="btn" data-act="down">↓</button>
      <button type="button" class="btn btn-dark" data-act="del">Sil</button>
    </div>`;
  infoWrap.appendChild(row);

  row.addEventListener("click", e=>{
    const idx=[...infoWrap.children].indexOf(row);
    if(e.target.dataset.act==="del"){
      if(!confirmDel()) return;
      state.aboutData.info.splice(idx,1); saveLS(); renderAbout();
    }
    if(e.target.dataset.act==="up"){ move(state.aboutData.info,idx,idx-1); saveLS(); renderAbout(); }
    if(e.target.dataset.act==="down"){ move(state.aboutData.info,idx,idx+1); saveLS(); renderAbout(); }
  });
}

infoAddBtn.addEventListener("click", ()=>{
  state.aboutData.info = state.aboutData.info ?? [];
  state.aboutData.info.push({label:"",value:""});
  saveLS(); renderAbout();
});

aboutForm.addEventListener("submit", (e) => {
  e.preventDefault();


document.getElementById("skills-save").addEventListener("click", ()=>{
  const rows = [...document.querySelectorAll("#skills-table tbody tr")];
  state.skills = rows.map(r=>{
    const inputs = r.querySelectorAll("input");
    return { 
      name: inputs[0].value.trim(), 
      percent: parseInt(inputs[1].value.trim(),10) || 0 
    };
  });
  saveLS();
  alert("Skills yadda saxlandı ✅");
});


document.getElementById("projects-save").addEventListener("click", ()=>{
  const rows = [...document.querySelectorAll("#projects-table tbody tr")];
  state.projects = rows.map(r=>{
    const inputs = r.querySelectorAll("input");
    return { 
      title: inputs[0].value.trim(), 
      images: inputs[1].value.trim().split(",").map(s=>s.trim()) 
    };
  });
  saveLS();
  alert("Projects yadda saxlandı ✅");
});


document.getElementById("contact-save").addEventListener("click", ()=>{
  const rows = [...document.querySelectorAll("#contact-table tbody tr")];
  state.contact = rows.map(r=>{
    const inputs = r.querySelectorAll("input");
    return { 
      label: inputs[0].value.trim(), 
      value: inputs[1].value.trim(), 
      href: inputs[2].value.trim() 
    };
  });
  saveLS();
  alert("Contact yadda saxlandı ✅");
});


  const cur  = state.aboutData ?? {};
  const next = { ...cur };

  const get = (name) => (aboutForm[name]?.value || "").trim();

  
  ["photo", "alt", "eyebrow", "title", "lead", "cvUrl"].forEach((k) => {
    const val = get(k);
    if (val) next[k] = val;
  });

 
  if (infoWrap) {
    const rows = [...infoWrap.children]
      .map((r) => {
        const [labelEl, valueEl, hrefEl] = r.querySelectorAll("input");
        const label = (labelEl?.value || "").trim();
        const value = (valueEl?.value || "").trim();
        const href  = (hrefEl?.value  || "").trim();
        if (!label && !value && !href) return null; 
        const obj = {};
        if (label) obj.label = label;
        if (value) obj.value = value;
        if (href)  obj.href  = href;
        return obj;
      })
      .filter(Boolean);

    if (rows.length) next.info = rows;
  }

  state.aboutData = next;
  saveLS();
  alert("About yadda saxlandı ✅");
});

const skillsTBody = el("#skills-table tbody");
el("#skill-add").addEventListener("click", ()=>{
  state.skills.push({name:"Yeni Skill",percent:50}); saveLS(); renderSkills();
});
function renderSkills(){
  skillsTBody.innerHTML = "";
  state.skills.forEach((s,idx)=>{
    const tr = make("tr");
    tr.innerHTML = `
      <td>${idx+1}</td>
      <td><input value="${s.name}" required></td>
      <td><input class="small" type="number" min="0" max="100" value="${s.percent}" required></td>
      <td class="action-btn">
        <button class="btn" data-act="up">↑</button>
        <button class="btn" data-act="down">↓</button>
        <button class="btn btn-dark" data-act="del">Sil</button>
      </td>`;
    skillsTBody.appendChild(tr);

    const [nameEl, percEl] = tr.querySelectorAll("input");
    nameEl.addEventListener("input", ()=>{ state.skills[idx].name = nameEl.value; saveLS(); });
    percEl.addEventListener("input", ()=> {
      let v = parseInt(percEl.value||"0",10);
      v = isNaN(v)?0:Math.max(0,Math.min(100,v));
      state.skills[idx].percent = v; percEl.value=v; saveLS();
    });

    tr.addEventListener("click", e=>{
      if(e.target.dataset.act==="del"){
        if(!confirmDel()) return;
        state.skills.splice(idx,1); saveLS(); renderSkills();
      }
      if(e.target.dataset.act==="up"){ move(state.skills,idx,idx-1); saveLS(); renderSkills(); }
      if(e.target.dataset.act==="down"){ move(state.skills,idx,idx+1); saveLS(); renderSkills(); }
    });
  });
}


const projTBody = el("#projects-table tbody");
el("#proj-add").addEventListener("click", ()=>{
  state.projects.push({title:"Yeni Project", shots:[]}); saveLS(); renderProjects();
});
function renderProjects(){
  projTBody.innerHTML = "";
  state.projects.forEach((p,idx)=>{
    const tr = make("tr");
    tr.innerHTML = `
      <td>${idx+1}</td>
      <td><input value="${p.title ?? ""}" required></td>
      <td><input placeholder="img1.png, img2.png" value="${(p.shots||[]).join(", ")}"></td>
      <td class="action-btn">
        <button class="btn" data-act="up">↑</button>
        <button class="btn" data-act="down">↓</button>
        <button class="btn btn-dark" data-act="del">Sil</button>
      </td>`;
    projTBody.appendChild(tr);

    const [titleEl, shotsEl] = tr.querySelectorAll("input");
    titleEl.addEventListener("input", ()=>{ state.projects[idx].title = titleEl.value; saveLS(); });
    shotsEl.addEventListener("input", ()=>{
      state.projects[idx].shots = shotsEl.value.split(",").map(s=>s.trim()).filter(Boolean);
      saveLS();
    });

    tr.addEventListener("click", e=>{
      if(e.target.dataset.act==="del"){
        if(!confirmDel()) return;
        state.projects.splice(idx,1); saveLS(); renderProjects();
      }
      if(e.target.dataset.act==="up"){ move(state.projects,idx,idx-1); saveLS(); renderProjects(); }
      if(e.target.dataset.act==="down"){ move(state.projects,idx,idx+1); saveLS(); renderProjects(); }
    });
  });
}


const contactTBody = el("#contact-table tbody");
el("#contact-add").addEventListener("click", ()=>{
  state.contactInfo.push({label:"",value:"",href:""}); saveLS(); renderContact();
});
function renderContact(){
  contactTBody.innerHTML = "";
  state.contactInfo.forEach((c,idx)=>{
    const tr = make("tr");
    tr.innerHTML = `
      <td>${idx+1}</td>
      <td><input value="${c.label ?? ""}" required></td>
      <td><input value="${c.value ?? ""}" required></td>
      <td><input value="${c.href ?? ""}" placeholder="mailto: / tel: / http"></td>
      <td class="action-btn">
        <button class="btn" data-act="up">↑</button>
        <button class="btn" data-act="down">↓</button>
        <button class="btn btn-dark" data-act="del">Sil</button>
      </td>`;
    contactTBody.appendChild(tr);

    const [labelEl, valueEl, hrefEl] = tr.querySelectorAll("input");
    labelEl.addEventListener("input", ()=>{ state.contactInfo[idx].label = labelEl.value; saveLS(); });
    valueEl.addEventListener("input", ()=>{ state.contactInfo[idx].value = valueEl.value; saveLS(); });
    hrefEl.addEventListener("input",  ()=>{ state.contactInfo[idx].href  = hrefEl.value;  saveLS(); });

    tr.addEventListener("click", e=>{
      if(e.target.dataset.act==="del"){
        if(!confirmDel()) return;
        state.contactInfo.splice(idx,1); saveLS(); renderContact();
      }
      if(e.target.dataset.act==="up"){ move(state.contactInfo,idx,idx-1); saveLS(); renderContact(); }
      if(e.target.dataset.act==="down"){ move(state.contactInfo,idx,idx+1); saveLS(); renderContact(); }
    });
  });
}


document.getElementById("btn-import")?.addEventListener("click", async () => {
  const input = Object.assign(document.createElement("input"), { type:"file", accept:"application/json" });
  input.onchange = async () => {
    const f = input.files?.[0]; if(!f) return;
    try{
      const obj = JSON.parse(await f.text());
      if(obj.aboutData)   state.aboutData   = obj.aboutData;
      if(obj.skills)      state.skills      = obj.skills;
      if(obj.projects)    state.projects    = obj.projects;
      if(obj.contactInfo) state.contactInfo = obj.contactInfo;
      saveLS();
      renderAbout(); renderSkills(); renderProjects(); renderContact();
      alert("JSON import olundu.");
    }catch{ alert("JSON formatı yanlışdır."); }
  };
  input.click();
});


function download(text, filename){
  const blob = new Blob([text], {type:"text/javascript"});
  const url  = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href=url; a.download=filename; a.click();
  URL.revokeObjectURL(url);
}
document.getElementById("btn-export")?.addEventListener("click", ()=>{
  
  const bad = state.skills.find(s=> Number.isNaN(+s.percent) || s.percent<0 || s.percent>100);
  if(bad){ alert("Skills: faiz 0–100 arası olmalıdır."); return; }

  
  const banner =  `${banner} +
export const aboutData = ${JSON.stringify(state.aboutData,   null, 2)};\n
export const skills = ${JSON.stringify(state.skills,      null, 2)};\n
export const projects = ${JSON.stringify(state.projects,  null, 2)};\n
export const contactInfo = ${JSON.stringify(state.contactInfo, null, 2)};\n`;
  download(out,"data.js");
  alert("Yeni data.js endirildi ✅  (assets/js/data.js üzərinə əvəzlə)");
});











document.getElementById("btn-save")?.addEventListener("click", () => {
  const newName = document.getElementById("about-name")?.value.trim();
  const newEmail = document.getElementById("about-email")?.value.trim();

  const data = {
    ...JSON.parse(localStorage.getItem("aboutData") || "{}"),
    name: newName || "Isayeva Gulbeniz",
    email: newEmail || "gulbenizisayeva1@gmail.com"
  };

  localStorage.setItem("aboutData", JSON.stringify(data));
  alert("Dəyişikliklər yadda saxlanıldı ✅");
});


document.getElementById("btn-export")?.addEventListener("click", () => {
  const aboutData = JSON.parse(localStorage.getItem("aboutData") || "{}");

  const content =
   ` export const aboutData = ${JSON.stringify(aboutData, null, 2)};\n`;

  const blob = new Blob([content], { type: "text/javascript" });
  const url  = URL.createObjectURL(blob);
  const a    = document.createElement("a");
  a.href = url;
  a.download = "data.js";
  a.click();
  URL.revokeObjectURL(url);

  alert("Yeni data.js endirildi ✅");
});


renderAbout(); renderSkills(); renderProjects(); renderContact();














document.addEventListener("DOMContentLoaded", () => {


  document.getElementById("about-save").addEventListener("click", () => {
  state.aboutData = {
    photo:   document.querySelector("[name='photo']").value.trim(),
    alt:     document.querySelector("[name='alt']").value.trim(),
    eyebrow: document.querySelector("[name='eyebrow']").value.trim(),
    title:   document.querySelector("[name='title']").value.trim(),
    lead:    document.querySelector("[name='lead']").value.trim(),
    cvUrl:   document.querySelector("[name='cvUrl']").value.trim(),
    info:    [] 
  };
  saveLS();
  alert("About yadda saxlandı ✅");
});


document.getElementById("skills-save").addEventListener("click", () => {
  state.skills = [...document.querySelectorAll("#skills-table tbody tr")].map((row, i) => {
    const inputs = row.querySelectorAll("input");
    return { id: i + 1, name: inputs[0].value.trim(), percent: Number(inputs[1].value.trim()) };
  });
  saveLS();
  alert("Skills yadda saxlandı ✅");
});



document.getElementById("projects-save").addEventListener("click", () => {
  state.projects = [...document.querySelectorAll("#projects-table tbody tr")].map((row, i) => {
    const inputs = row.querySelectorAll("input");
    return { id: i + 1, title: inputs[0].value.trim(), photos: inputs[1].value.split(",") };
  });
  saveLS();
  alert("Projects yadda saxlandı ✅");
});




document.getElementById("contact-save").addEventListener("click", () => {
  state.contact = [...document.querySelectorAll("#contact-table tbody tr")].map((row, i) => {
    const inputs = row.querySelectorAll("input");
    return {
      id: i + 1,
      label: inputs[0].value.trim(),
      value: inputs[1].value.trim(),
      href: inputs[2].value.trim()
    };
  });
  saveLS();
  alert("Contact yadda saxlandı ✅");
});
});













































