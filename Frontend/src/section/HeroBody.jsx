import React, { useEffect, useState } from "react";
import "../css/sectionCSS/HeroBody.css";
import avatar from "../assets/avatar/heroProfile.png";
import { FaLightbulb ,FaBookReader } from "react-icons/fa";
import { FaEye } from "react-icons/fa6";
import { GiDreamCatcher } from "react-icons/gi";
import profileIMg from '../assets/profilePhoto1.png'

const HeroBody = () => {
  

  return (
    <>
    
    {/* <div className="pageNumber"><h1>01</h1> </div> */}

     

      <div className="Hero_body_partition hero_body_image">
        <img src={profileIMg} alt="avatar" />
      </div>

       <div className="hero_body_partition hero_body_text">
        <h1>Hello! i am saikat and </h1>
        <p>
          turning{" "}
          <span className="animated-words">
            <span><FaLightbulb/>ideas</span>
            <span><FaBookReader/>concepts</span>
            <span><GiDreamCatcher/>dreams</span>
            <span><FaEye/>visions</span>
            <span><FaLightbulb/>ideas</span>
          </span>{" "}
        </p>
        <p>
          into real life <span className="colorFullSpan">products</span>
        </p>
        <p>is my calling</p>
        <button><span>Contact</span></button>
      </div>
    </>
  );
};

export default HeroBody;
