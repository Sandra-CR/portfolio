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

  window.addEventListener("load", () => {
    setCurrentYear();
    setupInfiniteScroll();
  });

  window.addEventListener("resize", setupInfiniteScroll);
})();
