# Desloper portfolio

This is a static, responsive portfolio built with plain HTML, CSS, and JavaScript. It has no build step: deploy this folder as the site root (for example, on Netlify). Project content is kept in one shared data file so homepage cards and project pages stay in sync.

## Quick editing map

| To update | Edit |
| --- | --- |
| Homepage hero, introduction, skills, about copy, contact form labels, footer copy | `index.html` |
| Contact details, project titles/descriptions/categories/URLs, project story content, project images and credits | `assets/projects.js` |
| Homepage project-card rendering, gallery items, creative captions/photos, filters, theme/menu/form behavior | `assets/site.js` |
| Existing project's page shell and route slug | `projects/<project-slug>/index.html` (Instagram keeps its existing named HTML route) |
| New case studies without a dedicated HTML page | `projects/index.html` with `/projects/#<slug>` |
| Flexible case-study sections and reusable visual components | `assets/project-page.js` |
| Project-specific section order, text, images, and enabled state | `assets/projects.js` |
| Homepage styling and responsive layouts | `styles.css` |
| Case-study styling and responsive layouts | `case-study.css` |
| Which image belongs to each project/section | `assets/images/README.md` |

### Folder structure

```text
index.html                       Homepage sections and static copy
styles.css                       Homepage design, layout, and responsive rules
case-study.css                   Shared case-study design and responsive rules
assets/
  projects.js                    Contact settings + all seven project records
  site.js                        Homepage rendering and interactions
  project-page.js                Shared case-study page renderer
  case-study-shell.js            Shared case-study theme and copyright helpers
  images/
    case-studies/<slug>/          Images for the two UI/UX case studies
    landing-pages/<slug>/         Images for the four website/landing projects
    creatives/                    Six distinct homepage social-creative photos
projects/<slug>/index.html       Existing lightweight project route shells
projects/instagram-ui-clone/     Existing named Instagram case-study route
projects/index.html              Generic route for new records: /projects/#<slug>
```

Existing project routes use the shared renderer and the `body` element's `data-project` slug. Keep that slug and its project record aligned. For a new case study, use `url: "/projects/#<slug>"`; the generic route reads the slug from the URL hash, so normal content additions do not require another HTML file.

## Update project content

In `assets/projects.js`, each item in `projects` is one homepage card and one project page. Edit `title`, `category`, `type`, `description`, and `url` for its listing. The same object contains the overview, challenge, goals, audience, information architecture, user flow, visual direction, interactions, and deliverables used by the case-study renderer.

To add original screens, add objects to `gallery` with `src`, `alt`, and `caption`; set `coverImage` for an original cover. The current context-image fields (`contextImage`, `researchImage`, `audienceImage`, and `solutionImage`) each accept `src`, `alt`, `photographer`, and `source`. Replace stock photos with approved project assets in the matching image folder and update the relevant path and description.

Project role, duration, tools, project type, prototype links, research evidence, and measured outcomes were not included in the supplied materials. Add verified `role`, `duration`, `tools`, `projectKind`, and `projectLinks` values to the correct project record as available. Avoid presenting proposed research, stock imagery, or illustrative layouts as completed project evidence.

## Create a project-specific case study

Add a `sections` array to a record in `assets/projects.js` to use the flexible renderer. Its array order is the display and navigation order. Sections are enabled by default; set `enabled: false` to hide one. Only sections with rendered content (or a meaningful description) appear in the page and its “On This Page” navigation. Existing records without `sections` retain their current layout.

Clone App projects with caseStudyType set to "clone" use a dedicated six-section renderer. In Instagram's record, the ordered sections array configures the visible sections and navigation:

```javascript
caseStudyType: "clone",
sections: [
  { id: "overview", title: "Project Overview", type: "clone-overview", contentKey: "cloneOverview" },
  { id: "issues", title: "UI Issues Identified", type: "clone-issues", contentKey: "mistakesIdentified" },
  { id: "design-system", title: "Typography & Color System", type: "clone-design-system", contentKey: "cloneDesignSystem" },
  { id: "improvements", title: "Design Improvements", type: "clone-comparisons", contentKey: "mistakesIdentified" },
  { id: "components", title: "UI Components & Design Elements", type: "clone-components", contentKey: "uiComponents" },
  { id: "final-ui", title: "Final UI Screens", type: "clone-screens", contentKey: "gallery" }
]
```

Each section can use inline `content` or a `contentKey` that reads a field from that same project record. A dot path such as `contentKey: "prototype.steps"` is supported.

The section records can be edited, reordered, removed, or hidden with enabled: false. The renderer includes only enabled sections with content. Overview data uses cloneOverview fields for the summary, app description, goals, platform, tools, design details, and image. Issue and comparison entries accept an optional image, before.image, and after.image; comparison text can use problem and improvement. cloneDesignSystem accepts typography entries (family, weights, sizes, sample, and hierarchy) and colors entries (label and hex). uiComponents and final gallery entries accept titles, descriptions, and image objects. Their order comes from the arrays in the project record. Clone section titles, descriptions, and IDs can also be changed in sections.

The current Instagram record has no verified font specs or app color HEX values and no paired before-and-after screenshots. Those values are left blank and editable in assets/projects.js; the renderer does not invent them. The current project image is one composite view of Login, Home Feed, and Profile.

| Type | Data shape |
| --- | --- |
| `text`, `rich-text` | `content: "Paragraph"` or an array of paragraph strings. Text is escaped; use blank lines for paragraph breaks. |
| `image` | `image: { src, alt, caption }` or an image object in `content`. |
| `gallery`, `final-ui`, `wireframes` | `images: [{ src, alt, caption }]`, an array in `content`, or `contentKey` pointing to `gallery`. |
| `cards` | `items: [{ title, content, image }]` or a string array. |
| `list` | `items: ["First item", "Second item"]`. |
| `table` | `content: { columns: ["Column"], rows: [["Cell"]] }` or top-level `columns` and `rows`. |
| `mistakes` | `items: [{ issue, improvement, note }]`; existing `problem` values are accepted too. |
| `user-flow` | `steps: ["Start", "Choose", "Finish"]` or an array in `content`. |
| `architecture` | `content: { root: "Home", branches: ["Page", "Contact"] }`, or an array with the root first. |
| `design-system` | `content: { colors: [], typography: [], components: [] }`; entries can be strings or `{ name, value }` objects. |

For an app designed from scratch, include only the research, journey, architecture, wireframes, prototype, or testing sections actually completed. For a website or landing page, use web-specific sections such as brief, goals, sitemap, visual direction, responsive design, final website, and learnings. These structures are project choices, not required templates; do not add unsupported research, testing, or outcomes. Set `caseStudyType` to `"clone"`, `"app"`, or `"website"` to show the project kind in the page hero.

To add a new project, add a record to the `projects` array with a unique `slug`, its listing fields, `url: "/projects/#<slug>"`, a `sections` array, and any verified project data. Store images under `assets/images/` in a descriptive project folder and use their path in the record. The homepage card and generic project route use this shared record; no renderer or project HTML edits are needed for ordinary content changes.

## Update homepage content and creatives

Edit static homepage sections in `index.html`; the comments above each section identify its content. Add or update campaign items in the `creatives` array in `assets/site.js`, including its title, category, image path, alt text, photographer, and source URL. Put those image files in `assets/images/creatives/`. The existing gallery reveals the remaining samples with its View All control and opens each tile in a lightbox.

The shared case-study renderer (`assets/project-page.js`) keeps the original layout for records without `sections`, and renders project-specific sections for records that define them. Edit project copy and images in `assets/projects.js`; change the renderer only to add reusable content types or shared behavior.

## Images and credits

Images are grouped by project type and slug. The filenames identify their role (for example, `hero-...`, `research-...`, `audience-...`, and `solution-...`). The image index in `assets/images/README.md` maps every file to its project or homepage creative.

Case-study context images are credited beside the image on the page. Homepage creative photo credits appear below each sample; photo source URLs are stored with each item in `assets/site.js`. These stock photos support the presentation and do not represent original screenshots, project participants, research findings, prototypes, or measured outcomes.

## Contact details

Edit the `PORTFOLIO_CONFIG` object near the top of `assets/projects.js`:

- `contactEmail`
- `phone`
- `linkedin`
- `behance`
- `resumeUrl`
- `freelanceAvailability`
- `fullTimeAvailability`

The contact form validates required fields in the browser. When `contactEmail` is configured, a valid submission opens a prefilled email draft in the visitor's mail app; it does not send data to a server.
