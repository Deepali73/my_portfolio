import React, { useEffect, useState } from 'react';
import { Download, Github, Linkedin, ExternalLink } from 'lucide-react';

const typewriterWords = [
  'AI Developer',
  'DevOps Enthusiast',
  'MLOps',
  'Full-Stack Builder'
];

const Hero = () => {
  const [currentWord, setCurrentWord] = useState('');
  const [wordIndex, setWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const typingSpeed = 120;
  const deletingSpeed = 60;
  const pauseTime = 1200;

  useEffect(() => {
    let timeout: any;
    if (!isDeleting && charIndex < typewriterWords[wordIndex].length) {
      timeout = setTimeout(() => {
        setCurrentWord(typewriterWords[wordIndex].substring(0, charIndex + 1));
        setCharIndex(charIndex + 1);
      }, typingSpeed);
    } else if (isDeleting && charIndex > 0) {
      timeout = setTimeout(() => {
        setCurrentWord(typewriterWords[wordIndex].substring(0, charIndex - 1));
        setCharIndex(charIndex - 1);
      }, deletingSpeed);
    } else if (!isDeleting && charIndex === typewriterWords[wordIndex].length) {
      timeout = setTimeout(() => setIsDeleting(true), pauseTime);
    } else if (isDeleting && charIndex === 0) {
      setIsDeleting(false);
      setWordIndex((wordIndex + 1) % typewriterWords.length);
    }
    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, wordIndex]);

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-16 overflow-hidden">
      <div className="max-w-7xl mx-auto text-center relative z-10">
        <div className="mb-8">
          <div className="w-32 h-32 mx-auto mb-6 rounded-full bg-gradient-to-r from-primary-500 to-purple-500 p-1 transition-all duration-300 hover:scale-110 hover:shadow-2xl hover:shadow-primary-500/50">
            <div className="w-full h-full rounded-full bg-dark-100 flex items-center justify-center overflow-hidden">
              <img
                src="/deepali.jpg"
                alt="Deepali Verma"
                className="w-full h-full object-cover rounded-full transition-all duration-300 hover:scale-105"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  e.currentTarget.parentElement!.innerHTML = '<div class="w-full h-full rounded-full bg-gradient-to-r from-primary-500 to-purple-500 flex items-center justify-center text-white text-2xl font-bold">DV</div>';
                }}
              />
            </div>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-4">
            <span className="bg-gradient-to-r from-primary-500 via-purple-500 to-white bg-clip-text text-transparent">
              Deepali Verma
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-4 font-medium min-h-[2.5rem]">
            <span className="border-r-2 border-primary-500 pr-1 animate-pulse">{currentWord}</span>
          </p>
          <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto">
            Curiosity-driven developer passionate about AI, MLOps, DevOps, and building scalable, real-world solutions.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <a
            href="/DEEPALI VERMA.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center space-x-2 bg-gradient-primary hover:bg-gradient-secondary text-white px-6 py-3 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
          >
            <Download size={20} />
            <span>Download Resume</span>
          </a>
          <a
            href="https://github.com/Deepali73"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center space-x-2 bg-dark-300 hover:bg-dark-400 text-white px-6 py-3 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 hover:shadow-lg border border-primary-500/30"
          >
            <Github size={20} />
            <span>GitHub</span>
            <ExternalLink size={16} className="opacity-0 group-hover:opacity-100 transition-opacity" />
          </a>
          <a
            href="https://www.linkedin.com/in/deepali-verma-075978257"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center space-x-2 bg-gradient-accent text-dark-100 px-6 py-3 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
          >
            <Linkedin size={20} />
            <span>LinkedIn</span>
            <ExternalLink size={16} className="opacity-0 group-hover:opacity-100 transition-opacity" />
          </a>
          <a
            href="https://x.com/DeepaliVer13316?s=08"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center space-x-2 bg-gray-700 hover:bg-gray-800 text-white px-6 py-3 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
          >
            <span className="font-bold">X</span>
            <span>Twitter</span>
            <ExternalLink size={16} className="opacity-0 group-hover:opacity-100 transition-opacity" />
          </a>
        </div>

        <div className="animate-bounce">
          <div className="w-6 h-10 border-2 border-gray-400 rounded-full mx-auto">
            <div className="w-1 h-3 bg-gray-400 rounded-full mx-auto mt-2 animate-pulse"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;