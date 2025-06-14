import React, { useEffect, useState } from 'react';
import '../css/sectionCSS/Project.css';
import axios from '../config/axiosConfig';
import { FaGithub, FaLinkedin, FaExternalLinkAlt } from 'react-icons/fa';

const Project = () => {
  const [projectData, setProjectData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('/Project/display')
      .then((res) => {
        setProjectData(res.data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching projects:', err);
        setLoading(false); 
      });
  }, []);

  const truncateDescription = (text, maxLength = 150) => {
    if (text.length <= maxLength) return text;
    return `${text.substring(0, maxLength)}...`;
  };

  return (
    <div className="project-container">
      {loading ? (
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Loading projects...</p>
        </div>
      ) : (
        projectData.length > 0 && (
          <>
            {/* Featured Project (Tall Card) */}
            <div className="project-card featured">
              <div className="card-media">
                <img
                  src={projectData[0].projectImageRefId?.secureUrl}
                  alt={projectData[0].title}
                  loading="lazy"
                />
              </div>
              <div className="card-content">
                <h3>{projectData[0].title}</h3>
                <div className="description-scroll">
                  <p>{projectData[0].projectDescription}</p>
                </div>
                <div className="project-links">
                  <a href={projectData[0].url} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                    <FaGithub className="icon" />
                  </a>
                  <a href="https://www.linkedin.com/posts/saikat-bera-42b7b6267_dutio-webapp-inprogress-activity-7330993012564520962-N7Ua" 
                     target="_blank" 
                     rel="noopener noreferrer"
                     aria-label="LinkedIn">
                    <FaLinkedin className="icon" />
                  </a>
                  <a href={projectData[0].liveUrl || projectData[0].url} 
                     target="_blank" 
                     rel="noopener noreferrer"
                     aria-label="Live Demo">
                    <FaExternalLinkAlt className="icon" />
                  </a>
                </div>
              </div>
            </div>

            {/* Project Grid */}
            <div className="project-grid">
              {projectData.slice(1).map((project) => (
                <div className="project-card" key={project._id}>
                  <div className="card-media">
                    <img
                      src={project.projectImageRefId?.secureUrl}
                      alt={project.title}
                      loading="lazy"
                    />
                  </div>
                  <div className="card-content">
                    <h3>{project.title}</h3>
                    <p>{truncateDescription(project.projectDescription)}</p>
                    <div className="project-links">
                      <a href={project.url} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                        <FaGithub className="icon" />
                      </a>
                      {project.liveUrl && (
                        <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" aria-label="Live Demo">
                          <FaExternalLinkAlt className="icon" />
                        </a>
                      )}
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