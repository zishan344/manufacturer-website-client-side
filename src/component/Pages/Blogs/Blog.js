import React, { useState } from "react";
import { 
  FiBookOpen, 
  FiCode, 
  FiLayers, 
  FiSettings,
  FiCheckSquare,
  FiArrowRight,
  FiClock,
  FiUser,
  FiTag
} from "react-icons/fi";

const Blog = () => {
  const [openCard, setOpenCard] = useState(null);

  const blogPosts = [
    {
      id: 1,
      icon: FiCode,
      category: "Performance",
      title: "How will you improve the performance of a React Application?",
      readTime: "8 min read",
      author: "React Team",
      gradient: "from-blue-500 to-purple-600",
      content: {
        type: "list",
        items: [
          "Using Immutable Data Structures",
          "Function/Stateless Components and React.PureComponent", 
          "Multiple Chunk Files",
          "Dependency optimization",
          "Use React.Fragments to Avoid Additional HTML Element Wrappers",
          "Avoid Inline Function Definition in the Render Function",
          "Throttling and Debouncing Event Action in JavaScript",
          "Avoid using Index as Key for map",
          "Avoiding Props in Initial States",
          "Spreading props on DOM elements"
        ]
      }
    },
    {
      id: 2,
      icon: FiLayers,
      category: "JavaScript",
      title: "How does prototypical inheritance work?",
      readTime: "5 min read",
      author: "JavaScript Expert",
      gradient: "from-emerald-500 to-teal-600",
      content: {
        type: "text",
        text: "Simply put, prototypical inheritance refers to the capability to access object properties from another object. We use a JavaScript prototype to add new properties and methods to an existing object constructor. We can also basically tell our JS code to inherit properties from a prototype. Prototypical inheritance allows us to exercise the parcels or methods from one JavaScript object to another through a reference pointer function.",
        highlight: "All JavaScript objects inherit properties and methods from a prototype"
      }
    },
    {
      id: 3,
      icon: FiSettings,
      category: "React State",
      title: "Why you do not set the state directly in React?",
      readTime: "4 min read", 
      author: "React Developer",
      gradient: "from-orange-500 to-red-600",
      content: {
        type: "points",
        intro: "One should never update the state directly because of the following reasons:",
        points: [
          "If you update it directly, calling setState() subsequently may just replace the update you made.",
          "When you directly update the state, it doesn't change this.state immediately. Rather, it creates a pending state transition.",
          "You'll lose control of the state across all components."
        ]
      }
    },
    {
      id: 4,
      icon: FiLayers,
      category: "State Management",
      title: "What are the different ways to manage state in a React application?",
      readTime: "6 min read",
      author: "State Expert",
      gradient: "from-purple-500 to-pink-600",
      content: {
        type: "categories",
        intro: "There are four main types of state you need to properly manage in your React apps:",
        categories: [
          {
            name: "Local state",
            description: "State that's managed within a single component"
          },
          {
            name: "Global state", 
            description: "Data we manage across multiple components"
          },
          {
            name: "Server state",
            description: "Data that comes from an external server that must be integrated with our UI state"
          },
          {
            name: "URL state",
            description: "Data that exists on our URLs, including the pathname and query parameters"
          }
        ]
      }
    },
    {
      id: 5,
      icon: FiCheckSquare,
      category: "Testing",
      title: "What is a unit test? Why should write unit tests?",
      readTime: "7 min read",
      author: "Testing Expert", 
      gradient: "from-indigo-500 to-blue-600",
      content: {
        type: "text",
        text: "Unit tests are generally automated tests written and run by software developers to ensure that a section of an application (known as the 'unit') meets its design and behaves as intended. In procedural programming, a unit could be an entire module, but it's more commonly an individual function or procedure."
      }
    }
  ];

  const toggleCard = (id) => {
    setOpenCard(openCard === id ? null : id);
  };

  const renderContent = (content) => {
    switch (content.type) {
      case 'list':
        return (
          <ol className="space-y-3">
            {content.items.map((item, index) => (
              <li key={index} className="flex items-start space-x-3">
                <span className="flex-shrink-0 w-6 h-6 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center text-sm font-semibold">
                  {index + 1}
                </span>
                <span className="text-gray-700 leading-relaxed">{item}</span>
              </li>
            ))}
          </ol>
        );
      
      case 'points':
        return (
          <div className="space-y-4">
            {content.intro && (
              <p className="text-gray-700 font-medium">{content.intro}</p>
            )}
            <div className="space-y-3">
              {content.points.map((point, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-2 h-2 bg-emerald-500 rounded-full mt-2"></div>
                  <p className="text-gray-700 leading-relaxed">{point}</p>
                </div>
              ))}
            </div>
          </div>
        );

      case 'categories':
        return (
          <div className="space-y-4">
            {content.intro && (
              <p className="text-gray-700 font-semibold">{content.intro}</p>
            )}
            <div className="space-y-4">
              {content.categories.map((category, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">{category.name}</h4>
                  <p className="text-gray-700 text-sm leading-relaxed">{category.description}</p>
                </div>
              ))}
            </div>
          </div>
        );

      default:
        return (
          <div className="space-y-4">
            <p className="text-gray-700 leading-relaxed">{content.text}</p>
            {content.highlight && (
              <div className="bg-emerald-50 border-l-4 border-emerald-500 p-4 rounded-r-lg">
                <p className="font-semibold text-emerald-800">{content.highlight}</p>
              </div>
            )}
          </div>
        );
    }
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-12">
      {/* Background Elements */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-emerald-500/10 rounded-full blur-xl animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-24 h-24 bg-blue-500/10 rounded-full blur-xl animate-pulse delay-1000"></div>
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-2 bg-emerald-100 text-emerald-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <FiBookOpen className="w-4 h-4" />
            <span>Knowledge Base</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Developer <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">Blog</span>
          </h1>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto">
            Essential knowledge and best practices for modern web development. 
            Expand your understanding with our comprehensive guides.
          </p>
        </div>

        {/* Blog Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {blogPosts.map((post) => {
            const IconComponent = post.icon;
            const isOpen = openCard === post.id;
            
            return (
              <div
                key={post.id}
                className="bg-white/80 backdrop-blur-sm rounded-2xl border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden"
              >
                {/* Card Header */}
                <div className={`bg-gradient-to-r ${post.gradient} p-6 text-white`}>
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-white/20 rounded-lg">
                        <IconComponent className="w-6 h-6" />
                      </div>
                      <div>
                        <div className="flex items-center space-x-2 mb-1">
                          <FiTag className="w-3 h-3" />
                          <span className="text-xs font-medium opacity-90">{post.category}</span>
                        </div>
                        <h2 className="text-lg font-bold leading-tight">{post.title}</h2>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm opacity-90">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-1">
                        <FiUser className="w-3 h-3" />
                        <span>{post.author}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <FiClock className="w-3 h-3" />
                        <span>{post.readTime}</span>
                      </div>
                    </div>
                    
                    <button
                      onClick={() => toggleCard(post.id)}
                      className="flex items-center space-x-1 bg-white/20 hover:bg-white/30 px-3 py-1.5 rounded-lg transition-colors"
                    >
                      <span className="text-xs font-medium">
                        {isOpen ? 'Collapse' : 'Read More'}
                      </span>
                      <FiArrowRight className={`w-3 h-3 transition-transform ${isOpen ? 'rotate-90' : ''}`} />
                    </button>
                  </div>
                </div>

                {/* Card Content */}
                <div className={`transition-all duration-500 ease-in-out ${
                  isOpen ? 'max-h-[800px] opacity-100' : 'max-h-0 opacity-0'
                } overflow-hidden`}>
                  <div className="p-6">
                    {renderContent(post.content)}
                  </div>
                </div>

                {/* Card Footer - Always Visible */}
                <div className="px-6 pb-6">
                  <div className="flex items-center justify-between text-sm text-gray-500 border-t border-gray-200 pt-4">
                    <span>Technical Article</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span>Updated Recently</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-white/20 shadow-xl p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Want to learn more?
            </h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              These articles cover fundamental concepts every developer should understand. 
              Keep exploring and building amazing applications!
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              {['React', 'JavaScript', 'Performance', 'Testing', 'Best Practices'].map((tag) => (
                <span key={tag} className="px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-sm font-medium">
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;
