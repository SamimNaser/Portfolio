export async function fetchCurrentlyBuilding() {
  const CACHE_KEY = "portfolio_currently_building_v1";
  const CACHE_TTL = 1000 * 60 * 60; // 1 hour

  try {
    // 1) Check cache
    const cached = localStorage.getItem(CACHE_KEY);
    if (cached) {
      const parsed = JSON.parse(cached);
      if (
        parsed.data &&
        Date.now() - parsed.timestamp < CACHE_TTL
      ) {
        return parsed.data;
      }
    }

    // 2) Fetch from GitHub
    const res = await fetch(
      "https://api.github.com/users/SamimNaser/repos?per_page=100&sort=updated",
      {
        headers: {
          Accept: "application/vnd.github.mercy-preview+json",
        },
      },
    );

    if (!res.ok) {
      throw new Error("Failed to fetch repos");
    }

    const data = await res.json();

    // 3) Filter by "currently-building" topic, pick most recently updated
    const match = data.find((repo) =>
      repo.topics?.includes("currently-building"),
    );

    const result = match
      ? { name: match.name, url: match.html_url }
      : null;

    // 4) Cache
    localStorage.setItem(
      CACHE_KEY,
      JSON.stringify({ timestamp: Date.now(), data: result }),
    );

    return result;
  } catch (error) {
    console.error("Failed to fetch currently building:", error);

    // Fallback to cache
    const cached = localStorage.getItem(CACHE_KEY);
    if (cached) {
      return JSON.parse(cached).data;
    }
    return null;
  }
}
