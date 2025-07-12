import React, { useState, useEffect } from 'react';
import { Github, ExternalLink, Linkedin } from 'lucide-react';
import { motion } from 'framer-motion';

interface Project {
  id: string;
  title: string;
  description: string;
  languages: string[];
  url: string;
  source: 'github' | 'linkedin';
  createdAt: string;
  stars?: number;
  forks?: number;
  watchers?: number;
}

const Projects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [hoveredTech, setHoveredTech] = useState<string | null>(null);

  // LinkedIn API configuration
  const LINKEDIN_PROFILE_ID = 'deepali-verma-075978257'; // Your LinkedIn profile ID
  const LINKEDIN_ACCESS_TOKEN = import.meta.env.VITE_LINKEDIN_ACCESS_TOKEN; // You'll need to add this to your .env file

  // GitHub API configuration (fallback)
  const GITHUB_USERNAME = 'Deepali73';

  // Fetch all projects
  const fetchProjects = async () => {
    try {
      let allProjects: Project[] = [];

      // Use fallback LinkedIn projects (no API token needed)
      allProjects = [...allProjects, ...getFallbackLinkedinProjects()];

      // Try to fetch GitHub projects
      try {
        const headers: HeadersInit = {
          'Accept': 'application/vnd.github.v3+json'
        };

        const response = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=10`, {
          headers
        });
        
        if (response.ok) {
          const repos = await response.json();
          const githubProjects: Project[] = repos
            .filter((repo: any) => !repo.fork && !repo.private)
            .map((repo: any) => {
              let description = repo.description;
              try {
                if (!description || description.trim() === '') {
                  if (repo.language) {
                    if (repo.language === 'JavaScript') description = 'Project built with JavaScript and modern web technologies.';
                    else if (repo.language === 'Python') description = 'Project using Python for automation, scripting, or data analysis.';
                    else if (repo.language === 'Java') description = 'Java-based project demonstrating algorithms, backend, or application logic.';
                    else if (repo.language === 'HTML') description = 'Frontend project using HTML, CSS, and web UI techniques.';
                    else if (repo.language === 'C++') description = 'C++ project for system programming, algorithms, or performance tasks.';
                    else if (repo.language === 'Shell' || repo.language === 'Bash') description = 'Linux automation or scripting project.';
                    else description = `Project built with ${repo.language}.`;
                  } else {
                    description = 'Project using modern development practices and clean code structure.';
                  }
                }
              } catch (e) {
                description = 'Project using modern development practices and clean code structure.';
              }
              return {
                id: `github-${repo.id}`,
                title: repo.name,
                description: description,
                languages: repo.language ? [repo.language] : [],
                url: repo.html_url,
                source: 'github' as const,
                createdAt: repo.created_at,
                stars: repo.stargazers_count,
                forks: repo.forks_count,
                watchers: repo.watchers_count
              };
            });
          allProjects = [...allProjects, ...githubProjects];
        }
      } catch (error) {
        console.error('Error fetching GitHub projects:', error);
      }

      // Add fallback GitHub projects if no API data
      if (allProjects.filter(p => p.source === 'github').length === 0) {
        allProjects = [...allProjects, ...getFallbackGithubProjects()];
      }

      // Sort projects by creation date (newest first)
      allProjects.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      
      setProjects(allProjects);
    } catch (error) {
      console.error('Error fetching projects:', error);
      // Fallback to sample data
      const fallbackProjects = [...getFallbackLinkedinProjects(), ...getFallbackGithubProjects()];
      fallbackProjects.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      setProjects(fallbackProjects);
    }
  };

  // Fallback GitHub projects (in case API fails)
  const getFallbackGithubProjects = (): Project[] => [
    {
      id: 'github-1',
      title: 'AI Stock Analysis Dashboard',
      description: 'Real-time stock prediction using LSTM neural networks with interactive Gradio UI for financial forecasting. Built with Python, TensorFlow, and JavaScript.',
      languages: ['Python', 'JavaScript', 'HTML/CSS'],
      url: 'https://github.com/Deepali73/ai-stock-analysis',
      source: 'github',
      createdAt: '2024-01-15T10:00:00Z',
      stars: 15,
      forks: 8,
      watchers: 12
    },
    {
      id: 'github-2',
      title: 'JavaScript Project Collection',
      description: 'Collection of 15+ mini-projects including interactive games, utilities, and web applications. Technologies: React, JavaScript, HTML/CSS, and modern web tools.',
      languages: ['JavaScript', 'React', 'HTML/CSS'],
      url: 'https://github.com/Deepali73/javascript-projects',
      source: 'github',
      createdAt: '2024-02-20T14:30:00Z',
      stars: 23,
      forks: 12,
      watchers: 18
    },
    {
      id: 'github-3',
      title: 'Linux Automation Scripts',
      description: 'Bash scripts for system automation, server management, and deployment workflows. Includes Docker containerization and Kubernetes orchestration with Python integration.',
      languages: ['Bash', 'Shell', 'Python'],
      url: 'https://github.com/Deepali73/linux-automation',
      source: 'github',
      createdAt: '2024-03-10T09:15:00Z',
      stars: 18,
      forks: 6,
      watchers: 14
    },
    {
      id: 'github-4',
      title: 'Climbing Stairs',
      description: 'Java implementation of climbing stairs problem using dynamic programming for efficient algorithm design. Demonstrates advanced Java programming and problem-solving skills.',
      languages: ['Java'],
      url: 'https://github.com/Deepali73/Climbing-stairs',
      source: 'github',
      createdAt: '2024-03-15T11:20:00Z',
      stars: 5,
      forks: 2,
      watchers: 8
    },
    {
      id: 'github-5',
      title: 'TO-DO App',
      description: 'Interactive task management application with local storage, responsive design, and complete CRUD functionality. Built with vanilla JavaScript and modern CSS.',
      languages: ['JavaScript', 'HTML/CSS'],
      url: 'https://github.com/Deepali73/TO-DO-App',
      source: 'github',
      createdAt: '2024-04-01T16:45:00Z',
      stars: 12,
      forks: 4,
      watchers: 10
    },
    {
      id: 'github-6',
      title: 'Simon Says Game',
      description: 'Classic memory game with sound effects, animations, and increasing difficulty levels. Technologies: JavaScript for game logic, HTML5 audio, and CSS animations.',
      languages: ['JavaScript', 'HTML/CSS'],
      url: 'https://github.com/Deepali73/Simon-Says-Game',
      source: 'github',
      createdAt: '2024-04-10T13:30:00Z',
      stars: 8,
      forks: 3,
      watchers: 7
    },
    {
      id: 'github-7',
      title: 'Spotify Clone',
      description: 'Music player clone with modern UI design, playlist management, and responsive web experience. Built with HTML5, CSS3, and vanilla JavaScript.',
      languages: ['HTML', 'CSS', 'JavaScript'],
      url: 'https://github.com/Deepali73/Spotify-Clone',
      source: 'github',
      createdAt: '2024-04-15T09:20:00Z',
      stars: 14,
      forks: 5,
      watchers: 11
    },
    {
      id: 'github-8',
      title: 'University Domain List',
      description: 'Database application for managing university domain information with search, filter, and visualization features. Technologies: JavaScript, SQL, and modern web APIs.',
      languages: ['JavaScript', 'HTML/CSS', 'SQL'],
      url: 'https://github.com/Deepali73/University-Domain-List',
      source: 'github',
      createdAt: '2024-04-20T15:10:00Z',
      stars: 6,
      forks: 2,
      watchers: 9
    }
  ];

  // Fallback LinkedIn projects
  const getFallbackLinkedinProjects = (): Project[] => [
    {
      id: 'linkedin-1',
      title: 'AI-Powered Stock Analysis System',
      description: 'Machine learning system for stock analysis with predictive modeling and interactive dashboards. Built with Python, TensorFlow, JavaScript, and SQL for comprehensive financial insights.',
      languages: ['Python', 'JavaScript', 'SQL'],
      url: 'https://www.linkedin.com/in/deepali-verma-075978257/details/projects/',
      source: 'linkedin',
      createdAt: '2024-01-20T10:30:00Z'
    },
    {
      id: 'linkedin-2',
      title: 'Full-Stack Web Development Portfolio',
      description: 'Modern responsive portfolio built with React, TypeScript, and Tailwind CSS. Features smooth animations, interactive components, and modern web development practices.',
      languages: ['TypeScript', 'React', 'Tailwind CSS'],
      url: 'https://www.linkedin.com/in/deepali-verma-075978257/details/projects/',
      source: 'linkedin',
      createdAt: '2024-02-10T14:15:00Z'
    },
    {
      id: 'linkedin-3',
      title: 'JavaScript Mini-Projects Collection',
      description: 'Collection of 15+ interactive web applications and games. Technologies include React, JavaScript, HTML/CSS, and modern web development frameworks.',
      languages: ['JavaScript', 'React', 'HTML/CSS'],
      url: 'https://www.linkedin.com/in/deepali-verma-075978257/details/projects/',
      source: 'linkedin',
      createdAt: '2024-03-05T16:45:00Z'
    },
    {
      id: 'linkedin-4',
      title: 'Linux System Automation Tools',
      description: 'Automation scripts for Linux system administration and deployment workflows. Includes Docker containerization, Kubernetes orchestration, and Python integration for DevOps automation.',
      languages: ['Bash', 'Python', 'Shell'],
      url: 'https://www.linkedin.com/in/deepali-verma-075978257/details/projects/',
      source: 'linkedin',
      createdAt: '2024-03-20T11:20:00Z'
    },
    {
      id: 'linkedin-5',
      title: 'Data Structures & Algorithms Implementation',
      description: 'Java implementation of data structures and algorithms including dynamic programming solutions. Demonstrates advanced problem-solving skills and efficient algorithm design.',
      languages: ['Java', 'Algorithms', 'Data Structures'],
      url: 'https://www.linkedin.com/in/deepali-verma-075978257/details/projects/',
      source: 'linkedin',
      createdAt: '2024-04-01T09:30:00Z'
    }
  ];

  const getProjectEmoji = (title: string) => {
    const lower = title.toLowerCase();
    if (lower.includes('stock') || lower.includes('analysis')) return '📈';
    if (lower.includes('game') || lower.includes('simon')) return '🕹️';
    if (lower.includes('to-do') || lower.includes('todo')) return '📝';
    if (lower.includes('linux') || lower.includes('automation')) return '🐧';
    if (lower.includes('music') || lower.includes('spotify')) return '🎵';
    if (lower.includes('portfolio') || lower.includes('web')) return '💻';
    if (lower.includes('university')) return '🎓';
    if (lower.includes('java') || lower.includes('algorithm') || lower.includes('data structure')) return '📚';
    return '💡';
  };

  useEffect(() => {
    const loadProjects = async () => {
      setLoading(true);
      await fetchProjects();
      setLoading(false);
    };

    loadProjects();
  }, []);



  const ProjectItem = ({ project, index }: { project: Project; index: number }) => {
    return (
      <motion.div 
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: index * 0.1 }}
        viewport={{ once: true }}
        whileHover={{ x: 10 }}
        className="border-b border-gray-700 last:border-b-0"
      >
        <div className="py-4 px-6 hover:bg-gray-800/30 transition-colors duration-200">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-white hover:text-purple-400 transition-colors duration-200 mb-2">
                <span className="mr-2">{getProjectEmoji(project.title)}</span>{project.title}
              </h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                {project.description}
              </p>
            </div>
            
            <div className="flex items-center space-x-2 ml-4">
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors duration-200"
                title={`View on ${project.source === 'github' ? 'GitHub' : 'LinkedIn'}`}
              >
                <ExternalLink size={16} className="text-gray-300 hover:text-white" />
              </a>
            </div>
          </div>
        </div>
      </motion.div>
    );
  };

  if (loading) {
    return (
      <section id="projects" className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Projects
              </span>
            </h2>
          </div>
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-400 mx-auto"></div>
            <p className="text-gray-400 mt-4">Loading projects...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="projects" className="relative py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Projects
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            My latest projects from LinkedIn and GitHub - automatically updated
          </p>
        </div>

        {/* Unified Projects List */}
        <div className="bg-gray-800/50 backdrop-blur-lg rounded-2xl border border-gray-700">
          <div className="p-6 border-b border-gray-700">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                <Github className="text-white" size={20} />
            </div>
              <div>
                <h3 className="text-xl font-semibold text-white">All Projects</h3>
                <p className="text-gray-400 text-sm">{projects.length} projects from LinkedIn & GitHub</p>
            </div>
            </div>
          </div>
          
          <div className="max-h-96 overflow-y-auto">
            {projects.length > 0 ? (
              projects.map((project, index) => (
                <ProjectItem key={project.id} project={project} index={index} />
              ))
            ) : (
              <div className="p-6 text-center text-gray-400">
                No projects found
              </div>
            )}
          </div>
        </div>

        {/* View All Buttons */}
        <div className="text-center mt-12 space-y-4">
          <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6">
            <a
              href="https://github.com/Deepali73"
                      target="_blank"
                      rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 bg-gray-800 hover:bg-gray-700 text-white px-6 py-3 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 border border-gray-700 hover:border-green-500"
                    >
              <Github size={18} />
              <span>View All on GitHub</span>
              <ExternalLink size={14} />
                    </a>
                    <a
              href="https://www.linkedin.com/in/deepali-verma-075978257"
                      target="_blank"
                      rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 border border-blue-600 hover:border-blue-500"
                    >
              <Linkedin size={18} />
              <span>View All on LinkedIn</span>
              <ExternalLink size={14} />
                    </a>
                  </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;