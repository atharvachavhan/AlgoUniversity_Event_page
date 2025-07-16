import React, { useEffect, useState } from 'react';
import { BookOpen, Code, Users, Trophy } from 'lucide-react';

interface LoadingScreenProps {
  onComplete: () => void;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [currentIcon, setCurrentIcon] = useState(0);

  const icons = [BookOpen, Code, Users, Trophy];
  const messages = [
    'Loading courses...',
    'Preparing challenges...',
    'Connecting community...',
    'Almost ready...'
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(onComplete, 500);
          return 100;
        }
        return prev + 2;
      });
    }, 50);

    return () => clearInterval(timer);
  }, [onComplete]);

  useEffect(() => {
    const iconTimer = setInterval(() => {
      setCurrentIcon(prev => (prev + 1) % icons.length);
    }, 800);

    return () => clearInterval(iconTimer);
  }, []);

  const CurrentIcon = icons[currentIcon];

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-gray-900 via-orange-900 to-red-900 flex items-center justify-center z-50 overflow-hidden">
      {/* Animated background particles */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-white rounded-full opacity-20 animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${2 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      <div className="text-center z-10">
        <div className="mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white bg-opacity-20 rounded-full backdrop-blur-sm mb-4">
            <CurrentIcon className="w-10 h-10 text-white animate-bounce" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-2">
            Algo<span className="text-orange-400">University</span>
          </h1>
          <p className="text-orange-200 text-lg">{messages[Math.floor(progress / 25)]}</p>
        </div>

        <div className="w-80 bg-white bg-opacity-20 rounded-full h-2 mb-4">
          <div
            className="bg-gradient-to-r from-orange-400 to-red-400 h-2 rounded-full transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        <p className="text-white text-sm opacity-80">{progress}% Complete</p>
      </div>
    </div>
  );
};

export default LoadingScreen;