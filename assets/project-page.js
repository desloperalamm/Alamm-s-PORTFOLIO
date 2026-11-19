// SHARED PROJECT + CASE-STUDY RENDERER: each route selects one record from assets/projects.js.
(function () {
  "use strict";

  // Existing routes use body[data-project]; new projects can use /projects/#<slug>.
  var projects = window.PORTFOLIO_PROJECTS || [];
  var pathParts = window.location.pathname.split("/").filter(Boolean);
  var hashSlug = "";
  try { hashSlug = decodeURIComponent(window.location.hash.replace(/^#/, "")); } catch (error) {}
  var slug = document.body.dataset.project || hashSlug || pathParts[pathParts.length - 1];
  var project = projects.filter(function (item) { return item.slug === slug; })[0];
  var root = document.getElementById("case-content");

  // HTML escaping and small markup helpers used by every case-study section.
  function esc(value) {
    return String(value == null ? "" : value).replace(/[&<>"']/g, function (character) {
      return {"&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"}[character];
    });
  }
  function list(items, cls) {
    return '<ul class="' + (cls || "case-list") + '">' + items.map(function (item) {
      return '<li>' + esc(item) + '</li>';
    }).join("") + '</ul>';
  }
  function sectionTitle(number, label, title, intro) {
    return '<div class="case-section-heading"><span class="case-number">' + number + ' / ' + label + '</span><h2>' + title + '</h2>' +
      (intro ? '<p>' + intro + '</p>' : '') + '</div>';
  }
  // Stock-image component: keeps descriptive alt text, photographer credit, source link, and disclaimer together.
  function stockVisual(image, section, disclaimer, loading) {
    if (!image || !safeImageSource(image.src)) return "";
    var source = safeImageSource(image.source);
    var photographer = textValue(image.photographer);
    var caption = textValue(disclaimer);
    var label = textValue(section).toUpperCase() || "PROJECT";
    var credit = photographer ? (source ?
      '<span><a href="' + esc(source) + '" target="_blank" rel="noopener noreferrer">Photo by ' + esc(photographer) + ' on Unsplash <span aria-hidden="true">↗</span></a></span>' :
      '<span>Photo by ' + esc(photographer) + '</span>') : "";
    return '<figure class="case-stock-visual" data-image-section="' + esc(label.toLowerCase()) + '"><div class="case-stock-image-frame">' +
      '<img src="' + esc(safeImageSource(image.src)) + '" alt="' + esc(textValue(image.alt) || "Supporting image") + '" width="1600" height="1050" loading="' + (loading || "lazy") + '" decoding="async"' + (loading === "eager" ? ' fetchpriority="high"' : '') + '></div>' +
      '<figcaption><span class="stock-visual-label">STOCK CONTEXT · ' + esc(label) + '</span>' + credit +
      (caption ? '<span class="stock-visual-disclaimer">' + esc(caption) + '</span>' : "") + '</figcaption></figure>';
  }
  // Project-image component: show an approved cover/gallery image when supplied, otherwise a labeled sample mockup.
  function visualBlock(project, variant, caption) {
    var galleryItem = (Array.isArray(project.gallery) ? project.gallery : []).filter(function (item) { return item && item.variant === variant && safeImageSource(item.src); })[0];
    var coverSource = safeImageSource(project.coverImage);
    if (variant === "cover-art" && coverSource) {
      return '<figure class="case-visual-block project-image-preview"><div class="case-image-frame"><img src="' + esc(coverSource) + '" alt="' + esc(textValue(project.title) || "Project") + ' project cover"></div><figcaption>' + caption + '</figcaption></figure>';
    }
    if (galleryItem) {
      return '<figure class="case-visual-block project-image-preview"><div class="case-image-frame"><img src="' + esc(galleryItem.src) + '" alt="' + esc(galleryItem.alt || project.title) + '" loading="lazy"></div><figcaption>' + esc(galleryItem.caption || caption) + '</figcaption></figure>';
    }
    var head = project.art === "seirei" ? "Service<br><em>made clear.</em>" :
      project.art === "shop" ? "Good things<br><em>in one place.</em>" :
      project.art === "agency" ? "Make the<br><em>next move.</em>" :
      project.art === "bootcamp" ? "Build what’s<br><em>coming next.</em>" :
      project.art === "airpods" ? "Hear things<br><em>differently.</em>" :
      "Warmth, made<br><em>thoughtful.</em>";
    var phone = project.art === "shop";
    var projectTitle = textValue(project.title) || "Project";
    return '<figure class="case-visual-block ' + (phone ? "is-mobile" : "") + ' ' + (variant || "") + '" data-art="' + esc(project.art) + '">' +
      '<div class="case-visual-frame">' +
      (phone ? '<div class="case-device"><div class="case-device-top"></div><div class="case-device-screen">' : '<div class="case-browser"><div class="case-browser-bar"><i></i><i></i><i></i><span>PREVIEW SCREEN</span></div><div class="case-browser-screen">') +
      '<div class="case-screen-nav"><b>' + esc(projectTitle.split(" ").slice(0, 2).join(" ").toUpperCase()) + '</b><span>MENU　↗</span></div>' +
      '<div class="case-screen-copy"><span class="case-screen-eyebrow">A CONSIDERED EXPERIENCE</span><strong>' + head + '</strong><i></i><i class="short"></i><b>Explore more　↗</b></div>' +
      '<div class="case-screen-object"></div>' +
      (phone ? '</div></div>' : '</div></div>') +
      '<span class="case-visual-stamp">PREVIEW</span></div>' +
      '<figcaption>' + caption + '</figcaption></figure>';
  }

  // FLEXIBLE SECTION DATA: resolve an optional contentKey such as "gallery" or "mistakesIdentified".
  function sectionValue(section, project) {
    if (Object.prototype.hasOwnProperty.call(section, "content")) return section.content;
    if (!section.contentKey) return undefined;
    return String(section.contentKey).split(".").reduce(function (value, key) {
      return value && Object.prototype.hasOwnProperty.call(value, key) ? value[key] : undefined;
    }, project);
  }

  function textValue(value) {
    if (typeof value === "string" || typeof value === "number") return String(value).trim();
    if (value && typeof value === "object") return textValue(value.text || value.content || value.description || "");
    return "";
  }

  function safeImageSource(value) {
    if (typeof value !== "string") return "";
    var source = value.trim();
    return /^(https?:\/\/|\/(?!\/)|\.\.\/|\.\/)/i.test(source) ? source : "";
  }

  function configuredImage(image, index) {
    if (typeof image === "string") image = {src: image};
    if (!image || typeof image !== "object") return "";
    var src = safeImageSource(image.src);
    if (!src) return "";
    var alt = textValue(image.alt) || textValue(image.caption) || "Project image " + (index + 1);
    var caption = textValue(image.caption);
    var photographer = textValue(image.photographer);
    var source = safeImageSource(image.source);
    var stockLabel = image.stock === true ? '<span class="stock-visual-label">STOCK CONTEXT</span>' : "";
    var credit = photographer ? (source ?
      '<span><a href="' + esc(source) + '" target="_blank" rel="noopener noreferrer">Photo by ' + esc(photographer) + ' <span aria-hidden="true">↗</span></a></span>' :
      '<span>Photo by ' + esc(photographer) + '</span>') : "";
    return '<figure class="case-stock-visual configured-image"><div class="case-stock-image-frame">' +
      '<img src="' + esc(src) + '" alt="' + esc(alt) + '" width="1600" height="1050" loading="lazy" decoding="async"></div>' +
      (caption || stockLabel || credit ? '<figcaption>' + stockLabel + (caption ? '<span>' + esc(caption) + '</span>' : "") + credit + '</figcaption>' : "") +
      '</figure>';
  }

  function paragraphMarkup(value) {
    var paragraphs = Array.isArray(value) ? value : typeof value === "string" ? value.split(/\n\s*\n/) : [];
    if (value && !Array.isArray(value) && typeof value === "object" && Array.isArray(value.paragraphs)) paragraphs = value.paragraphs;
    return paragraphs.map(textValue).filter(Boolean).map(function (paragraph) {
      return '<p>' + esc(paragraph).replace(/\n/g, "<br>") + '</p>';
    }).join("");
  }

  function configuredImages(section, value) {
    var images = section.images || (section.image ? [section.image] : value);
    if (!Array.isArray(images)) images = images && typeof images === "object" ? [images] : [];
    return images.map(configuredImage).filter(Boolean);
  }

  function configuredList(items) {
    if (!Array.isArray(items)) return "";
    var values = items.map(textValue).filter(Boolean);
    return values.length ? '<ul class="case-list">' + values.map(function (item) { return '<li>' + esc(item) + '</li>'; }).join("") + '</ul>' : "";
  }

  function configuredCards(items) {
    if (!Array.isArray(items)) return "";
    var cards = items.map(function (item) {
      if (typeof item === "string") item = {content: item};
      if (!item || typeof item !== "object") return "";
      var title = textValue(item.title || item.label || item.name);
      var content = textValue(item.content || item.description || item.text);
      var image = configuredImage(item.image, 0);
      if (!title && !content && !image) return "";
      return '<article class="custom-case-card">' + image + (title ? '<h3>' + esc(title) + '</h3>' : "") +
        (content ? '<p>' + esc(content).replace(/\n/g, "<br>") + '</p>' : "") + '</article>';
    }).filter(Boolean);
    return cards.length ? '<div class="custom-case-card-grid">' + cards.join("") + '</div>' : "";
  }

  function configuredTable(section, value) {
    var table = value && typeof value === "object" && !Array.isArray(value) ? value : {};
    var columns = section.columns || table.columns;
    var rows = section.rows || table.rows;
    if (!Array.isArray(columns) || !Array.isArray(rows) || !columns.length || !rows.length) return "";
    var header = columns.map(function (column) {
      if (typeof column === "string") return {key: column, label: column};
      return {key: textValue(column && (column.key || column.label)), label: textValue(column && (column.label || column.key))};
    }).filter(function (column) { return column.key || column.label; });
    if (!header.length) return "";
    var body = rows.map(function (row) {
      if (!row) return "";
      var cells = header.map(function (column, index) {
        var cell = Array.isArray(row) ? row[index] : row[column.key] !== undefined ? row[column.key] : row[column.label];
        return '<td>' + esc(textValue(cell)) + '</td>';
      }).join("");
      return cells.replace(/<td><\/td>/g, "") ? '<tr>' + cells + '</tr>' : "";
    }).filter(Boolean);
    if (!body.length) return "";
    return '<div class="table-wrap"><table><thead><tr>' + header.map(function (column) {
      return '<th>' + esc(textValue(column.label)) + '</th>';
    }).join("") + '</tr></thead><tbody>' + body.join("") + '</tbody></table></div>';
  }

  function configuredMistakes(items) {
    if (!Array.isArray(items)) return "";
    var cards = items.map(function (item) {
      if (!item || typeof item !== "object") return "";
      var issue = textValue(item.issue || item.problem || item.mistake);
      var improvement = textValue(item.improvement || item.fix || item.solution);
      var note = textValue(item.note || item.result);
      if (!issue && !improvement && !note) return "";
      return '<article class="custom-mistake-card">' + (issue ? '<div><span>ISSUE</span><p>' + esc(issue) + '</p></div>' : "") +
        (improvement ? '<div><span>IMPROVEMENT</span><p>' + esc(improvement) + '</p></div>' : "") +
        (note ? '<p class="case-muted">' + esc(note) + '</p>' : "") + '</article>';
    }).filter(Boolean);
    return cards.length ? '<div class="custom-mistakes-grid">' + cards.join("") + '</div>' : "";
  }

  function configuredFlow(steps) {
    if (!Array.isArray(steps)) return "";
    var nodes = steps.map(function (step, index) {
      var label = textValue(step);
      return label ? '<div class="flow-node"><small>0' + (index + 1) + '</small><span>' + esc(label) + '</span></div>' : "";
    }).filter(Boolean);
    return nodes.length ? '<div class="flow-line">' + nodes.join('<i class="flow-arrow" aria-hidden="true">→</i>') + '</div>' : "";
  }

  function configuredArchitecture(section, value) {
    var architecture = value && typeof value === "object" && !Array.isArray(value) ? value : {};
    var rootLabel = textValue(section.root || architecture.root || architecture.home);
    var branches = section.branches || architecture.branches || architecture.pages;
    if (!rootLabel && Array.isArray(value)) {
      rootLabel = textValue(value[0]);
      branches = value.slice(1);
    }
    if (!rootLabel && !Array.isArray(branches)) return "";
    var branchMarkup = Array.isArray(branches) ? branches.map(textValue).filter(Boolean).map(function (label) {
      return '<span>' + esc(label) + '</span>';
    }).join("") : "";
    return '<div class="ia-diagram">' + (rootLabel ? '<div class="ia-root">' + esc(rootLabel) + '</div>' : "") +
      (branchMarkup ? '<div class="ia-branches">' + branchMarkup + '</div>' : "") + '</div>';
  }

  function configuredDesignSystem(section, value) {
    if (typeof value === "string" || Array.isArray(value)) return paragraphMarkup(value);
    var system = value && typeof value === "object" && !Array.isArray(value) ? value : {};
    var groups = [
      {label: "COLORS", values: section.colors || system.colors},
      {label: "TYPOGRAPHY", values: section.typography || system.typography},
      {label: "COMPONENTS", values: section.components || system.components}
    ].map(function (group) {
      if (!Array.isArray(group.values) || !group.values.length) return "";
      var entries = group.values.map(function (entry) {
        if (typeof entry === "string") return entry;
        return [textValue(entry && (entry.name || entry.label)), textValue(entry && (entry.value || entry.description || entry.font))].filter(Boolean).join(" · ");
      }).filter(Boolean);
      return entries.length ? '<div class="custom-system-group"><span>' + group.label + '</span>' + configuredList(entries) + '</div>' : "";
    }).filter(Boolean);
    var description = paragraphMarkup(system.description);
    return description + (groups.length ? '<div class="custom-design-system">' + groups.join("") + '</div>' : "");
  }

  // CONTENT TYPES: text/rich-text, image/gallery, cards, list, table, mistakes, flow, IA, wireframes, design-system, final-ui.
  function renderConfiguredContent(section, project, value) {
    var type = String(section.type || "text").toLowerCase().replace(/[ _]+/g, "-");
    if (type === "richtext") type = "rich-text";
    if (type === "single-image") type = "image";
    if (type === "image-gallery") type = "gallery";
    if (type === "mistakes-improvements") type = "mistakes";
    if (type === "information-architecture") type = "architecture";
    if (type === "final-ui" || type === "gallery" || type === "wireframes") {
      var imageMarkup = configuredImages(section, value);
      if (!imageMarkup.length) return "";
      return '<div class="custom-image-gallery">' + imageMarkup.join("") + '</div>';
    }
    if (type === "image") return configuredImage(section.image || value, 0);
    if (type === "cards") return configuredCards(section.cards || section.items || value);
    if (type === "list") return configuredList(section.items || value);
    if (type === "table") return configuredTable(section, value);
    if (type === "mistakes") return configuredMistakes(section.items || value);
    if (type === "user-flow") return configuredFlow(section.steps || section.items || value);
    if (type === "architecture") return configuredArchitecture(section, value);
    if (type === "design-system") return configuredDesignSystem(section, value);
    return paragraphMarkup(value);
  }

  function cloneImageFigure(image, index) {
    if (typeof image === "string") image = {src: image};
    if (!image || typeof image !== "object") return "";
    var src = safeImageSource(image.src);
    if (!src) return "";
    var alt = textValue(image.alt) || textValue(image.title) || "Clone app screen " + (index + 1);
    var caption = textValue(image.caption);
    var objectPosition = typeof image.objectPosition === "string" && /^(?:\d{1,3}%\s+\d{1,3}%|center(?:\s+center)?|left|right|top|bottom)$/.test(image.objectPosition.trim()) ?
      image.objectPosition.trim() : "";
    return '<figure class="clone-image"><div class="clone-image-frame"><img src="' + esc(src) + '" alt="' + esc(alt) + '"' +
      (objectPosition ? ' style="object-position:' + esc(objectPosition) + '"' : "") + ' loading="lazy" decoding="async"></div>' +
      (caption ? '<figcaption>' + esc(caption) + '</figcaption>' : "") + '</figure>';
  }

  function renderCloneOverview(project, value) {
    var overview = value && typeof value === "object" && !Array.isArray(value) ? value : {};
    var appOverview = textValue(overview.appOverview || (typeof value === "string" ? value : project.summary));
    var shortDescription = textValue(overview.shortDescription || project.description);
    var goals = Array.isArray(overview.goals) ? overview.goals : project.goals;
    var designDetails = textValue(overview.designDetails || project.visualDirection);
    var platform = textValue(overview.platform || project.platform);
    var tools = Array.isArray(overview.tools) ? overview.tools : project.tools;
    var image = overview.image || (project.gallery && project.gallery[0]);
    var facts = [
      ["PLATFORM", platform],
      ["TOOLS", Array.isArray(tools) ? tools.map(textValue).filter(Boolean).join(" · ") : textValue(tools)],
      ["DESIGN DETAILS", designDetails]
    ].filter(function (fact) { return fact[1]; });
    var factMarkup = facts.map(function (fact) {
      return '<div class="clone-overview-fact"><span>' + esc(fact[0]) + '</span><p>' + esc(fact[1]) + '</p></div>';
    }).join("");
    var goalItems = Array.isArray(goals) ? goals.map(textValue).filter(Boolean) : [];
    var imageMarkup = cloneImageFigure(image, 0);
    if (!shortDescription && !appOverview && !factMarkup && !goalItems.length && !imageMarkup) return "";
    return '<div class="clone-overview-grid"><div class="clone-overview-copy">' +
      (shortDescription ? '<p class="clone-overview-lede">' + esc(shortDescription) + '</p>' : "") +
      (appOverview ? '<div class="clone-overview-panel"><span>APP OVERVIEW</span><p>' + esc(appOverview) + '</p></div>' : "") +
      (goalItems.length ? '<div class="clone-overview-panel"><span>PROJECT GOALS</span>' + configuredList(goalItems) + '</div>' : "") +
      (factMarkup ? '<div class="clone-overview-facts">' + factMarkup + '</div>' : "") +
      '</div>' + (imageMarkup ? '<div class="clone-overview-visual">' + imageMarkup + '</div>' : "") + '</div>';
  }

  function renderCloneIssues(items) {
    if (!Array.isArray(items)) return "";
    var cards = items.map(function (item) {
      if (!item || typeof item !== "object") return "";
      var title = textValue(item.title || item.issue || item.problem || item.mistake);
      var description = textValue(item.description || item.problem || item.issue || item.note);
      var visual = cloneImageFigure(item.image, 0);
      if (!title && !description && !visual) return "";
      return '<article class="clone-issue-card">' +
        (visual ? '<div class="clone-issue-visual">' + visual + '</div>' : "") +
        '<div class="clone-issue-copy">' + (title ? '<h3>' + esc(title) + '</h3>' : "") +
        (description ? '<p>' + esc(description) + '</p>' : "") + '</div></article>';
    }).filter(Boolean);
    return cards.length ? '<div class="clone-issue-grid">' + cards.join("") + '</div>' : "";
  }

  function renderCloneDesignSystem(value) {
    var system = value && typeof value === "object" && !Array.isArray(value) ? value : {};
    var typography = Array.isArray(system.typography) ? system.typography : [];
    var colors = Array.isArray(system.colors) ? system.colors : [];
    var typographyMarkup = typography.map(function (entry) {
      if (typeof entry === "string") entry = {name: entry};
      if (!entry || typeof entry !== "object") return "";
      var name = textValue(entry.name || entry.label || entry.hierarchy);
      var family = textValue(entry.family || entry.fontFamily || entry.font);
      var weights = Array.isArray(entry.weights) ? entry.weights.map(textValue).filter(Boolean).join(" · ") : textValue(entry.weights || entry.weight);
      var sizes = Array.isArray(entry.sizes) ? entry.sizes.map(textValue).filter(Boolean).join(" · ") : textValue(entry.sizes || entry.size);
      var sample = textValue(entry.sample);
      var details = [family, weights, sizes].filter(Boolean).join(" · ");
      if (!name && !details && !sample) return "";
      return '<article class="clone-type-card">' + (name ? '<span>' + esc(name) + '</span>' : "") +
        (sample ? '<p class="clone-type-sample">' + esc(sample) + '</p>' : "") +
        (details ? '<p>' + esc(details) + '</p>' : "") + '</article>';
    }).filter(Boolean);
    var colorMarkup = colors.map(function (entry) {
      if (typeof entry === "string") entry = {hex: entry, label: entry};
      if (!entry || typeof entry !== "object") return "";
      var label = textValue(entry.label || entry.name);
      var hex = textValue(entry.hex || entry.value || entry.color).toUpperCase();
      if (!/^#[0-9A-F]{3}(?:[0-9A-F]{3}|[0-9A-F]{5})?$/.test(hex)) return "";
      return '<article class="clone-color-card"><span class="clone-color-swatch" style="--clone-swatch:' + esc(hex) + '"></span><div><b>' +
        esc(label || "Color") + '</b><code>' + esc(hex) + '</code></div></article>';
    }).filter(Boolean);
    var description = paragraphMarkup(system.description);
    return description + (typographyMarkup.length ? '<div class="clone-system-group"><h3>TYPOGRAPHY</h3><div class="clone-type-grid">' + typographyMarkup.join("") + '</div></div>' : "") +
      (colorMarkup.length ? '<div class="clone-system-group"><h3>COLOR PALETTE</h3><div class="clone-color-grid">' + colorMarkup.join("") + '</div></div>' : "");
  }

  function renderCloneComparisons(items) {
    if (!Array.isArray(items)) return "";
    var cards = items.map(function (item) {
      if (!item || typeof item !== "object") return "";
      var title = textValue(item.title || item.issue || item.problem);
      var before = item.before && typeof item.before === "object" ? item.before : {};
      var after = item.after && typeof item.after === "object" ? item.after : {};
      var beforeImage = before.image || item.beforeImage;
      var afterImage = after.image || item.afterImage;
      var beforeText = textValue(before.description || before.text || item.beforeText || item.problem || item.issue);
      var afterText = textValue(after.description || after.text || item.afterText || item.improvement || item.fix);
      var beforeMarkup = cloneImageFigure(beforeImage, 0);
      var afterMarkup = cloneImageFigure(afterImage, 1);
      if (!title && !beforeText && !afterText && !beforeMarkup && !afterMarkup) return "";
      return '<article class="clone-comparison-card">' + (title ? '<h3>' + esc(title) + '</h3>' : "") +
        (textValue(item.description) ? '<p class="clone-comparison-intro">' + esc(textValue(item.description)) + '</p>' : "") +
        '<div class="clone-comparison-pair"><div class="clone-comparison-side"><span>BEFORE</span>' + beforeMarkup + (beforeText ? '<p>' + esc(beforeText) + '</p>' : "") + '</div>' +
        '<div class="clone-comparison-side"><span>AFTER</span>' + afterMarkup + (afterText ? '<p>' + esc(afterText) + '</p>' : "") + '</div></div></article>';
    }).filter(Boolean);
    return cards.length ? '<div class="clone-comparison-list">' + cards.join("") + '</div>' : "";
  }

  function renderCloneComponents(items) {
    if (!Array.isArray(items)) return "";
    var cards = items.map(function (item) {
      if (typeof item === "string") item = {title: item};
      if (!item || typeof item !== "object") return "";
      var title = textValue(item.title || item.name || item.category);
      var description = textValue(item.description || item.content || item.text);
      var image = cloneImageFigure(item.image, 0);
      if (!title && !description && !image) return "";
      return '<article class="clone-component-card">' + (image ? '<div class="clone-component-visual">' + image + '</div>' : "") +
        '<div>' + (title ? '<h3>' + esc(title) + '</h3>' : "") + (description ? '<p>' + esc(description) + '</p>' : "") + '</div></article>';
    }).filter(Boolean);
    return cards.length ? '<div class="clone-component-grid">' + cards.join("") + '</div>' : "";
  }

  function renderCloneScreens(items) {
    if (!Array.isArray(items)) return "";
    var cards = items.map(function (item, index) {
      if (typeof item === "string") item = {src: item};
      if (!item || typeof item !== "object") return "";
      var image = cloneImageFigure(item.image || item, index);
      var title = textValue(item.title || item.name || item.label || item.caption);
      var description = textValue(item.description || item.text);
      if (!image && !title && !description) return "";
      return '<article class="clone-screen-card">' + image + '<div>' + (title ? '<h3>' + esc(title) + '</h3>' : "") +
        (description ? '<p>' + esc(description) + '</p>' : "") + '</div></article>';
    }).filter(Boolean);
    return cards.length ? '<div class="clone-screen-grid">' + cards.join("") + '</div>' : "";
  }

  function defaultCloneSections() {
    return [
      {id: "overview", title: "Project Overview", type: "clone-overview", contentKey: "cloneOverview"},
      {id: "issues", title: "UI Issues Identified", type: "clone-issues", contentKey: "uiIssues"},
      {id: "design-system", title: "Typography & Color System", type: "clone-design-system", contentKey: "cloneDesignSystem"},
      {id: "improvements", title: "Design Improvements", type: "clone-comparisons", contentKey: "designComparisons"},
      {id: "components", title: "UI Components & Design Elements", type: "clone-components", contentKey: "uiComponents"},
      {id: "final-ui", title: "Final UI Screens", type: "clone-screens", contentKey: "finalScreens"}
    ];
  }

  function renderCloneConfiguredContent(section, project, value) {
    var type = String(section.type || "text").toLowerCase().replace(/[ _]+/g, "-");
    if (type === "clone-overview") return renderCloneOverview(project, value);
    if (type === "clone-issues") return renderCloneIssues(section.items || value);
    if (type === "clone-design-system") return renderCloneDesignSystem(value);
    if (type === "clone-comparisons" || type === "before-after") return renderCloneComparisons(section.items || value);
    if (type === "clone-components") return renderCloneComponents(section.items || value);
    if (type === "clone-screens") return renderCloneScreens(section.screens || section.images || value);
    return renderConfiguredContent(section, project, value);
  }

  function sectionId(section, title, usedIds) {
    var base = String(section.id || title).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "section";
    var id = base;
    var suffix = 2;
    while (usedIds[id]) id = base + "-" + suffix++;
    usedIds[id] = true;
    return id;
  }

  // CUSTOM CASE STUDY: only enabled sections with renderable content become story sections or TOC links.
  function renderCustomCaseStudy(project, cloneMode) {
    var usedIds = Object.create(null);
    var sectionConfig = Array.isArray(project.sections) ? project.sections : (cloneMode ? defaultCloneSections() : []);
    var sections = sectionConfig.map(function (section) {
      if (!section || section.enabled === false || typeof section !== "object") return null;
      var title = textValue(section.title) || textValue(section.id).replace(/[-_]+/g, " ");
      if (!title) return null;
      var body = (cloneMode ? renderCloneConfiguredContent : renderConfiguredContent)(section, project, sectionValue(section, project));
      if (!body && !textValue(section.description)) return null;
      var id = sectionId(section, title, usedIds);
      var label = textValue(section.label || section.type || "SECTION").replace(/-/g, " ").toUpperCase();
      return {id: id, title: title, body: body, label: label, description: textValue(section.description)};
    }).filter(Boolean);
    var title = textValue(project.title) || "Project case study";
    var description = textValue(project.description);
    var cover = safeImageSource(project.coverImage) ? visualBlock(project, "cover-art", "Project cover") : "";
    var facts = [
      ["MY ROLE", textValue(project.role)],
      ["DURATION", textValue(project.duration)],
      ["TOOLS", Array.isArray(project.tools) ? project.tools.map(textValue).filter(Boolean).join(" · ") : textValue(project.tools)],
      ["PROJECT TYPE", textValue(project.projectKind || project.caseStudyType)],
      ["PLATFORM", textValue(project.platform)]
    ].filter(function (fact) { return fact[1]; });
    var factMarkup = facts.length ? '<dl class="case-facts">' + facts.map(function (fact) {
      return '<div><dt>' + esc(fact[0]) + '</dt><dd>' + esc(fact[1]) + '</dd></div>';
    }).join("") + '</dl>' : "";
    var tags = [textValue(project.platform), textValue(project.caseStudyType || project.type), "PROJECT STORY"].filter(Boolean);
    var tagMarkup = tags.map(function (tag) { return '<span>' + esc(tag.toUpperCase()) + '</span>'; }).join("");
    var toc = sections.map(function (section) {
      return '<a href="#' + esc(section.id) + '">' + esc(section.title) + '</a>';
    }).join("");
    var sectionsMarkup = sections.map(function (section, index) {
      return '<section class="story-section" id="' + esc(section.id) + '">' +
        sectionTitle(String(index + 1).padStart(2, "0"), esc(section.label), esc(section.title), esc(section.description)) +
        '<div class="custom-section-content">' + section.body + '</div></section>';
    }).join("");
    var layout = sections.length ?
      '<div class="case-content-layout' + (cloneMode ? ' clone-content-layout' : '') + '"><aside class="case-toc"><span>ON THIS PAGE</span><nav aria-label="Case study contents">' + toc +
        '</nav><div class="toc-progress"><span></span></div></aside><div class="case-story">' + sectionsMarkup + '</div></div>' :
      '<div class="case-content-layout custom-empty-case-study"><p class="case-muted">No enabled case-study sections with content are configured for this project yet.</p></div>';
    var projectIndex = projects.indexOf(project);
    var previous = projects.length > 1 ? projects[(projectIndex + projects.length - 1) % projects.length] : null;
    var next = projects.length > 1 ? projects[(projectIndex + 1) % projects.length] : null;
    var pagination = previous && next ? '<nav class="project-pagination" aria-label="Project navigation">' +
      '<a href="' + esc(previous.url || ("/projects/#" + encodeURIComponent(previous.slug || ""))) + '"><span>← PREVIOUS PROJECT</span><b>' + esc(textValue(previous.title) || "Previous project") + '</b></a>' +
      '<a href="/" class="all-projects"><span>BACK TO</span><b>ALL PROJECTS</b></a>' +
      '<a href="' + esc(next.url || ("/projects/#" + encodeURIComponent(next.slug || ""))) + '"><span>NEXT PROJECT →</span><b>' + esc(textValue(next.title) || "Next project") + '</b></a></nav>' :
      '<nav class="project-pagination" aria-label="Project navigation"><a href="/" class="all-projects"><span>BACK TO</span><b>ALL PROJECTS</b></a></nav>';
    return '<article class="case-article' + (cloneMode ? ' clone-case-article' : '') + '"><section class="case-hero" id="case-top">' +
      '<div class="case-breadcrumb"><a href="/">WORK</a><span>／</span><span>' + esc(textValue(project.category).toUpperCase()) + '</span></div>' +
      '<p class="eyebrow"><span class="eyebrow-line"></span> ' + esc(textValue(project.category).toUpperCase()) + '</p>' +
      '<h1>' + esc(title) + '</h1>' + (description ? '<p class="case-hero-copy">' + esc(description) + '</p>' : "") +
      (tagMarkup ? '<div class="case-hero-tags">' + tagMarkup + '</div>' : "") + (cover ? '<div class="case-cover">' + cover + '</div>' : "") + factMarkup +
      '</section>' + layout + pagination +
      '<section class="case-contact"><p class="eyebrow"><span class="eyebrow-line"></span> HAVE A PROJECT IN MIND?</p><h2>Let’s work <span>together.</span></h2><a class="button button-light" href="/#contact">Start a conversation <span>↗</span></a></section></article>';
  }


  // Graceful route fallback if a page slug is missing or has no matching project entry.
  if (!project || !root) {
    document.title = "Project not found — Desloper";
    if (root) root.innerHTML = '<section class="case-not-found"><p class="eyebrow">PROJECT NOT FOUND</p><h1>This project page is unavailable.</h1><a class="text-link" href="/">Back to all work <span>↗</span></a></section>';
    return;
  }

  // Optional legacy fields default to empty values so partial project entries do not break rendering.
  project.title = textValue(project.title);
  project.category = textValue(project.category);
  project.description = textValue(project.description);
  project.goals = Array.isArray(project.goals) ? project.goals : [];
  project.proposedIA = Array.isArray(project.proposedIA) ? project.proposedIA : [];
  project.proposedFlow = Array.isArray(project.proposedFlow) ? project.proposedFlow : [];
  project.interactions = Array.isArray(project.interactions) ? project.interactions : [];
  project.deliverables = Array.isArray(project.deliverables) ? project.deliverables : [];
  project.tools = Array.isArray(project.tools) ? project.tools : typeof project.tools === "string" && project.tools.trim() ? [project.tools] : [];
  project.gallery = Array.isArray(project.gallery) ? project.gallery.filter(function (image) { return image && safeImageSource(image.src); }) : [];
  project.projectLinks = project.projectLinks && typeof project.projectLinks === "object" && !Array.isArray(project.projectLinks) ? project.projectLinks : {};

  var html;
  if (Array.isArray(project.sections) || project.caseStudyType === "clone") {
    // Custom section records use the data-driven renderer; all current records without sections keep the page below.
    html = renderCustomCaseStudy(project, project.caseStudyType === "clone");
  } else {
  // CASE-STUDY DATA PREPARATION: values below feed the reusable page sections in the order shown further down.
  var title = esc(project.title);
  var description = esc(project.description);
  var proposedIA = project.proposedIA.map(function (item) { return '<span>' + esc(item) + '</span>'; }).join('<i aria-hidden="true">→</i>');
  var proposedFlow = project.proposedFlow.map(function (item, index) {
    return '<div class="flow-node"><small>0' + (index + 1) + '</small><span>' + esc(item) + '</span></div>';
  }).join('<i class="flow-arrow" aria-hidden="true">→</i>');
  var deliverableTags = project.deliverables.map(function (item) { return '<span>' + esc(item) + '</span>'; }).join("");
  var toolsValue = project.tools.length ? esc(project.tools.join(" · ")) : '<span class="editable-value">Add project tools</span>';
  var roleValue = project.role ? esc(project.role) : (project.art === "shop" ? '<span class="editable-value">UI/UX design · confirm contribution</span>' : '<span class="editable-value">Add your role</span>');
  var projectType = project.projectKind ? esc(project.projectKind) : '<span class="editable-value">Confirm project type</span>';
  var duration = project.duration ? esc(project.duration) : '<span class="editable-value">Add duration</span>';
  var coverVisual = project.coverImage ? visualBlock(project, "cover-art", "Original project cover") :
    (stockVisual(project.contextImage, "Project overview", "Supporting stock image only; not original project artwork or a screenshot.", "eager") || visualBlock(project, "cover-art", "Illustrative portfolio preview"));
  var prototypeMarkup = project.projectLinks.prototype ?
    '<p>Interactive prototype</p><a href="' + esc(project.projectLinks.prototype) + '" target="_blank" rel="noopener noreferrer">View prototype <span>↗</span></a>' :
    '<p>Prototype link not provided.</p><span class="editable-value">Add prototype URL</span>';
  var otherLinks = Object.keys(project.projectLinks).filter(function (key) { return key !== "prototype"; }).map(function (key) {
    var label = key.replace(/([A-Z])/g, " $1").replace(/^./, function (character) { return character.toUpperCase(); });
    return '<a href="' + esc(project.projectLinks[key]) + '" target="_blank" rel="noopener noreferrer">' + esc(label) + ' <span>↗</span></a>';
  }).join("");
  var overviewText = '<p>' + description + '</p><p class="case-muted">The supplied brief is the source for this summary. Add the original project notes and approved assets to make this story specific to the finished work.</p>';
  var researchVisual = stockVisual(project.researchImage, "Research and category", "Illustrative stock context only; no research session, competitor review, or finding is shown.");
  var audienceVisual = stockVisual(project.audienceImage, "Audience and journey", "Representative context only; the person shown is a stock subject, not a project participant or observed journey.");
  var solutionVisual = stockVisual(project.solutionImage, "Product and solution context", "Supporting stock imagery only; not a final project screen, prototype, or measured outcome.");
  // Research and competitor-analysis table: placeholders are clearly marked until actual findings are supplied.
  var researchRows = [
    ["Competitor review", "Compare service or product structure, terminology, and navigation.", "Add reviewed products and observations."],
    ["Heuristic review", "Check hierarchy, readability, feedback, and responsive behavior.", "Add findings from the actual review."],
    ["Audience discovery", "Understand goals, questions, and decision points.", "Add real research method and findings."]
  ].map(function (row) {
    return '<tr>' + row.map(function (cell) { return '<td>' + esc(cell) + '</td>'; }).join("") + '</tr>';
  }).join("");
  // Persona component: a labeled hypothesis, not a claim about an interviewed participant.
  var persona = '<div class="hypothesis-card"><div class="hypothesis-top"><span>WORKING AUDIENCE HYPOTHESIS</span><span>NOT INTERVIEWED</span></div>' +
    '<h3>' + esc(project.art === "shop" ? "The intentional browser" : "The information seeker") + '</h3>' +
    '<div class="hypothesis-grid"><div><small>GOAL</small><p>' + esc(project.art === "shop" ? "Find and compare relevant products with confidence." : "Understand what is offered and choose a suitable next step.") + '</p></div>' +
    '<div><small>NEEDS</small><p>Clear labels, useful detail, and a straightforward path through the experience.</p></div>' +
    '<div><small>FRICTION TO VALIDATE</small><p>Unclear choices, missing context, or difficulty finding the next action.</p></div></div>' +
    '<p class="case-muted">This is a proto-persona inferred from the project description, not a real participant or research finding.</p></div>';
  // User-journey rows: replace proposed stages with validated journey evidence when available.
  var journeyRows = [
    ["Discover", "Arrives with an initial question", "What does this offer?", "Make the purpose immediately legible."],
    ["Explore", "Looks through relevant information", "Where do I find the right detail?", "Use clear labels and scannable sections."],
    ["Evaluate", "Checks fit and practical details", "Do I have enough context?", "Surface the information needed to decide."],
    ["Continue", "Chooses a next step", "What happens when I continue?", "Give feedback and a clear route forward."]
  ].map(function (row, index) {
    return '<tr><th>0' + (index + 1) + ' · ' + esc(row[0]) + '</th>' + row.slice(1).map(function (cell) { return '<td>' + esc(cell) + '</td>'; }).join("") + '</tr>';
  }).join("");
  // UI gallery: use project.gallery assets when available; otherwise retain explicitly labeled visual studies.
  var screens = project.gallery.length ?
    '<div class="screen-gallery project-gallery-real">' + project.gallery.map(function (image) {
      return '<figure class="case-visual-block project-image-preview"><div class="case-image-frame"><img src="' + esc(image.src) + '" alt="' + esc(image.alt || project.title) + '" loading="lazy"></div><figcaption>' + esc(image.caption || "Project visual") + '</figcaption></figure>';
    }).join("") + '</div>' :
    '<div class="screen-gallery">' + visualBlock(project, "screen-wide", "PRIMARY SCREEN · illustrative composition") +
    visualBlock(project, "screen-tall", "KEY FLOW · illustrative composition") + '</div>';

  // COMPLETE CASE STUDY TEMPLATE: reorder or edit the section markup here; copy/content fields live in projects.js.
  html = '<article class="case-article">' +
    '<section class="case-hero" id="case-top">' +
      '<div class="case-breadcrumb"><a href="/">WORK</a><span>／</span><span>' + esc(project.category.toUpperCase()) + '</span></div>' +
      '<p class="eyebrow"><span class="eyebrow-line"></span> ' + esc(project.category.toUpperCase()) + '</p>' +
      '<h1>' + title + '</h1><p class="case-hero-copy">' + description + '</p>' +
      '<div class="case-hero-tags"><span>' + esc(project.platform) + '</span><span>' + (project.type === "case-study" ? "CASE STUDY" : "LANDING PAGE DESIGN") + '</span><span>PROJECT STORY</span></div>' +
      '<div class="case-cover">' + coverVisual + '</div>' +
      '<dl class="case-facts">' +
        '<div><dt>MY ROLE</dt><dd>' + roleValue + '</dd></div>' +
        '<div><dt>DURATION</dt><dd>' + duration + '</dd></div>' +
        '<div><dt>TOOLS</dt><dd>' + toolsValue + '</dd></div>' +
        '<div><dt>PROJECT TYPE</dt><dd>' + projectType + '</dd></div>' +
        '<div><dt>PLATFORM</dt><dd>' + esc(project.platform) + '</dd></div>' +
      '</dl>' +
    '</section>' +
    '<div class="case-content-layout"><aside class="case-toc"><span>ON THIS PAGE</span><nav aria-label="Case study contents">' +
      '<a href="#overview">Overview</a><a href="#problem">The challenge</a><a href="#research">Research</a><a href="#audience">Audience</a><a href="#journey">Journey</a><a href="#structure">Structure &amp; flow</a><a href="#wireframes">Wireframes</a><a href="#visual-design">Visual design</a><a href="#final-ui">Final UI</a><a href="#testing">Validation</a><a href="#outcomes">Outcomes</a><a href="#learnings">Learnings</a>' +
    '</nav><div class="toc-progress"><span></span></div></aside>' +
    '<div class="case-story">' +
      /* Overview: summary, scope, and deliverables. */
      '<section class="story-section" id="overview">' + sectionTitle("01", "OVERVIEW", "A clear view of the project.", "The short version, grounded in the details supplied so far.") +
        '<div class="story-copy two-col">' + overviewText +
          '<div class="overview-side"><span class="case-side-label">PROJECT SNAPSHOT</span><p>' + esc(project.summary) + '</p><div class="deliverable-tags">' + deliverableTags + '</div></div>' +
        '</div></section>' +
      /* Challenge and project goals. */
      '<section class="story-section" id="problem">' + sectionTitle("02", "THE CHALLENGE", "Make the next step easier to see.", "A useful starting point, framed from the project description.") +
        '<div class="problem-statement"><span>DESIGN CHALLENGE</span><p>' + esc(project.challenge) + '</p></div>' +
        '<p class="case-muted">The brief does not include an existing-product audit or documented user pain points. Add those details if they were part of the original project.</p></section>' +
      '<section class="story-section" id="goals">' + sectionTitle("03", "PROJECT GOALS", "What the design needs to do.") +
        '<div class="goal-list">' + project.goals.map(function (goal, index) { return '<div><span>0' + (index + 1) + '</span><p>' + esc(goal) + '</p><i>↗</i></div>'; }).join("") + '</div>' +
        '<p class="case-muted">These are qualitative goals from the project brief. No unverified performance targets are included.</p></section>' +
      /* Research and competitor review: edit this markup and researchRows above when evidence is available. */
      '<section class="story-section" id="research">' + sectionTitle("04", "RESEARCH &amp; DISCOVERY", "Start with evidence.", "Research findings were not included in the materials provided.") +
        '<div class="research-notice"><span class="notice-icon">i</span><div><b>Proposed discovery approach</b><p>The activities below are a plan for validating the direction. They are not reported as completed research.</p></div></div>' +
        researchVisual +
        '<div class="table-wrap"><table class="research-table"><thead><tr><th>Method</th><th>Question to explore</th><th>Evidence to add</th></tr></thead><tbody>' + researchRows + '</tbody></table></div>' +
        '<div class="insight-callout"><span>RESEARCH NOTES</span><p>Add real observations, quotes, competitor names, or an existing-product review here when available.</p></div></section>' +
      /* Audience and proto-persona: audience text comes from the selected project record. */
      '<section class="story-section" id="audience">' + sectionTitle("05", "AUDIENCE", "Design for a real need.", "An initial audience hypothesis to guide discovery.") +
        '<p class="audience-intro">' + esc(project.audience) + '</p>' + persona + audienceVisual +
        '<div class="scenario"><span>SCENARIO TO VALIDATE</span><p>Someone arrives with a goal, needs enough context to make a confident choice, and expects the next action to be clear.</p></div></section>' +
      /* User journey: journeyRows above supplies the reusable table content. */
      '<section class="story-section" id="journey">' + sectionTitle("06", "USER JOURNEY", "A path worth making simpler.", "Proposed journey map · validate each step with actual users or project stakeholders.") +
        '<div class="table-wrap"><table class="journey-table"><thead><tr><th>Stage</th><th>Action</th><th>Question</th><th>Opportunity</th></tr></thead><tbody>' + journeyRows + '</tbody></table></div>' +
        '<p class="case-muted">This is a working journey model based on the project summary, not observed behavior.</p></section>' +
      /* Information architecture and user-flow diagrams: edit proposedIA/proposedFlow in projects.js. */
      '<section class="story-section" id="structure">' + sectionTitle("07", "INFORMATION ARCHITECTURE", "Give the content a clear home.", "Proposed content structure · confirm against the final screens.") +
        '<div class="ia-diagram"><div class="ia-root">' + esc(project.proposedIA[0]) + '</div><div class="ia-branches">' + project.proposedIA.slice(1).map(function (item) { return '<span>' + esc(item) + '</span>'; }).join("") + '</div></div>' +
        '<div class="flow-block"><div class="flow-heading"><span>08 / USER FLOW</span><p>A main task flow to prototype and validate.</p></div><div class="flow-line">' + proposedFlow + '</div></div>' +
        '<p class="case-muted">Structure and task flow shown here are proposed, based on the project description.</p></section>' +
      /* Wireframes: replace the illustrative layout markup with original wireframe images when available. */
      '<section class="story-section" id="wireframes">' + sectionTitle("09", "WIREFRAMING", "Test the structure before the finish.", "Layout studies created as illustrative placeholders; replace with the original wireframes.") +
        '<div class="wireframe-grid"><div class="wireframe-sheet">' + (project.art === "shop" ? '<div class="wf-phone"><i></i><b></b><b class="short"></b><span></span><b></b><span></span></div>' : '<div class="wf-browser"><i></i><i></i><i></i><div class="wf-nav"></div><div class="wf-hero"><b></b><b class="short"></b><i></i><span></span></div><div class="wf-cards"><i></i><i></i><i></i></div></div>') + '</div>' +
        '<div class="wireframe-notes"><span>LAYOUT STUDY</span><h3>Hierarchy first.</h3><p>Use early layouts to decide what appears first, how sections relate, and where key actions belong.</p><p class="case-muted">Illustrative layout only — not an original project artifact.</p></div></div></section>' +
      /* Visual system: update palette, typography, spacing, and component examples here when verified. */
      '<section class="story-section" id="visual-design">' + sectionTitle("10", "VISUAL DESIGN &amp; SYSTEM", "A visual language that fits the purpose.", "Project-specific visual specs were not supplied. Add the approved values and component examples.") +
        '<p>' + esc(project.visualDirection) + '</p><div class="design-system"><div class="presentation-palette" role="img" aria-label="Portfolio frame colors only, not the project interface: navy #00001B, blue #567DFF, cyan #79F0F1."><span style="--swatch:#00001b;--swatch-text:#fff1f1">NAVY<br>#00001B</span><span style="--swatch:#567dff;--swatch-text:#ffffff">BLUE<br>#567DFF</span><span style="--swatch:#79f0f1;--swatch-text:#00001b">CYAN<br>#79F0F1</span><b>PORTFOLIO FRAME COLORS<br><small>These are not verified product UI colors.</small></b></div>' +
        '<div class="system-specs"><div><small>TYPOGRAPHY</small><b>Add project typeface</b><span>Display · Body · UI</span></div><div><small>SPACING</small><b>Add spacing scale</b><span>Grid · Gutter · Rhythm</span></div><div><small>COMPONENTS</small><b>Add UI examples</b><span>Buttons · Inputs · Navigation</span></div></div></div>' +
        '<p class="case-muted">The portfolio’s dark visual styling is separate from the project’s product UI. No product colors or typefaces have been assumed.</p></section>' +
      /* Final UI / screens: actual project.gallery assets replace these illustrative compositions automatically. */
      '<section class="story-section" id="final-ui">' + sectionTitle("11", "HIGH-FIDELITY UI", "The experience, brought into focus.", esc(project.knownScreens)) +
        screens + '<p class="case-muted">These are portfolio presentation mockups, not original project screenshots. Replace them with approved desktop, tablet, or mobile screens when available.</p></section>' +
      /* Prototype and interactions: update interactions and projectLinks.prototype in projects.js. */
      '<section class="story-section" id="prototype">' + sectionTitle("12", "INTERACTION &amp; PROTOTYPING", "Let every action feel clear.", "Interaction principles to demonstrate in the prototype.") +
        '<div class="interaction-grid">' + project.interactions.map(function (item, index) { return '<div><span>0' + (index + 1) + '</span><p>' + esc(item) + '</p></div>'; }).join("") + '</div>' +
        '<div class="prototype-link"><span>PROTOTYPE</span>' + prototypeMarkup + '</div></section>' +
      /* Validation/testing: add only real test methods, observed findings, and iterations. */
      '<section class="story-section" id="testing">' + sectionTitle("13", "USABILITY TESTING &amp; ITERATIONS", "Validate the design with real people.", "Testing results were not included. The plan below is a proposed next step.") +
        '<div class="testing-grid"><div><span>TEST OBJECTIVE</span><p>Check whether people can understand the main offer, find the relevant information, and complete the intended next step.</p></div><div><span>TASKS TO TRY</span><p>Find a relevant service or item · review its details · continue to the next action.</p></div><div><span>ITERATION LOG</span><p>Add observed issues and before-and-after examples after testing.</p></div></div>' +
        '<p class="case-muted">No testing has been claimed. Add participant details, tasks, and actual findings only if the work was completed.</p></section>' +
      /* Final solution and outcomes. */
      '<section class="story-section" id="solution">' + sectionTitle("14", "FINAL SOLUTION", "A more considered experience.", "The solution direction described in the project brief.") +
        '<div class="solution-banner">' + solutionVisual + '<div><span>THE SOLUTION</span><h3>' + esc(project.finalSummary) + '</h3><div class="deliverable-tags">' + deliverableTags + '</div></div></div></section>' +
      '<section class="story-section" id="outcomes">' + sectionTitle("15", "OUTCOMES &amp; IMPACT", "Show the work. Add the evidence.", "No verified business or usability metrics were supplied.") +
        '<div class="outcome-grid"><div><span>DOCUMENTED SCOPE</span><p>' + esc(project.deliverables.join(" · ")) + '</p></div><div><span>MEASURED IMPACT</span><p>Metrics not provided. Add verified usability, conversion, or performance results if available.</p></div><div><span>FEEDBACK</span><p>Stakeholder or user feedback not provided.</p></div></div>' +
        '<p class="case-muted">For concept work, describe expected impact as a hypothesis and label it clearly.</p></section>' +
      /* Learnings, conclusion, and credits: edit these sections as the project story develops. */
      '<section class="story-section" id="learnings">' + sectionTitle("16", "CHALLENGES &amp; LEARNINGS", "Make room for what changed.", "The process notes were not included in the supplied materials.") +
        '<div class="learning-columns"><div><span>DESIGN CHALLENGE</span><p>Add a real constraint, trade-off, or decision that shaped the project.</p></div><div><span>WHAT I LEARNED</span><p>Add a specific takeaway from the work and one thing you would improve in another iteration.</p></div></div></section>' +
      '<section class="story-section conclusion-section" id="conclusion">' + sectionTitle("17", "CONCLUSION", "A thoughtful design story, still in progress.") +
        '<p>' + esc(project.finalSummary) + '</p><p class="case-muted">This page is a reusable case study template. Replace the clearly marked prompts with the original process, visuals, and verified outcomes.</p></section>' +
      '<section class="story-section credits-section" id="credits">' + sectionTitle("18", "PROJECT CREDITS", "The details behind the work.") +
        '<div class="credits-grid"><div><span>ROLE</span><p>' + roleValue + '</p></div><div><span>TOOLS</span><p>' + toolsValue + '</p></div><div><span>DURATION</span><p>' + duration + '</p></div><div><span>PROJECT TYPE</span><p>' + projectType + '</p></div></div>' +
        '<div class="project-links-row"><span>PROJECT LINKS</span><div>' + (otherLinks || '<small>No external project links provided.</small>') + '</div></div></section>' +
    '</div></div>' +
    '<nav class="project-pagination" aria-label="Project navigation"><a href="' + esc(projects[(projects.indexOf(project) + projects.length - 1) % projects.length].url) + '"><span>← PREVIOUS PROJECT</span><b>' + esc(projects[(projects.indexOf(project) + projects.length - 1) % projects.length].title) + '</b></a><a href="/" class="all-projects"><span>BACK TO</span><b>ALL PROJECTS</b></a><a href="' + esc(projects[(projects.indexOf(project) + 1) % projects.length].url) + '"><span>NEXT PROJECT →</span><b>' + esc(projects[(projects.indexOf(project) + 1) % projects.length].title) + '</b></a></nav>' +
    '<section class="case-contact"><p class="eyebrow"><span class="eyebrow-line"></span> HAVE A PROJECT IN MIND?</p><h2>Let’s work <span>together.</span></h2><a class="button button-light" href="/#contact">Start a conversation <span>↗</span></a></section>' +
    '</article>';
  }

  // Insert the complete case-study page assembled above.
  root.innerHTML = html;
  // Keep the browser tab and social preview metadata in sync with the selected project.
  var pageTitle = textValue(project.title) || "Project case study";
  var pageDescription = textValue(project.description);
  document.title = pageTitle + " — Case Study | Desloper";
  var descriptionMeta = document.querySelector('meta[name="description"]');
  if (descriptionMeta && pageDescription) descriptionMeta.content = pageDescription;
  var ogTitle = document.querySelector('meta[property="og:title"]');
  if (ogTitle) ogTitle.content = pageTitle + " — Case Study | Desloper";
  var ogDescription = document.querySelector('meta[property="og:description"]');
  if (ogDescription && pageDescription) ogDescription.content = pageDescription;
  // Per-project theme control shares the saved homepage theme preference.
  var links = document.querySelectorAll(".case-theme-toggle");
  links.forEach(function (button) {
    var currentTheme = document.documentElement.dataset.theme === "light" ? "light" : "dark";
    button.setAttribute("aria-label", currentTheme === "dark" ? "Switch to light theme" : "Switch to dark theme");
    button.textContent = currentTheme === "dark" ? "◐" : "◑";
    button.addEventListener("click", function () {
      var next = document.documentElement.dataset.theme === "light" ? "dark" : "light";
      document.documentElement.dataset.theme = next;
      try { localStorage.setItem("desloper-theme", next); } catch (error) {}
      button.setAttribute("aria-label", next === "dark" ? "Switch to light theme" : "Switch to dark theme");
      button.textContent = next === "dark" ? "◐" : "◑";
    });
  });
  try {
    if (localStorage.getItem("desloper-theme") === "light") document.documentElement.dataset.theme = "light";
  } catch (error) {}
  // Scroll progress and active table-of-contents links follow the reader through the case study.
  var progress = document.getElementById("scroll-progress-bar");
  var tocProgress = document.querySelector(".toc-progress span");
  function updateProgress() {
    var max = document.documentElement.scrollHeight - window.innerHeight;
    var amount = max > 0 ? Math.min(100, window.scrollY / max * 100) : 0;
    if (progress) progress.style.width = amount + "%";
    if (tocProgress) tocProgress.style.height = amount + "%";
  }
  window.addEventListener("scroll", updateProgress, {passive: true});
  updateProgress();
  var storySections = document.querySelectorAll(".story-section[id]");
  // Reveal long-form sections as they enter view; fall back to visible content in older browsers.
  if ("IntersectionObserver" in window) {
    var tocObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          document.querySelectorAll(".case-toc a").forEach(function (link) {
            link.classList.toggle("is-current", link.getAttribute("href") === "#" + entry.target.id);
          });
        }
      });
    }, {rootMargin: "-25% 0px -65% 0px"});
    storySections.forEach(function (section) { tocObserver.observe(section); });
    var revealObserver = new IntersectionObserver(function (entries, observer) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, {threshold: .08});
    document.querySelectorAll(".story-section, .case-hero, .project-pagination, .case-contact").forEach(function (section) {
      section.classList.add("reveal");
      revealObserver.observe(section);
    });
  } else {
    document.querySelectorAll(".story-section, .case-hero, .project-pagination, .case-contact").forEach(function (section) {
      section.classList.add("is-visible");
    });
  }
}());
