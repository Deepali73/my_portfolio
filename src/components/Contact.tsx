import React, { useState } from 'react';
import { Mail, MessageSquare, Send, MapPin, Phone, Github, Linkedin, Twitter } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Create the message data object
      const messageData = {
        name: formData.name,
        email: formData.email,
        subject: formData.subject,
        message: formData.message,
        timestamp: new Date().toISOString(),
        id: Date.now().toString()
      };

      // Save to local storage (for demo purposes)
      const existingMessages = JSON.parse(localStorage.getItem('contactMessages') || '[]');
      existingMessages.push(messageData);
      localStorage.setItem('contactMessages', JSON.stringify(existingMessages));

      // Try to save to backend API with timeout
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 second timeout

        const response = await fetch('http://localhost:3001/api/contact', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(messageData),
          signal: controller.signal
        });

        clearTimeout(timeoutId);

        if (response.ok) {
          setSubmitStatus('success');
          setFormData({ name: '', email: '', subject: '', message: '' });
          return;
        }
      } catch (backendError) {
        console.log('Backend not available, using local storage only:', backendError);
        // Continue with local storage only
      }

      // If backend fails or times out, still show success (local storage worked)
      setSubmitStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });

    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
      
      setTimeout(() => {
        setSubmitStatus('idle');
      }, 3000);
    }
  };

  return (
    <section id="contact" className="relative py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Let's Connect
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Have a project in mind? Let's discuss how we can bring your ideas to life!
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Contact Info */}
          <div className="space-y-8">
            <div className="bg-gray-800/50 backdrop-blur-lg p-6 rounded-xl border border-gray-700">
              <h3 className="text-xl font-semibold mb-4 flex items-center">
                <MessageSquare className="mr-2 text-purple-400" size={20} />
                Get In Touch
              </h3>
              <p className="text-gray-300 mb-4 leading-relaxed text-sm">
                I'm always excited to work on new projects and collaborate with amazing people. 
                Whether you have a question, want to discuss a potential project, or just want to say hi, 
                feel free to reach out!
              </p>
              
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Mail className="text-purple-400" size={16} />
                  <span className="text-gray-300 text-sm">deepaliverma440@gmail.com</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="text-purple-400" size={16} />
                  <span className="text-gray-300 text-sm">+91 8529301089</span>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin className="text-purple-400" size={16} />
                  <span className="text-gray-300 text-sm">Jaipur, Rajasthan</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <a
                href="https://github.com/Deepali73"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-800/50 backdrop-blur-lg p-4 rounded-xl border border-gray-700 hover:border-gray-600 transition-all duration-200 hover:scale-105 flex flex-col items-center justify-center space-y-2 text-gray-300 hover:text-gray-400"
              >
                <Github size={24} />
                <span className="text-sm font-medium">GitHub</span>
              </a>
              <a
                href="https://www.linkedin.com/in/deepali-verma-075978257"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-800/50 backdrop-blur-lg p-4 rounded-xl border border-gray-700 hover:border-gray-600 transition-all duration-200 hover:scale-105 flex flex-col items-center justify-center space-y-2 text-gray-300 hover:text-blue-400"
              >
                <Linkedin size={24} />
                <span className="text-sm font-medium">LinkedIn</span>
              </a>
              <a
                href="https://twitter.com/deepali_verma"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-800/50 backdrop-blur-lg p-4 rounded-xl border border-gray-700 hover:border-gray-600 transition-all duration-200 hover:scale-105 flex flex-col items-center justify-center space-y-2 text-gray-300 hover:text-blue-500"
              >
                <Twitter size={24} />
                <span className="text-sm font-medium">Twitter</span>
              </a>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-gray-800/50 backdrop-blur-lg p-6 rounded-xl border border-gray-700">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white placeholder-gray-400 transition-all duration-200"
                    placeholder="Your Name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white placeholder-gray-400 transition-all duration-200"
                    placeholder="your.email@example.com"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white placeholder-gray-400 transition-all duration-200"
                  placeholder="What's this about?"
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white placeholder-gray-400 transition-all duration-200 resize-none"
                  placeholder="Tell me about your project or question..."
                ></textarea>
              </div>
              
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full flex items-center justify-center space-x-2 px-6 py-4 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 ${
                  isSubmitting
                    ? 'bg-gray-600 cursor-not-allowed'
                    : submitStatus === 'success'
                    ? 'bg-green-600 hover:bg-green-700'
                    : submitStatus === 'error'
                    ? 'bg-red-600 hover:bg-red-700'
                    : 'bg-purple-600 hover:bg-purple-700'
                } text-white`}
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span>Sending...</span>
                  </>
                ) : submitStatus === 'success' ? (
                  <>
                    <span>✅ Message Sent!</span>
                  </>
                ) : submitStatus === 'error' ? (
                  <>
                    <span>❌ Failed to Send</span>
                  </>
                ) : (
                  <>
                    <Send size={20} />
                    <span>Send Message</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;