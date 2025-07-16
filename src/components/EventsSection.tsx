import React, { useState, useMemo } from 'react';
import { Search, Filter, X } from 'lucide-react';
import { Event } from '../types';
import EventCard from './EventCard';
import { useLocalStorage } from '../hooks/useLocalStorage';

interface EventsSectionProps {
  events: Event[];
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

const EventsSection: React.FC<EventsSectionProps> = ({ events, searchQuery, onSearchChange }) => {
  const [favorites, setFavorites] = useLocalStorage<string[]>('favorites', []);
  const [registeredEvents, setRegisteredEvents] = useLocalStorage<string[]>('registeredEvents', []);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
  const [showFilters, setShowFilters] = useState(false);

  const filteredEvents = useMemo(() => {
    return events.filter(event => {
      const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           event.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           event.instructor.name.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCategory = selectedCategory === 'all' || event.category === selectedCategory;
      const matchesDifficulty = selectedDifficulty === 'all' || event.difficulty === selectedDifficulty;
      
      return matchesSearch && matchesCategory && matchesDifficulty;
    });
  }, [events, searchQuery, selectedCategory, selectedDifficulty]);

  const toggleFavorite = (eventId: string) => {
    setFavorites(prev => 
      prev.includes(eventId) 
        ? prev.filter(id => id !== eventId)
        : [...prev, eventId]
    );
  };

  const handleRegister = (eventId: string) => {
    setRegisteredEvents(prev => 
      prev.includes(eventId) ? prev : [...prev, eventId]
    );
    // Here you would typically show a registration modal or redirect
    alert('Registration functionality would be implemented here!');
  };

  const clearFilters = () => {
    setSelectedCategory('all');
    setSelectedDifficulty('all');
    onSearchChange('');
  };

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Upcoming Events
          </h2>
          <p className="text-xl text-gray-600">
            Join our expert-led sessions and accelerate your career
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search events, instructors, or topics..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              />
            </div>
            
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center space-x-2 px-4 py-3 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
            >
              <Filter className="w-5 h-5" />
              <span>Filters</span>
            </button>
          </div>

          {showFilters && (
            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  >
                    <option value="all">All Categories</option>
                    <option value="masterclass">Masterclass</option>
                    <option value="coding">Coding</option>
                    <option value="workshop">Workshop</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Difficulty</label>
                  <select
                    value={selectedDifficulty}
                    onChange={(e) => setSelectedDifficulty(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  >
                    <option value="all">All Levels</option>
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                  </select>
                </div>

                <div className="flex items-end">
                  <button
                    onClick={clearFilters}
                    className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                  >
                    <X className="w-4 h-4" />
                    <span>Clear Filters</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Quick Filter Tags */}
        <div className="flex flex-wrap gap-2 mb-8">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              selectedCategory === 'all' 
                ? 'bg-orange-600 text-white' 
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            All Events
          </button>
          <button
            onClick={() => setSelectedCategory('masterclass')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              selectedCategory === 'masterclass' 
                ? 'bg-red-600 text-white' 
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Masterclass
          </button>
          <button
            onClick={() => setSelectedCategory('coding')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              selectedCategory === 'coding' 
                ? 'bg-orange-600 text-white' 
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Coding
          </button>
          <button
            onClick={() => setSelectedCategory('workshop')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              selectedCategory === 'workshop' 
                ? 'bg-emerald-600 text-white' 
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Workshop
          </button>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            Showing {filteredEvents.length} of {events.length} events
          </p>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredEvents.map(event => (
            <EventCard
              key={event.id}
              event={event}
              isFavorite={favorites.includes(event.id)}
              onToggleFavorite={toggleFavorite}
              onRegister={handleRegister}
            />
          ))}
        </div>

        {filteredEvents.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-500 text-lg mb-4">No events found matching your criteria</div>
            <button
              onClick={clearFilters}
              className="px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
            >
              Clear All Filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default EventsSection;