// export const fetchNews = async () => {
//   const apiKey = "f11fa87c8b2a4c3c8c0eeb6c129294d8";
//   const query = 'news';
//   const from = "2024-06-23";
//   const sortBy = "popularity";
//   const url = `https://newsapi.org/v2/everything?q=${query}&from=${from}&sortBy=${sortBy}&apiKey=${apiKey}&sources=bbc-news`;

//   try {
//     const response = await fetch(url);
//     if (!response.ok) {
//       throw new Error("Network response was not ok");
//     }
//     const data = await response.json();
//     return data.articles;
//   } catch (error) {
//     console.error("Error fetching news:", error);
//     return [];
//   }
// };

export const fetchNews = async ({ q = "news", sortBy = "popularity" }) => {
  try {
    const from = "2024-06-23";
    const response = await fetch(
      `https://newsapi.org/v2/everything?q=${encodeURIComponent(
        q
      )}&from=${from}&sortBy=${sortBy}&apiKey=f11fa87c8b2a4c3c8c0eeb6c129294d8&sources=bbc-news`
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
