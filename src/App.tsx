import React, { useState, useEffect, useCallback } from 'react';
import { getNextScreen } from './services/geminiService';
import type { ApiResponse } from './types/index';
import { CATALOGUE } from './constants/catalogue';

// Import screens from the new feature-based structure
import AccueilScreen from './screens/accueil';
import GalerieScreen from './screens/galerie';
import AtelierScreen from './screens/atelier';
import ChatScreen from './screens/chat';

import Loading from './components/shared/Loading';

const App: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<ApiResponse | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchScreen = useCallback(async (userInput: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const screenData = await getNextScreen(userInput);
      setCurrentScreen(screenData);
    } catch (e) {
      setError('Failed to communicate with the guide. Please try again.');
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    // Initial load
    fetchScreen("Bonjour, je suis un visiteur du kiosque et je commence l'expérience.");
  }, [fetchScreen]);

  const handleInteraction = (userInput: string) => {
    fetchScreen(userInput);
  };

  const renderContent = () => {
    if (isLoading) {
      return <Loading />;
    }

    if (error) {
      return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white p-4">
          <p className="text-xl text-red-400">{error}</p>
          <button
            onClick={() => fetchScreen("Bonjour, je recommence.")}
            className="mt-4 px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-full text-lg font-semibold transition-colors"
          >
            Recommencer
          </button>
        </div>
      );
    }
    
    if (!currentScreen) {
      return null;
    }

    // Render the correct screen component based on the API response
    switch (currentScreen.screen) {
      case 'galerie':
        return <GalerieScreen data={currentScreen} onChipClick={handleInteraction} oeuvres={CATALOGUE.oeuvres} />;
      case 'atelier_hub':
      case 'jeu':
      case 'atelier':
      case 'resultat':
        return <AtelierScreen data={currentScreen} onChipClick={handleInteraction} />;
      case 'chat':
      case 'citations':
        return <ChatScreen data={currentScreen} onChipClick={handleInteraction} />;
      case 'accueil':
      case 'detail_oeuvre':
      case 'heritage':
      default:
        return <AccueilScreen data={currentScreen} onChipClick={handleInteraction} />;
    }
  };

  return (
    <main className="bg-gray-900 text-white min-h-screen w-full antialiased">
      {renderContent()}
    </main>
  );
};

export default App;