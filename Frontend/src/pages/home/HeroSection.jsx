import React, { useEffect, useState } from 'react';
import '../../css/Home/HeroSection.css';
import NavBar from '../../components/NavBar';
import HeroBody from '../../section/HeroBody';
import {
  FaGithub,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaFacebook,
  FaYoutube,
  FaDribbble,
  FaBehance,
  FaStackOverflow,
  FaDiscord,
  FaTiktok,
} from "react-icons/fa";
import { IoMail } from "react-icons/io5";
import { Link } from "react-router-dom";
import axios from '../../config/axiosConfig'
import AboutMe from '../../section/AboutMe';
import Experience from '../../section/Experience';

const iconMap = {
  github: FaGithub,
  twitter: FaTwitter,
  instagram: FaInstagram,
  email: IoMail,
  linkedin: FaLinkedin,
  facebook: FaFacebook,
  youtube: FaYoutube,
  dribbble: FaDribbble,
  behance: FaBehance,
  stackoverflow: FaStackOverflow,
  discord: FaDiscord,
  tiktok: FaTiktok,
};


const HeroSection = () => {
  const [socialLinks, setSocialLinks] = useState([]);
  useEffect(() => {
    axios
      .get("/Social/display")
      .then((res) => {
        console.log("Backend response:", res.data.data);
        setSocialLinks(res.data.data);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <>
      <div className="scroll-down" onClick={() => window.scrollBy({ top: window.innerHeight, behavior: 'smooth' })}>
        <span></span>
        <p>Scroll</p>
      </div>

      <div className="h-full socialLinks flex flex-col gap-4">
                {socialLinks.map((link, index) => {
                  const Icon = iconMap[link.title.toLowerCase()];
                  return Icon ? (
                    <a key={index} href={link.url} target="_blank" rel="noreferrer">
                      <Icon className="text-2xl hover:text-blue-500 hover:scale-110 transition duration-300" />
                    </a>
                  ) : null;
                })}
      </div>
      <div className="hero-section">
        <NavBar />
        {/* Main Hero Body */}
        <div className='sections'>

            <div className='spacer'></div>
            <div className='section_components hero flex justify-start items-center'>
                <HeroBody/>
            </div>

        </div>

        
         {/* About me  */}
        <div className='sections aboutMe'>
           
            <div className='section_components'>
                <AboutMe/>
            </div>

        </div>

        {/* Experience and Education */}
        <div className='sections'>
            <div className='section_components'>
                <Experience/>
            </div>

        </div>

        <div className='sections'>
            {/*  */}
            <div className='section_components'>
                <h1>Section components</h1>
            </div>

        </div>

        <div className='sections'>

            <div className='section_components'>
                <h1>Section components</h1>
            </div>

        </div>
      </div>
    </>
  );
};

export default HeroSection;
