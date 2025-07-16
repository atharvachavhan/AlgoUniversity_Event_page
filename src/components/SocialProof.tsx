import React, { useState, useEffect } from 'react';
import { Star, Users, TrendingUp, Award } from 'lucide-react';
import { testimonials } from '../data/testimonials';

const SocialProof: React.FC = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [animatedNumbers, setAnimatedNumbers] = useState({
    students: 0,
    placement: 0,
    rating: 0,
    companies: 0
  });

  const targetNumbers = {
    students: 25000,
    placement: 94,
    rating: 4.8,
    companies: 500
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial(prev => (prev + 1) % testimonials.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const animateNumbers = () => {
      const duration = 2000;
      const steps = 60;
      const stepDuration = duration / steps;

      let currentStep = 0;
      const timer = setInterval(() => {
        currentStep++;
        const progress = currentStep / steps;

        setAnimatedNumbers({
          students: Math.floor(targetNumbers.students * progress),
          placement: Math.floor(targetNumbers.placement * progress),
          rating: Math.floor(targetNumbers.rating * progress * 10) / 10,
          companies: Math.floor(targetNumbers.companies * progress)
        });

        if (currentStep >= steps) {
          clearInterval(timer);
          setAnimatedNumbers(targetNumbers);
        }
      }, stepDuration);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          animateNumbers();
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );

    const element = document.getElementById('social-proof');
    if (element) {
      observer.observe(element);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section id="social-proof" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          <div className="text-center">
            <div className="flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mx-auto mb-4">
              <Users className="w-8 h-8 text-blue-600" />
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-2">
              {animatedNumbers.students.toLocaleString()}+
            </div>
            <div className="text-gray-600">Students Trained</div>
          </div>

          <div className="text-center">
            <div className="flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mx-auto mb-4">
              <TrendingUp className="w-8 h-8 text-green-600" />
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-2">
              {animatedNumbers.placement}%
            </div>
            <div className="text-gray-600">Job Placement Rate</div>
          </div>

          <div className="text-center">
            <div className="flex items-center justify-center w-16 h-16 bg-yellow-100 rounded-full mx-auto mb-4">
              <Star className="w-8 h-8 text-yellow-600" />
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-2">
              {animatedNumbers.rating}/5
            </div>
            <div className="text-gray-600">Average Rating</div>
          </div>

          <div className="text-center">
            <div className="flex items-center justify-center w-16 h-16 bg-purple-100 rounded-full mx-auto mb-4">
              <Award className="w-8 h-8 text-purple-600" />
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-2">
              {animatedNumbers.companies}+
            </div>
            <div className="text-gray-600">Hiring Companies</div>
          </div>
        </div>

        {/* Testimonials */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-12">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
            What Our Students Say
          </h2>
          
          <div className="relative h-64 overflow-hidden">
            {testimonials.map((testimonial, index) => (
              <div
                key={testimonial.id}
                className={`absolute inset-0 transition-all duration-500 transform ${
                  index === currentTestimonial
                    ? 'translate-x-0 opacity-100'
                    : index < currentTestimonial
                    ? '-translate-x-full opacity-0'
                    : 'translate-x-full opacity-0'
                }`}
              >
                <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
                  <img
                    src={testimonial.photo}
                    alt={testimonial.name}
                    className="w-16 h-16 rounded-full mb-4 object-cover"
                  />
                  <div className="flex items-center mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${
                          i < testimonial.rating ? 'text-amber-400 fill-current' : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-lg text-gray-700 mb-4 italic">
                    "{testimonial.testimonial}"
                  </p>
                  <div className="text-center">
                    <div className="font-semibold text-gray-900">{testimonial.name}</div>
                    <div className="text-sm text-gray-600">
                      {testimonial.position} at {testimonial.company}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center mt-6 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentTestimonial(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentTestimonial ? 'bg-orange-600 scale-125' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Company logos */}
        <div className="text-center">
          <h3 className="text-xl font-semibold text-gray-900 mb-8">
            Our graduates work at top companies
          </h3>
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
            {['Google', 'Microsoft', 'Amazon', 'Meta', 'Apple', 'Netflix', 'Tesla', 'Spotify'].map((company) => (
              <div key={company} className="bg-gray-200 px-6 py-3 rounded-lg">
                <span className="text-lg font-semibold text-gray-700">{company}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SocialProof;