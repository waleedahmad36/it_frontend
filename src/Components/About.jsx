import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const About = () => {
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const aboutSection = document.getElementById('about-section');
      if (aboutSection) {
        const rect = aboutSection.getBoundingClientRect();
        if (rect.top <= window.innerHeight && rect.bottom >= 0) {
          setIsInView(true);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      id="about-section"
      className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 py-16 px-6 md:px-12"
    >
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1 }}
        className="container mx-auto"
      >
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-blue-600">
            Welcome to Precious Tech Academy
          </h1>
          <p className="mt-4 text-lg text-gray-700 max-w-2xl mx-auto">
            Where learning technology is fun, engaging, and accessible for everyone!
          </p>
        </div>

        {/* Content Section */}
        <div className="flex flex-col md:flex-row items-center gap-12">
          <motion.img
            src="https://media.istockphoto.com/id/2162446949/photo/elementary-school-boys-studies-flower-closely-with-magnifying-glass.webp?a=1&b=1&s=612x612&w=0&k=20&c=WXw2tV9ZmsSv6-zU8BSlAEBjgODSU7iiGPxrL9OGRs8="
            alt="Learning at Precious Tech Academy"
            className="w-full max-h-[40vh] md:w-1/2 rounded-lg shadow-xl"
            whileHover={{ scale: 1.05 }}
          />
          <div className="text-left md:w-1/2">
            <h2 className="text-3xl font-bold text-gray-800 ">Why Choose Us?</h2>
            <p className="mt-4 text-gray-700 leading-relaxed">
              Whether you're a curious kid, a teen diving into coding, or an adult upgrading your tech skills, we're here to guide you every step of the way.
            </p>
            <p className="mt-4 text-gray-700 leading-relaxed">
              At Precious Tech Academy, our hands-on courses, from web development to robotics, meet you at your level, helping you grow at your own pace.
            </p>
          </div>
        </div>

        {/* Features Section */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">
            What Makes Us Unique?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Expert Instructors',
                text: 'Learn from industry leaders through practical lessons and projects.',
                img: 'https://gomycode.com/ng/wp-content/uploads/sites/29/2024/09/Rectangle-4778.png',
              },
              {
                title: 'Interactive Courses',
                text: 'Engage with hands-on learning to build real-world skills.',
                img: 'https://gomycode.com/ng/wp-content/uploads/sites/29/2024/08/Xt1p-480x304.png',
              },
              {
                title: 'Supportive Environment',
                text: 'Grow with a community that supports your learning journey.',
                img: 'https://gomycode.com/ng/wp-content/uploads/sites/29/2024/08/332880102_601338188071800_6534997590050496572_n-e1680090487750-2-480x304.png',
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                className="bg-white p-6 rounded-lg shadow-md"
              >
                <img
                  src={feature.img}
                  alt={feature.title}
                  className="w-20 h-20 mx-auto mb-4 rounded-full"
                />
                <h3 className="text-xl font-bold text-gray-800 text-center">{feature.title}</h3>
                <p className="mt-2 text-gray-600 text-center">{feature.text}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-20 text-center">
          <h2 className="text-4xl font-bold text-gray-800">
            Join Our Community Today!
          </h2>
          <p className="mt-4 text-gray-600 max-w-xl mx-auto">
            Discover how Precious Tech Academy can help you unlock your potential and achieve your goals.
          </p>
          <motion.button
            whileHover={{ scale: 1.1 }}
            className="mt-6 bg-blue-600 text-white px-8 py-4 rounded-md hover:bg-blue-700"
          >
            Get Started
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default About;
