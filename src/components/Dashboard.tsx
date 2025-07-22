import React from 'react';
import { Calendar, Clock, Trophy, BookOpen, Bell, Download } from 'lucide-react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { events } from '../data/events';

const Dashboard: React.FC = () => {
  const [registeredEvents] = useLocalStorage<string[]>('registeredEvents', []);
  const [favorites] = useLocalStorage<string[]>('favorites', []);
  const [gameScores] = useLocalStorage<{[key: string]: number}>('gameScores', {});

  const userRegisteredEvents = events.filter(event => registeredEvents.includes(event.id));
  const userFavoriteEvents = events.filter(event => favorites.includes(event.id));

  const upcomingEvents = userRegisteredEvents.filter(event => new Date(event.startDate) > new Date());
  const pastEvents = userRegisteredEvents.filter(event => new Date(event.startDate) <= new Date());

  const totalGameScore = Object.values(gameScores).reduce((sum, score) => sum + score, 0);

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            My Dashboard
          </h2>
          <p className="text-xl text-gray-600">
            Track your learning journey and upcoming events
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Registered Events</p>
                <p className="text-2xl font-bold text-gray-900">{registeredEvents.length}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <Calendar className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Favorites</p>
                <p className="text-2xl font-bold text-gray-900">{favorites.length}</p>
              </div>
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-red-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Game Score</p>
                <p className="text-2xl font-bold text-gray-900">{totalGameScore}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <Trophy className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Completed</p>
                <p className="text-2xl font-bold text-gray-900">{pastEvents.length}</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                <Clock className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Upcoming Events */}
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="px-6 py-4 bg-gray-50 border-b">
              <h3 className="text-lg font-semibold text-gray-900">Upcoming Events</h3>
            </div>
            <div className="divide-y divide-gray-200">
              {upcomingEvents.length > 0 ? (
                upcomingEvents.map(event => (
                  <div key={event.id} className="px-6 py-4">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">{event.title}</h4>
                        <p className="text-sm text-gray-500">{event.instructor.name}</p>
                        <div className="flex items-center mt-2 text-sm text-gray-600">
                          <Calendar className="w-4 h-4 mr-1" />
                          <span>{new Date(event.date).toLocaleDateString()}</span>
                          <Clock className="w-4 h-4 ml-4 mr-1" />
                          <span>{event.time}</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button className="p-2 text-gray-400 hover:text-gray-600">
                          <Bell className="w-4 h-4" />
                        </button>
                        <button className="p-2 text-gray-400 hover:text-gray-600">
                          <Download className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="px-6 py-8 text-center text-gray-500">
                  No upcoming events registered
                </div>
              )}
            </div>
          </div>

          {/* Favorite Events */}
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="px-6 py-4 bg-gray-50 border-b">
              <h3 className="text-lg font-semibold text-gray-900">Favorite Events</h3>
            </div>
            <div className="divide-y divide-gray-200">
              {userFavoriteEvents.length > 0 ? (
                userFavoriteEvents.slice(0, 5).map(event => (
                  <div key={event.id} className="px-6 py-4">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">{event.title}</h4>
                        <p className="text-sm text-gray-500">{event.instructor.name}</p>
                        <div className="flex items-center mt-2 text-sm text-gray-600">
                          <Calendar className="w-4 h-4 mr-1" />
                          <span>{new Date(event.date).toLocaleDateString()}</span>
                          <span className="ml-4 text-orange-600">₹{event.price.toLocaleString()}</span>
                        </div>
                      </div>
                      <button className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors">
                        Register
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="px-6 py-8 text-center text-gray-500">
                  No favorite events saved
                </div>
              )}
            </div>
          </div>
        </div>

        {/* for Calendar View */}
        <div className="mt-8 bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Event Calendar</h3>
          <div className="grid grid-cols-7 gap-1 text-center">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
              <div key={day} className="py-2 text-sm font-medium text-gray-600">
                {day}
              </div>
            ))}
            {/* Calendar grid would be implemented here */}
            {Array.from({ length: 35 }, (_, i) => (
              <div key={i} className="aspect-square flex items-center justify-center text-sm text-gray-400 border border-gray-100">
                {i + 1 <= 31 ? i + 1 : ''}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
