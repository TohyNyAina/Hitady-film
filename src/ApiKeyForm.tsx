import React, { useState } from "react";

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
          setError("Clé API incorrecte. Veuillez entrer une clé valide.");
        }
      } catch (error) {
        setError("Erreur lors de la vérification de la clé API.");
      }
    } else {
      setError("Veuillez entrer une clé d'API valide.");
    }
  };

  return (
    <div>
      <h2>Entrez votre clé API</h2>
      <form onSubmit={handleApiKeySubmit} className="api-key-form">
        <input
          type="text"
          placeholder="Votre clé API"
          value={userApiKey}
          onChange={(e) => setUserApiKey(e.target.value)}
        />
        {error && <div className="error-message">{error}</div>}
        <button type="submit">Soumettre</button>
      </form>
    </div>
  );
};

export default ApiKeyForm;
