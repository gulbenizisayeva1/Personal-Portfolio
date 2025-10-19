//About-page//

  export const aboutData = {
  photo: "./assets/image/profil.image.jpg",
  alt: "Isayeva Gulbeniz",

  eyebrow: "Who am I?",
  title: "I’m Isayeva Gulbeniz — a Frontend Developer",
  lead: `I'am Gulbeniz Isayeva — a growing frontend developer. 
My goal is to combine design with code to create modern, functional, and user-friendly web interfaces. 
I see every new project as an opportunity to learn and further improve my skills.`,

  info: [
    { label: "Name:",  value: "Isayeva Gulbeniz" },
    { label: "Email:", value: "gulbenizisayeva1@gmail.com", href: "mailto:gulbenizisayeva1@gmail.com" },
    { label: "Age:",   value: "22" },
    { label: "From:",  value: "Baku, Azerbaijan" }
  ],

  cvUrl: "./assets/icons/IsayevaGulbeniz1CV.pdf.pdf",

  socials: [
    { name: "Twitter",   url: "https://x.com/i/flow/login" },
    { name: "Instagram", url: "https://www.instagram.com/accounts/login/?hl=en" },
    { name: "LinkedIn",  url: "https://www.linkedin.com/feed/" },
    { name: "GitHub",    url: "https://github.com/login" },
    { name: "Facebook",  url: "https://www.facebook.com/home.php" }
  ]
};




//Resume page/ Skills//

export const skills = [
  { name: "HTML / CSS (SCSS)", percent: 85 },
  { name: "Web Design",        percent: 80 },
  { name: "JavaScript (ES6+)", percent: 70 },
  { name: "React JS",          percent: 65 },
  { name: "Express JS",        percent: 60 },
  { name: "TypeScript",        percent: 65 }
];



//Project-page//

export const projects = [
  {
    id: "project-1",
    title: "My First Project",
    lead: `
      This is my very first full website project — <strong>Monito Pets</strong>.
      It’s a multi-page responsive site where I practiced HTML, SCSS and modern layouts.
      The base design came from Figma, but I customized it with animations, overlays and pixel-perfect styling.
      <br><strong>Monito Pets -</strong> is a modern e-commerce website concept for pet lovers.  
      The site showcases categories, product cards, and detailed pages for pet food, toys, and accessories.  
      It was designed to create a friendly, colorful and trustworthy online shop where owners can easily find what their pets need.
    `,
    images: [
      { src: "./assets/image/M.sehife.1.png", alt: "Monito Pets — Home page", label: "Home page", desc: "Hero & CTA section" },
      { src: "./assets/image/M.Sehife.2..png", alt: "Monito Pets — Category grid", label: "Category grid", desc: "Auto-fit responsive grid" },
      { src: "./assets/image/M.Sehife.3..png", alt: "Monito Pets — Product cards", label: "Product cards", desc: "Hover & soft shadows" },
      { src: "./assets/image/M.Sehife.4..png", alt: "Monito Pets — Details page", label: "Details page", desc: "Gallery & sticky CTA" }
    ]
  },
  {
    id: "project-2",
    title: "2nd project",
    lead: `
      My second project description goes here.  
      Same style, but with different screenshots and details.
    `,
    images: [
      { src: "./assets/image/project-2photo2.png", alt: "Project 2 — Home page", label: "Home page", desc: "Hero & CTA section" },
      { src: "./assets/image/project-2photo3.png", alt: "Project 2 — Category grid", label: "Category grid", desc: "Auto-fit responsive grid" },
      { src: "./assets/image/project-2photo4.png", alt: "Project 2 — Product cards", label: "Product cards", desc: "Hover & soft shadows" },
      { src: "./assets/image/project-2phtot1.png", alt: "Project 2 — Details page", label: "Details page", desc: "Gallery & sticky CTA" }
    ]
  },
  {
    id: "project-3",
    title: "3rd project",
    lead: `
      My third project description goes here.  
      Again styled with grid and overlays.
    `,
    images: [
      { src: "./assets/image/project-3photo1.png", alt: "Project 3 — Home page", label: "Home page", desc: "Hero & CTA section" },
      { src: "./assets/image/project-3photo2.png", alt: "Project 3 — Category grid", label: "Category grid", desc: "Auto-fit responsive grid" },
      { src: "./assets/image/project-3photo3.png", alt: "Project 3 — Product cards", label: "Product cards", desc: "Hover & soft shadows" },
      { src: "./assets/image/project-3photo4.png", alt: "Project 3 — Details page", label: "Details page", desc: "Gallery & sticky CTA" }
    ]
  }
];



// Contact page/ Contact info//

export const contactInfo = [
  {
    label: "Location",
    value: "Baku, Azerbaijan",
    href:"https://www.google.com/maps/place/Baku,+Azerbaijan",
    icon: `
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 2a7 7 0 0 0-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 0 0-7-7Zm0 9.5A2.5 2.5 0 1 1 14.5 9 2.5 2.5 0 0 1 12 11.5Z"/>
      </svg>`
  },
  {
    label: "Call Me",
    value: "+994 50 755 59 61",
    icon: `
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M6.62 10.79a15.05 15.05 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.02-.24 
                 11.36 11.36 0 0 0 3.56.57 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1
                 A17 17 0 0 1 3 8a1 1 0 0 1 1-1h3.49a1 1 0 0 1 1 1 
                 11.36 11.36 0 0 0 .57 3.56 1 1 0 0 1-.24 1.02Z"/>
      </svg>`
  },
  {
    label: "Email Me",
    value: "gulbenizisayeva1@gmail.com",
    icon: `
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M2 4h20v16H2V4Zm2 2v1.2l8 5.3 8-5.3V6H4Zm16 12V9.5l-8 5.3-8-5.3V18h16Z"/>
      </svg>`
  }
];