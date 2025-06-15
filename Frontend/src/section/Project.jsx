import React, { useEffect, useState } from 'react';
import '../css/sectionCSS/Project.css';
import axios from '../config/axiosConfig';
import { FaGithub } from 'react-icons/fa';
import { FaLinkedin } from 'react-icons/fa';
import { FiExternalLink } from 'react-icons/fi';

const Project = () => {
  const [projectData, setProjectData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
      axios.get('/Project/display')
        .then((res) => {
          setProjectData(res.data.data);
          console.log(res.data.data);
          setLoading(false);
        })
        .catch((err) => {
          console.error('Error fetching projects:', err);
          setLoading(false); 
        });
    }, []);


 return (
  <div className="Project_container">
    {loading ? (
      <div className="flex flex-col items-center justify-center gap-2 min-h-[300px]">
        <div className="w-6 h-6 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-white text-sm">Loading projects...</p>
      </div>
    ) : (
      projectData.length > 0 && (
        <>
          <div className="project_card tall_card">
            <div className="card_image">
              <img
                src={projectData[0].projectImageRefId?.secureUrl}
                alt={projectData[0].title}
              />
            </div>
            <div className="card_text">
              <h3>{projectData[0].title}</h3>
              <p>{projectData[0].projectDescription}</p>
              <div className='flex gap-3'>
                <a href={projectData[0].url} target="_blank" rel="noopener noreferrer">
                 <FaGithub className="text-2xl text-white hover:text-gray-400 transition" />
                </a>
                <a href="https://www.linkedin.com/posts/saikat-bera-42b7b6267_dutio-webapp-inprogress-activity-7330993012564520962-N7Ua?utm_source=share&utm_medium=member_desktop&rcm=ACoAAEFvqeMB8fwmW3RW1884t1cIMzqR4QVTdRU" target="_blank" rel="noopener noreferrer">
                  <FaLinkedin className="text-2xl text-blue-600 hover:text-blue-800 transition" />
                </a>
                <a href="https://dutio-collab-nine.vercel.app/" target="_blank" rel="noopener noreferrer">
                  <FiExternalLink className="text-xl text-white hover:text-gray-400 transition" />
                </a>
              </div>
            </div>
          </div>

          <div className="project_grid">
            {projectData.slice(1).map((project, index) => (
              <div className="project_card short_card" key={project._id || index}>
                <div className="card_image">
                  <img
                    src={project.projectImageRefId?.secureUrl}
                    alt={project.title}
                  />
                </div>
                <div className="card_text">
                  <h3>{project.title}</h3>
                  <p>{project.projectDescription}</p>
                  <div className='flex gap-3'>
                    <a href={project.url} target="_blank" rel="noopener noreferrer">
                     <FaGithub className="text-2xl text-white hover:text-gray-400 transition" />
                    </a>
                    <a href="https://www.linkedin.com/posts/saikat-bera-42b7b6267_dutio-webapp-inprogress-activity-7330993012564520962-N7Ua?utm_source=share&utm_medium=member_desktop&rcm=ACoAAEFvqeMB8fwmW3RW1884t1cIMzqR4QVTdRU" target="_blank" rel="noopener noreferrer">
                      <FaLinkedin className="text-2xl text-blue-600 hover:text-blue-800 transition" />
                    </a>
                    <a href="https://virtual-assistant-one-ashy.vercel.app/" target="_blank" rel="noopener noreferrer">
                      <FiExternalLink className="text-xl text-white hover:text-gray-400 transition" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )
    )}
  </div>
);

};

export default Project;
