import React from 'react';
import emreProfile from '../images/emresahiner.webp';
import gokhanProfile from '../images/gokhanprofil.webp';
import naimProfile from '../images/naimprofil.jpg';

const TeamPage = () => {
  const teamMembers = [
    {
      name: "Emre Şahiner",
      role: "Project Owner",
      image: emreProfile,
      linkedin: "https://www.linkedin.com/in/emresahiner/"
    },
    {
      name: "Gökhan Özdemir",
      role: "Scrum Master",
      image: gokhanProfile,
      linkedin: "https://www.linkedin.com/in/gokhan-ozdemir/"
    },
    {
      name: "Naim Kahyaoglu",
      role: "Full Stack Developer",
      image: naimProfile,
      linkedin: "https://www.linkedin.com/in/naimkahyaoglu/"
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-4">Meet Our Team</h1>
      <p className="text-gray-600 text-center mb-8 max-w-2xl mx-auto">
        Problems trying to resolve the conflict between the two major realms of Classical physics: Newtonian mechanics
      </p>
      
      {/* Desktop View - Grid Layout */}
      <div className="hidden md:grid md:grid-cols-3 gap-8">
        {teamMembers.map((member, index) => (
          <div 
            key={index}
            className="bg-white rounded-lg shadow-lg overflow-hidden transform transition-transform hover:scale-105"
          >
            <div className="aspect-w-1 aspect-h-1">
              <img 
                src={member.image} 
                alt={member.name}
                className="w-full h-64 object-cover"
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2">{member.name}</h3>
              <p className="text-gray-600 mb-4">{member.role}</p>
              <a 
                href={member.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
              >
                LinkedIn Profile
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Mobile View - Single Column */}
      <div className="md:hidden space-y-6">
        {teamMembers.map((member, index) => (
          <div 
            key={index}
            className="bg-white rounded-lg shadow-lg overflow-hidden"
          >
            <img 
              src={member.image} 
              alt={member.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-2">{member.name}</h3>
              <p className="text-gray-600 mb-4">{member.role}</p>
              <a 
                href={member.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
              >
                LinkedIn Profile
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeamPage;
