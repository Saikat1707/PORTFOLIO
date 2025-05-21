import React, { useEffect, useState } from 'react';
import '../css/sectionCSS/Project.css';
import axios from '../config/axiosConfig';

const Project = () => {
  const [projectData, setProjectData] = useState([]);

  useEffect(() => {
    axios.get('/Project/display')
      .then((res) => {
        setProjectData(res.data.data);
        console.log(res.data.data);
      })
      .catch((err) => {
        console.error('Error fetching projects:', err);
      });
  }, []);

  return (
    <div className="Project_container">
      {projectData.length > 0 && (
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
              <a href={projectData[0].url} target="_blank" rel="noopener noreferrer">
                🔗 View Project on GitHub
              </a>
              <a href="https://www.linkedin.com/posts/saikat-bera-42b7b6267_dutio-webapp-inprogress-activity-7330993012564520962-N7Ua?utm_source=share&utm_medium=member_desktop&rcm=ACoAAEFvqeMB8fwmW3RW1884t1cIMzqR4QVTdRU" target="_blank" rel="noopener noreferrer">
                🔗 View Project on LinkedIN
              </a>
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
                  <a href={project.url} target="_blank" rel="noopener noreferrer">
                    🔗 View Project on GitHub
                  </a>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Project;
