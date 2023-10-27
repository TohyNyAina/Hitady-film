import React, { useState } from "react";

const ApiKeyForm: React.FC<{ onSubmit: (apiKey: string) => void }> = ({ onSubmit }) => {
  const [userApiKey, setUserApiKey] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const handleApiKeySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (userApiKey.trim() !== "") {
      onSubmit(userApiKey);
      setUserApiKey("");
      setError(null);
    } else {
      setError("Veuillez entrer une clé d' API valide.");
    }
  };

  // var API_KEY="f91017a8a042da0d3b251a9187da7f97"

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
