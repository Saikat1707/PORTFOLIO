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
import Skills from '../../section/Skills';
import Contact from '../../section/Contact';
import Project from '../../section/Project';

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
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    axios
      .get("/Social/display")
      .then((res) => {
        console.log("Backend response:", res.data.data);
        setSocialLinks(res.data.data);
        setLoading(false)
      })
      .catch((err) =>{
         console.error(err)
         setLoading(false)
      });
  }, []);

  return (
    <>
      <div className="scroll-down" onClick={() => window.scrollBy({ top: window.innerHeight, behavior: 'smooth' })}>
        <span></span>
        <p>Scroll</p>
      </div>

      <div className="h-full socialLinks flex flex-col gap-4 items-center justify-center">
          {loading ? (
          <div className="flex flex-col items-center gap-2 rotate-0 md:rotate-90">
            <div className="w-6 h-6 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
            <span className="text-white text-sm text-center sm:text-left md:text-center">Loading social links...</span>
          </div>
        ) : (
          socialLinks.map((link, index) => {
            const Icon = iconMap[link.title.toLowerCase()];
            return Icon ? (
              <a key={index} href={link.url} target="_blank" rel="noreferrer">
                <Icon className="text-2xl hover:text-blue-500 hover:scale-110 transition duration-300" />
              </a>
            ) : null;
          })
        )}
      </div>


      <div className="hero-section">
        <NavBar />
        {/* Main Hero Body */}
        <div className='sections hero_main'>

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
        
        {/* Skills */}
        <div>
            <div className='section_components'>
                <Skills/>
            </div>
        </div>

        {/* Project */}
        <div className='project'>
            <div className='section_components flex-col'>
                <h1 className="relative inline-block px-4 py-2 bg-blue-600 text-white font-bold text-xl rounded-lg shadow-lg before:content-[''] before:absolute before:-top-2 before:-right-2 before:w-4 before:h-4 before:bg-blue-800 before:rounded-full">
                   💼 Some of my Works
                </h1>
                <Project/>
            </div>
        </div>

        {/* contact me */}
        <div className='sections contactMe'>
            <div className='section_components'>
                <Contact/>
            </div>
        </div>
      </div>
    </>
  );
};

export default HeroSection;
