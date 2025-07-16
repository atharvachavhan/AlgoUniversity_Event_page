import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Calendar, Clock, Users } from 'lucide-react';
import { featuredEvents } from '../data/events';

const HeroCarousel: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % featuredEvents.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide(prev => (prev + 1) % featuredEvents.length);
  };

  const prevSlide = () => {
    setCurrentSlide(prev => (prev - 1 + featuredEvents.length) % featuredEvents.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <div className="relative h-screen overflow-hidden">
      {/* Animated background particles */}
      <div className="absolute inset-0">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full opacity-30 animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      {featuredEvents.map((event, index) => (
        <div
          key={event.id}
          className={`absolute inset-0 transition-all duration-1000 transform ${
            index === currentSlide
              ? 'translate-x-0 opacity-100'
              : index < currentSlide
              ? '-translate-x-full opacity-0'
              : 'translate-x-full opacity-0'
          }`}
        >
          <div
            className="absolute inset-0 bg-gradient-to-br from-gray-900 via-orange-900 to-red-900"
            style={{
              backgroundImage: `url(${event.thumbnail})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-gray-900/90 via-orange-900/90 to-red-900/90" />
          </div>

          <div className="relative z-10 h-full flex items-center">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="max-w-3xl">
                <div className="mb-6">
                  <span className={`inline-block px-4 py-2 rounded-full text-sm font-medium ${
                    event.category === 'masterclass' ? 'bg-red-500 text-white' :
                    event.category === 'coding' ? 'bg-orange-500 text-white' :
                    'bg-emerald-500 text-white'
                  }`}>
                    {event.category.charAt(0).toUpperCase() + event.category.slice(1)}
                  </span>
                </div>

                <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
                  {event.title}
                </h1>

                <p className="text-xl text-orange-100 mb-8 leading-relaxed">
                  {event.description}
                </p>

                <div className="flex flex-wrap items-center gap-6 mb-8 text-white">
                  <div className="flex items-center">
                    <Calendar className="w-5 h-5 mr-2" />
                    <span>{new Date(event.date).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-5 h-5 mr-2" />
                    <span>{event.time}</span>
                  </div>
                  <div className="flex items-center">
                    <Users className="w-5 h-5 mr-2" />
                    <span>{event.registered}/{event.capacity} registered</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-4">
                  <button className="bg-gradient-to-r from-orange-500 to-red-600 text-white px-8 py-4 rounded-lg font-semibold hover:from-orange-600 hover:to-red-700 transform hover:scale-105 transition-all duration-200 shadow-lg">
                    {event.isWaitlist ? 'Join Waitlist' : 'Register Now'}
                  </button>
                  <button className="bg-white bg-opacity-20 text-white px-8 py-4 rounded-lg font-semibold hover:bg-opacity-30 backdrop-blur-sm transition-all duration-200">
                    Learn More
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 bg-white bg-opacity-20 hover:bg-opacity-30 text-white p-3 rounded-full backdrop-blur-sm transition-all duration-200"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 bg-white bg-opacity-20 hover:bg-opacity-30 text-white p-3 rounded-full backdrop-blur-sm transition-all duration-200"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Slide indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex space-x-3">
        {featuredEvents.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide ? 'bg-white scale-125' : 'bg-white bg-opacity-50'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroCarousel;