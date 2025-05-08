import React from 'react'
import '../css/Admin.css'
import profileImg from '../assets/profileImg1.jpg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faPhone, faSchool, faDownload } from '@fortawesome/free-solid-svg-icons'
import { faGithub, faLinkedin, faInstagram } from '@fortawesome/free-brands-svg-icons'
const Profile = () => {
  return (
    <div className="profileCon">
        <img className="profileImg" src={profileImg} alt="profileImg" />
        <div className="profileConDown">
        <h1>Saikat Bera</h1>
        <p><FontAwesomeIcon icon={faEnvelope} /> berasaikat731@gmail.com</p>
        <p><FontAwesomeIcon icon={faPhone} /> +91 8509904168</p>
        <h4><FontAwesomeIcon icon={faSchool} /> Jadavpur University</h4>
        <h4>Computer Science & Engineering</h4>

        <a href="https://drive.google.com/file/d/1ptQWw-C0-4eKZJcuXVWSETA7bk0QbmKB/view?usp=sharing" download className="resumeBtn">
            <FontAwesomeIcon icon={faDownload} /> Download Resume
        </a>

        <div className="socialIcons">
            <a href="https://github.com/Saikat1707" target="_blank" rel="noreferrer">
            <FontAwesomeIcon icon={faGithub} />
            </a>
            <a href="https://www.linkedin.com/in/saikat-bera-42b7b6267/" target="_blank" rel="noreferrer">
            <FontAwesomeIcon icon={faLinkedin} />
            </a>
            <a href="https://instagram.com/yourinsta" target="_blank" rel="noreferrer">
            <FontAwesomeIcon icon={faInstagram} />
            </a>
        </div>
        </div>
    </div>
  )
}

export default Profile