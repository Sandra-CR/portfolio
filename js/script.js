(() => {
  // Dynamic year
  const setCurrentYear = () => {
    const yearEl = document.getElementById("year");
    if (yearEl) {
      yearEl.textContent = new Date().getFullYear();
    }
  };

  // Infinite scroll (index -> environment section)
  const setupInfiniteScroll = () => {
    const containers = document.querySelectorAll(".infinite-scroll");
    if (!containers.length) return;

    containers.forEach((container) => {
      const lists = Array.from(container.querySelectorAll("ul"));
      if (!lists.length) return;

      const baseList = lists[0];
      lists.slice(1).forEach((ul) => ul.remove());

      const templateItems = Array.from(baseList.children).map((li) => li.cloneNode(true));
      if (!templateItems.length) return;

      const setWidth = baseList.scrollWidth + 20;
      if (!setWidth) return;

      const minWidth = container.clientWidth * 2 + setWidth;
      let currentWidth = setWidth;

      while (currentWidth < minWidth) {
        templateItems.forEach((item) => baseList.appendChild(item.cloneNode(true)));
        currentWidth = baseList.scrollWidth;

        if (baseList.children.length > templateItems.length * 6) {
          break;
        }
      }

      if (baseList.children.length === templateItems.length) {
        templateItems.forEach((item) => baseList.appendChild(item.cloneNode(true)));
      }

      const speed = 35;
      const duration = Math.max(12, Math.round(setWidth / speed));
      container.style.setProperty("--loop-width", `${Math.round(setWidth)}px`);
      container.style.setProperty("--scroll-duration", `${duration}s`);
    });
  };

  // Fullscreen image overlay for project cards
  const setupProjectImageModal = () => {
    const overlay = document.querySelector(".image-overlay");
    const overlayImg = overlay?.querySelector(".image-overlay__img");
    const closeBtn = overlay?.querySelector(".image-overlay__close");
    const plusButtons = document.querySelectorAll(".project-card .plus-btn");

    if (!overlay || !overlayImg || !closeBtn || !plusButtons.length) {
      return;
    }

    const toggleOverlay = (shouldShow) => {
      overlay.classList.toggle("is-visible", shouldShow);
      overlay.setAttribute("aria-hidden", shouldShow ? "false" : "true");
      document.body.classList.toggle("overlay-open", shouldShow);
    };

    const closeOverlay = () => {
      toggleOverlay(false);
      setTimeout(() => {
        overlayImg.src = "";
        overlayImg.alt = "";
      }, 250);
    };

    const openOverlay = (img) => {
      overlayImg.src = img.src;
      overlayImg.alt = img.alt || "";
      toggleOverlay(true);
    };

    plusButtons.forEach((btn) => {
      btn.addEventListener("click", (event) => {
        event.preventDefault();
        const cardImg = btn.closest(".project-card")?.querySelector("img");
        if (cardImg) {
          openOverlay(cardImg);
        }
      });
    });

    closeBtn.addEventListener("click", (event) => {
      event.preventDefault();
      closeOverlay();
    });

    overlay.addEventListener("click", (event) => {
      if (event.target === overlay) {
        closeOverlay();
      }
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && overlay.classList.contains("is-visible")) {
        closeOverlay();
      }
    });
  };

  // Project filter based on the first badge of each card
  const setupProjectFilter = () => {
    const filter = document.querySelector(".project-filter");
    if (!filter) return;

    const buttons = Array.from(filter.querySelectorAll("button"));
    const cards = Array.from(document.querySelectorAll(".project-card"));
    if (!buttons.length || !cards.length) return;

    const baseNormalize = (text = "") =>
      text
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase();

    const categorySlug = (text = "") => {
      const raw = baseNormalize(text);
      const compact = raw.replace(/#/g, "sharp");
      if (compact.includes("tous")) return "tous";
      if (compact.includes("projet") && compact.includes("web")) return "projet-web";
      if (compact.includes("logiciel") && compact.includes("c")) return "logiciel-csharp";
      if (compact.includes("maquette")) return "maquette";
      if (compact.includes("modele") || compact.includes("modle") || compact.includes("modcule")) return "modele-3d";

      return compact
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "")
        .replace(/s$/, "");
    };

    const items = cards.map((card) => {
      const wrapper =
        card.closest(".col-6") || card.closest(".col-lg-4") || card.parentElement;
      const badge = card.querySelector(".badge");
      const category = categorySlug(badge?.textContent.trim() || "");
      return { wrapper, category };
    });

    const setActiveButton = (activeBtn) => {
      buttons.forEach((btn) => btn.classList.toggle("active", btn === activeBtn));
    };

    const applyFilter = (filterSlug) => {
      items.forEach(({ wrapper, category }) => {
        const visible = filterSlug === "tous" || filterSlug === category;
        if (wrapper) {
          wrapper.classList.toggle("project-card-hidden", !visible);
        }
      });
    };

    buttons.forEach((btn) => {
      btn.addEventListener("click", () => {
        const slug = categorySlug(btn.textContent.trim());
        setActiveButton(btn);
        applyFilter(slug);
      });
    });

    const initial = filter.querySelector(".active") || buttons[0];
    if (initial) {
      const initialSlug = categorySlug(initial.textContent.trim());
      setActiveButton(initial);
      applyFilter(initialSlug);
    }
  };

  // Load functions on load
  window.addEventListener("load", () => {
    setCurrentYear();
    setupInfiniteScroll();
    setupProjectImageModal();
    setupProjectFilter();
  });

  window.addEventListener("resize", setupInfiniteScroll);
})();
