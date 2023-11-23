import React, { useState } from "react";
import "../src/styles/movie-search.css"

const ApiKeyForm: React.FC<{ onSubmit: (apiKey: string) => void }> = ({ onSubmit }) => {
  const [userApiKey, setUserApiKey] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const handleApiKeySubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (userApiKey.trim() !== "") {
      try {
        const response = await fetch(`https://api.themoviedb.org/3/configuration?api_key=${userApiKey}`);
        if (response.ok) {
          // La clé API est correcte
          onSubmit(userApiKey);
          setUserApiKey("");
          setError(null);
        } else {
          setError("Clé d' API incorrecte. Veuillez entrer une clé valide.  Essayer avec ca '7733263982f2fbede06debb35a9009ff' ou avec votre propre clé d'API");
        }
      } catch (error) {
        setError("Erreur lors de la vérification de la clé API. Essayer avec ca '7733263982f2fbede06debb35a9009ff' ou avec votre propre clé d'API");
      }
    } else {
      setError("Veuillez entrer une clé d'API valide.");
    }
  };

  return (
    <div>
      <h2 className="api-key-form">Entrez votre clé API</h2>
      <form onSubmit={handleApiKeySubmit} className="api-key-form">
        <input
          type="text"
          placeholder="Votre clé API"
          value={userApiKey}
          onChange={(e) => setUserApiKey(e.target.value)}
        /> <br /> <br />
        {error && <div className="error-message">{error}</div>}
        <button type="submit">Se Connecter</button>
      </form>
    </div>
  );
};

export default ApiKeyForm;
