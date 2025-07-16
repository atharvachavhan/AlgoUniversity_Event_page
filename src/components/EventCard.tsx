import React from 'react';
import { Calendar, Clock, Users, Star, Heart, Share2, Download } from 'lucide-react';
import { Event } from '../types';
import { useCountdown } from '../hooks/useCountdown';

interface EventCardProps {
  event: Event;
  isFavorite: boolean;
  onToggleFavorite: (eventId: string) => void;
  onRegister: (eventId: string) => void;
}

const EventCard: React.FC<EventCardProps> = ({ event, isFavorite, onToggleFavorite, onRegister }) => {
  const countdown = useCountdown(event.startDate);

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'masterclass': return 'bg-red-500 text-white';
      case 'coding': return 'bg-orange-500 text-white';
      case 'workshop': return 'bg-emerald-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'text-emerald-600 bg-emerald-100';
      case 'Intermediate': return 'text-amber-600 bg-amber-100';
      case 'Advanced': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const progressPercentage = (event.registered / event.capacity) * 100;

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: event.title,
        text: event.description,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
    }
  };

  const handleAddToCalendar = () => {
    const startDate = new Date(event.startDate);
    const endDate = new Date(startDate.getTime() + 3 * 60 * 60 * 1000); // 3 hours later
    
    const formatDate = (date: Date) => {
      return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
    };

    const calendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(event.title)}&dates=${formatDate(startDate)}/${formatDate(endDate)}&details=${encodeURIComponent(event.description)}`;
    
    window.open(calendarUrl, '_blank');
  };

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 group overflow-hidden">
      <div className="relative">
        <img
          src={event.thumbnail}
          alt={event.title}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        
        <div className="absolute top-4 left-4 flex gap-2">
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(event.category)}`}>
            {event.category.charAt(0).toUpperCase() + event.category.slice(1)}
          </span>
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getDifficultyColor(event.difficulty)}`}>
            {event.difficulty}
          </span>
        </div>

        <button
          onClick={() => onToggleFavorite(event.id)}
          className="absolute top-4 right-4 p-2 bg-white bg-opacity-80 rounded-full hover:bg-opacity-100 transition-colors"
        >
          <Heart className={`w-4 h-4 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} />
        </button>

        <div className="absolute bottom-4 left-4 right-4">
          <div className="flex items-center space-x-2 text-white text-sm">
            <div className="flex items-center">
              <Star className="w-4 h-4 text-amber-400 fill-current mr-1" />
              <span>{event.rating}</span>
            </div>
            <div className="flex items-center">
              <Users className="w-4 h-4 mr-1" />
              <span>{event.registered}/{event.capacity}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="flex items-center mb-3">
          <img
            src={event.instructor.photo}
            alt={event.instructor.name}
            className="w-10 h-10 rounded-full object-cover mr-3"
          />
          <div>
            <div className="text-sm font-medium text-gray-900">{event.instructor.name}</div>
            <div className="text-xs text-gray-500">{event.instructor.credentials}</div>
          </div>
        </div>

        <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
          {event.title}
        </h3>

        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{event.description}</p>

        <div className="flex items-center text-sm text-gray-500 mb-4 gap-4">
          <div className="flex items-center">
            <Calendar className="w-4 h-4 mr-1" />
            <span>{new Date(event.date).toLocaleDateString()}</span>
          </div>
          <div className="flex items-center">
            <Clock className="w-4 h-4 mr-1" />
            <span>{event.time}</span>
          </div>
        </div>

        {/* Countdown Timer */}
        <div className="bg-gray-50 rounded-lg p-3 mb-4">
          <div className="text-xs text-gray-600 mb-1">Starts in:</div>
          <div className="flex items-center justify-between text-sm font-medium">
            <span>{countdown.days}d {countdown.hours}h {countdown.minutes}m</span>
            <span className="text-orange-600">{event.duration}</span>
          </div>
        </div>

        {/* Capacity Progress */}
        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-600">Capacity</span>
            <span className="text-sm font-medium">{event.registered}/{event.capacity} spots</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className={`h-2 rounded-full transition-all duration-300 ${
                progressPercentage > 80 ? 'bg-red-500' : progressPercentage > 60 ? 'bg-amber-500' : 'bg-emerald-500'
              }`}
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 mb-4">
          <button
            onClick={() => onRegister(event.id)}
            className={`flex-1 px-4 py-2 rounded-lg font-medium transition-colors ${
              event.isWaitlist
                ? 'bg-amber-500 hover:bg-amber-600 text-white'
                : 'bg-orange-600 hover:bg-orange-700 text-white'
            }`}
          >
            {event.isWaitlist ? 'Join Waitlist' : 'Register'}
          </button>
          <button className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors">
            Learn More
          </button>
        </div>

        {/* Social Actions */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="flex items-center space-x-3">
            <button
              onClick={handleShare}
              className="flex items-center space-x-1 text-gray-600 hover:text-orange-600 transition-colors"
            >
              <Share2 className="w-4 h-4" />
              <span className="text-sm">Share</span>
            </button>
            <button
              onClick={handleAddToCalendar}
              className="flex items-center space-x-1 text-gray-600 hover:text-emerald-600 transition-colors"
            >
              <Download className="w-4 h-4" />
              <span className="text-sm">Calendar</span>
            </button>
          </div>
          <div className="text-sm font-semibold text-gray-900">
            ₹{event.price.toLocaleString()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventCard;