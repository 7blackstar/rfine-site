const toolData = [
  { icon: "▣", name: "Image Resizer", description: "Resize images in bulk with ease.", accent: "green" },
  { icon: "◔", name: "Watermarker", description: "Add text or image watermarks.", accent: "amber" },
  { icon: "◉", name: "Color Studio", description: "Pick colors, create palettes and gradients.", accent: "rainbow" },
  { icon: "⟲", name: "Vectorizer", description: "Convert raster images to SVG vectors.", accent: "green" },
  { icon: "▸", name: "Video Compressor", description: "Compress videos without losing quality.", accent: "red" },
  { icon: "▤", name: "Frame Extractor", description: "Extract high quality frames from videos.", accent: "blue" },
  { icon: "⌘", name: "GIF Creator", description: "Create GIFs from videos or images.", accent: "purple" },
  { icon: "⌗", name: "Scan Studio", description: "Scan documents with smart auto-crop.", accent: "green" },
  { icon: "T", name: "Text Case", description: "Convert text to uppercase, lowercase and more.", accent: "lime" },
  { icon: "♫", name: "Audio Converter", description: "Convert audio between multiple formats.", accent: "red" },
  { icon: "◫", name: "Metadata Cleaner", description: "Remove metadata from images and videos.", accent: "blue" },
  { icon: "Q", name: "Batch Renamer", description: "Rename multiple files with advanced rules.", accent: "lime" }
];

const whyData = [
  { icon: "⊘", title: "100% Offline", description: "All processing happens on your PC." },
  { icon: "⬒", title: "Privacy First", description: "Your files never leave your device." },
  { icon: "⚡", title: "Blazing Fast", description: "Optimized for performance." },
  { icon: "▦", title: "All-in-One", description: "A complete toolkit for every creator." },
  { icon: "▣", title: "Windows Native", description: "Designed for Windows 10 and 11." },
  { icon: "⌘", title: "Free Forever", description: "Powerful features, completely free." }
];

const shotData = [
  { image: "./assets/screenshots/dashboard.webp", label: "Dashboard" },
  { image: "./assets/screenshots/image-resizer.svg", label: "Image Resizer" },
  { image: "./assets/screenshots/video-compressor.svg", label: "Video Compressor" },
  { image: "./assets/screenshots/frame-extractor.svg", label: "Frame Extractor" },
  { image: "./assets/screenshots/scan-studio.svg", label: "Scan Studio" },
  { image: "./assets/screenshots/color-studio.svg", label: "Color Studio" }
];

const releaseData = {
  version: "v1.2.4",
  date: "Released 3 days ago",
  url: "https://github.com/7blackstar/RFINE/releases/latest/download/RFINE_Setup.exe",
  bullets: [
    "Windows 10/11 (64-bit)",
    "Size: 38.7 MB",
    "No installation required"
  ]
};

const changelogData = [
  {
    version: "Version 1.2.0",
    sections: [
      {
        title: "New Pages Added:",
        items: [
          "Website foundation improved with a more polished RFINE landing page and cleaner section structure."
        ]
      },
      {
        title: "Improvements:",
        items: [
          "Homepage updated with cleaner cards, stronger brand alignment, and a lighter approved visual direction."
        ]
      }
    ]
  },
  {
    version: "Version 1.1.1",
    sections: [
      {
        title: "Improvements:",
        items: [
          "Refined the website structure, download flow, and branding assets for public release."
        ]
      }
    ]
  }
];

function renderTools() {
  const grid = document.getElementById("tool-grid");

  grid.innerHTML = toolData.map((tool) => `
    <article class="tool-card" data-accent="${tool.accent}">
      <div class="tool-card-top">
        <span class="tool-icon" aria-hidden="true">${tool.icon}</span>
        <div>
          <h3>${tool.name}</h3>
          <p>${tool.description}</p>
        </div>
      </div>
    </article>
  `).join("");
}

function renderWhy() {
  const grid = document.getElementById("why-grid");

  grid.innerHTML = whyData.map((item) => `
    <article class="why-item">
      <div class="why-icon" aria-hidden="true">${item.icon}</div>
      <h3>${item.title}</h3>
      <p>${item.description}</p>
    </article>
  `).join("");
}

function renderShots() {
  const strip = document.getElementById("shot-strip");

  strip.innerHTML = shotData.map((shot) => `
    <article class="shot-card">
      <div class="shot-frame">
        <img src="${shot.image}" alt="${shot.label} preview">
      </div>
      <p>${shot.label}</p>
    </article>
  `).join("");
}

function renderRelease() {
  document.getElementById("release-version").textContent = releaseData.version;
  document.getElementById("release-date").textContent = releaseData.date;
  document.getElementById("release-link").href = "./changelog.html";
  document.getElementById("download-button").href = releaseData.url;
  document.getElementById("hero-download").href = releaseData.url;
  document.getElementById("header-download").href = releaseData.url;

  document.getElementById("release-list").innerHTML = releaseData.bullets
    .map((item) => `<li>${item}</li>`)
    .join("");
}

function startHeroShowcase() {
  const heroImage = document.getElementById("hero-showcase-image");

  if (!heroImage) {
    return;
  }

  let index = 0;

  setInterval(() => {
    index = (index + 1) % shotData.length;
    heroImage.src = shotData[index].image;
    heroImage.alt = `${shotData[index].label} preview`;
  }, 3000);
}

function renderChangelogPage() {
  const changelogStack = document.getElementById("changelog-stack");

  if (!changelogStack) {
    return;
  }

  changelogStack.innerHTML = changelogData.map((entry) => `
    <article class="changelog-entry">
      <div class="changelog-entry-title">
        <h2>${entry.version}</h2>
      </div>
      <div class="changelog-entry-body">
        ${entry.sections.map((section) => `
          <section>
            <h3>${section.title}</h3>
            <ul>
              ${section.items.map((item) => `<li>${item}</li>`).join("")}
            </ul>
          </section>
        `).join("")}
      </div>
    </article>
  `).join("");
}

renderTools();
renderWhy();
renderShots();
renderRelease();
startHeroShowcase();
renderChangelogPage();
