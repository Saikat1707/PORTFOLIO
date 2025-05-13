import React from 'react'
import '../css/EEcard.css'
import { FaUniversity } from "react-icons/fa";
const EEcard = ({collegeName , courseName , duration , grade}) => {
  return (
    <div className='EEcard_container'>
        <h2 className='font-bold flex gap-3 items-center text-xl text-amber-500'><span><FaUniversity/></span>{collegeName}</h2>
        <p className='course_name'>{courseName}</p>
        <p className='course_duration'>Duration: {duration}</p>
        <p className='course_score'>{grade}</p>
    </div>
  )
}

export default EEcard