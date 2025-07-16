import React, { useState } from 'react';
import { Trophy, Target, Clock, Star, Users, TrendingUp } from 'lucide-react';
import { games } from '../data/games';
import GameCard from './GameCard';
import { useLocalStorage } from '../hooks/useLocalStorage';

const GamesSection: React.FC = () => {
  const [gameScores, setGameScores] = useLocalStorage<{[key: string]: number}>('gameScores', {});
  const [activeTab, setActiveTab] = useState<'games' | 'leaderboard' | 'achievements'>('games');

  const handlePlayGame = (gameId: string) => {
    // Here you would implement the game logic
    alert(`Starting game: ${gameId}`);
  };

  const leaderboardData = [
    { name: 'Alex Chen', score: 15420, rank: 1 },
    { name: 'Priya Sharma', score: 14850, rank: 2 },
    { name: 'John Doe', score: 14200, rank: 3 },
    { name: 'Sarah Wilson', score: 13800, rank: 4 },
    { name: 'Mike Johnson', score: 13500, rank: 5 }
  ];

  const achievements = [
    { id: 1, title: 'First Blood', description: 'Complete your first game', icon: '🎯', unlocked: true },
    { id: 2, title: 'Speed Demon', description: 'Complete a game in under 2 minutes', icon: '⚡', unlocked: true },
    { id: 3, title: 'Perfect Score', description: 'Get 100% on any game', icon: '🏆', unlocked: false },
    { id: 4, title: 'Streak Master', description: 'Play games for 7 days straight', icon: '🔥', unlocked: false },
    { id: 5, title: 'Knowledge Seeker', description: 'Complete all game categories', icon: '📚', unlocked: false }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Interactive Learning Games
          </h2>
          <p className="text-xl text-gray-600">
            Sharpen your skills with fun, competitive challenges
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Games Played</p>
                <p className="text-2xl font-bold text-gray-900">
                  {Object.keys(gameScores).length}
                </p>
              </div>
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                <Target className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Best Score</p>
                <p className="text-2xl font-bold text-gray-900">
                  {Math.max(...Object.values(gameScores), 0)}
                </p>
              </div>
              <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center">
                <Trophy className="w-6 h-6 text-emerald-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Current Streak</p>
                <p className="text-2xl font-bold text-gray-900">5</p>
              </div>
            <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center">
              <Star className="w-6 h-6 text-amber-600" />
            </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Rank</p>
                <p className="text-2xl font-bold text-gray-900">#42</p>
              </div>
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-red-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex space-x-1 bg-gray-200 rounded-lg p-1 mb-8">
          <button
            onClick={() => setActiveTab('games')}
            className={`flex-1 py-2 px-4 rounded-md font-medium transition-colors ${
              activeTab === 'games' 
                ? 'bg-white text-orange-600 shadow-sm' 
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Games
          </button>
          <button
            onClick={() => setActiveTab('leaderboard')}
            className={`flex-1 py-2 px-4 rounded-md font-medium transition-colors ${
              activeTab === 'leaderboard' 
                ? 'bg-white text-orange-600 shadow-sm' 
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Leaderboard
          </button>
          <button
            onClick={() => setActiveTab('achievements')}
            className={`flex-1 py-2 px-4 rounded-md font-medium transition-colors ${
              activeTab === 'achievements' 
                ? 'bg-white text-orange-600 shadow-sm' 
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Achievements
          </button>
        </div>

        {/* Games Tab */}
        {activeTab === 'games' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {games.map(game => (
              <GameCard
                key={game.id}
                game={game}
                onPlay={handlePlayGame}
                bestScore={gameScores[game.id]}
              />
            ))}
          </div>
        )}

        {/* Leaderboard Tab */}
        {activeTab === 'leaderboard' && (
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="px-6 py-4 bg-gray-50 border-b">
              <h3 className="text-lg font-semibold text-gray-900">Weekly Leaderboard</h3>
            </div>
            <div className="divide-y divide-gray-200">
              {leaderboardData.map((user, index) => (
                <div key={index} className="px-6 py-4 flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold ${
                      user.rank === 1 ? 'bg-yellow-500' :
                      user.rank === 2 ? 'bg-gray-500' :
                      user.rank === 3 ? 'bg-amber-500' :
                      'bg-gray-600'
                    }`}>
                      {user.rank}
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">{user.name}</div>
                      <div className="text-sm text-gray-500">Score: {user.score.toLocaleString()}</div>
                    </div>
                  </div>
                  {user.rank <= 3 && (
                    <div className="text-2xl">
                      {user.rank === 1 ? '🥇' : user.rank === 2 ? '🥈' : '🥉'}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Achievements Tab */}
        {activeTab === 'achievements' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {achievements.map(achievement => (
              <div
                key={achievement.id}
                className={`bg-white rounded-xl p-6 shadow-sm border-2 transition-all ${
                  achievement.unlocked 
                    ? 'border-green-200 bg-green-50' 
                    : 'border-gray-200 opacity-60'
                }`}
              >
                <div className="flex items-center space-x-4">
                  <div className="text-3xl">{achievement.icon}</div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{achievement.title}</h3>
                    <p className="text-sm text-gray-600">{achievement.description}</p>
                  </div>
                </div>
                {achievement.unlocked && (
                  <div className="mt-4 flex items-center text-emerald-600">
                    <Trophy className="w-4 h-4 mr-2" />
                    <span className="text-sm font-medium">Unlocked</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default GamesSection;