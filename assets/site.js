// HOMEPAGE CONTROLLER: renders project/creative cards and wires up homepage interactions.
(function () {
  "use strict";

  // Shared data comes from assets/projects.js; markup lives in index.html and styles.css.
  var config = window.PORTFOLIO_CONFIG || {};
  var projects = window.PORTFOLIO_PROJECTS || [];
  var projectGrid = document.getElementById("project-grid");
  var landingGrid = document.getElementById("landing-grid");
  var creativeGrid = document.getElementById("creative-grid");
  var reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Escape text and attributes inserted into the homepage's generated card markup.
  function escapeHtml(value) {
    return String(value).replace(/[&<>"']/g, function (character) {
      return {"&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"}[character];
    });
  }

  // Fallback project thumbnail composition for entries that do not yet have an image.
  function artMarkup(project) {
    var headline = project.art === "seirei" ? "Built around<br><em>what matters.</em>" :
      project.art === "shop" ? "Find your<br><em>next favourite.</em>" :
      project.art === "agency" ? "Make your<br><em>next move.</em>" :
      project.art === "bootcamp" ? "Start with<br><em>what’s next.</em>" :
      project.art === "airpods" ? "Sound in<br><em>new form.</em>" :
      "Comfort that<br><em>feels right.</em>";
    var feature = project.art === "shop" ? "" : '<span class="art-feature" aria-hidden="true"></span>';
    return '<div class="project-art" aria-hidden="true">' +
      '<div class="art-window"><div class="art-chrome"><i></i><i></i><i></i></div><div class="art-page">' +
      '<div class="art-brand"><span>PROJECT</span><span>MENU</span></div>' +
      '<div class="art-heading">' + headline + '</div><span class="art-copyline"></span><span class="art-copyline short"></span><span class="art-cta"></span>' +
      feature + '</div></div></div>';
  }

  // PROJECT SHOWCASE: split the shared project catalog into case-study and landing-page grids.
  function renderProjects() {
    if (!projectGrid) return;
    function cardMarkup(project, index) {
      var kind = project.type === "case-study" ? "CASE STUDY" : "LANDING PAGE";
      var action = project.type === "case-study" ? "View Case Study" : "View Landing Page";
      var targetType = project.type === "case-study" ? "case study" : "project";
      var image = project.coverImage ?
        {src: project.coverImage, alt: "Project cover for " + project.title} : project.contextImage;
      var preview = image ?
        '<img src="' + escapeHtml(image.src) + '" alt="' + escapeHtml(image.alt || ("Context image for " + project.title)) + '" loading="lazy" decoding="async" width="1600" height="1050">' :
        artMarkup(project);
      var figmaUrl = project.projectLinks && project.projectLinks.figma ? project.projectLinks.figma : "";
      return '<article class="project-card" data-category="' + escapeHtml(project.type) + '" data-project="' + escapeHtml(project.slug) + '" style="animation-delay:' + (index * 70) + 'ms">' +
        '<a class="project-image-link" href="' + escapeHtml(figmaUrl || project.url) + '"' + (figmaUrl ? ' target="_blank" rel="noopener noreferrer"' : '') + ' aria-label="Open ' + escapeHtml(project.title) + ' in Figma">' +
        '<div class="project-visual" data-art="' + escapeHtml(project.art) + '">' +
        preview + '<span class="preview-label">' + (project.coverImage ? "PROJECT COVER" : project.contextImage ? "View In Figma" : "PORTFOLIO PREVIEW") + '</span></div></a>' +
        '<div class="project-card-details">' +
        '<div class="project-card-footer"><div><h3 class="project-card-title">' + escapeHtml(project.title) + '</h3>' +
        '<p class="project-card-category">' + escapeHtml(project.category) + ' <span>· ' + kind + '</span></p>' +
        '<p class="project-card-desc">' + escapeHtml(project.description) + '</p><a class="project-view-link" href="' + escapeHtml(project.url) + '" aria-label="View ' + escapeHtml(project.title) + ' ' + targetType + '">' + action + ' <i aria-hidden="true">↗</i></a></div><span class="project-open" aria-hidden="true">↗</span></div></div></article>';
    }
    projectGrid.innerHTML = projects.filter(function (project) { return project.type === "case-study"; }).map(cardMarkup).join("");
    if (landingGrid) landingGrid.innerHTML = projects.filter(function (project) { return project.type === "landing-page"; }).map(cardMarkup).join("");
    var counter = document.querySelector(".section-heading h2 sup");
    if (counter) counter.textContent = String(projects.length).padStart(2, "0");
  }

  // SOCIAL MEDIA CREATIVES: edit sample title, category, image, alt text, photographer, and source here.
  // Image files are stored in assets/images/creatives/; this catalog powers the visible grid and lightbox.
  var creatives = [

    {title: "", cls: "campaign-custom", note: "", image: {src: "/assets/images/creatives/l1-burger.webp", alt: "", photographer: "",}},
    {title: "", cls: "campaign-custom", note: "", image: {src: "/assets/images/creatives/s3-seirei.webp", alt: "", photographer: "",}},
    {title: "", cls: "campaign-custom", note: "", image: {src: "/assets/images/creatives/l2-tmu.webp", alt: "", photographer: "",}},
    {title: "", cls: "campaign-custom", note: "", image: {src: "/assets/images/creatives/l3-por.webp", alt: "", photographer: "",}},
    {title: "", cls: "campaign-custom", note: "", image: {src: "/assets/images/creatives/l4-keys.webp", alt: "", photographer: "",}},
    {title: "", cls: "campaign-custom", note: "", image: {src: "/assets/images/creatives/l6-monster.webp", alt: "", photographer: "",}},
    {title: "", cls: "campaign-custom", note: "", image: {src: "/assets/images/creatives/l9-cake.webp", alt: "", photographer: "",}},
    {title: "", cls: "campaign-custom", note: "", image: {src: "/assets/images/creatives/s2 airpods.webp", alt: "", photographer: "",}},
    {title: "", cls: "campaign-custom", note: "", image: {src: "/assets/images/creatives/s5-seirei-future.webp", alt: "", photographer: "",}},
    {title: "", cls: "campaign-custom", note: "", image: {src: "/assets/images/creatives/s4-keys.webp", alt: "", photographer: "",}},
    {title: "", cls: "campaign-custom", note: "", image: {src: "/assets/images/creatives/s1-webrife.webp", alt: "", photographer: "",}},
    {title: "", cls: "campaign-custom", note: "", image: {src: "/assets/images/creatives/l4.webp", alt: "", photographer: "",}}


  ];

  // Build one reusable creative tile; the image and overlay are also copied into the lightbox.
  function creativeMarkup(item, index) {
    var image = item.image ? '<img class="creative-photo" src="' + escapeHtml(item.image.src) + '" alt="' + escapeHtml(item.image.alt) + '" loading="lazy" decoding="async" width="1200" height="1500"><span class="creative-photo-tint" aria-hidden="true"></span>' : '';
    return '<div class="creative-art ' + item.cls + (item.image ? ' has-photo' : '') + '">' + image +
      '<span class="creative-micro"><span>Social Visuals</span><span>' + (index + 1) + '</span></span>' +
      '<span class="creative-title">' + item.title + '</span>' +
      '<span class="creative-index"></span></div>';
  }

  // Render four initial samples and keep the remaining samples available through the existing View All control.
  function renderCreatives() {
    if (!creativeGrid) return;
    creativeGrid.innerHTML = creatives.map(function (item, index) {
      return '<button class="creative-tile" type="button" aria-label="Preview sample composition ' + (index + 1) + '"' + (index > 3 ? ' hidden' : '') + '>' +
        creativeMarkup(item, index) + '<span class="creative-caption">' + item.note + '' + escapeHtml(item.image.photographer) + '</span></button>';
    }).join("");
    creativeGrid.addEventListener("click", function (event) {
      var tile = event.target.closest(".creative-tile");
      if (!tile) return;
      var dialog = document.getElementById("creative-lightbox");
      var content = dialog.querySelector(".lightbox-content");
      content.innerHTML = tile.querySelector(".creative-art").outerHTML;
      dialog.showModal();
    });
  }

  // HOMEPAGE PROJECT FILTERS: preserve separate visibility for case studies and landing pages.
  function setupFilters() {
    document.querySelectorAll(".filter-button").forEach(function (button) {
      button.addEventListener("click", function () {
        var selected = button.dataset.filter;
        document.querySelectorAll(".filter-button").forEach(function (item) {
          var active = item === button;
          item.classList.toggle("is-active", active);
          item.setAttribute("aria-pressed", active ? "true" : "false");
        });
        document.querySelectorAll(".project-card").forEach(function (card) {
          card.hidden = selected !== "all" && card.dataset.category !== selected;
        });
        var caseGroup = document.getElementById("case-study-group");
        var landingGroup = document.getElementById("landing-pages");
        if (caseGroup) caseGroup.hidden = selected === "landing-page";
        if (landingGroup) landingGroup.hidden = selected === "case-study";
      });
    });
  }

  // THEME: apply and persist the light/dark theme across the homepage.
  function setTheme(theme) {
    document.documentElement.dataset.theme = theme;
    try { localStorage.setItem("desloper-theme", theme); } catch (error) {}
    var button = document.querySelector(".theme-toggle");
    if (button) {
      var label = theme === "dark" ? "Switch to light theme" : "Switch to dark theme";
      button.setAttribute("aria-label", label);
      button.title = label;
      button.querySelector(".theme-icon").textContent = theme === "dark" ? "◐" : "◑";
    }
    var themeMeta = document.querySelector('meta[name="theme-color"]');
    if (themeMeta) themeMeta.content = theme === "dark" ? "#00001b" : "#f6f2ed";
  }

  function setupTheme() {
    var saved = "";
    try { saved = localStorage.getItem("desloper-theme") || ""; } catch (error) {}
    setTheme(saved === "light" ? "light" : "dark");
    var button = document.querySelector(".theme-toggle");
    if (button) button.addEventListener("click", function () {
      setTheme(document.documentElement.dataset.theme === "dark" ? "light" : "dark");
    });
  }

  // MOBILE NAVIGATION: open/close the compact navigation and close it after a selection.
  function setupMenu() {
    var toggle = document.querySelector(".menu-toggle");
    var menu = document.getElementById("mobile-menu");
    if (!toggle || !menu) return;
    toggle.addEventListener("click", function () {
      var open = toggle.getAttribute("aria-expanded") !== "true";
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
      menu.hidden = !open;
    });
    menu.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        menu.hidden = true;
        toggle.setAttribute("aria-expanded", "false");
        toggle.setAttribute("aria-label", "Open menu");
      });
    });
  }

  // REVEAL ANIMATIONS: respect the visitor's reduced-motion preference.
  function setupReveal() {
    var elements = document.querySelectorAll(".reveal");
    if (reducedMotion || !("IntersectionObserver" in window)) {
      elements.forEach(function (element) { element.classList.add("is-visible"); });
      return;
    }
    var observer = new IntersectionObserver(function (entries, currentObserver) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          currentObserver.unobserve(entry.target);
        }
      });
    }, {threshold: 0.12});
    elements.forEach(function (element) { observer.observe(element); });
  }

  // SCROLL PROGRESS: update the thin page-top indicator while scrolling.
  function setupProgress() {
    var bar = document.getElementById("scroll-progress-bar");
    if (!bar) return;
    var scheduled = false;
    function update() {
      var max = document.documentElement.scrollHeight - window.innerHeight;
      bar.style.width = (max > 0 ? Math.min(100, window.scrollY / max * 100) : 0) + "%";
      scheduled = false;
    }
    window.addEventListener("scroll", function () {
      if (!scheduled) {
        scheduled = true;
        window.requestAnimationFrame(update);
      }
    }, {passive: true});
    update();
  }

  // Configurable social/profile links; empty URLs show an editing hint instead of navigating away.
  function setLinkGroup(selector, url, fallbackText, ariaFallback) {
    document.querySelectorAll(selector).forEach(function (link) {
      if (url) {
        link.href = url;
        link.target = "_blank";
        link.rel = "noopener noreferrer";
      } else {
        link.href = "#contact";
        link.addEventListener("click", function (event) {
          event.preventDefault();
          var status = document.getElementById("form-status");
          if (status) {
            status.textContent = fallbackText;
            status.className = "form-status";
          }
        });
        if (ariaFallback) link.setAttribute("aria-label", ariaFallback);
      }
    });
  }

  // CONTACT: fill profile details, validate the inquiry form, and compose an email draft when configured.
  function setupContact() {
    setLinkGroup(".config-linkedin", config.linkedin, "Add your LinkedIn URL in assets/projects.js.", "Add LinkedIn profile URL");
    setLinkGroup(".config-behance", config.behance, "Add your Behance URL in assets/projects.js.", "Add Behance profile URL");
    document.querySelectorAll(".config-freelance").forEach(function (item) {
      if (config.freelanceAvailability) item.textContent = config.freelanceAvailability;
    });
    document.querySelectorAll(".config-fulltime").forEach(function (item) {
      if (config.fullTimeAvailability) item.textContent = config.fullTimeAvailability;
    });
    document.querySelectorAll(".config-email").forEach(function (link) {
      if (config.contactEmail) {
        link.href = "mailto:" + config.contactEmail;
        link.textContent = config.contactEmail + " ↗";
      } else {
        link.addEventListener("click", function (event) {
          event.preventDefault();
          var status = document.getElementById("form-status");
          if (status) status.textContent = "Add your email address in assets/projects.js.";
        });
      }
    });
    document.querySelectorAll(".config-phone").forEach(function (item) {
      if (config.phone) {
        item.textContent = config.phone;
        item.innerHTML = '<a href="tel:' + escapeHtml(config.phone.replace(/[^\d+]/g, "")) + '">' + escapeHtml(config.phone) + '</a>';
      }
    });
    document.querySelectorAll(".resume-placeholder").forEach(function (item) {
      if (config.resumeUrl) {
        var link = document.createElement("a");
        link.href = config.resumeUrl;
        link.textContent = "Download resume";
        link.setAttribute("download", "");
        item.replaceWith(link);
      }
    });

    var form = document.getElementById("contact-form");
    if (!form) return;
    form.addEventListener("submit", function (event) {
      event.preventDefault();
      var fields = [
        {name: "name", message: "Please enter your name."},
        {name: "email", message: "Enter a valid email address."},
        {name: "details", message: "Add a few details about your project or opportunity."}
      ];
      var valid = true;
      fields.forEach(function (field) {
        var input = form.elements[field.name];
        var holder = input.closest(".form-field");
        var error = holder.querySelector(".field-error");
        var value = input.value.trim();
        var invalid = !value || (field.name === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value));
        holder.setAttribute("aria-invalid", invalid ? "true" : "false");
        error.textContent = invalid ? field.message : "";
        if (invalid) valid = false;
      });
      var status = document.getElementById("form-status");
      if (!valid) {
        status.textContent = "Please check the highlighted fields.";
        status.className = "form-status is-error";
        form.querySelector('[aria-invalid="true"] input, [aria-invalid="true"] textarea').focus();
        return;
      }
      if (!config.contactEmail) {
        status.textContent = "Your details are valid. Add a contact email in assets/projects.js to enable delivery.";
        status.className = "form-status is-success";
        return;
      }
      var data = new FormData(form);
      var opportunities = data.getAll("opportunity");
      var subject = "Portfolio inquiry from " + data.get("name");
      var body = "Name: " + data.get("name") + "\nEmail: " + data.get("email") +
        "\nBudget: " + (data.get("budget") || "Not specified") +
        "\nOpportunity: " + (opportunities.join(", ") || "Not specified") +
        "\n\nProject details:\n" + data.get("details");
      status.textContent = "Opening an email draft addressed to " + config.contactEmail + ".";
      status.className = "form-status is-success";
      window.location.href = "mailto:" + encodeURIComponent(config.contactEmail) + "?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(body);
    });
  }

  // CREATIVE LIGHTBOX: close from the button or backdrop.
  function setupLightbox() {
    var dialog = document.getElementById("creative-lightbox");
    if (!dialog) return;
    dialog.querySelector(".lightbox-close").addEventListener("click", function () { dialog.close(); });
    dialog.addEventListener("click", function (event) {
      if (event.target === dialog) dialog.close();
    });
  }

  // INITIALIZE homepage content first, then attach independent interactions.
  renderProjects();
  renderCreatives();
  setupFilters();
  setupTheme();
  setupMenu();
  setupReveal();
  setupProgress();
  setupContact();
  setupLightbox();
  var year = document.getElementById("copyright-year");
  if (year) year.textContent = String(new Date().getFullYear());

  var galleryMore = document.getElementById("gallery-more");
  if (galleryMore) galleryMore.addEventListener("click", function () {
    var hidden = Array.prototype.slice.call(document.querySelectorAll(".creative-tile[hidden]"));
    var opening = hidden.length > 0;
    hidden.forEach(function (tile) { tile.hidden = !opening; });
    galleryMore.innerHTML = opening ? 'Show fewer creatives <span aria-hidden="true">↖</span>' : 'View all social media creatives <span aria-hidden="true">↗</span>';
  });
}());
