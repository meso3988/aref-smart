import React from 'react';
import { Box, Heading, SimpleGrid, Button, Text, Container, useColorModeValue, Image, Icon, VStack, HStack } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { FaBrain, FaRunning, FaGamepad, FaPlay } from 'react-icons/fa';

// تكوين روابط Cloudinary
const CLOUDINARY_URL = `https://res.cloudinary.com/dzafrepxq/image/upload/v1`;

const GamesPage: React.FC = () => {
  const navigate = useNavigate();
  const bgColor = useColorModeValue('gray.50', 'gray.800');
  const cardBg = useColorModeValue('white', 'gray.700');

  const games = [
    {
      title: 'لعبة كرة المعرفة',
      description: 'اختبر معرفتك وتعلم أشياء جديدة',
      path: '/games/knowledge',
      icon: FaBrain,
      image: '/images/knowledge-game.png', // نستخدم الصور المحلية مؤقتاً
      color: 'blue.500'
    },
    {
      title: 'لعبة معيقات التعافي',
      description: 'تنقل عبر التحديات وتغلب على العقبات',
      path: '/games/obstacles',
      icon: FaRunning,
      image: '/images/obstacles-game.png', // نستخدم الصور المحلية مؤقتاً
      color: 'green.500'
    }
  ];

  const GameImage: React.FC<{ src: string; alt: string }> = ({ src, alt }) => {
    const [error, setError] = React.useState(false);
    
    return (
      <Image
        src={error ? '/images/fallback-image.png' : src}
        alt={alt}
        borderRadius="lg"
        w="full"
        h="200px"
        objectFit="cover"
        onError={(e) => {
          console.error('Image load error:', e);
          setError(true);
        }}
        fallbackSrc="/images/placeholder.png"
        loading="lazy"
        transition="transform 0.3s ease-in-out"
        _hover={{ transform: 'scale(1.05)' }}
      />
    );
  };

  return (
    <Box bg={bgColor} minH="100vh" py={10}>
      <Container maxW="container.xl">
        <VStack spacing={6} mb={12}>
          <Icon as={FaGamepad} w={12} h={12} color="blue.500" />
          <Heading textAlign="center" color="blue.600">ألعاب عارف الذكي</Heading>
        </VStack>
        
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8}>
          {games.map((game) => (
            <Box
              key={game.path}
              bg={cardBg}
              p={6}
              borderRadius="xl"
              boxShadow="lg"
              transition="all 0.3s"
              _hover={{ 
                transform: 'translateY(-5px)',
                boxShadow: 'xl'
              }}
              overflow="hidden"
            >
              <VStack spacing={4} align="center">
                <Icon as={game.icon} w={10} h={10} color={game.color} />
                <GameImage src={game.image} alt={game.title} />
                <Heading size="md" color={game.color}>{game.title}</Heading>
                <Text textAlign="center" fontSize="lg">{game.description}</Text>
                <Button
                  colorScheme="blue"
                  size="lg"
                  onClick={() => navigate(game.path)}
                  rightIcon={<FaPlay />}
                  _hover={{
                    transform: 'scale(1.05)'
                  }}
                  transition="all 0.2s"
                >
                  العب الآن
                </Button>
              </VStack>
            </Box>
          ))}
        </SimpleGrid>
      </Container>
    </Box>
  );
};

export default GamesPage;
