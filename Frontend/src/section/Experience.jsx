import React from 'react';
import '../css/sectionCSS/Experience.css';
import EEcard from '../components/EEcard';
import experience from '../assets/experience.png'
const Experience = () => {
  const education = [
    {
      collegeName: "Jadavpur University", 
      courseName: "Master of Computer Application (MCA)" , 
      duration:"2024 - 2026" , 
      grade:"current CGPA : ---"
    },
    {
      collegeName: "Midnapore College (Autonomous)", 
      courseName: "Bachelor of Computer Application (BCA)" , 
      duration:"2021 - 2024" , 
      grade:"CGPA : 8.3"
    },
    {
      collegeName: "Satmile High School (HS)", 
      courseName: "Higher Secondary Education" , 
      duration:"2019 - 2021" , 
      grade:"Percentage : 83%"
    },
    {
      collegeName: "Baita M.N High School (HS)", 
      courseName: "Secondary Education" , 
      duration:"2013 - 2019" , 
      grade:"Percentage : 79.12%"
    }
  ]
  return (
    <div className="Experience_container">
      <div className="Experience_content">
        <div className="Education">
          <h1 className="relative inline-block px-4 py-2 bg-blue-600 text-shadow-indigo-100 font-bold text-xl rounded-lg shadow-lg before:content-[''] before:absolute before:-top-2 before:-right-2 before:w-4 before:h-4 before:bg-blue-800 before:rounded-full">
            📚 Education
          </h1>
          <div className="Education_cards">
            {education.map((Data,index) => (
              <EEcard key={index} collegeName={Data.collegeName} courseName={Data.courseName} duration={Data.duration} grade={Data.grade}/>
            ))}
          </div>
        </div>
        <div className="Experience">
            <h1 className="relative inline-block px-4 py-2 bg-blue-600 text-shadow-indigo-100 font-bold text-xl rounded-lg shadow-lg before:content-[''] before:absolute before:-top-2 before:-right-2 before:w-4 before:h-4 before:bg-blue-800 before:rounded-full">
              🏗️ Experience
            </h1>
            <div className="experience_card">
              <h3> <strong>Title : </strong> Quantum STEM</h3>
              <p className="role"> <strong>Role : </strong>Frontend Developer (Freelance)</p>
              <p className="duration"> <strong>Duration : </strong> Jan 2025 – Apr 2025</p>
              <p className="description">
                Developed a dynamic and responsive web application for an edtech startup focused on STEM and robotics education. Built interactive UI components using React and styled them with modern CSS practices. Integrated animations for enhanced user engagement and ensured cross-device compatibility.
              </p>
              <img src={experience} alt="" />
              <div className="links">
                <a href="https://www.linkedin.com/feed/update/urn:li:activity:7282709279919251456/" target="_blank" rel="noopener noreferrer">
                  <p>🔗 View Project on LinkedIn</p>
                </a>
                <a href="https://quantumstem.in/" target="_blank" rel="noopener noreferrer">
                  <p>🔗 View Live on Browser</p>
                </a>
            </div>

        </div>

        </div>
      </div>
    </div>
  );
};

export default Experience;
