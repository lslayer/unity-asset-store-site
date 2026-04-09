const revealTargets = document.querySelectorAll(
  ".section-heading, .panel, .kit-card, .workflow-step, .site-footer"
);

for (const element of revealTargets) {
  element.setAttribute("data-reveal", "");
}

const observer = new IntersectionObserver(
  (entries) => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    }
  },
  {
    threshold: 0.18,
    rootMargin: "0px 0px -8% 0px",
  }
);

for (const element of revealTargets) {
  observer.observe(element);
}

const parallaxTargets = document.querySelectorAll("[data-parallax]");
const pageParallaxTargets = document.querySelectorAll("[data-page-parallax]");
const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

if (!reducedMotionQuery.matches && (parallaxTargets.length > 0 || pageParallaxTargets.length > 0)) {
  let ticking = false;

  const updateParallax = () => {
    const scrollY = window.scrollY;

    for (const element of pageParallaxTargets) {
      const speed = Number(element.dataset.speed || "0");
      const shift = scrollY * speed;

      element.style.setProperty("--page-parallax-shift", `${shift.toFixed(1)}px`);
    }

    for (const element of parallaxTargets) {
      const scene = element.closest(".hero-art");

      if (!scene) {
        continue;
      }

      const rect = scene.getBoundingClientRect();
      const speed = Number(element.dataset.speed || "0");
      const traveled = Math.max(-180, Math.min(rect.height + 180, -rect.top));
      const shift = traveled * speed * 0.72;

      element.style.setProperty("--parallax-shift", `${shift.toFixed(1)}px`);
    }

    ticking = false;
  };

  const requestParallaxFrame = () => {
    if (ticking) {
      return;
    }

    ticking = true;
    window.requestAnimationFrame(updateParallax);
  };

  updateParallax();
  window.addEventListener("scroll", requestParallaxFrame, { passive: true });
  window.addEventListener("resize", requestParallaxFrame);
}

const translations = {
  en: {
    pageTitle: "Gnarled Vole | 3D Assets for Unity",
    metaDescription:
      "Gnarled Vole creates stylized 3D assets for Unity Asset Store publishers and developers.",
    brandAria: "Gnarled Vole homepage",
    brandKicker: "Unity Asset Studio",
    navAria: "Primary navigation",
    langLabel: "Lang",
    langSwitcherAria: "Language switcher",
    navAbout: "About",
    navKits: "Asset Kits",
    navWorkflow: "Workflow",
    navContact: "Contact",
    heroEyebrow: "3D assets for Unity Asset Store",
    heroTitle: "Gnarled Vole is building stylized 3D assets for Unity.",
    heroText:
      "The studio is currently working on its first pack for release on the Unity Asset Store.",
    heroPrimaryCta: "See current pack",
    heroSecondaryCta: "Unity Asset Store",
    statStatusLabel: "Status",
    statStatusValue: "First pack in progress",
    statPlatformLabel: "Platform",
    statPlatformValue: "Unity Asset Store",
    statFormatLabel: "Format",
    statFormatValue: "Stylized 3D assets",
    surfaceTopLabel: "Current status",
    surfaceTopTitle: "First Asset Store pack is now in active development.",
    surfaceBottomLabel: "In progress",
    chipAria: "Pack status chips",
    chipPackName: "Pirate Island Pack",
    chipWip: "WIP",
    heroStatsAria: "Studio highlights",
    aboutEyebrow: "About the studio",
    aboutTitle: "Simple studio page, focused on what actually exists today.",
    aboutCard1Title: "What it is",
    aboutCard1Text: "Gnarled Vole is a small studio making 3D assets for the Unity Asset Store.",
    aboutCard2Title: "What is happening now",
    aboutCard2Text:
      "The first product is currently in development and has not been released yet.",
    aboutCard3Title: "What this page is for",
    aboutCard3Text:
      "This landing page is a studio placeholder until the first pack is ready to be published.",
    kitsEyebrow: "Current pack",
    kitsTitle: "There is one pack in development right now.",
    kitStatus: "WIP",
    kitTitle: "Pirate Island Pack",
    kitText:
      "The first planned release for the studio. This pack is still in progress and is not published yet.",
    workflowEyebrow: "Current focus",
    workflowTitle: "Only the present state, without fake catalogue content.",
    workflowStep1Title: "Studio",
    workflowStep1Text: "Gnarled Vole is positioned as a Unity Asset Store studio.",
    workflowStep2Title: "Pack",
    workflowStep2Text: "The only announced pack right now is Pirate Island Pack.",
    workflowStep3Title: "Status",
    workflowStep3Text: "Release is still ahead, so this page stays intentionally simple.",
    footerEyebrow: "Gnarled Vole",
    footerTitle: "Pirate Island Pack is currently in progress.",
    footerText:
      "When the pack is released, this page can expand with real screenshots, links, and product details.",
    footerCta: "Open Unity Asset Store",
  },
  uk: {
    pageTitle: "Gnarled Vole | 3D-асети для Unity",
    metaDescription:
      "Gnarled Vole створює стилізовані 3D-асети для видавців і розробників Unity Asset Store.",
    brandAria: "Головна сторінка Gnarled Vole",
    brandKicker: "Студія асетів Unity",
    navAria: "Основна навігація",
    langLabel: "Мова",
    langSwitcherAria: "Перемикач мови",
    navAbout: "Про студію",
    navKits: "Паки",
    navWorkflow: "Фокус",
    navContact: "Контакти",
    heroEyebrow: "3D-асети для Unity Asset Store",
    heroTitle: "Gnarled Vole створює стилізовані 3D-асети для Unity.",
    heroText:
      "Зараз студія працює над своїм першим паком для майбутнього релізу в Unity Asset Store.",
    heroPrimaryCta: "Поточний пак",
    heroSecondaryCta: "Unity Asset Store",
    statStatusLabel: "Статус",
    statStatusValue: "Перший пак у розробці",
    statPlatformLabel: "Платформа",
    statPlatformValue: "Unity Asset Store",
    statFormatLabel: "Формат",
    statFormatValue: "Стилізовані 3D-асети",
    surfaceTopLabel: "Поточний стан",
    surfaceTopTitle: "Перший пак для Asset Store зараз в активній розробці.",
    surfaceBottomLabel: "У процесі",
    chipAria: "Чіпи статусу паку",
    chipPackName: "Pirate Island Pack",
    chipWip: "WIP",
    heroStatsAria: "Ключові факти про студію",
    aboutEyebrow: "Про студію",
    aboutTitle: "Проста сторінка студії, з фокусом на тому, що реально існує зараз.",
    aboutCard1Title: "Що це",
    aboutCard1Text: "Gnarled Vole — невелика студія, що створює 3D-асети для Unity Asset Store.",
    aboutCard2Title: "Що відбувається зараз",
    aboutCard2Text: "Перший продукт зараз у розробці та ще не опублікований.",
    aboutCard3Title: "Для чого ця сторінка",
    aboutCard3Text:
      "Цей лендінг — тимчасова сторінка студії, поки перший пак не буде готовий до публікації.",
    kitsEyebrow: "Поточний пак",
    kitsTitle: "Зараз у розробці лише один пак.",
    kitStatus: "WIP",
    kitTitle: "Pirate Island Pack",
    kitText:
      "Перший запланований реліз студії. Цей пак ще в процесі та поки не опублікований.",
    workflowEyebrow: "Поточний фокус",
    workflowTitle: "Лише поточний стан, без вигаданого каталогу.",
    workflowStep1Title: "Студія",
    workflowStep1Text: "Gnarled Vole позиціонується як студія для Unity Asset Store.",
    workflowStep2Title: "Пак",
    workflowStep2Text: "Єдиний анонсований пак зараз — Pirate Island Pack.",
    workflowStep3Title: "Статус",
    workflowStep3Text: "Реліз ще попереду, тому сторінка навмисно залишається простою.",
    footerEyebrow: "Gnarled Vole",
    footerTitle: "Pirate Island Pack зараз у розробці.",
    footerText:
      "Коли пак вийде, цю сторінку можна розширити реальними скриншотами, посиланнями та деталями продукту.",
    footerCta: "Відкрити Unity Asset Store",
  },
};

const languageButtons = document.querySelectorAll(".lang-option");
const languageSwitcher = document.querySelector(".lang-switcher");
const textTargets = document.querySelectorAll("[data-i18n]:not([data-i18n-attr])");
const attrTargets = document.querySelectorAll("[data-i18n-attr]");
const defaultLanguage = "en";
const savedLanguage = localStorage.getItem("site-language");
const browserLanguage = (navigator.language || "").toLowerCase();
const autoLanguage = browserLanguage.startsWith("uk") ? "uk" : defaultLanguage;
const initialLanguage = savedLanguage && translations[savedLanguage] ? savedLanguage : autoLanguage;

const setLanguage = (language) => {
  const dictionary = translations[language];

  if (!dictionary) {
    return;
  }

  document.documentElement.lang = language;

  for (const target of textTargets) {
    const key = target.dataset.i18n;
    const translated = dictionary[key];

    if (translated) {
      target.textContent = translated;
    }
  }

  for (const target of attrTargets) {
    const key = target.dataset.i18n;
    const attr = target.dataset.i18nAttr;
    const translated = dictionary[key];

    if (translated && attr) {
      target.setAttribute(attr, translated);
    }
  }

  localStorage.setItem("site-language", language);

  for (const button of languageButtons) {
    const isActive = button.dataset.lang === language;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  }

  if (languageSwitcher) {
    languageSwitcher.dataset.activeLang = language;
  }
};

for (const button of languageButtons) {
  button.addEventListener("click", () => {
    const nextLanguage = button.dataset.lang;

    if (!nextLanguage || nextLanguage === document.documentElement.lang) {
      return;
    }

    setLanguage(nextLanguage);
  });
}

setLanguage(initialLanguage);
