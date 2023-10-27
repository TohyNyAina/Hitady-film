import React, { useState, useEffect } from "react";
import './styles/movie-search.css';
import ApiKeyForm from "./ApiKeyForm"; // Importez votre composant ApiKeyForm
import { searchMoviesWithUserApiKey } from "./api/moovie";

const App: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [movies, setMovies] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [apiKey, setApiKey] = useState<string | null>(null);


  useEffect(() => {
    const savedApiKey = localStorage.getItem('apikey');
    if (savedApiKey) {
      setApiKey(savedApiKey);
    }
  }, []);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim() !== "" && apiKey !== null) {
      setIsLoading(true);
      setError(null);

      try {
        const moviedata = await searchMoviesWithUserApiKey(searchTerm, apiKey);
        setMovies(moviedata);
        setSearchTerm('');
      } catch (error) {
        console.error("Error in handleSearch:", error);
        setError("API Key invalide");
      } finally {
        setIsLoading(false);
      }
    }
  };

  function truncateOverview(overview: string, wordLimit: number): string {
    const words = overview.split(" ");
  
    if (words.length <= wordLimit) {
      return overview;
    }
  
    const truncatedText = words.slice(0, wordLimit).join(" ");
    return `${truncatedText} ...`;
  }

  return (
    <div>
      {apiKey ? (
        <div>
          <h1>Rechercher votre film préféré?</h1>
          <div className="search-bar">
            <form onSubmit={handleSearch}>
              <input
                type="text"
                placeholder="Enter a movie name"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              {isLoading ? (
                <button disabled>Searching...</button>
              ) : (
                <button type="submit">Search</button>
              )}
            </form>
          </div>
          <hr />

          {error && <div className="error-message">{error}</div>}

          <div
            style={{
              marginTop: "40px",
              justifyContent: "space-around",
              display: "flex",
              flexWrap: "wrap",
              width: "90%",
              margin: "auto",
            }}
          >
            {movies?.map((movie: any, index: number) => {
              return (
                <div
                  key={index}
                  style={{
                    width: "400px",
                    height: "330px",
                    border: "2px solid #000000",
                    borderRadius: "5px",
                    margin: "30px 10px",
                  }}
                >
                  <div style={{ padding: "5px 10px" }}>
                    <p style={{ fontWeight: "bold", textTransform: "capitalize" }}>
                      {" "}
                      {movie.title} (Original title: {movie.original_title}):{" "}
                      {movie.original_language}
                    </p>
                    <img
                      style={{ width: "200px", height: "200px" }}
                      src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                      alt="movie"
                    />
                    <div>
                      <b>Overview: </b> {truncateOverview(movie.overview, 10)}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <ApiKeyForm onSubmit={setApiKey} />
      )}
    </div>
  );
};

export default App;
