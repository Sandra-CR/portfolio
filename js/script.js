(() => {
  // Dynamic year
  const setCurrentYear = () => {
    const yearEl = document.getElementById("year");
    if (yearEl) {
      yearEl.textContent = new Date().getFullYear();
    }
  };

  // Mobile nav toggle
  const setupMobileNav = () => {
    const toggle = document.getElementById("nav-toggle");
    const menu = document.getElementById("nav-menu");
    const closeBtn = document.getElementById("nav-close");
    if (!toggle || !menu) return;

    const links = Array.from(menu.querySelectorAll("a"));

    const closeMenu = () => {
      menu.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
      document.body.classList.remove("nav-open");
    };

    toggle.addEventListener("click", () => {
      const isOpen = menu.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
      document.body.classList.toggle("nav-open", isOpen);
    });

    links.forEach((link) => {
      link.addEventListener("click", closeMenu);
    });

    if (closeBtn) {
      closeBtn.addEventListener("click", (event) => {
        event.preventDefault();
        closeMenu();
      });
    }

    window.addEventListener("resize", () => {
      if (window.innerWidth >= 768) {
        closeMenu();
      }
    });
  };

  window.addEventListener("load", () => {
    setCurrentYear();
    setupMobileNav();
  });
})();
