import React from 'react'
import '../css/sectionCSS/Skills.css'
import SkillCard from '../components/SkillCard'
import { FiExternalLink } from 'react-icons/fi'
const Skills = () => {
  return (
    <div className='skills_container'>
        <div className="achievement_card">
          <h3 className='font-bold text-amber-500 text-xl'>🏆 Achievement</h3>
          <p className="achievement_title"> <strong>WB GMR Rank 13</strong></p>
          <p className="achievement_description">
              Secured General Merit Rank 13 in the West Bengal Joint Entrance Examination for Computer Applications (WBJECA), earning admission into Jadavpur University.
          </p>
        </div>
        <div className="achievement_card">
          <h3 className="font-bold text-amber-500 text-xl">📜 Certification</h3>
          <p><strong>Deep Learning Specialization</strong></p>
          <p style={{ margin: '0.2rem 0', fontSize: '1rem', color: '#d1d5db' }}><em>Ministry of Electronics and Information Technology (MeitY)</em></p>
            <ul style={{ marginTop: '0.5rem', paddingLeft: '1.2rem', color: '#d1d5db' }}>
              <li>Completed an intensive training program on Deep Learning fundamentals and applications.</li>
              <li>Developed a cervical cancer detection system using Convolutional Neural Networks (CNN).</li>
              <li>Hands-on experience with image processing and medical image classification.</li>
            </ul>
           <p className='flex gap-1 items-center'><a href="https://drive.google.com/file/d/1NpAUrxIS40shS9Ixvqmia4OlNo59Xz30/view?usp=drive_link" target='blank'>View Certificate </a><FiExternalLink/> </p>
        </div>

        <div className="skills_icons">
              <h1 className="relative inline-block px-4 py-2 bg-blue-600 text-shadow-indigo-100 font-bold text-xl rounded-lg shadow-lg before:content-[''] before:absolute before:-top-2 before:-right-2 before:w-4 before:h-4 before:bg-blue-800 before:rounded-full">
                👨🏻‍💻 Tech Stack
              </h1>
            <div className="skill_cards">
                <SkillCard title={"React"}/>
                <SkillCard title={"MongoDB"}/>
                <SkillCard title={"Express"}/>
                <SkillCard title={"NodeJS"}/>
                <SkillCard title={"Deep Learning"}/>
            </div>
        </div>

    </div>
  )
}

export default Skills