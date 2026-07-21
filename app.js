const imageA = document.getElementById("showcase-image-a");
const imageB = document.getElementById("showcase-image-b");
const showcaseTool = document.getElementById("showcase-tool");
const showcaseSummary = document.getElementById("showcase-summary");
const showcaseCard = document.getElementById("showcase-card");
const showcaseProgressBar = document.getElementById("showcase-progress-bar");

let showcaseIndex = 0;
let showcaseTimer = null;
let showcaseProgressTimer = null;
let activeImage = imageA;
let inactiveImage = imageB;
let showcaseItems = [];
const ROTATION_MS = 5000;

async function loadSiteData() {
  const response = await fetch("./data/site.json");

  if (!response.ok) {
    throw new Error("Could not load site data.");
  }

  return response.json();
}

function setText(id, value) {
  const element = document.getElementById(id);
  if (element) {
    element.textContent = value;
  }
}

function setLink(id, href) {
  const element = document.getElementById(id);
  if (element && href) {
    element.href = href;
  }
}

function renderHero(data) {
  setText("hero-eyebrow", data.hero.eyebrow);
  setText("hero-title", data.hero.title);
  setText("hero-description", data.hero.description);
  setText("meta-version", data.release.version);
  setText("meta-platform", data.release.platform);
  setLink("hero-download", data.release.downloadUrl);
}

function renderTools(tools) {
  const toolGrid = document.getElementById("tool-grid");
  toolGrid.innerHTML = "";

  tools.forEach((tool) => {
    const card = document.createElement("article");
    card.className = `tool-card ${tool.size}`;
    card.innerHTML = `
      <span class="tool-card-category">${tool.category}</span>
      <h3>${tool.name}</h3>
      <p>${tool.description}</p>
      <span class="tool-card-tag">${tool.tag}</span>
    `;
    toolGrid.appendChild(card);
  });
}

function renderFeatures(features) {
  const featureList = document.getElementById("feature-list");
  featureList.innerHTML = "";

  features.forEach((feature) => {
    const card = document.createElement("article");
    card.className = "feature-card";
    card.innerHTML = `
      <h3>${feature.title}</h3>
      <p>${feature.description}</p>
    `;
    featureList.appendChild(card);
  });
}

function renderRelease(release) {
  setText("release-title", release.title);
  setText("release-date", release.dateLabel);
  setText("release-version", release.version);
  setText("release-summary", release.summary);
  setText("download-description", release.downloadDescription);
  setText("download-caption", release.downloadCaption);
  setLink("download-button", release.downloadUrl);
}

function renderChangelog(entries) {
  const changelogList = document.getElementById("changelog-list");
  changelogList.innerHTML = "";

  entries.forEach((entry) => {
    const card = document.createElement("article");
    card.className = "changelog-card";
    card.innerHTML = `
      <h3>${entry.version}</h3>
      <p class="changelog-date">${entry.date}</p>
      <ul>${entry.items.map((item) => `<li>${item}</li>`).join("")}</ul>
    `;
    changelogList.appendChild(card);
  });
}

function renderFaq(items) {
  const faqList = document.getElementById("faq-list");
  faqList.innerHTML = "";

  items.forEach((item) => {
    const article = document.createElement("article");
    article.className = "faq-item";
    article.innerHTML = `
      <h3>${item.question}</h3>
      <p>${item.answer}</p>
    `;
    faqList.appendChild(article);
  });
}

function applyShowcaseItem(item) {
  inactiveImage.src = item.image;
  inactiveImage.alt = `${item.name} screenshot`;

  requestAnimationFrame(() => {
    inactiveImage.classList.add("active");
    activeImage.classList.remove("active");
    [activeImage, inactiveImage] = [inactiveImage, activeImage];
  });

  showcaseTool.textContent = item.name;
  showcaseSummary.textContent = item.summary;
}

function startProgressBar() {
  clearInterval(showcaseProgressTimer);
  let elapsed = 0;
  showcaseProgressBar.style.width = "0%";

  showcaseProgressTimer = setInterval(() => {
    elapsed += 100;
    const percentage = Math.min((elapsed / ROTATION_MS) * 100, 100);
    showcaseProgressBar.style.width = `${percentage}%`;
  }, 100);
}

function rotateShowcase() {
  showcaseIndex = (showcaseIndex + 1) % showcaseItems.length;
  applyShowcaseItem(showcaseItems[showcaseIndex]);
  startProgressBar();
}

function startShowcase() {
  if (showcaseItems.length === 0 || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    return;
  }

  clearInterval(showcaseTimer);
  startProgressBar();
  showcaseTimer = setInterval(rotateShowcase, ROTATION_MS);
}

function pauseShowcase() {
  clearInterval(showcaseTimer);
  clearInterval(showcaseProgressTimer);
}

function renderShowcase(items) {
  showcaseItems = items;

  if (items.length === 0) {
    return;
  }

  imageA.src = items[0].image;
  imageA.alt = `${items[0].name} screenshot`;
  imageA.classList.add("active");
  showcaseTool.textContent = items[0].name;
  showcaseSummary.textContent = items[0].summary;

  showcaseCard.addEventListener("mouseenter", pauseShowcase);
  showcaseCard.addEventListener("mouseleave", startShowcase);

  startShowcase();
}

loadSiteData()
  .then((data) => {
    renderHero(data);
    renderTools(data.tools);
    renderFeatures(data.features);
    renderRelease(data.release);
    renderChangelog(data.changelog);
    renderFaq(data.faq);
    renderShowcase(data.showcase);
  })
  .catch((error) => {
    console.error(error);
    setText("meta-version", "Update data/site.json");
  });
