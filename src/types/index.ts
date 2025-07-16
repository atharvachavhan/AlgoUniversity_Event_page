export interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  description: string;
  instructor: {
    name: string;
    photo: string;
    bio: string;
    credentials: string;
  };
  category: 'masterclass' | 'coding' | 'workshop';
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  thumbnail: string;
  capacity: number;
  registered: number;
  price: number;
  duration: string;
  prerequisites: string[];
  learningObjectives: string[];
  rating: number;
  tags: string[];
  isWaitlist: boolean;
  startDate: Date;
}

export interface GameScore {
  gameId: string;
  score: number;
  completedAt: Date;
  timeSpent: number;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  favoriteEvents: string[];
  registeredEvents: string[];
  gameScores: GameScore[];
  achievements: string[];
  streak: number;
  totalPoints: number;
}

export interface Game {
  id: string;
  title: string;
  description: string;
  type: 'quiz' | 'memory' | 'debugging' | 'algorithm';
  difficulty: 'Easy' | 'Medium' | 'Hard';
  thumbnail: string;
  questions: Question[];
  timeLimit: number;
  maxScore: number;
}

export interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
}

export interface Testimonial {
  id: string;
  name: string;
  photo: string;
  company: string;
  position: string;
  testimonial: string;
  rating: number;
}