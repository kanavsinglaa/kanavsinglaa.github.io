import React from 'react';
import './about.css';
import ME from '../../assets/me_5.png';
import FadeInSection from '../FadeInSection/FadeInSection';
import NeuralNetwork from './NeuralNetwork';

const About = () => {
    const about_para = (
        <p>
            At the forefront of AI innovation, I spearhead transformative initiatives at 
            <a href="https://www.valsoftcorp.com/">
                {" "}
                <b>Valsoft</b>
                {" "} 
            </a> as their <emp>AI Founding Engineer</emp>. As an 
            <emp> Engineering Science</emp> alumnus from 
            <a href="https://www.utoronto.ca/about-u-of-t">
                {" "}
                <b>University of Toronto</b>
                {" "}
            </a>, I specialized in <emp>Robotics</emp> & <emp>AI</emp>. My journey from academia to industry has been marked by leadership in AI engineering roles, producing impactful AI solutions, and publishing authoritative content in the domain.
        </p>
    );
    const tech_stack = [
        "Deep Learning & NLP",
        "AI Strategy & Implementation",
        "LLMs & RAGs for AI Products",
        "Ideation to Deployment",
        "End-to-End Autonomous Vehicles",
        "Design of Autonomous Rovers & Drones"
    ];

    const extra_para = (
        <p>
            Beyond the professional realm, I delve into the confluence of AI and creativity, pioneering in AI-driven art and music production — always eager to explore uncharted territories and envision new AI applications.
        </p>
    );
    const tech_items = tech_stack.map((stack, i) => (
      <FadeInSection key={i} delay={`${i * 100}ms`}>
          <li>{stack}</li>
      </FadeInSection>
  ));

  return (
      <section id='about'>
          <FadeInSection>
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
                      {"Areas of expertise and the recent hands-on experience that I bring to the forefront:"}
                      <ul className="tech-stack">
                          {tech_items}
                      </ul>
                      {extra_para}
                      <br/>
                      <a href="mailto:kanav.singla@mail.utoronto.ca" className='btn btn-primary'>Get in Touch</a>
                  </div>
                  <NeuralNetwork />
              </div>
          </FadeInSection>
      </section>
  );
}

export default About;