import React, { useEffect, useState } from 'react';
import '../css/sectionCSS/Project.css';
import axios from '../config/axiosConfig';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { FiExternalLink } from 'react-icons/fi';
import { toast } from 'react-toastify';

const Project = () => {
  const [projectData, setProjectData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tallCardIndex, setTallCardIndex] = useState(0);
  const [smallCardIndex1, setSmallCardIndex1] = useState(1);
  const [smallCardIndex2, setSmallCardIndex2] = useState(2);

  // Cycle to next set of projects
  const changeIndex = () => {
    if (projectData.length <= 3) {
      // For 3 or fewer projects, just cycle through them
      setTallCardIndex((prev) => (prev + 1) % projectData.length);
      setSmallCardIndex1((prev) => (prev + 1) % projectData.length);
      setSmallCardIndex2((prev) => (prev + 1) % projectData.length);
      return;
    }

    // For 4+ projects, rotate the triplet
    setTallCardIndex((prev) => (prev + 1) % projectData.length);
    setSmallCardIndex1((prev) => (prev + 1) % projectData.length);
    setSmallCardIndex2((prev) => (prev + 1) % projectData.length);
  };

  // Reset indices if projectData changes
  useEffect(() => {
    setTallCardIndex(0);
    setSmallCardIndex1(1);
    setSmallCardIndex2(2);
  }, [projectData]);

  // Fetch projects
  useEffect(() => {
    axios.get('/Project/display')
      .then((res) => {
        setProjectData(res.data.data || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching projects:', err);
        toast.error('Failed to load projects.');
        setLoading(false);
      });
  }, []);

  // Helper to render a project card
  const renderProjectCard = (project, isTallCard = false) => {
    if (!project) return null;

    return (
      <div className={isTallCard ? 'TallCard' : 'SmallCard'}>
        {project.projectImageRefId?.secureUrl && (
          <img 
            src={project.projectImageRefId.secureUrl} 
            alt={project.title} 
          />
        )}
        <div className="TextBox">
          <h3>{project.title}</h3>
          <p>{project.projectDescription}</p>
          <div className="TextBoxProjectLink">
            <a href={project.githubUrl} target="_blank" rel="noreferrer">
              <FaGithub />
            </a>
            {project.linkedinUrl && (
              <a href={project.linkedinUrl} target="_blank" rel="noreferrer">
                <FaLinkedin style={{ color: '#0A66C2' }} />
              </a>
            )}
            {project.liveUrl && (
              <a href={project.liveUrl} target="_blank" rel="noreferrer">
                <FiExternalLink />
              </a>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="Project_container">
      {loading ? (
        <div className="flex flex-col items-center justify-center gap-2 min-h-[300px]">
          <div className="w-6 h-6 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-white text-sm">Loading projects...</p>
        </div>
      ) : (
        <>
          {/* Tall Card (only if index is valid) */}
          {tallCardIndex < projectData.length && renderProjectCard(projectData[tallCardIndex], true)}

          {/* Small Cards (only if indices are valid) */}
          <div className="SmallCards">
            {smallCardIndex1 < projectData.length && renderProjectCard(projectData[smallCardIndex1])}
            {smallCardIndex2 < projectData.length && renderProjectCard(projectData[smallCardIndex2])}
          </div>

          {/* Navigation Button */}
          <button 
            onClick={changeIndex}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Show Next Projects
          </button>
        </>
      )}
    </div>
  );
};

export default Project;