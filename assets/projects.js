(function () {
  "use strict";

  // CONTACT / PROFILE SETTINGS: update these values once; site.js fills the homepage and footer links.
  window.PORTFOLIO_CONFIG = {
    contactEmail: "desloperalamm@gmial.com",
    phone: "94 58 98 98 18",
    linkedin: "https://www.linkedin.com/in/desloperalamm/",
    behance: "https://www.behance.net/alammsaif",
    resumeUrl: "",
    freelanceAvailability: "",
    fullTimeAvailability: ""
  };

  // PROJECT CONTENT CATALOG: this is the source for homepage cards and every project/case-study page.
  // Edit title, category, type, description, and url for listings; the remaining fields feed the case-study sections.
  // Add an optional `sections` array to choose case-study content and its order; enabled:false hides a section.
  // Supported section types are documented below in README.md and implemented in assets/project-page.js.
  // New flexible case studies can use url: "/projects/#<slug>" without a project-specific HTML file.
  // Image paths point to folders grouped by page category and project slug under assets/images/.

  var projects = [
    // Instagram Clone UI/UX 
    
{
  slug: "instagram-ui-clone",
  title: "Instagram UI Clone",
  category: "Mobile App UI Design",
  type: "case-study",
  caseStudyType: "clone",
  art: "instagram",

  description: "A complete recreation of the Instagram iOS app interface, covering its key screens, navigation, and core features with both Light Mode and Dark Mode designs.",

  url: "/projects/instagram-ui-clone/instagram-ui-clone.html",
  projectLinks: {
    figma: "https://www.figma.com/proto/3QyIIdtSIOhqwR2VQfk4ob/Instagram-UI?node-id=187-1033&p=f&viewport=-15310%2C-6230%2C0.48&t=ojFNpumtRbij7Iu1-1&scaling=scale-down&content-scaling=fixed&starting-point-node-id=187%3A1033&page-id=0%3A1"
  },
  platform: "iOS",

  summary: "A complete Instagram iOS app UI recreation focused on improving visual consistency, refining typography, correcting UI elements, and creating a cohesive experience across Light Mode and Dark Mode.",

  challenge: "The main challenge was recreating Instagram's app interface while maintaining consistency across its different screens and color themes. The design process focused on refining shapes, typography, colors, spacing, and visual hierarchy.",

  goals: [
    "Recreate Instagram's iOS app interface.",
    "Cover key screens, navigation, and core app features.",
    "Create consistent Light Mode and Dark Mode designs.",
    "Improve spacing, alignment, and visual hierarchy.",
    "Refine typography, shapes, colors, and UI elements.",
    "Maintain a consistent experience across the app."
  ],

  audience: "Designers, developers, and people interested in mobile app design and social media experiences.",

  knownScreens: "Instagram iOS app screens covering Login, Home Feed, Stories, Explore, Reels, Search, Notifications, Direct Messages, Create Post, User Profile, and account settings.",

  contextImage: {
    src: "/assets/images/case-studies/instagram-ui-clone/insta.png",
    alt: "Instagram iOS app interface recreated in Figma.",
    photographer: "",
    source: ""
  },

  proposedIA: [
    "Login & Account Access",
    "Home Feed",
    "Stories",
    "Explore & Search",
    "Reels",
    "Notifications & Activity",
    "Direct Messages",
    "Create Post",
    "User Profile",
    "Settings & Account Options"
  ],

  proposedFlow: [
    "Open Instagram",
    "Access the Login screen",
    "Explore the Home Feed and Stories",
    "Navigate through Explore and Reels",
    "Interact with posts and content",
    "Access Notifications and Messages",
    "Create and manage posts",
    "Explore User Profile and Settings"
  ],

  visualDirection: "An Instagram-inspired iOS interface featuring both Light Mode and Dark Mode, with consistent typography, refined colors, recognizable UI patterns, and cohesive visual elements.",

  interactions: [
    "Login and account access interface",
    "Stories and post interactions",
    "Post engagement controls",
    "Explore and Reels navigation",
    "Search and messaging interface",
    "Profile navigation and account actions",
    "Light Mode and Dark Mode UI variations"
  ],

  mistakesIdentified: [
    {
      title: "Shape & Element Inconsistencies",
      problem: "Some UI shapes and elements had inconsistent sizes, proportions, and corner radii.",
      improvement: "Refined shapes, element dimensions, and corner radii to create a more consistent interface."
    },
    {
      title: "Typography & Font Size Issues",
      problem: "Font sizes and text hierarchy were inconsistent across different interface sections.",
      improvement: "Adjusted font sizes, typography hierarchy, and text spacing for better readability."
    },
    {
      title: "Color & Contrast Issues",
      problem: "Color combinations and contrast needed refinement across different interface elements.",
      improvement: "Refined the color palette and contrast for balanced Light Mode and Dark Mode interfaces."
    }
  ],

  visualImprovements: [
    "Improved shape proportions and element consistency.",
    "Corrected font sizes and typography hierarchy.",
    "Refined colors and contrast for both themes.",
    "Improved spacing, alignment, and visual balance.",
    "Maintained consistent UI elements across the app."
  ],

  finalSummary: "A complete Instagram iOS app UI recreation featuring both Light Mode and Dark Mode. The project focuses on refining visual inconsistencies, improving typography, shapes, colors, and creating a cohesive mobile experience.",

  deliverables: [
    "Complete Instagram iOS App UI",
    "Light Mode Interface",
    "Dark Mode Interface",
    "Home Feed & Stories",
    "Explore & Reels",
    "Search & Notifications",
    "Direct Messages",
    "User Profile",
    "Reusable UI Components",
    "Typography & Color Refinements",
    "Visual Consistency Improvements"
  ],

  gallery: [
    {
      src: "/assets/images/case-studies/instagram-ui-clone/Light&DarkMode.png",
      alt: "Instagram iOS app interface recreated in Figma.",
      caption: "Instagram iOS App UI – Light & Dark Mode"
    }
  ],

  cloneOverview: {
    shortDescription: "A complete Instagram iOS app UI recreation focused on visual consistency, intuitive navigation, and both Light Mode and Dark Mode experiences.",

    appOverview: "A comprehensive recreation of the Instagram iOS app, covering its key screens, navigation, and core features with both Light Mode and Dark Mode designs.",

    goals: [
      "Recreate Instagram's iOS app interface.",
      "Cover key screens and core app features.",
      "Create consistent Light Mode and Dark Mode designs.",
      "Improve typography, spacing, and visual hierarchy.",
      "Maintain consistency across app screens."
    ],

    designDetails: "A complete iOS mobile interface recreation featuring Light Mode and Dark Mode, refined typography, balanced colors, and consistent UI elements.",

    platform: "iOS",

    image: {
      src: "/assets/images/case-studies/instagram-ui-clone/Light&DarkMode.png",
      alt: "Instagram iOS app interface recreated in Figma.",
      caption: "Instagram iOS App UI – Light & Dark Mode"
    }
  },

  cloneDesignSystem: {
    description: "Typography and color specifications should reflect the actual Figma design. Add confirmed font families, weights, sizes, hierarchy, and app color HEX values.",
    typography: [
      {
      family: "SF Pro",
      usage: "Body text, captions, labels, and UI content."
    },
    {
      family: "SF Pro Display",
      usage: "Headings, prominent text, and display elements."
    }
    ],
    colors: [
      {
      name: "Primary Text",
      hex: "#FFFAFA",
      opacity: "100%"
    },
    {
      name: "Accent Blue",
      hex: "#455DFF",
      opacity: "100%"
    },
    {
      name: "Background",
      hex: "#080D11",
      opacity: "100%"
    },
    {
      name: "Surface / Border",
      hex: "#33383C",
      opacity: "100%"
    },
    {
      name: "Subtle Divider",
      hex: "#33383C",
      opacity: "35%"
    },
    {
      name: "Secondary Text",
      hex: "#D7D7D7",
      opacity: "80%"
    }
    ]

    
  },

  uiComponents: [
    {
      title: "Story Ring",
      description: "Circular story previews displayed above the Home Feed.",
      image: {
        src: "/assets/images/case-studies/instagram-ui-clone/StoryRing.png",
        alt: "Instagram Home Feed showing story rings.",
        objectPosition: "50% 35%"
      }
    },
    {
      title: "Post Actions",
      description: "Like, comment, share, and save controls used around feed posts.",
      image: {
        src: "/assets/images/case-studies/instagram-ui-clone/PostActions.png",
        alt: "Instagram Home Feed showing post action icons.",
        objectPosition: "50% 55%"
      }
    },
    {
      title: "Bottom Navigation",
      description: "Primary navigation controls for moving between key app sections.",
      image: {
        src: "/assets/images/case-studies/instagram-ui-clone/BottomNavigation.png",
        alt: "Instagram app screen showing the bottom navigation bar.",
        objectPosition: "50% 92%"
      }
    },
    {
      title: "Profile Actions",
      description: "Profile controls for editing, sharing, and managing an account.",
      image: {
        src: "/assets/images/case-studies/instagram-ui-clone/ProfileActions.png",
        alt: "Instagram Profile screen showing account actions.",
        objectPosition: "88% 45%"
      }
    }
  ],

  sections: [
    {
      id: "overview",
      title: "Project Overview",
      type: "clone-overview",
      contentKey: "cloneOverview"
    },
    {
      id: "issues",
      title: "UI Issues Identified",
      type: "clone-issues",
      contentKey: "mistakesIdentified",
      description: "Visual inconsistencies identified in shapes, typography, colors, and interface elements."
    },
    {
      id: "design-system",
      title: "Typography & Color System",
      type: "clone-design-system",
      contentKey: "cloneDesignSystem"
    },
    {
      id: "improvements",
      title: "Design Improvements",
      type: "clone-comparisons",
      contentKey: "mistakesIdentified",
      description: "Refinements made to typography, shapes, colors, and overall interface consistency."
    },
    {
      id: "components",
      title: "UI Components & Design Elements",
      type: "clone-components",
      contentKey: "uiComponents",
      description: "Reusable interface elements used throughout the Instagram app."
    },
    {
      id: "final-ui",
      title: "Final UI Screens",
      type: "clone-screens",
      contentKey: "gallery",
      description: "Instagram iOS app interface showcasing both Light Mode and Dark Mode."
    }
  ]
},


  //  2nd case study seirei
    {
      slug: "seirei-electronics-services-website",
      title: " Seirei Electronics Services Pvt. Ltd. Website",
      category: "Website Design & Development",
      type: "case-study",
      art: "seirei",
      description: "Designed a user-friendly, responsive website for Seirei Electronics Services Pvt. Ltd., a lithium battery manufacturer, focusing on intuitive navigation, clean UI, and seamless user experience.",
      url: "/projects/seirei-electronics-services-website/",
      projectLinks: { figma: "https://seireielectronics.in" },
      platform: "Responsive website",
      summary: "A professional digital presence for presenting electronics services.",
      challenge: "The project brief calls for a clear, modern way to present electronics services. Specific user pain points, business constraints, and existing-site findings were not provided.",
      goals: [
        "Make the services easy to understand at a glance.",
        "Create a clear page structure for the information visitors need.",
        "Support a considered responsive experience across screen sizes.",
        "Showcase the design, key pages, and development work."
      ],
      audience: "People exploring electronics services and looking for clear information before choosing what to do next.",
      knownScreens: "Website design, key pages, responsive layouts, development work, and final website visuals are named in the supplied brief.",
      contextImage: {
        src: "/assets/images/case-studies/seirei-electronics-services-website/hero-electronics-repair.webp",
        alt: "Technician examining a mobile device at an electronics repair workbench.",
        photographer: "Yoga Sukma",
        source: "https://unsplash.com/photos/a-person-using-a-mouse-on-a-mouse-pad-J_tkqH61vHA"
      },
      researchImage: {
        src: "/assets/images/case-studies/seirei-electronics-services-website/research-repair-workbench.webp",
        alt: "Two repair technicians working on a computer motherboard.",
        photographer: "Ricardo IV Tamayo",
        source: "https://unsplash.com/photos/two-men-working-on-a-computer-motherboard-nApaD08bFAE"
      },
      audienceImage: {
        src: "/assets/images/case-studies/seirei-electronics-services-website/audience-phone-browsing.webp",
        alt: "A woman using a phone while browsing.",
        photographer: "charlesdeluvio",
        source: "https://unsplash.com/photos/person-using-phone-XwbzsOOC0Ws"
      },
      solutionImage: {
        src: "/assets/images/case-studies/seirei-electronics-services-website/solution-repair-tools.webp",
        alt: "Phone parts and repair tools arranged on a work mat.",
        photographer: "Fotografia Lui Vlad",
        source: "https://unsplash.com/photos/phone-parts-and-repair-tools-are-on-a-mat-9jvB7BymbtU"
      },
      proposedIA: ["Home", "Services", "Service detail", "About", "Contact"],
      proposedFlow: ["Arrive", "Understand services", "Review a relevant service", "Choose a next step"],
      visualDirection: "A clear service-led website with a modern editorial rhythm and visible routes into the information visitors need.",
      interactions: ["Clear primary navigation", "Responsive page layouts", "Visible service hierarchy", "Accessible focus and hover states"],
      finalSummary: "A professional service website direction centered on clear presentation, modern visual design, responsive layouts, and the final website visuals described in the supplied brief.",
      deliverables: ["Website design", "Key pages", "Responsive layouts", "Development work", "Final website visuals"]
    },


    
    // UI/UX case study. The e-commerce project page and homepage card are both generated from this record.
    {
      slug: "e-commerce-app",
      title: "E-commerce App – Mobile & Web",
      category: "UI/UX Design",
      type: "case-study",
      art: "shop",
      description: "A seamless shopping experience across mobile and web platforms, focused on intuitive product browsing, smooth navigation, and a user-friendly interface.",
      url: "/projects/e-commerce-app/",
      projectLinks: { figma: "https://www.figma.com/proto/bLmaoycxXAmHqYPlBEaV33/App-UI-s?node-id=341-4872&page-id=0%3A1&t=QPetzwB8vr2NRn48-1" },
      platform: "Mobile app",
      summary: "A mobile shopping experience focused on browsing and clear navigation.",
      challenge: "The supplied brief prioritizes intuitive product browsing, seamless navigation, and a user-friendly shopping interface. Specific user pain points, research findings, and business constraints were not supplied.",
      goals: [
        "Make product discovery feel intuitive.",
        "Keep navigation and browsing straightforward.",
        "Create a consistent, readable mobile interface.",
        "Show the core screens, user flows, and prototype visuals."
      ],
      audience: "People browsing products on a mobile device who need to find and compare relevant items with confidence.",
      knownScreens: "Product browsing, app screens, interface design, user flows, and prototype visuals are named in the supplied brief.",
      contextImage: {
        // src: "/assets/images/case-studies/e-commerce-app/Mobile&webE-com.png",
        src: "https://res.cloudinary.com/drrhixpv8/image/upload/v1795370760/Mobile_webE-com_idyrmo.png",
        alt: "Two friends comparing something on a phone while shopping together.",
        photographer: "Vitaly Gariev",
        source: "https://unsplash.com/photos/two-friends-look-at-a-phone-after-shopping-HQleqcqByYo"
      },
      researchImage: {
        src: "/assets/images/case-studies/e-commerce-app/research-online-shopping.webp",
        alt: "A shopper using a phone and payment card at home.",
        photographer: "Vitaly Gariev",
        source: "https://unsplash.com/photos/young-man-using-smartphone-and-credit-card-for-online-shopping-FkHW0ZCy094"
      },
      audienceImage: {
        src: "/assets/images/case-studies/e-commerce-app/audience-shopping.webp",
        alt: "A shopper using a phone while walking with shopping bags.",
        photographer: "Vitaly Gariev",
        source: "https://unsplash.com/photos/woman-using-phone-while-shopping-with-bags-yd1N7a_328o"
      },
      solutionImage: {
        src: "/assets/images/case-studies/e-commerce-app/solution-retail-display.webp",
        alt: "Product displays arranged on shelves in a retail store.",
        photographer: "Sabhyata Sahu",
        source: "https://unsplash.com/photos/cosmetic-store-with-beauty-product-displays-e2WAc0PvgX8"
      },
      proposedIA: ["Home", "Browse", "Product detail", "Cart", "Checkout"],
      proposedFlow: ["Open the app", "Browse products", "Review a product", "Continue to the next shopping step"],
      visualDirection: "A mobile-first shopping experience with a clear product hierarchy, legible controls, and simple navigation.",
      interactions: ["Product browsing and selection", "Clear navigation states", "Helpful cart feedback", "Accessible touch targets"],
      finalSummary: "A mobile shopping design direction centered on intuitive product browsing, seamless navigation, and a user-friendly interface, as described in the supplied brief.",
      deliverables: ["User experience", "Product browsing", "App screens", "Interface design", "User flows", "Prototype visuals"]
    },

    // Landing page project: Digital Marketing Agency. Keep the copy and supporting images together here.
    {
      slug: "digital-marketing-agency",
      title: "Digital Marketing Agency",
      category: "Landing Page Design",
      type: "landing-page",
      art: "agency",
      description: "A modern landing page design for a digital marketing agency.",
      url: "/projects/digital-marketing-agency/",
      projectLinks: { figma: "https://www.figma.com/proto/KQ50c3N0TGUeLPRFihSgi9/Animated-web?node-id=1-4&page-id=0%3A1&t=rJWm4dthMupNPkjJ-1" },
      platform: "Responsive website concept",
      summary: "A modern landing page concept for a digital marketing agency.",
      challenge: "The supplied brief describes a modern agency landing page concept but does not include the original brief, target audience details, or project assets.",
      goals: ["Make the offer easy to scan.", "Give the page a distinct visual point of view.", "Build a clear hierarchy for the next action."],
      audience: "Audience details were not supplied. Add the intended agency customer and their primary needs.",
      knownScreens: "A landing page design is specified. Original screenshots, responsive layouts, and final project files were not supplied.",
      contextImage: {
        src: "https://res.cloudinary.com/drrhixpv8/image/upload/v1795458120/Digital_mnsqny.webp",
        alt: "A team collaborating around laptops at a meeting table.",
        photographer: "Ngital",
        source: "https://unsplash.com/photos/six-colleagues-collaborating-around-a-conference-table-with-laptops-RdEFWm0N84o"
      },
      researchImage: {
        src: "/assets/images/landing-pages/digital-marketing-agency/research-campaign-planning.webp",
        alt: "People reviewing notes and laptops during a digital marketing planning session.",
        photographer: "Swello",
        source: "https://unsplash.com/photos/people-working-on-laptops-with-notebooks-and-notebooks-ly8NZU7Nsdg"
      },
      audienceImage: {
        src: "/assets/images/landing-pages/digital-marketing-agency/audience-teamwork.webp",
        alt: "Two colleagues discussing ideas while looking at a laptop.",
        photographer: "Vitaly Gariev",
        source: "https://unsplash.com/photos/two-colleagues-collaborating-on-a-project-at-a-laptop-tRvuRPE8cr4"
      },
      solutionImage: {
        src: "/assets/images/landing-pages/digital-marketing-agency/solution-creative-studio.webp",
        alt: "Creative collaborators reviewing photography on a laptop in a studio.",
        photographer: "Vitaly Gariev",
        source: "https://unsplash.com/photos/two-people-working-on-a-laptop-with-photography-equipment-GvW4TTJeFUk"
      },
      proposedIA: ["Hero and value proposition", "Services", "Work or proof points", "Contact"],
      proposedFlow: ["Arrive", "Understand the offer", "Review relevant information", "Take a next step"],
      visualDirection: "A modern landing page with focused messaging and a confident visual rhythm.",
      interactions: ["Clear primary action", "Scannable page sections", "Responsive navigation", "Accessible focus states"],
      finalSummary: "A modern digital marketing agency landing page concept. Add approved project screens and notes to document the actual final design.",
      deliverables: ["Landing page design"]
    },
    // Landing page project: Digital Startup Bootcamp.
    {
      slug: "digital-startup-bootcamp",
      title: "Digital Startup Bootcamp",
      category: "Landing Page Design",
      type: "landing-page",
      art: "bootcamp",
      description: "A website concept for a startup bootcamp focused on presenting programs and learning experiences.",
      url: "/projects/digital-startup-bootcamp/",
      projectLinks: { figma: "https://www.figma.com/proto/QjnCYMdhlsp9nwGq5THCnn/future-of-remote-hiring?node-id=145-2&page-id=0%3A1&t=ynPOZuSlvyMplwij-1" },
      platform: "Responsive website concept",
      summary: "A website concept for a startup bootcamp and its learning programs.",
      challenge: "The supplied brief describes a startup bootcamp website concept focused on presenting programs and learning experiences. Original audience research and project assets were not supplied.",
      goals: ["Present programs in a clear structure.", "Explain the learning experience.", "Help visitors find a relevant next step."],
      audience: "People exploring startup learning programs. Add the specific audience and program context from the original project.",
      knownScreens: "A website concept is specified. Original page designs, program details, and responsive screens were not supplied.",
      contextImage: {
        src: "https://res.cloudinary.com/drrhixpv8/image/upload/v1795458122/corpzo_t0akfr.webp",
        alt: "A diverse group of students sharing a laptop during a classroom collaboration.",
        photographer: "Vitaly Gariev",
        source: "https://unsplash.com/photos/diverse-group-of-students-collaborating-around-a-laptop--X4Qx4_4iMU"
      },
      researchImage: {
        src: "/assets/images/landing-pages/digital-startup-bootcamp/research-classroom.webp",
        alt: "A focused student studying at a laptop in a library.",
        photographer: "Ashutosh Gupta",
        source: "https://unsplash.com/photos/focused-student-studying-at-a-library-table-with-a-laptop-NASjMHJ9OhI"
      },
      audienceImage: {
        src: "/assets/images/landing-pages/digital-startup-bootcamp/audience-learners.webp",
        alt: "A student smiling while working on a laptop in a classroom.",
        photographer: "Matheu Richard",
        source: "https://unsplash.com/photos/a-student-smiles-while-working-on-his-laptop-VBIMtDdjuWc"
      },
      solutionImage: {
        src: "/assets/images/landing-pages/digital-startup-bootcamp/solution-digital-learning.webp",
        alt: "Students talking and studying together in a classroom.",
        photographer: "Vitaly Gariev",
        source: "https://unsplash.com/pt-br/fotografias/estudantes-conversando-e-estudando-em-uma-sala-de-aula-wAgfqXpYqug"
      },
      proposedIA: ["Program overview", "Learning experience", "Who it is for", "Apply or enquire"],
      proposedFlow: ["Arrive", "Explore the program", "Check fit and details", "Take a next step"],
      visualDirection: "An energetic but legible landing page that makes program information approachable.",
      interactions: ["Program discovery", "Clear section navigation", "Responsive page layouts", "Accessible action states"],
      finalSummary: "A website concept for presenting startup bootcamp programs and learning experiences. Add approved screens and project notes to document the actual solution.",
      deliverables: ["Website concept"]
    },
    // Product landing page project: Apple AirPods Max Clone.
    {
      slug: "apple-airpods-max-clone",
      title: "Apple AirPods Max Clone",
      category: "Landing Page Design",
      type: "landing-page",
      art: "airpods",
      description: "A product-focused website design inspired by the Apple AirPods Max product experience.",
      url: "/projects/apple-airpods-max-clone/",
      projectLinks: { figma: "https://www.figma.com/proto/ThF68WAUhIgbv46lEnPYbM/AirPods-MAX?node-id=110-1407&viewport=637%2C-21%2C0.1&t=2x8NEJlB5lZHJczX-1&scaling=scale-down&content-scaling=fixed&starting-point-node-id=110%3A1407&page-id=0%3A1" },
      platform: "Responsive website concept",
      summary: "A product-focused website concept inspired by the AirPods Max experience.",
      challenge: "The supplied brief describes a product-focused website design inspired by the Apple AirPods Max product experience. Original screens, implementation details, and project links were not supplied.",
      goals: ["Give the product a strong visual presentation.", "Organize key product information clearly.", "Create a focused, responsive browsing experience."],
      audience: "People exploring a premium audio product. Add the intended audience and product goals from the original project.",
      knownScreens: "A product-focused website design is specified. Original screenshots and responsive previews were not supplied.",
      contextImage: {
        src: "https://res.cloudinary.com/drrhixpv8/image/upload/v1795458119/AirPodsMax_vztteg.webp",
        alt: "Close-up of over-ear studio headphones in dark warm lighting.",
        photographer: "Andrew Thongkham",
        source: "https://unsplash.com/photos/close-up-of-professional-studio-headphones-SXd6KwQNPlk"
      },
      researchImage: {
        src: "/assets/images/landing-pages/apple-airpods-max-clone/research-audio.webp",
        alt: "Studio headphones on a desk in front of a computer.",
        photographer: "Sound Tools",
        source: "https://unsplash.com/photos/a-close-up-of-headphones-on-a-desk-in-front-of-a-computer-2QUUKTJUKgI"
      },
      audienceImage: {
        src: "/assets/images/landing-pages/apple-airpods-max-clone/audience-listening.webp",
        alt: "A young woman listening to music with over-ear headphones.",
        photographer: "Amari Shutters",
        source: "https://unsplash.com/photos/young-woman-with-headphones-listening-to-music-A6kViIz3cdQ/"
      },
      solutionImage: {
        src: "/assets/images/landing-pages/apple-airpods-max-clone/solution-headphones.webp",
        alt: "Headphones resting on a piano keyboard in a music studio.",
        photographer: "Viktor Forgacs",
        source: "https://unsplash.com/photos/headphones-on-piano-keyboard-in-studio-H6YkQEnD5Gk"
      },
      proposedIA: ["Product hero", "Features", "Design details", "Explore or purchase"],
      proposedFlow: ["Arrive", "Explore the product", "Review feature details", "Choose a next step"],
      visualDirection: "A restrained, product-led page with large imagery, clear typography, and a focused story.",
      interactions: ["Product story navigation", "Responsive media presentation", "Clear feature hierarchy", "Accessible controls"],
      finalSummary: "A product-focused website design concept inspired by the Apple AirPods Max product experience. Add original screens and project notes to show the actual work.",
      deliverables: ["Website design concept"]
    },
    // Website redesign project: Airex Heaters.
    {
      slug: "airex-heaters-website-redesign",
      title: "Airex Heaters Website Redesign",
      category: "Landing Page Design",
      type: "landing-page",
      art: "heaters",
      description: "Redesigned the Airex Heaters website with a modern, responsive interface, focusing on intuitive navigation, improved usability, and a clean visual experience across devices.",
      url: "/projects/airex-heaters-website-redesign/",
      projectLinks: { figma: "https://www.figma.com/proto/fs276TGCiXm625BDPExCbz/Airex-Heaters?node-id=114-1509&viewport=-3425%2C270%2C0.18&t=PR55tyhlBtQyRize-1&scaling=scale-down&content-scaling=fixed&page-id=0%3A1" },
      platform: "Responsive website concept",
      summary: "A redesign concept for presenting heating products and services.",
      challenge: "The supplied brief describes a redesign concept focused on improving the presentation of heating products and services. An existing-site audit and the original design assets were not supplied.",
      goals: ["Present products and services clearly.", "Improve content hierarchy and scannability.", "Create a responsive product browsing experience."],
      audience: "People comparing heating products or services. Add the specific customer groups and needs from the original project.",
      knownScreens: "A website redesign concept is specified. Existing-site findings, original screenshots, and implementation details were not supplied.",
      contextImage: {
        src: "https://res.cloudinary.com/drrhixpv8/image/upload/v1795458123/Airex_mzs0hz.webp",
        alt: "Bright modern living room with a fireplace and large windows.",
        photographer: "Clay Banks",
        source: "https://unsplash.com/photos/modern-living-room-with-fireplace-and-large-windows-IE0m2PUI4Fg"
      },
      researchImage: {
        src: "/assets/images/landing-pages/airex-heaters-website-redesign/research-heating-technician.webp",
        alt: "A technician repairing an electronic board for a heating boiler.",
        photographer: "Bermix Studio",
        source: "https://unsplash.com/photos/a-man-wearing-a-blindfold-working-on-a-circuit-board-y9RGeKyVpM8"
      },
      audienceImage: {
        src: "/assets/images/landing-pages/airex-heaters-website-redesign/audience-home-thermostat.webp",
        alt: "A home thermostat displaying the current temperature.",
        photographer: "Erik Mclean",
        source: "https://unsplash.com/photos/white-and-gray-thermostat-at-19-5-fSLI8RdCdyk"
      },
      solutionImage: {
        src: "/assets/images/landing-pages/airex-heaters-website-redesign/solution-wall-radiator.webp",
        alt: "A white wall radiator installed beneath a window.",
        photographer: "Didssph",
        source: "https://unsplash.com/photos/white-heater-radiator-near-window-8LuFQQnO40M"
      },
      proposedIA: ["Product overview", "Product categories", "Service information", "Contact"],
      proposedFlow: ["Arrive", "Find a product or service", "Review relevant details", "Choose a next step"],
      visualDirection: "A warm, service-led presentation that gives product and service information a clear hierarchy.",
      interactions: ["Product and service discovery", "Scannable content sections", "Responsive layouts", "Accessible navigation"],
      finalSummary: "A website redesign concept focused on presenting heating products and services more clearly. Add the original audit, approved screens, and project notes to document the outcome.",
      deliverables: ["Website redesign concept"]
    }
  ];

  // NORMALIZE OPTIONAL FIELDS: new projects can omit optional links, gallery assets, role, tools, or duration.
  projects.forEach(function (project) {
    project.role = project.role || "";
    project.duration = project.duration || "";
    project.tools = project.tools || [];
    project.projectKind = project.projectKind || "";
    project.coverImage = project.coverImage || "";
    project.gallery = project.gallery || [];
    project.projectLinks = project.projectLinks || {};
  });
  // Shared data is consumed by assets/site.js (homepage) and assets/project-page.js (project routes).
  window.PORTFOLIO_PROJECTS = projects;
}());
