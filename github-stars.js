(function initGitHubStars() {
  const CACHE_PREFIX = "homepage:github-stars:";
  const REFRESH_MS = 15 * 60 * 1000;
  const REQUEST_TIMEOUT_MS = 8000;
  const numberFormat = new Intl.NumberFormat("en-US");
  const repositories = new Map();

  document.querySelectorAll("a[data-github-repo]").forEach(function (link) {
    const repo = link.dataset.githubRepo;
    if (!repositories.has(repo)) {
      repositories.set(repo, { links: [], cache: null, pending: false, lastAttempt: 0 });
    }
    repositories.get(repo).links.push(link);
  });

  if (repositories.size === 0) return;

  function validCache(value) {
    return value && Number.isSafeInteger(value.count) && value.count >= 0 &&
      Number.isFinite(value.updatedAt) && value.updatedAt > 0 && value.updatedAt <= Date.now();
  }

  function showCount(repo, entry) {
    const formatted = numberFormat.format(entry.cache.count);
    entry.links.forEach(function (link) {
      link.querySelector(".github-star-count").textContent = formatted;
      link.querySelector(".github-stars").hidden = false;
      link.setAttribute("aria-label", "Code on GitHub, " + formatted + " stars");
      link.title = repo + " · " + formatted + " stars · Updated " +
        new Date(entry.cache.updatedAt).toLocaleString();
    });
  }

  repositories.forEach(function (entry, repo) {
    try {
      const cached = JSON.parse(localStorage.getItem(CACHE_PREFIX + repo));
      if (validCache(cached)) {
        entry.cache = cached;
        showCount(repo, entry);
      }
    } catch (_) {
      // Storage can be unavailable or contain an invalid entry; fetching still works.
    }
  });

  async function refreshRepository(repo, entry) {
    const now = Date.now();
    if (entry.pending || (entry.cache && now - entry.cache.updatedAt < REFRESH_MS) ||
        (entry.lastAttempt && now - entry.lastAttempt < REFRESH_MS)) return;

    entry.pending = true;
    entry.lastAttempt = now;
    const controller = new AbortController();
    const timeout = setTimeout(function () { controller.abort(); }, REQUEST_TIMEOUT_MS);

    try {
      const response = await fetch("https://api.github.com/repos/" + repo, {
        headers: { Accept: "application/vnd.github+json" },
        credentials: "omit",
        signal: controller.signal
      });
      if (!response.ok) return;

      const data = await response.json();
      if (!Number.isSafeInteger(data.stargazers_count) || data.stargazers_count < 0) return;

      entry.cache = { count: data.stargazers_count, updatedAt: Date.now() };
      showCount(repo, entry);
      try {
        localStorage.setItem(CACHE_PREFIX + repo, JSON.stringify(entry.cache));
      } catch (_) {
        // Keep the current count in memory when storage is disabled or full.
      }
    } catch (_) {
      // Leave cached stars (or the plain Code link) intact when offline or rate-limited.
    } finally {
      clearTimeout(timeout);
      entry.pending = false;
    }
  }

  function refreshStars() {
    if (document.hidden) return;
    repositories.forEach(function (entry, repo) {
      refreshRepository(repo, entry);
    });
  }

  refreshStars();
  setInterval(refreshStars, 60 * 1000);
  document.addEventListener("visibilitychange", refreshStars);
})();
