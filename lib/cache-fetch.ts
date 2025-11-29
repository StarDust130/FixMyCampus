// lib/cache-fetch.ts
const CACHE_KEY = "fmc_issues_cache";
const CACHE_TIMEOUT = 60000; // 60 seconds validity

export const fetchIssuesWithCache = async (
  setIssues: Function,
  setIsLoading: Function
) => {
  const cachedData = localStorage.getItem(CACHE_KEY);
  const cacheTime = localStorage.getItem(`${CACHE_KEY}_time`);
  const now = Date.now();
  let cacheHit = false;

  // 1. Check Local Cache (Instant Load)
  if (cachedData && cacheTime && now - parseInt(cacheTime) < CACHE_TIMEOUT) {
    setIssues(JSON.parse(cachedData));
    setIsLoading(false);
    cacheHit = true;
  } else {
    setIsLoading(true);
  }

  // 2. Fetch Fresh Data (Runs asynchronously)
  try {
    const res = await fetch("/api/reports");
    const freshData = await res.json();

    if (Array.isArray(freshData)) {
      // Only update UI if fresh data is different or if we are loading for the first time
      if (!cacheHit || JSON.stringify(freshData) !== cachedData) {
        setIssues(freshData);
        // Update Local Cache
        localStorage.setItem(CACHE_KEY, JSON.stringify(freshData));
        localStorage.setItem(`${CACHE_KEY}_time`, now.toString());
      }
    }
  } catch (e) {
    console.error("Network fetch failed:", e);
  } finally {
    // Ensure loading spinner is turned off
    setIsLoading(false);
  }
};
