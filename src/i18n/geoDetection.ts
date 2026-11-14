export type DetectedResult = {
  language: "id" | "en";
  countryCode: string;
};

export async function detectUserCountry(): Promise<DetectedResult> {
  // 1. Primary: api.country.is (fast, free, CORS-friendly)
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 2000);
    const res = await fetch("https://api.country.is", {
      signal: controller.signal,
      headers: { Accept: "application/json" },
    });
    clearTimeout(timeoutId);

    if (res.ok) {
      const data = await res.json();
      const country = (data.country || "").toUpperCase();
      if (country) {
        return {
          language: country === "ID" ? "id" : "en",
          countryCode: country,
        };
      }
    }
  } catch {
    // Continue to fallback
  }

  // 2. Secondary fallback: ipapi.co
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 1800);
    const res = await fetch("https://ipapi.co/json/", {
      signal: controller.signal,
    });
    clearTimeout(timeoutId);

    if (res.ok) {
      const data = await res.json();
      const country = (data.country_code || "").toUpperCase();
      if (country) {
        return {
          language: country === "ID" ? "id" : "en",
          countryCode: country,
        };
      }
    }
  } catch {
    // Continue to browser fallback
  }

  // 3. Fallback to browser locale
  const browserLang = (navigator.language || "").toLowerCase();
  const isIndonesian = browserLang.startsWith("id");
  return {
    language: isIndonesian ? "id" : "en",
    countryCode: isIndonesian ? "ID" : "GLOBAL",
  };
}
