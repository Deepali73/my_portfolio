import React, { useState, useEffect } from 'react';
import { 
  Code, 
  Database, 
  Cloud, 
  Cpu, 
  Globe, 
  Server,
  GitBranch,
  Monitor,
  Smartphone,
  Zap,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { motion } from 'framer-motion';

const Skills = () => {
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  const [expandedFrameworks, setExpandedFrameworks] = useState<string[]>([]);

  const skillCategories = [
    {
      title: 'AI & Machine Learning',
      icon: Cpu,
      color: 'from-purple-500 to-pink-500',
      skills: ['Python', 'TensorFlow', 'PyTorch', 'Scikit-learn', 'OpenCV', 'Pandas', 'NumPy'],
      description: 'Advanced machine learning algorithms, neural networks, and data science tools for building intelligent applications.'
    },
    {
      title: 'Web Development',
      icon: Globe,
      color: 'from-blue-500 to-cyan-500',
      skills: ['React', 'TypeScript', 'Node.js', 'HTML/CSS', 'Tailwind CSS', 'Next.js', 'Express.js'],
      description: 'Modern web development stack for creating responsive, scalable, and user-friendly applications.'
    },
    {
      title: 'DevOps & Cloud',
      icon: Cloud,
      color: 'from-green-500 to-teal-500',
      skills: ['Docker', 'Kubernetes', 'AWS', 'Ansible', 'Grafana', 'Prometheus', 'Linux', 'CI/CD', 'Terraform'],
      description: 'Cloud infrastructure, containerization, monitoring, and automation tools for seamless deployment and scaling.'
    },
    {
      title: 'Database & Tools',
      icon: Database,
      color: 'from-orange-500 to-red-500',
      skills: ['PostgreSQL', 'MongoDB', 'Redis', 'Git', 'VS Code', 'Jupyter', 'Streamlit'],
      description: 'Database management systems and development tools for efficient data handling and productivity.'
    }
  ];

  const frameworks = [
    { 
      name: 'LangChain', 
      icon: Zap, 
      description: 'Framework for developing applications with large language models and AI agents.',
      details: 'Used for building conversational AI, document processing, and intelligent automation systems. Integrates with OpenAI, Anthropic, and other LLM providers.'
    },
    { 
      name: 'Streamlit', 
      icon: Monitor, 
      description: 'Rapid web application development for data science and machine learning projects.',
      details: 'Perfect for creating interactive dashboards, data visualization tools, and ML model demos. Enables quick prototyping and deployment of data applications.'
    },
    { 
      name: 'FastAPI', 
      icon: Server, 
      description: 'Modern, fast web framework for building APIs with Python based on standard type hints.',
      details: 'High-performance API development with automatic documentation, data validation, and async support. Ideal for microservices and backend development.'
    },
    { 
      name: 'Flask', 
      icon: Code, 
      description: 'Lightweight and flexible Python web framework for building web applications.',
      details: 'Minimalist framework for building web applications, APIs, and microservices. Great for prototyping and small to medium-sized projects.'
    },
    { 
      name: 'React Native', 
      icon: Smartphone, 
      description: 'Cross-platform mobile application development using React and JavaScript.',
      details: 'Build native mobile apps for iOS and Android using React. Share code between platforms while maintaining native performance and look.'
    },
    { 
      name: 'Git', 
      icon: GitBranch, 
      description: 'Distributed version control system for tracking changes in source code during development.',
      details: 'Essential tool for collaborative development, branching strategies, and code version management. Integrates with GitHub, GitLab, and other platforms.'
    }
  ];

  const toggleCategory = (title: string) => {
    setExpandedCategory(expandedCategory === title ? null : title);
  };

  const toggleFramework = (name: string) => {
    setExpandedFrameworks(prev => 
      prev.includes(name) 
        ? prev.filter(f => f !== name)
        : [...prev, name]
    );
  };

  return (
    <section id="skills" className="relative py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Skills & Technologies
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            A comprehensive toolkit for building next-generation applications
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {skillCategories.map((category, index) => {
            const Icon = category.icon;
            const isExpanded = expandedCategory === category.title;
            return (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group bg-gray-800/50 backdrop-blur-lg rounded-2xl border border-gray-700 hover:border-purple-500 transition-all duration-300 transform hover:scale-105 cursor-pointer"
                onClick={() => toggleCategory(category.title)}
              >
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-10 h-10 rounded-lg bg-gradient-to-r ${category.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="text-white" size={20} />
                    </div>
                    {isExpanded ? (
                      <ChevronUp className="text-gray-400" size={20} />
                    ) : (
                      <ChevronDown className="text-gray-400" size={20} />
                    )}
                </div>
                  <h3 className="text-lg font-semibold text-white mb-2">{category.title}</h3>
                  
                  {isExpanded && (
                    <div className="mt-4 space-y-3">
                      <p className="text-gray-300 text-sm leading-relaxed">
                        {category.description}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {category.skills.map((skill) => (
                          <span
                      key={skill}
                            className="text-gray-300 text-xs bg-gray-700/50 px-2 py-1 rounded-full border border-gray-600"
                    >
                      {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>

        <div className="bg-gradient-to-r from-gray-800/50 to-gray-700/50 backdrop-blur-lg rounded-2xl border border-gray-600 p-8">
          <div className="text-center mb-8">
            <h3 className="text-3xl font-bold text-white mb-2">
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Featured Frameworks & Tools
              </span>
          </h3>
            <p className="text-gray-400">Essential tools that power my development workflow</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {frameworks.map((framework, index) => {
              const Icon = framework.icon;
              const isExpanded = expandedFrameworks.includes(framework.name);
              return (
                <motion.div
                  key={framework.name}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05 }}
                  className="group relative bg-gray-800/50 backdrop-blur-lg rounded-xl border border-gray-700 hover:border-purple-500 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/20 cursor-pointer"
                  onClick={() => toggleFramework(framework.name)}
                >
                  <div className="p-4">
                    <div className="flex items-start space-x-3 mb-3">
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 flex-shrink-0">
                        <Icon className="text-white" size={16} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h4 className="text-sm font-semibold text-white group-hover:text-purple-400 transition-colors duration-200 truncate">
                            {framework.name}
                          </h4>
                          {isExpanded ? (
                            <ChevronUp className="text-gray-400 flex-shrink-0" size={16} />
                          ) : (
                            <ChevronDown className="text-gray-400 flex-shrink-0" size={16} />
                          )}
                        </div>
                        <p className="text-gray-300 text-xs leading-relaxed mt-1">
                          {framework.description}
                        </p>
                      </div>
                    </div>
                    
                    {isExpanded && (
                      <div className="mt-3 pt-3 border-t border-gray-600">
                        <p className="text-gray-300 text-xs leading-relaxed">
                          {framework.details}
                        </p>
                      </div>
                    )}
                  </div>
                  
                  {/* Hover effect overlay */}
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-pink-500/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;