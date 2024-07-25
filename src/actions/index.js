export const fetchNews = async ({ q = "news", sortBy = "popularity", pageSize = 50, page = 1 }) => {
  try {
    const response = await fetch(
      `https://newsapi.org/v2/everything?q=${encodeURIComponent(
        q
      )}&searchIn=title,description,content&sortBy=${sortBy}&apiKey=5523f2ca61ae4761aaeb9a26a175d00d&sources=bbc-news&pageSize=${pageSize}&page=${page}`
    );

    if (!response.ok) {
      // Extract the error details if available
      const errorDetails = await response.json();
      const errorMessage = errorDetails.message || 'Unknown error occurred';
      
      // Specific handling for rate limit errors
      if (errorMessage.includes('too many requests')) {
        throw new Error('You have exceeded the API request limit. Please try again later.');
      }

      // Throwing a general error if no specific handling applies
      throw new Error(`Failed to fetch top headlines: ${errorMessage}`);
    }
    
    const data = await response.json();

    if (data.status !== "ok") {
      throw new Error(data.message || 'Error fetching news');
    }

    return data;
  } catch (error) {
    // Log the full error for debugging purposes
    console.error('Error fetching news:', error);
    throw new Error(`Failed to fetch news: ${error.message}`);
  }
};



export const fetchTopHeadlines = async ({ category = "general" }) => {
  try {
    const response = await fetch(
      `https://newsapi.org/v2/top-headlines/sources?apiKey=5523f2ca61ae4761aaeb9a26a175d00d&category=${category}&language=en`
    );

    if (!response.ok) {
      // Extract the error details if available
      const errorDetails = await response.json();
      const errorMessage = errorDetails.message || 'Unknown error occurred';
      if (errorMessage.includes('too many requests')) {
        throw new Error('You have exceeded the API request limit. Please try again later.');
      }

      throw new Error(`Failed to fetch top headlines: ${errorMessage}`);
    }
    const data = await response.json();

    return data.sources;
  } catch (error) {
    console.error('Error fetching top headlines:', error);
    throw new Error(`Failed to fetch top headlines: ${error.message}`);
  }
};
