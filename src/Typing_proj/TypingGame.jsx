import React, { useState, useEffect } from 'react';
import './TypingGame.css';

const sampleTexts = {
    coding: [
      "const hello = 'world';",
      "function greet(name) { return `Hello, ${name}`; }",
      "for (let i = 0; i < 10; i++) { console.log(i); }",
      "let x = 5; let y = 10; let sum = x + y;",
      "if (a > b) { console.log('a is greater'); } else { console.log('b is greater'); }",
      "const array = [1, 2, 3, 4, 5]; array.map(n => n * 2);",
      "const person = { name: 'John', age: 30, city: 'New York' };",
      "async function fetchData() { let response = await fetch('/data'); }",
      "const factorial = n => n <= 1 ? 1 : n * factorial(n - 1);",
      "const isEven = num => num % 2 === 0 ? 'Even' : 'Odd';"
    ],
    literature: [
      "It was the best of times, it was the worst of times.",
      "To be or not to be, that is the question.",
      "All that glitters is not gold.",
      "The quick brown fox jumps over the lazy dog.",
      "A tale of two cities is a story of contrasts.",
      "The only thing we have to fear is fear itself.",
      "The future belongs to those who believe in the beauty of their dreams.",
      "Do not go gentle into that good night, Old age should burn and rave at close of day.",
      "In the end, we will remember not the words of our enemies, but the silence of our friends.",
      "The great Gatsby is a tragedy about the American dream."
    ],
    quotes: [
      "The only limit to our realization of tomorrow is our doubts of today.",
      "In the middle of every difficulty lies opportunity.",
      "Success is not final, failure is not fatal: It is the courage to continue that counts.",
      "You must be the change you wish to see in the world.",
      "Don’t watch the clock; do what it does. Keep going.",
      "Life is 10% what happens to us and 90% how we react to it.",
      "The best way to predict your future is to create it.",
      "Believe in yourself and all that you are. Know that there is something inside you that is greater than any obstacle.",
      "Everything you can imagine is real.",
      "Success usually comes to those who are too busy to be looking for it."
    ],
    science: [
      "The Earth revolves around the Sun in an elliptical orbit.",
      "Every action has an equal and opposite reaction.",
      "Water is composed of two hydrogen atoms and one oxygen atom.",
      "The speed of light in a vacuum is approximately 299,792 kilometers per second.",
      "DNA is the hereditary material in humans and almost all other organisms.",
      "Gravity is a force that attracts objects toward the center of the Earth.",
      "Newton's first law of motion states that an object will remain at rest or in uniform motion unless acted upon by a force.",
      "The human brain contains around 86 billion neurons.",
      "The theory of relativity revolutionized the way we think about space and time.",
      "In quantum mechanics, particles can exist in multiple states at once, a phenomenon known as superposition."
    ]
  };
  

const TypingGame = () => {
  const [theme, setTheme] = useState('coding');
  const [currentText, setCurrentText] = useState('');
  const [input, setInput] = useState('');
  const [startTime, setStartTime] = useState(null);
  const [accuracy, setAccuracy] = useState(0);
  const [wpm, setWpm] = useState(0);
  const [timeTaken, setTimeTaken] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [isCompleted, setIsCompleted] = useState(false);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  useEffect(() => {
    setNewText();
  }, [theme]);

  const setNewText = () => {
    const texts = sampleTexts[theme];
    const randomText = texts[Math.floor(Math.random() * texts.length)];
    setCurrentText(randomText);
    setInput('');
    setStartTime(null);
    setAccuracy(0);
    setWpm(0);
    setTimeTaken(0);
    setFeedback('');
    setIsCompleted(false);
    setIsTimerRunning(false);
  };

  const handleInputChange = (e) => {
    const value = e.target.value;

    if (!startTime) {
      setStartTime(Date.now());
      setIsTimerRunning(true);
    }

    setInput(value);
  };

  const handleSubmit = () => {
    // Calculate accuracy
    const correctChars = input.split('').filter((char, i) => char === currentText[i]).length;
    const accuracyValue = ((correctChars / input.length) * 100).toFixed(2);

    // Calculate WPM
    const endTime = Date.now();
    const timeInMinutes = (endTime - startTime) / 1000 / 60;
    const words = currentText.split(' ').length;
    const wpmValue = timeInMinutes > 0 ? (words / timeInMinutes).toFixed(2) : 0;

    // Set state values
    setAccuracy(accuracyValue);
    setWpm(wpmValue);
    setTimeTaken(((endTime - startTime) / 1000).toFixed(2));

    // Provide feedback
    let emoji = '';
    let message = '';

    if (input.trim() === currentText.trim()) {
      if (accuracyValue >= 90 && wpmValue >= 10) {
        emoji = '🌟';
        message = 'Excellent! You’re a pro!';
      } else if (accuracyValue >= 80 && accuracyValue < 90 && wpmValue > 10) {
        emoji = '😊';
        message = 'Great job! Keep practicing!';
      } else if (accuracyValue >= 60 && accuracyValue < 80 && wpmValue > 10) {
        emoji = '😐';
        message = 'Good effort, but there’s room for improvement!';
      } else {
        emoji = '😟';
        message = 'Don’t worry, keep practicing and you’ll get better!';
      }
    } else {
      emoji = '😕';
      message = 'Oops! You missed some parts. Try again!';
    }

    setFeedback(`${emoji} ${message}`);
    setIsCompleted(true);
    setIsTimerRunning(false);
    setStartTime(null);
  };

  useEffect(() => {
    if (isCompleted) {
      setTimeout(() => {
        alert('Thank you for choosing us!');
        setNewText();
      }, 4000);
    }
  }, [isCompleted]);

  return (
    <div className="typing-game-container">
      <h1 className="game-title">Interactive Typing Game</h1>

      <div className="theme-selector">
        <label>Select Theme: </label>
        <select value={theme} onChange={(e) => setTheme(e.target.value)}>
          <option value="coding">Coding</option>
          <option value="literature">Literature</option>
          <option value="quotes">Quotes</option>
          <option value="science">Science</option>
        </select>
      </div>

      <div className="text-display">{currentText}</div>

      <textarea
        className="typing-input"
        value={input}
        onChange={handleInputChange}
        placeholder="Start typing here..."
      ></textarea>

      <div className="results">
        <p><strong>Accuracy:</strong> {accuracy}%</p>
        <p><strong>Words Per Minute (WPM):</strong> {wpm}</p>
        <p><strong>Time Taken:</strong> {timeTaken} seconds</p>
        <p><strong>Feedback:</strong> {feedback}</p>
      </div>

      <button
        className="submit-button"
        onClick={handleSubmit}
        disabled={!isTimerRunning || input === ''}
      >
        Submit
      </button>
    </div>
  );
};

export default TypingGame;
