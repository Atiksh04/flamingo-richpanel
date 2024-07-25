export const fetchNews = async ({ q = "news", sortBy = "popularity" }) => {
  try {
    // const from = "2024-06-23";
    const response = await fetch(
      `https://newsapi.org/v2/everything?q=${encodeURIComponent(
        q
      )}&searchIn=title,description,content&sortBy=${sortBy}&apiKey=f11fa87c8b2a4c3c8c0eeb6c129294d8&sources=bbc-news`
    );

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();

    if (data.status !== "ok") {
      throw new Error(data.message || "Error fetching news");
    }

    return data.articles;
  } catch (error) {
    throw new Error(`Failed to fetch news: ${error.message}`);
  }
};

export const fetchTopHeadlines = async ({category = "general"}) => {
  try {
    const response = await fetch(`https://newsapi.org/v2/top-headlines/sources?apiKey=f11fa87c8b2a4c3c8c0eeb6c129294d8&category=${category}&language=en`);
    if (!response.ok) {
      throw new Error('Failed to fetch top headlines.');
    }
    const data = await response.json();
    return data.sources;
  } catch (error) {
    throw new Error(error.message);
  }
};