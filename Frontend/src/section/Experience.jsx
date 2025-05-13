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
      <div className="Experience_color"></div>
      <div className="Experience_content">
        <div className="Education">
          <h1 className='text-blue-600 font-bold text-2xl'># Education</h1>
          <div className="Education_cards">
            {education.map((Data,index) => (
              <EEcard collegeName={Data.collegeName} courseName={Data.courseName} duration={Data.duration} grade={Data.grade}/>
            ))}
          </div>
        </div>
        <div className="Experience">
          <h1 className='text-blue-600 font-bold text-2xl'># Experience</h1>
          <div className="experience_card">
            <div className="experience_card">
            <h3> <strong>Title : </strong> Quantum STEM</h3>
            <p className="role"> <strong>Role : </strong>Frontend Developer (Freelance)</p>
            <p className="duration"> <strong>Duration : </strong> Jan 2025 – Apr 2025</p>
            <p className="description">
              Developed a dynamic and responsive web application for an edtech startup focused on STEM and robotics education. Built interactive UI components using React and styled them with modern CSS practices. Integrated animations for enhanced user engagement and ensured cross-device compatibility.
            </p>
            <img src={experience} alt="" />
            <div className="links">
              <a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer">
                <p>🔗 View Project Code on GitHub</p>
              </a>
              <a href="https://linkedin.com/in/yourprofile" target="_blank" rel="noopener noreferrer">
                <p>🔗 View Profile on LinkedIn</p>
              </a>
            </div>
          </div>

        </div>

        </div>
      </div>
    </div>
  );
};

export default Experience;
