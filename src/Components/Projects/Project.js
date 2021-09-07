import React, {useState} from 'react';
import { useParams } from 'react-router';
import DOMPurify from 'dompurify';

import { projects } from './../../projects.json'
import { logos } from './../../logos.json'

const Project = (props) => {
  const [show, setShow] = useState(false);
  const [screenshot, setScreenshot] = useState();
  let { id } = useParams();
  
  const handlePicClick = (e) => {
    if (show) {
      setShow(false);
    } else {
      setScreenshot(require(`../../images/projects/${projects[id].project_name_short}/${e.target.alt}.jpg`))
      setShow(true);
    }
  }
  const screenshotsArray = [];
  function generateScreenshotsArray () {
    for (let i = 0; i < projects[id].screenshots; i++) {
      screenshotsArray.push(require(`../../images/projects/${projects[id].project_name_short}/screenshot${i+1}.jpg`)) 
    }
  }
  generateScreenshotsArray();
  function generateDescription () {
    const description = projects[id].description;
    const sanitizer = DOMPurify.sanitize;
    return (
      <div dangerouslySetInnerHTML={{__html: sanitizer(`${description}`)}} /> 
    )
  }
  return (
  <>
    <header>
      <h1>{`${projects[id].project_name}`}</h1>
    </header>
    <main>
        <div className="project-text-container">
          {generateDescription()}
        </div>
        <div className="project-technology-container">
          <div className="project-technology-box">
            <h3>Built Using</h3>
            <div className="project-technology-box-logo-container">
              {projects[id].built_technologies.map((technology, i) => {
                  return (
                  <img  
                        key={i}
                        src={require(`../../images/projects/logos/${logos[projects[id].built_technologies[i][1]].logo_name}.svg`).default} 
                        alt={`${logos[projects[id].built_technologies[i][1]].logo_alt}`} 
                        height={`${logos[projects[id].built_technologies[i][1]].logo_height}`}
                        style={{paddingTop: `${logos[projects[id].built_technologies[i][1]].logo_padding_top}`, paddingRight: `${logos[projects[id].built_technologies[i][1]].logo_padding_right}`, paddingBottom: `${logos[projects[id].built_technologies[i][1]].logo_padding_bottom}`, paddingLeft: `${logos[projects[id].built_technologies[i][1]].logo_padding_left}`}}
                        
                  />
                  )
              })}
            </div>
          </div>
          <div className="project-technology-box">
            <h3>Deployed With</h3>
            <div className="project-technology-box-logo-container">
            {projects[id].deployed_technologies.map((technology, i) => {
                  return (
                  <img  
                        key={i}
                        src={require(`../../images/projects/logos/${logos[projects[id].deployed_technologies[i][1]].logo_name}.svg`).default} 
                        alt={`${logos[projects[id].deployed_technologies[i][1]].logo_alt}`} 
                        height={`${logos[projects[id].deployed_technologies[i][1]].logo_height}`}
                        style={{paddingTop: `${logos[projects[id].deployed_technologies[i][1]].logo_padding_top}`, paddingRight: `${logos[projects[id].deployed_technologies[i][1]].logo_padding_right}`, paddingBottom: `${logos[projects[id].deployed_technologies[i][1]].logo_padding_bottom}`, paddingLeft: `${logos[projects[id].deployed_technologies[i][1]].logo_padding_left}`}}
                  />
                  )
              })}
            </div>
          </div>
        </div>
    </main>
    <div className="right-sidebar">
      <div className="right-sidebar-links">
        {`${projects[id].github_server_link}` === '0' ? 
          <a href={`${projects[id].github_client_link}`} 
              target="_blank" 
              rel="noreferrer">
              Github
          </a>
          :
          <a  
              href={`${projects[id].github_client_link}`} 
              target="_blank" 
              rel="noreferrer">
              Github-Client
          </a>
        }
        {`${projects[id].github_server_link}` === '0' ? '' :
          <a  style={{marginBottom: 10}}
            href={`${projects[id].github_server_link}`} 
            target="_blank" 
            rel="noreferrer">
            Github-Server
          </a>
        }
        <a  
            href={`${projects[id].live_demo}`} 
            target="_blank"   
            rel="noreferrer">
            Live Demo
        </a>
      </div>
      <div className="right-sidebar-screenshots">
        {screenshotsArray.map((photo, i) => {
          return (
            <img  
                  key={i}
                  src={photo.default} 
                  alt={`screenshot${i+1}`} 
                  width="300px"
                  onClick={handlePicClick}
            />
          )
        })}
      </div>
    </div>
    {  show ? <div  className='screenshot-modal' 
                    onClick={handlePicClick}>
                      <img  
                        src={screenshot.default}
                        alt={"Full-Size Screenshot"}
                      /> 
              </div> : '' }
  </>
)};

export default Project;