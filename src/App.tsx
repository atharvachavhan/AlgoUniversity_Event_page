import React, { useState, useEffect } from 'react';
import LoadingScreen from './components/LoadingScreen';
import StickyNavigation from './components/StickyNavigation';
import HeroCarousel from './components/HeroCarousel';
import SocialProof from './components/SocialProof';
import EventsSection from './components/EventsSection';
import GamesSection from './components/GamesSection';
import Dashboard from './components/Dashboard';
import Newsletter from './components/Newsletter';
import { events } from './data/events';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [currentSection, setCurrentSection] = useState('events');
  const [searchQuery, setSearchQuery] = useState('');

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    if (query && currentSection !== 'events') {
      setCurrentSection('events');
    }
  };

  if (isLoading) {
    return <LoadingScreen onComplete={handleLoadingComplete} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <StickyNavigation 
        onSearchChange={handleSearchChange}
        currentSection={currentSection}
        onSectionChange={setCurrentSection}
      />
      
      {currentSection === 'events' && (
        <>
          <HeroCarousel />
          <SocialProof />
          <EventsSection 
            events={events}
            searchQuery={searchQuery}
            onSearchChange={handleSearchChange}
          />
        </>
      )}
      
      {currentSection === 'games' && <GamesSection />}
      
      {currentSection === 'dashboard' && <Dashboard />}
      
      {currentSection === 'community' && (
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Community Features
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Coming soon! Connect with fellow learners and grow together.
            </p>
            <div className="bg-gray-100 rounded-xl p-12">
              <div className="text-6xl mb-4">👥</div>
              <p className="text-gray-600">
                Discussion forums, study groups, and peer learning features are under development.
              </p>
            </div>
          </div>
        </section>
      )}
      
      <Newsletter />
      
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">AlgoUniversity</h3>
              <p className="text-gray-400">
                Empowering developers with world-class education and hands-on learning experiences.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Instructors</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Success Stories</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Documentation</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Career Guide</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Refund Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Cookie Policy</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 AlgoUniversity. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;