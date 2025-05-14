import React from 'react'
import '../css/sectionCSS/Skills.css'
import SkillCard from '../components/SkillCard'
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
        <div className="skills_icons">
            <h2 className='font-bold text-xl text-blue-500'>#Tech Stack</h2>
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