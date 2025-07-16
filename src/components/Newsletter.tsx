import React, { useState } from 'react';
import { Mail, Send } from 'lucide-react';

const Newsletter: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setEmail('');
      setTimeout(() => setIsSubscribed(false), 3000);
    }
  };

  return (
    <section className="py-20 bg-gradient-to-r from-orange-600 to-red-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="flex items-center justify-center w-16 h-16 bg-white bg-opacity-20 rounded-full mx-auto mb-6">
            <Mail className="w-8 h-8 text-white" />
          </div>
          
          <h2 className="text-3xl font-bold text-white mb-4">
            Stay Updated with Latest Events
          </h2>
          
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
          </p>
          <p className="text-xl text-orange-100 mb-8 max-w-2xl mx-auto">
            Get notified about new courses, exclusive events, and special offers. 
            Join 50,000+ learners who never miss an opportunity.
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              className="flex-1 px-4 py-3 rounded-lg border-0 focus:ring-2 focus:ring-white focus:ring-opacity-50 text-gray-900"
              required
            />
            <button
              type="submit"
              className="bg-white text-orange-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors flex items-center justify-center space-x-2"
            >
              <Send className="w-4 h-4" />
              <span>Subscribe</span>
            </button>
          </form>

          {isSubscribed && (
            <div className="mt-4 p-4 bg-green-500 bg-opacity-20 rounded-lg">
              <p className="text-white font-medium">
                🎉 Thank you for subscribing! You'll receive our latest updates.
              </p>
            </div>
          )}

          <p className="text-blue-200 text-sm mt-4">
          </p>
          <p className="text-orange-200 text-sm mt-4">
            No spam, unsubscribe anytime. We respect your privacy.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;