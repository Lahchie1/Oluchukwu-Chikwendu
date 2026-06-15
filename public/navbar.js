(function () {
  var pathname = window.location.pathname;
  var isHome =
    pathname.endsWith("index.html") ||
    pathname === "/" ||
    pathname.endsWith("/") ||
    (!pathname.includes(".html") && !pathname.includes("/work"));

  var logoHref = isHome ? "#" : "index.html#finished";
  var worksHref = isHome ? "#work" : "#";

  var graphicsHref = isHome ? "#graphics" : "#graphics";
  var uiUxHref = isHome ? "#uiUx" : "#uiUx";
  var motionHref = isHome ? "#motion" : "#motion";
  var webAppHref = isHome ? "#webApp" : "#webApp";

  var aboutHref = isHome ? "#about" : "index.html#about";
  var skillsHref = isHome ? "#skills" : "index.html#skills";
  var contactHref = isHome ? "#contact" : "index.html#contact";

  var navHTML = `
    <button class="hamburger-btn" id="hamburgerBtn" aria-label="Toggle menu" aria-expanded="false">
      <span class="hamburger-line"></span>
      <span class="hamburger-line"></span>
      <span class="hamburger-line"></span>
    </button>
    <a href="${logoHref}" class="logo" id="logo-home" aria-label="Go to home page">
      <img
        src="assets/svg/logo/h_logo_lightmode.svg"
        class="logo-light"
        alt="OJ Logo"
      />
      <img
        src="assets/svg/logo/h_logo_darkmode.svg"
        class="logo-dark"
        alt="OJ Logo"
      />
    </a>
    <div class="nav-r">
      <div class="nav-dropdown">
        <a href="${worksHref}" class="nav-link nav-dropdown-toggle" id="nav-works-toggle">
          Works
          <svg class="nav-chevron" viewBox="0 0 10 6" width="10" height="10" fill="none" aria-hidden="true">
            <path d="M1 1l4 4 4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </a>
        <div class="nav-dropdown-menu">
          <a href="${graphicsHref}" data-tab="graphics" class="nav-dropdown-item">Graphics</a>
          <a href="${uiUxHref}" data-tab="uiUx" class="nav-dropdown-item">UI/UX</a>
          <a href="${motionHref}" data-tab="motion" class="nav-dropdown-item">Motion</a>
          <a href="${webAppHref}" data-tab="webApp" class="nav-dropdown-item">Web/App</a>
        </div>
      </div>
      <a href="${aboutHref}" class="nav-link-standard">About</a>
      <a href="${skillsHref}" class="nav-link-standard">Skills</a>
      <a href="${contactHref}" class="nav-link-standard">Contact</a>
      <button class="theme-toggle" id="themeBtn" onclick="toggleTheme()">
        <span class="ico" id="themeIco">☀</span>
        <span id="themeTxt">Light</span>
      </button>
    </div>
  `;

  var nav = document.getElementById("nav");
  if (nav) {
    nav.innerHTML = navHTML;

    // ── HAMBURGER TOGGLE ───────────────────────────────
    var hamburgerBtn = document.getElementById("hamburgerBtn");
    if (hamburgerBtn) {
      hamburgerBtn.addEventListener("click", function () {
        var isOpen = nav.classList.toggle("nav-open");
        hamburgerBtn.setAttribute("aria-expanded", isOpen);
      });
    }

    // Close menu when clicking a link or toggle button
    var menuLinks = nav.querySelectorAll(".nav-r a, .nav-dropdown-item, .theme-toggle");
    menuLinks.forEach(function (link) {
      link.addEventListener("click", function () {
        nav.classList.remove("nav-open");
        if (hamburgerBtn) {
          hamburgerBtn.setAttribute("aria-expanded", "false");
        }
      });
    });

    // ── LOGO HOME NAVIGATION ───────────────────────────
    var logo = document.getElementById("logo-home");
    if (logo) {
      logo.addEventListener("click", function (e) {
        if (isHome) {
          e.preventDefault();
          var animContainer = document.getElementById("anim-container");
          if (animContainer) {
            window.scrollTo({
              top: animContainer.offsetHeight - window.innerHeight,
              behavior: "smooth",
            });
          } else {
            window.scrollTo({ top: 0, behavior: "smooth" });
          }
        }
      });
    }

    // ── WORKS TOGGLE CLICK ─────────────────────────────
    var worksToggle = document.getElementById("nav-works-toggle");
    if (worksToggle) {
      worksToggle.addEventListener("click", function (e) {
        e.preventDefault();
        if (isHome) {
          var workSec = document.getElementById("work");
          if (workSec) {
            workSec.scrollIntoView({ behavior: "smooth" });
          }
        } else {
          // On other pages, smooth scroll to the top of the work page
          window.scrollTo({ top: 0, behavior: "smooth" });
        }
      });
    }

    // ── DROPDOWN ITEMS INTERACTION ─────────────────────
    var dropdownItems = nav.querySelectorAll(".nav-dropdown-item");
    dropdownItems.forEach(function (item) {
      item.addEventListener("click", function (e) {
        var tabId = item.getAttribute("data-tab");
        if (isHome) {
          e.preventDefault();
          if (window.openSkillTab) {
            window.openSkillTab(e, tabId);
          } else {
            var target = document.getElementById(tabId);
            if (target) target.scrollIntoView({ behavior: "smooth" });
          }
        } else {
          // On sub-pages (e.g. work.html), click switches tabs smooth-scrolls directly
          e.preventDefault();
          if (window.switchWorkTab) {
            window.switchWorkTab(tabId);
          } else {
            // fallback standard navigation
            window.location.href = "work.html#" + tabId;
          }
        }
      });
    });

    // ── STANDARD ANCHOR INTERCEPT ON HOME PAGE ──────────
    if (isHome) {
      var stdLinks = nav.querySelectorAll(".nav-link-standard");
      stdLinks.forEach(function (link) {
        link.addEventListener("click", function (e) {
          var href = link.getAttribute("href");
          if (href.startsWith("#")) {
            var target = document.querySelector(href);
            if (target) {
              e.preventDefault();
              target.scrollIntoView({ behavior: "smooth" });
            }
          }
        });
      });
    }

    // ── SYNC ACTIVE STATE OF THEME SWITCHER ICON ───────
    // Initial UI state setup for the toggler from data-theme
    var currentTheme =
      document.documentElement.getAttribute("data-theme") || "dark";
    var themeIco = document.getElementById("themeIco");
    var themeTxt = document.getElementById("themeTxt");
    if (themeIco && themeTxt) {
      var isDark = currentTheme === "dark";
      themeIco.textContent = isDark ? "☀" : "☾";
      themeTxt.textContent = isDark ? "Light" : "Dark";
    }
  }

  // ── PREMIUM FOOTER DYNAMIC WORDS (Typewriter Style) ──
  window.addEventListener("DOMContentLoaded", function () {
    var banner = document.querySelector(".footer-banner");
    if (!banner) return;

    var wordsAttr = banner.getAttribute("data-words");
    var words = wordsAttr
      ? wordsAttr.split(",").map(function (w) {
          return w.trim();
        })
      : ["Graphics", "UI/UX", "Web/App", "Motion"];

    var textElements = document.querySelectorAll(
      ".premium-footer .banner-text",
    );
    textElements.forEach(function (el) {
      el.innerHTML = '<span class="text-holder"></span>';
    });

    var holders = document.querySelectorAll(".premium-footer .text-holder");
    if (holders.length === 0) return;

    var currentText = "";
    var isDeleting = false;
    var wordIdx = 0;

    function type() {
      var fullWord = words[wordIdx];

      if (isDeleting) {
        currentText = fullWord.substring(0, currentText.length - 1);
      } else {
        currentText = fullWord.substring(0, currentText.length + 1);
      }

      holders.forEach(function (holder) {
        holder.textContent = currentText;
      });

      var typeSpeed = isDeleting ? 40 : 80;

      if (!isDeleting && currentText === fullWord) {
        typeSpeed = 1800; // Pause at end of word
        isDeleting = true;
      } else if (isDeleting && currentText === "") {
        isDeleting = false;
        wordIdx = (wordIdx + 1) % words.length;
        typeSpeed = 300; // Pause before typing next word
      }

      setTimeout(type, typeSpeed);
    }

    type();
  });
})();
