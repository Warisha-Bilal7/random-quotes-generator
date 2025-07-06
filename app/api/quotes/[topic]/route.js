import { NextResponse } from 'next/server';

// Quote database organized by topic
const quotes = {
  motivation: [
    { quote: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
    { quote: "Innovation distinguishes between a leader and a follower.", author: "Steve Jobs" },
    { quote: "Your limitation—it's only your imagination.", author: "Unknown" },
    { quote: "Push yourself, because no one else is going to do it for you.", author: "Unknown" },
    { quote: "Great things never come from comfort zones.", author: "Unknown" },
    { quote: "Dream it. Wish it. Do it.", author: "Unknown" },
    { quote: "Success doesn't just find you. You have to go out and get it.", author: "Unknown" },
    { quote: "The harder you work for something, the greater you'll feel when you achieve it.", author: "Unknown" },
    { quote: "Dream bigger. Do bigger.", author: "Unknown" },
    { quote: "Don't stop when you're tired. Stop when you're done.", author: "Unknown" }
  ],
  success: [
    { quote: "Success is not final, failure is not fatal: it is the courage to continue that counts.", author: "Winston Churchill" },
    { quote: "The way to get started is to quit talking and begin doing.", author: "Walt Disney" },
    { quote: "Don't be afraid to give up the good to go for the great.", author: "John D. Rockefeller" },
    { quote: "I find that the harder I work, the more luck I seem to have.", author: "Thomas Jefferson" },
    { quote: "Success is walking from failure to failure with no loss of enthusiasm.", author: "Winston Churchill" },
    { quote: "The successful warrior is the average man with laser-like focus.", author: "Bruce Lee" },
    { quote: "Opportunities don't happen. You create them.", author: "Chris Grosser" },
    { quote: "Success is not how high you have climbed, but how you make a positive difference to the world.", author: "Roy T. Bennett" }
  ],
  life: [
    { quote: "Life is what happens to you while you're busy making other plans.", author: "John Lennon" },
    { quote: "The purpose of our lives is to be happy.", author: "Dalai Lama" },
    { quote: "Life is really simple, but we insist on making it complicated.", author: "Confucius" },
    { quote: "In the end, it's not the years in your life that count. It's the life in your years.", author: "Abraham Lincoln" },
    { quote: "Life is 10% what happens to you and 90% how you react to it.", author: "Charles R. Swindoll" },
    { quote: "The only impossible journey is the one you never begin.", author: "Tony Robbins" },
    { quote: "Life is a succession of lessons which must be lived to be understood.", author: "Helen Keller" }
  ],
  love: [
    { quote: "The best thing to hold onto in life is each other.", author: "Audrey Hepburn" },
    { quote: "Love is not about how much you say 'I love you,' but how much you can prove that it's true.", author: "Unknown" },
    { quote: "Being deeply loved by someone gives you strength, while loving someone deeply gives you courage.", author: "Lao Tzu" },
    { quote: "The greatest happiness of life is the conviction that we are loved.", author: "Victor Hugo" },
    { quote: "Love is composed of a single soul inhabiting two bodies.", author: "Aristotle" },
    { quote: "Where there is love there is life.", author: "Mahatma Gandhi" }
  ],
  wisdom: [
    { quote: "The only true wisdom is in knowing you know nothing.", author: "Socrates" },
    { quote: "It is better to remain silent at the risk of being thought a fool, than to talk and remove all doubt of it.", author: "Maurice Switzer" },
    { quote: "The fool doth think he is wise, but the wise man knows himself to be a fool.", author: "William Shakespeare" },
    { quote: "Whenever you find yourself on the side of the majority, it is time to pause and reflect.", author: "Mark Twain" },
    { quote: "Yesterday is history, tomorrow is a mystery, today is a gift of God, which is why we call it the present.", author: "Bill Keane" },
    { quote: "The journey of a thousand miles begins with one step.", author: "Lao Tzu" }
  ],
  inspirational: [
    { quote: "The future belongs to those who believe in the beauty of their dreams.", author: "Eleanor Roosevelt" },
    { quote: "You are never too old to set another goal or to dream a new dream.", author: "C.S. Lewis" },
    { quote: "What lies behind us and what lies before us are tiny matters compared to what lies within us.", author: "Ralph Waldo Emerson" },
    { quote: "Believe you can and you're halfway there.", author: "Theodore Roosevelt" },
    { quote: "The only person you are destined to become is the person you decide to be.", author: "Ralph Waldo Emerson" },
    { quote: "Go confidently in the direction of your dreams. Live the life you have imagined.", author: "Henry David Thoreau" }
  ],
  friendship: [
    { quote: "A friend is someone who knows all about you and still loves you.", author: "Elbert Hubbard" },
    { quote: "Friendship is born at that moment when one person says to another, 'What! You too? I thought I was the only one.'", author: "C.S. Lewis" },
    { quote: "A true friend is one who overlooks your failures and tolerates your success.", author: "Doug Larson" },
    { quote: "The only way to have a friend is to be one.", author: "Ralph Waldo Emerson" },
    { quote: "Friends are the family you choose.", author: "Jess C. Scott" }
  ],
  happiness: [
    { quote: "Happiness is not something ready made. It comes from your own actions.", author: "Dalai Lama" },
    { quote: "The purpose of our lives is to be happy.", author: "Dalai Lama" },
    { quote: "Happiness is when what you think, what you say, and what you do are in harmony.", author: "Mahatma Gandhi" },
    { quote: "For every minute you are angry you lose sixty seconds of happiness.", author: "Ralph Waldo Emerson" },
    { quote: "Happiness depends upon ourselves.", author: "Aristotle" }
  ],
  leadership: [
    { quote: "The greatest leader is not necessarily the one who does the greatest things. He is the one that gets the people to do the greatest things.", author: "Ronald Reagan" },
    { quote: "A leader is one who knows the way, goes the way, and shows the way.", author: "John C. Maxwell" },
    { quote: "Leadership is not about being in charge. It's about taking care of those in your charge.", author: "Simon Sinek" },
    { quote: "The art of leadership is saying no, not saying yes. It is very easy to say yes.", author: "Tony Blair" },
    { quote: "Leadership is the capacity to translate vision into reality.", author: "Warren Bennis" }
  ],
  business: [
    { quote: "The way to get started is to quit talking and begin doing.", author: "Walt Disney" },
    { quote: "Your work is going to fill a large part of your life, and the only way to be truly satisfied is to do what you believe is great work.", author: "Steve Jobs" },
    { quote: "The best time to plant a tree was 20 years ago. The second best time is now.", author: "Chinese Proverb" },
    { quote: "If you really look closely, most overnight successes took a long time.", author: "Steve Jobs" },
    { quote: "Don't be afraid to give up the good to go for the great.", author: "John D. Rockefeller" }
  ],
  education: [
    { quote: "Education is the most powerful weapon which you can use to change the world.", author: "Nelson Mandela" },
    { quote: "The beautiful thing about learning is that no one can take it away from you.", author: "B.B. King" },
    { quote: "Education is not preparation for life; education is life itself.", author: "John Dewey" },
    { quote: "The more that you read, the more things you will know. The more that you learn, the more places you'll go.", author: "Dr. Seuss" },
    { quote: "Live as if you were to die tomorrow. Learn as if you were to live forever.", author: "Mahatma Gandhi" }
  ],
  family: [
    { quote: "Family is not an important thing, it's everything.", author: "Michael J. Fox" },
    { quote: "The love of family and the admiration of friends is much more important than wealth and privilege.", author: "Charles Kuralt" },
    { quote: "Family means no one gets left behind or forgotten.", author: "David Ogden Stiers" },
    { quote: "A happy family is but an earlier heaven.", author: "George Bernard Shaw" },
    { quote: "The memories we make with our family is everything.", author: "Candace Cameron Bure" }
  ]
};

export async function GET(request, { params }) {
  const { topic } = params;
  
  // Check if topic exists
  if (!quotes[topic]) {
    return NextResponse.json(
      { error: 'Topic not found' },
      { status: 404 }
    );
  }

  // Get random quote from the selected topic
  const topicQuotes = quotes[topic];
  const randomIndex = Math.floor(Math.random() * topicQuotes.length);
  const selectedQuote = topicQuotes[randomIndex];

  return NextResponse.json(selectedQuote);
}