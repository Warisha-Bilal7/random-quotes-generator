'use client';

import { useState, useEffect } from 'react';

export default function Home() {
  const [quote, setQuote] = useState('');
  const [author, setAuthor] = useState('');
  const [topics, setTopics] = useState([]);
  const [selectedTopic, setSelectedTopic] = useState('motivation');
  const [isLoading, setIsLoading] = useState(false);

  // Fetch available topics on component mount
  useEffect(() => {
    fetchTopics();
    fetchQuote('motivation'); // Load a default quote
  }, []);

  const fetchTopics = async () => {
    try {
      const response = await fetch('/api/topics');
      const data = await response.json();
      setTopics(data.topics);
    } catch (error) {
      console.error('Error fetching topics:', error);
    }
  };

  const fetchQuote = async (topic) => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/quotes/${topic}`);
      const data = await response.json();
      setQuote(data.quote);
      setAuthor(data.author);
    } catch (error) {
      console.error('Error fetching quote:', error);
      setQuote('Error loading quote. Please try again.');
      setAuthor('');
    } finally {
      setIsLoading(false);
    }
  };

  const handleTopicChange = (topic) => {
    setSelectedTopic(topic);
    fetchQuote(topic);
  };

  const handleNewQuote = () => {
    fetchQuote(selectedTopic);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-12">
          Random Quotes Generator
        </h1>
        
        {/* Topic Selection */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Choose a Topic:</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {topics.map((topic) => (
              <button
                key={topic}
                onClick={() => handleTopicChange(topic)}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                  selectedTopic === topic
                    ? 'bg-blue-500 text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {topic.charAt(0).toUpperCase() + topic.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Quote Display */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8 relative">
          <div className="absolute top-4 left-4 text-6xl text-rose-200 font-serif leading-none">
            &quot;
          </div>
          <div className="absolute bottom-4 right-4 text-6xl text-rose-200 font-serif leading-none">
            &quot;
          </div>
          <div className="text-center">
            {isLoading ? (
              <div className="flex justify-center items-center h-32">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
              </div>
            ) : (
              <>
                <blockquote className="text-2xl md:text-3xl font-light text-gray-800 mb-6 leading-relaxed">
                  &quot;{quote}&quot;
                </blockquote>
                {author && (
                  <cite className="text-lg text-gray-600 font-medium">
                    — {author}
                  </cite>
                )}
              </>
            )}
          </div>
        </div>

        {/* New Quote Button */}
        <div className="text-center">
          <button
            onClick={handleNewQuote}
            disabled={isLoading}
            className="bg-blue-500 hover:bg-blue-600 disabled:bg-blue-300 text-white font-bold py-3 px-8 rounded-lg shadow-lg transition-all duration-200 transform hover:scale-105"
          >
            {isLoading ? 'Loading...' : 'New Quote'}
          </button>
        </div>

        {/* Footer */}
        <footer className="text-center mt-12 text-gray-600">
          <p className="text-amber-700 font-serif italic text-lg">
            &quot;In every book lies the soul of the whole past time&quot;
          </p>
        </footer>
      </div>
    </div>
  );
}