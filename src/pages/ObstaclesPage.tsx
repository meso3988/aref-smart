import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Trophy } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { GameObstacle } from '../components/game/GameObstacle';
import { GamePlayer } from '../components/game/GamePlayer';
import { GameControls } from '../components/game/GameControls';

interface Position {
  x: number;
  y: number;
}

interface Obstacle {
  type: string;
  initialPosition: number;
  position: Position;
}

interface GameControlsProps {
  onJump: () => void;
  onStart: () => void;
  onMove: () => void;
  gameStarted: boolean;
}

const OBSTACLES = [
  { type: 'الإدمان', initialPosition: 80 },
  { type: 'الضغط', initialPosition: 150 },
  { type: 'القلق', initialPosition: 220 },
  { type: 'الاكتئاب', initialPosition: 290 },
];

const ObstaclesPage = () => {
  const navigate = useNavigate();
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [victory, setVictory] = useState(false);
  const [playerPosition, setPlayerPosition] = useState<Position>({ x: 10, y: 0 });
  const [obstaclePositions, setObstaclePositions] = useState(
    OBSTACLES.map(obs => ({ x: obs.initialPosition, y: 0 }))
  );
  const [isJumping, setIsJumping] = useState(false);
  const [obstacles, setObstacles] = useState<Obstacle[]>(
    OBSTACLES.map(obs => ({
      ...obs,
      position: { x: obs.initialPosition, y: 0 }
    }))
  );
  const [score, setScore] = useState(0);

  useEffect(() => {
    if (gameStarted && !gameOver && !victory) {
      const gameLoop = setInterval(() => {
        setObstacles(prevObstacles => {
          const newObstacles = prevObstacles.map(obs => ({
            ...obs,
            position: { x: obs.position.x <= -20 ? 100 : obs.position.x - 1, y: 0 }
          }));

          // Check for collisions
          const collision = newObstacles.some(obs => {
            const obsLeft = obs.position.x;
            const obsRight = obs.position.x + 10;
            const playerLeft = playerPosition.x;
            const playerRight = playerPosition.x + 10;

            return (
              !isJumping &&
              obsLeft < playerRight &&
              obsRight > playerLeft
            );
          });

          if (collision) {
            setGameOver(true);
            clearInterval(gameLoop);
          }

          return newObstacles;
        });

        // Update score
        setScore(prev => prev + 1);

        // Check for victory
        if (score >= 1000) {
          setVictory(true);
          clearInterval(gameLoop);
        }
      }, 50);

      return () => clearInterval(gameLoop);
    }
  }, [gameStarted, gameOver, victory, playerPosition, isJumping, score]);

  const handleJump = () => {
    if (!isJumping) {
      setIsJumping(true);
      setTimeout(() => setIsJumping(false), 500);
    }
  };

  const handleStartGame = () => {
    setGameStarted(true);
    setGameOver(false);
    setVictory(false);
    setScore(0);
    setPlayerPosition({ x: 10, y: 0 });
    setObstacles(OBSTACLES.map(obs => ({
      ...obs,
      position: { x: obs.initialPosition, y: 0 }
    })));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <button 
            onClick={() => navigate('/')}
            className="text-blue-600 hover:text-blue-700"
          >
            العودة للرئيسية
          </button>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              معيقات التعافي
            </h1>
            <p className="text-gray-600">
              تخطى المعيقات في طريق تعافيك
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg overflow-hidden p-4">
            <div className="relative h-[400px] border-b-4 border-gray-300">
              {/* Game Status */}
              <div className="absolute top-4 right-4 bg-white px-4 py-2 rounded-lg shadow">
                <span className="font-bold">النقاط: {score}</span>
              </div>

              {/* Victory Screen */}
              {victory && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="absolute inset-0 flex flex-col items-center justify-center bg-white/90"
                >
                  <Trophy className="w-16 h-16 text-yellow-500 mb-4" />
                  <h2 className="text-2xl font-bold text-gray-800 mb-4">مبروك! لقد نجحت</h2>
                  <button
                    onClick={handleStartGame}
                    className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600"
                  >
                    العب مرة أخرى
                  </button>
                </motion.div>
              )}

              {/* Game Over Screen */}
              {gameOver && !victory && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="absolute inset-0 flex flex-col items-center justify-center bg-white/90"
                >
                  <h2 className="text-2xl font-bold text-red-500 mb-4">انتهت اللعبة</h2>
                  <p className="text-gray-600 mb-4">النقاط: {score}</p>
                  <button
                    onClick={handleStartGame}
                    className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                  >
                    حاول مرة أخرى
                  </button>
                </motion.div>
              )}

              {/* Game Elements */}
              <GamePlayer position={playerPosition} isJumping={isJumping} />
              {obstacles.map((obstacle, index) => (
                <GameObstacle
                  key={index}
                  position={obstacle.position}
                  type={obstacle.type}
                />
              ))}
            </div>

            {/* Game Controls */}
            <GameControls
              onJump={handleJump}
              onStart={handleStartGame}
              onMove={() => {}}
              gameStarted={gameStarted}
            />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ObstaclesPage;
