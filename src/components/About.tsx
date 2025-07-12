import React from 'react';
import { Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

const About = () => {
  return (
    <section id="about" className="relative py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              About Me
            </span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-400 to-pink-400 mx-auto rounded-full"></div>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          whileHover={{ scale: 1.02 }}
          className="bg-gray-800/50 backdrop-blur-lg p-10 rounded-2xl border border-gray-700 hover:border-purple-500 transition-all duration-500 hover:shadow-2xl hover:shadow-purple-500/20 hover:bg-gray-800/70"
        >
          <div className="flex items-center space-x-3 mb-8">
            <div className="w-14 h-14 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <Sparkles className="text-white" size={28} />
            </div>
            <h3 className="text-3xl font-semibold text-white">Who I Am</h3>
          </div>
          <p className="text-gray-300 leading-relaxed text-base">
            Hi! I'm <span className="text-purple-400 font-semibold">Deepali Verma</span>, a curiosity-driven developer passionate about AI, MLOps, DevOps, and full-stack web development. Currently pursuing B.Tech in Computer Science from <span className="text-blue-400 font-medium">Rajasthan Technical University</span>, I thrive on building scalable, real-world solutions that blend intelligent automation with robust engineering.
            <br /><br />
            My journey began with a simple question: <span className="text-yellow-400 italic">"How does this actually work under the hood?"</span> That curiosity led me through Linux terminals, AI models, backend logic, and frontend design. I have strong foundations in <span className="text-orange-400 font-medium">Data Structures & Algorithms (DSA)</span>, <span className="text-blue-400 font-medium">C++</span>, <span className="text-green-400 font-medium">Python</span>, and <span className="text-red-400 font-medium">Java</span> programming, along with object-oriented design principles. These core skills have enabled me to build robust applications, solve complex problems efficiently, and create scalable backend systems.
            <br /><br />
            Whether it's deploying containerized apps, automating workflows, or crafting seamless user experiences, I love turning ideas into impactful products. My projects reflect a hands-on approach to learning and a commitment to clarity, scalability, and continuous improvement.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default About;