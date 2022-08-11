import React from 'react'
import './about.css'
import ME from '../../assets/me_5.png'
import {MdEmail} from 'react-icons/md' 

const about = () => {
  const about_para = (
    <p>
      I am currently a fourth year <b>Engineering Science</b> student majoring in <b>Robotics</b> & minoring in <b>Machine Intelligence</b> at
      <a href="https://www.utoronto.ca/about-u-of-t">
        {" "}
        University of Toronto
      </a>
      . In the past, I have worked in and around different AI based applications thorugh key development roles 
      as an <b>AI Engineer</b> in industry, a <b>machine learning research fellow</b> in academia & <b>CV lead</b> + developer roles at various design teams. 
      I am also a published author at the <a href="https://arxiv.org/abs/2111.14059"> {""}Climate Change AI workshop, NeurIPS 2021</a> for my work around how the state of Computer Vision is contributing to climate change.
    </p>
  );
  const extra_para = (
    <p>
      Outside of work, I'm interested in using AI creatively to produce art and music.
    </p>
  );

  const tech_stack = [
    "Machine Learning",
    "Deep Learning",
    "Reinforcement Learning",
    "Self-Driving",
    "ML ops",
    "Object Oriented Programming"
  ];

  const tech_items = tech_stack.map(stack => <li>{stack}</li>);
  return (
    <section id='about'>
    <div className="section-header ">
      <span className="section-title">/ about me</span>
    </div>
    <div className='container about_container'>
      <div className='about_me'>
        <div className='about_me-img'>
          <img src={ME} alt='about me'/>
        </div>
      </div>
      <div className='about-description'>
        {about_para}
        <br/>
        {"Here are some technologies and ideas I have been working around:"}
        <ul className="tech-stack">
          {tech_items}
        </ul>
        {extra_para}
        <br/>
        <a href="mailto:kanav.singla@mail.utoronto.ca" className='btn btn-primary'>Let's talk</a>
      </div>
    
    </div>
    </section>
  )
}

export default about  