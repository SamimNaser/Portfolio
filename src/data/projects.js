import { getTechIcon } from "./techIcons";

const getStatus = (repo) => {
  if (repo.topics?.includes("in-progress")) return "Building";
  if (repo.topics?.includes("completed")) return "Completed";
  return "Completed";
};

export async function fetchProjects() {
  const CACHE_KEY = "portfolio_projects_cache_v2";
  const CACHE_TTL = 1000 * 60 * 60; // 1 hour

  try {
    // 1) Check cache
    const cached = localStorage.getItem(CACHE_KEY);
    if (cached) {
      const parsed = JSON.parse(cached);
      console.log("Using cached projects:", parsed.data);

      // Ignore empty cached data
      if (
        parsed.data &&
        parsed.data.length > 0 &&
        Date.now() - parsed.timestamp < CACHE_TTL
      ) {
        return parsed.data;
      }
    }

    // 2) Fetch from GitHub
    const res = await fetch(
      "https://api.github.com/users/SamimNaser/repos?per_page=100",
      {
        headers: {
          Accept: "application/vnd.github.mercy-preview+json",
        },
      },
    );

    if (!res.ok) {
      if (res.status === 403) {
        console.warn("GitHub API rate limit exceeded");
      }
      throw new Error("Failed to fetch projects");
    }

    const data = await res.json();
    console.log("GitHub repos:", data);

    // 3) Transform
    const filtered = data.filter((repo) => repo.topics?.includes("portfolio"));

    const result = filtered.map((repo) => {
      const techTopics = repo.topics?.filter(
        (t) =>
          !["portfolio", "completed", "in-progress", "currently-building"].includes(t),
      );
      const tech = techTopics
        .map((topic) => ({
          name: topic,
          icon: getTechIcon(topic),
        }))
        .filter((t) => t.icon !== null);

      return {
        title: repo.name,
        subtitle: repo.language || "Project",
        description: repo.description || "No description provided",
        tech: tech,
        status: getStatus(repo),
        github: repo.html_url,
        demo: repo.homepage || null,
        image: `https://raw.githubusercontent.com/SamimNaser/${repo.name}/main/preview.png`,
      };
    });

    // 4) Save to cache
    // Only cache if we have valid data
    if (result.length > 0) {
      localStorage.setItem(
        CACHE_KEY,
        JSON.stringify({
          timestamp: Date.now(),
          data: result,
        }),
      );
    }

    return result;
  } catch (error) {
    console.error(error);

    // 5) Fallback to cache if available
    const cached = localStorage.getItem(CACHE_KEY);
    if (cached) {
      const parsed = JSON.parse(cached);
      return parsed.data;
    }

    return [];
  }
}
