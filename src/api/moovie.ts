export const searchMoviesWithUserApiKey = async (moviename: string, userApiKey: string) => {
  try {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${userApiKey}`,
      },
    };

    const response = await fetch(
      `https://api.themoviedb.org/3/search/movie?query=${moviename}&api_key=${userApiKey}`,
      options
    );

    if (!response.ok) {
      throw new Error(`Request failed with status: ${response.status}`);
    }

    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error("Error in searchMoviesWithUserApiKey:", error);
    throw error;
  }
};
