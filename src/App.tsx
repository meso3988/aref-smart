import React from 'react';
import { ChakraProvider, Box, Text } from '@chakra-ui/react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import MotivationalWordsPage from './pages/MotivationalWordsPage';
import SelfAssessmentPage from './pages/SelfAssessmentPage';
import PodcastPage from './pages/PodcastPage';
import GamesPage from './pages/GamesPage';
import KnowledgeGamePage from './pages/KnowledgeGamePage';
import DiagnosticGuidePage from './pages/DiagnosticGuidePage';
import AddictionDiagnosticPage from './pages/AddictionDiagnosticPage';
import ChatPage from './pages/ChatPage';
import PharmacistPage from './pages/PharmacistPage';
import AboutUsPage from './pages/AboutUsPage';
import StoryPage from './pages/StoryPage';
import StoriesPage from './pages/StoriesPage';
import AskPage from './pages/AskPage';
import RelaxPage from './pages/RelaxPage';
import ShareStoryPage from './pages/ShareStoryPage';

function App() {
  return (
    <ChakraProvider>
      <Box p={4}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/motivational-words" element={<MotivationalWordsPage />} />
          <Route path="/self-assessment" element={<SelfAssessmentPage />} />
          <Route path="/podcast" element={<PodcastPage />} />
          <Route path="/games" element={<GamesPage />} />
          <Route path="/games/knowledge" element={<KnowledgeGamePage />} />
          <Route path="/diagnostic-guide" element={<DiagnosticGuidePage />} />
          <Route path="/chat" element={<ChatPage />} />
          <Route path="/pharmacist" element={<PharmacistPage />} />
          <Route path="/about" element={<AboutUsPage />} />
          <Route path="/story" element={<StoryPage />} />
          <Route path="/stories" element={<StoriesPage />} />
          <Route path="/ask" element={<AskPage />} />
          <Route path="/relax" element={<RelaxPage />} />
          <Route path="/share-story" element={<ShareStoryPage />} />
          <Route path="*" element={<Text>404 - الصفحة غير موجودة</Text>} />
        </Routes>
      </Box>
    </ChakraProvider>
  );
}

export default App;
