import { Game } from '../types';

export const games: Game[] = [
  {
    id: '1',
    title: 'Code Detective',
    description: 'Find bugs in code snippets and improve your debugging skills',
    type: 'debugging',
    difficulty: 'Medium',
    thumbnail: 'https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop',
    timeLimit: 300,
    maxScore: 1000,
    questions: [
      {
        id: '1',
        question: 'Find the bug in this JavaScript function:\n\nfunction findMax(arr) {\n  let max = 0;\n  for (let i = 0; i < arr.length; i++) {\n    if (arr[i] > max) {\n      max = arr[i];\n    }\n  }\n  return max;\n}',
        options: [
          'max should be initialized to arr[0]',
          'Loop condition is wrong',
          'Missing return statement',
          'No bugs found'
        ],
        correctAnswer: 0,
        explanation: 'Initializing max to 0 fails when all array elements are negative. It should be initialized to arr[0].',
        difficulty: 'Medium'
      }
    ]
  },
  {
    id: '2',
    title: 'Algorithm Race',
    description: 'Solve sorting and searching challenges as fast as possible',
    type: 'algorithm',
    difficulty: 'Hard',
    thumbnail: 'https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop',
    timeLimit: 600,
    maxScore: 1500,
    questions: [
      {
        id: '1',
        question: 'What is the time complexity of binary search?',
        options: ['O(n)', 'O(log n)', 'O(n log n)', 'O(1)'],
        correctAnswer: 1,
        explanation: 'Binary search eliminates half the search space in each iteration, resulting in O(log n) complexity.',
        difficulty: 'Easy'
      }
    ]
  },
  {
    id: '3',
    title: 'Memory Master',
    description: 'Match programming concepts with their definitions',
    type: 'memory',
    difficulty: 'Easy',
    thumbnail: 'https://images.pexels.com/photos/1181271/pexels-photo-1181271.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop',
    timeLimit: 180,
    maxScore: 800,
    questions: [
      {
        id: '1',
        question: 'What is recursion?',
        options: [
          'A function calling itself',
          'A loop structure',
          'A data type',
          'A sorting algorithm'
        ],
        correctAnswer: 0,
        explanation: 'Recursion is when a function calls itself to solve a smaller version of the same problem.',
        difficulty: 'Easy'
      }
    ]
  },
  {
    id: '4',
    title: 'Stack Attack',
    description: 'Solve stack-based puzzles and data structure challenges',
    type: 'quiz',
    difficulty: 'Medium',
    thumbnail: 'https://images.pexels.com/photos/1181298/pexels-photo-1181298.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop',
    timeLimit: 240,
    maxScore: 1200,
    questions: [
      {
        id: '1',
        question: 'Which operation is NOT supported by a stack?',
        options: ['Push', 'Pop', 'Peek', 'Random access'],
        correctAnswer: 3,
        explanation: 'Stacks only allow access to the top element (LIFO), not random access to any element.',
        difficulty: 'Medium'
      }
    ]
  }
];