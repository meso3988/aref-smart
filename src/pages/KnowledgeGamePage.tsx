import React from 'react';
import { Box, Container, Heading } from '@chakra-ui/react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { KnowledgeBallGame } from '../components/game/KnowledgeBallGame/KnowledgeBallGame';
import { questionsData } from '../data/questions';

const KnowledgeGamePage: React.FC = () => {
  return (
    <Box>
      <Navbar />
      <Container maxW="container.xl" py={8}>
        <Heading textAlign="center" mb={8}>لعبة كرة المعرفة</Heading>
        <KnowledgeBallGame questionsData={questionsData} />
      </Container>
      <Footer />
    </Box>
  );
};

export default KnowledgeGamePage;
