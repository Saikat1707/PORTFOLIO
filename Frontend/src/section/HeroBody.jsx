import React, { useEffect, useState } from "react";
import "../css/sectionCSS/HeroBody.css";
import avatar from "../assets/avatar/heroProfile.png";
import { FaLightbulb, FaBookReader } from "react-icons/fa";
import { MdOutlineAttractions } from "react-icons/md";
import { FaEye } from "react-icons/fa6";
import { GiDreamCatcher } from "react-icons/gi";
import profileIMg from "../assets/profilePhoto1.png";
import profileAnimation from '../assets/Animation/ProfileAnimation.json'
import Lottie from 'lottie-react'
const HeroBody = () => {
  return (
    <>
      {/* <div className="pageNumber"><h1>01</h1> </div> */}

      <div className="Hero_body_partition hero_body_image">
        {/* <img src={profileIMg} alt="avatar" /> */}
        <div style={{ width: '100%', height: '100%' }}>
          <Lottie animationData={profileAnimation} loop={true} />
        </div>
      </div>

      <div className="hero_body_partition hero_body_text">
        <h1>Hello! i am saikat and </h1>
        <p>
          turning{" "}
          <span className="animated-words">
            <span>
              <FaLightbulb />
              ideas
            </span>
            <span>
              <FaBookReader />
              concepts
            </span>
            <span>
              <GiDreamCatcher />
              dreams
            </span>
            <span>
              <FaEye />
              visions
            </span>
            <span>
              <MdOutlineAttractions/>
              Action
            </span>
          </span>{" "}
        </p>
        <p>
          into real life <span className="colorFullSpan">products</span>
        </p>
        <p>is my calling</p>
        <h3 className="font-semibold mt-2 text-gray-400">
          Creative and detail-oriented web developer with a passion for
          building user-friendly and responsive applications. Skilled in modern
          technologies and always eager to learn new tools and frameworks.
          Committed to delivering clean, efficient, and impactful solutions.
        </h3>
        <button>
          <span>Contact</span>
        </button>
      </div>
    </>
  );
};

export default HeroBody;
