import React from 'react'
import './portfolio.css'
import {FaFolder, FaGithubSquare} from 'react-icons/fa'
import {FaFolderOpen} from 'react-icons/fa'
import FadeInSection from '../FadeInSection/FadeInSection';

const Portfolio = () => {
  const portfolio_data= [
    {id: 1,
      title: 'Image Colorizer',
      github:"https://github.com/kanavsinglaa/NothingIsBlackOrWhite-",
      desc:'An AI powered app that colorizes black & white images using GANs, Classification & Regression based CNNs',
      tech_stack: 'Python, Pytorch, React.js'
    },
    {id: 2,
      title: 'Bikeshare Demand Predictor',
      github:"https://github.com/kanavsinglaa/BikesharePrediction",
      desc:"An AI model that predicts the demand of rental bikes in the city for a given station so that the rental companies can better facilitate the distribution of bikes for customers thorughout the city",
      tech_stack: 'Python, Pandas, scikit-learn, Tensorflow'
     },
     {id: 3,
      title: 'How well can an AI train another AI',
      github:"https://github.com/kanavsinglaa/Experimentally-Assessing-the-Controllers-for-Neural-Architecture-Search-",
      desc:'Assessing how well Neural Networks learn when they train other neural networks for the task of classification, hence critiquing the quality of AI system that trains another AI system',
      tech_stack: 'Python, Pytorch, Numpy, NAS'
     },
     {id: 4,
      title: 'Stereo Vision',
      github:"https://github.com/kanavsinglaa/StereoVision",
      desc:'AConstructing 3D point clouds environment from a set of stereo 2D images',
      tech_stack: 'Python, 3D reconstruction'
     },
     {id: 5,
     title: 'Othelo.Ai',
     github:"https://github.com/kanavsinglaa/Othelo.Ai",
     desc:'An AI bot that plays Othelo based on smart heuristics and alpha beta pruning',
     tech_stack: 'Python, Heuristics, Alpha-Beta pruning '
     },
     {id: 6,
      title: 'sMart: Student Marketplace',
      github:"https://github.com/victor-alvarez/sMartWebApp",
      desc:'A web app and a student Mentorship Service Algorith assisting Univeristy of Toronto\'s students in personal career development',
      tech_stack: 'React.JS, Django, SQL'
     }
  ]
  return (
    <section id='portfolio'>
    <FadeInSection>
      <div className="section-header ">
        <span className="section-title">/ software-creations</span>
      </div>
      <div className='container portfolio_container'>
      {
        portfolio_data.map(({id,title,github,desc,tech_stack})=>{
          return (
            <article key={id} className='portfolio_item'>
              <div className="portfolio_item-header">
                <FaFolderOpen size={35}/>
                <a href={github} target="_blank"><FaGithubSquare size={30}/></a>
              </div>
              <div className="card-title">{title}</div>
              <div className="card-desc">{desc}</div>
              <div className="card-tech">{tech_stack}</div>
            </article>
          )
        })
      }
      </div>
      </FadeInSection>
    </section>
  )
}

export default Portfolio