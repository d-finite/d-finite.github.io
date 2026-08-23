(function initSectionNavigation() {
  const nav = document.querySelector(".section-nav");
  const list = document.getElementById("section-nav-list");
  const track = nav && nav.querySelector(".section-nav__track");
  const sections = Array.from(document.querySelectorAll("[data-nav-section]"));

  if (!nav || !list || !track || sections.length === 0) return;

  const compactLayout = window.matchMedia("(max-width: 1170px)");
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const links = sections.map(function (section, index) {
    const heading = section.querySelector(".section-title");
    const label = section.dataset.navLabel || (heading && heading.textContent.trim());
    const item = document.createElement("li");
    const link = document.createElement("a");

    item.className = "section-nav__item";
    item.style.setProperty("--nav-index", index);
    link.className = "section-nav__link";
    link.href = "#" + section.id;
    link.textContent = label;
    item.appendChild(link);
    list.appendChild(item);

    return { section: section, item: item, link: link };
  });

  let activeId = "";
  let scrollTicking = false;

  function documentTop(element) {
    return element.getBoundingClientRect().top + window.scrollY;
  }

  function positionIndicator(item) {
    nav.style.setProperty("--indicator-y", item.offsetTop + "px");
    nav.style.setProperty("--indicator-height", item.offsetHeight + "px");
    nav.style.setProperty("--indicator-x", item.offsetLeft + "px");
    nav.style.setProperty("--indicator-width", item.offsetWidth + "px");
  }

  function revealCompactLink(item) {
    if (!compactLayout.matches) return;

    const targetLeft = item.offsetLeft - (track.clientWidth - item.offsetWidth) / 2;
    track.scrollTo({
      left: Math.max(0, targetLeft),
      behavior: reducedMotion.matches ? "auto" : "smooth"
    });
  }

  function setActive(entry) {
    activeId = entry.section.id;
    links.forEach(function (candidate) {
      const isActive = candidate === entry;
      candidate.link.classList.toggle("is-active", isActive);
      candidate.section.classList.toggle("is-current", isActive);
      if (isActive) {
        candidate.link.setAttribute("aria-current", "location");
      } else {
        candidate.link.removeAttribute("aria-current");
      }
    });

    positionIndicator(entry.item);
    revealCompactLink(entry.item);
  }

  function syncActiveSection() {
    const ordered = links.slice().sort(function (a, b) {
      return documentTop(a.section) - documentTop(b.section);
    });
    const navHeight = compactLayout.matches ? nav.getBoundingClientRect().height : 0;
    const probe = window.scrollY + navHeight + 28;
    const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 8;
    let current = ordered[0];

    ordered.forEach(function (entry) {
      if (documentTop(entry.section) <= probe) current = entry;
    });
    if (atBottom) current = ordered[ordered.length - 1];

    if (current.section.id !== activeId) {
      setActive(current);
    } else {
      positionIndicator(current.item);
    }
    scrollTicking = false;
  }

  function scheduleSync() {
    if (scrollTicking) return;
    scrollTicking = true;
    window.requestAnimationFrame(syncActiveSection);
  }

  links.forEach(function (entry) {
    entry.link.addEventListener("click", function (event) {
      event.preventDefault();
      entry.section.scrollIntoView({
        behavior: reducedMotion.matches ? "auto" : "smooth",
        block: "start"
      });
      window.history.pushState(null, "", entry.link.hash);
      setActive(entry);
      if (event.detail > 0) entry.link.blur();
    });
  });

  window.addEventListener("scroll", scheduleSync, { passive: true });
  window.addEventListener("resize", scheduleSync, { passive: true });
  window.addEventListener("hashchange", scheduleSync);
  window.addEventListener("pageshow", scheduleSync);
  compactLayout.addEventListener("change", scheduleSync);

  syncActiveSection();
  nav.classList.add("is-ready");

  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(scheduleSync);
  }
})();
