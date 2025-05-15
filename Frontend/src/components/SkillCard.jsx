import React from 'react'
import '../css/sectionCSS/Skills.css'
import mongodb from '../assets/icons/MongoDB.png'
import nodejs from '../assets/icons/nodeJS.png'
import deepLearning from '../assets/icons/TensorFlow.png'
import express from '../assets/icons/Express.png'
import react from '../assets/icons/React.png'

const SkillCard = ({title}) => {
    const skillIcons = {
    "MongoDB": mongodb,
    "NodeJS": nodejs,
    "Deep Learning": deepLearning,
    "Express": express,
    "React": react
    };

  return (
    <div className='skillCard'>
        <img src={skillIcons[title]} alt="" />
        <h2>{title}</h2>
    </div>
  )
}

export default SkillCard