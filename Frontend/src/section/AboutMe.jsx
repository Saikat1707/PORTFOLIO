import React from "react";
import '../css/sectionCSS/AboutMe.css';
// import profile from '../assets/photo.jpg';
import profile from '../assets/profilePhoto.jpg'

const AboutMe = () => {
  return (
    <div className="about-section" id="about">
      <div className="about-content">
        <div className="about-text">
          <h2># About me</h2>
          <p>
            Hello! I'm <strong>Saikat</strong>, a self-driven developer currently pursuing my MCA at <strong>Jadavpur University</strong> (13th rank in WBJECA), with a BCA degree from <strong>Midnapore College</strong> (CGPA 8.3).
          </p>
          <p>
            I love creating interactive and responsive web apps using <strong>React, Node.js, MongoDB</strong>, and exploring UI animations with <strong>GSAP</strong>. I recently completed a freelance web project for <strong>Quantum STEM</strong>, an ed-tech startup.
          </p>
          <p>
            I'm currently diving into <strong>machine learning</strong> and looking for internship or freelance opportunities to grow further and collaborate on meaningful tech projects.
          </p>

          <p><strong>Technologies I work with:</strong></p>
          <ul>
            <li>⚡ JavaScript, React, Node.js, Express, MongoDB</li>
            <li>⚡ HTML5, CSS3, Responsive Design</li>
            <li>⚡ GSAP Animations, Scroll-based Effects</li>
            <li>⚡ Python (NumPy, pandas, matplotlib)</li>
            <li>⚡ Android Studio, Git, GitHub, VS Code</li>
          </ul>

          <p>
            Let’s connect and build something amazing together!
          </p>
        </div>

        <div className="about-photo">
          <img src={profile} alt="Saikat's Photo" />
        </div>
      </div>
    </div>
  );
};

export default AboutMe;
