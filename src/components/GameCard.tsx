import React from 'react';
import { Clock, Trophy, Target, Play } from 'lucide-react';
import { Game } from '../types';

interface GameCardProps {
  game: Game;
  onPlay: (gameId: string) => void;
  bestScore?: number;
}

const GameCard: React.FC<GameCardProps> = ({ game, onPlay, bestScore }) => {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'text-emerald-600 bg-emerald-100';
      case 'Medium': return 'text-amber-600 bg-amber-100';
      case 'Hard': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'quiz': return '🧠';
      case 'memory': return '🧩';
      case 'debugging': return '🔧';
      case 'algorithm': return '⚡';
      default: return '🎮';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 group overflow-hidden">
      <div className="relative">
        <img
          src={game.thumbnail}
          alt={game.title}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        
        <div className="absolute top-4 left-4 flex items-center space-x-2">
          <span className="text-2xl">{getTypeIcon(game.type)}</span>
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getDifficultyColor(game.difficulty)}`}>
            {game.difficulty}
          </span>
        </div>

        <div className="absolute bottom-4 left-4 right-4">
          <div className="flex items-center justify-between text-white text-sm">
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-1" />
                <span>{Math.floor(game.timeLimit / 60)}m</span>
              </div>
              <div className="flex items-center">
                <Target className="w-4 h-4 mr-1" />
                <span>{game.maxScore}</span>
              </div>
            </div>
            {bestScore && (
              <div className="flex items-center">
                <Trophy className="w-4 h-4 mr-1 text-amber-400" />
                <span>{bestScore}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-orange-600 transition-colors">
          {game.title}
        </h3>

        <p className="text-gray-600 text-sm mb-4">{game.description}</p>

        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-500">
            {game.questions.length} questions
          </div>
          <button
            onClick={() => onPlay(game.id)}
            className="flex items-center space-x-2 px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg transition-colors"
          >
            <Play className="w-4 h-4" />
            <span>Play Now</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default GameCard;