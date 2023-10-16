import React from 'react'
import './jobs.css'
// import Swiper core and required modules
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import FadeInSection from '../FadeInSection/FadeInSection';

const experienceItems = [
  {
    jobTitle: "Lead AI Engineer @",
    company: "Valsoft",
    duration: "AUG 2022 - PRESENT",
    desc: [
      "Directed AI initiatives, bridging the gap between innovative research and real-world applications.",
      "Developed and deployed advanced AI-driven solutions, leading to a 20% increase in operational efficiency.",
      "Collaborated with cross-functional teams, ensuring the seamless integration of AI modules with core products.",
      "Mentored a team of junior AI engineers, fostering a culture of continuous learning and innovation."
    ]
},
    {
      jobTitle: "AI Engineer @",
      company: "Huawei Technologies, Noah's Ark Self Driving Division",
      duration: "JUN 2021 - AUG2022",
      desc: [

        "Contributed to the implementations & patents for the planning stack of Huawei’s Autonomous Driving System",
        "Implemented state-of-the-art end-to-end solutions from literature for prediction & planning in PyTorch",
        "Orchestrated runs on big data-sets & performed hyperparameter tuning to develop 4 different baselines",
        "Developed modular simulation environments for training & offline evaluation of our models, reducing team’s evaluation & testing times by 50%"
      ]
    },
    {
      jobTitle: "Machine Learning Summer Research Fellow @",
      company: "UofT Dynamic Optimization Lab",
      duration: "SUMMER 2020",
      desc: [
      "Developed a contraband detection pipeline for X-ray baggage scans using transfer learning on a private dataset",
      "Led analysis & testing of object detection & classification models to increase the pipeline’s recall by 10%",
      "Awarded with UofT Fellowship Award (valued at $10,000) for successful implementation of practical research",
      "Achieved real-time inference & 94% recall for our pipeline deployed at the Seoul–Incheon Intl. Airport"
      ]
    },
    {
    jobTitle: "Junior Machine Learning Engineer @",
    company: "Zzapp Malaria",
    duration: "SUMMER 2020",
    desc: [
      "Worked on the vision pipeline integrating with a map-based mobile app to identify & detect malaria hotspots",
      "Analyzed different models that utilized topography & satellite imagery to segment the transmission hotspots",
      "Deployed the app across the sub-Saharan Africa protecting a population of 200,000 people by reducing mosquito population by over 60% in as little as three and a half months from deployment",
      "Won the IBM Watson’s AI XPRIZE ($5 million) with the team"
    ]
    },   
    {
      jobTitle: "CV Lead @",
      company: "Autonomous Rover Team",
      desc: [
        "Lead the design, development & deployment of the CV pipelines for two rovers to compete in the international robotics competition",
        "Deployed the pipeline with different detection and classification models, in production using TorchScript & ONNX on a Raspberry Pi",
        "Managed the vision team of 15 senior engineering students in an Agile development cycle, for the Intelligent Ground Vehicle Competition"
      ]
    },
]



const Jobs = () => {
  return (
    <section id='jobs'>
        <div className="section-header ">
            <span className="section-title">/ jobs</span>
        </div>
        <FadeInSection>
          <Swiper className='container jobs_container'
              pagination={{
                  type: "progressbar",
                  }}
              navigation={true}
              modules={[Pagination, Navigation]}>
              {
                  experienceItems.map(({jobTitle,company,duration,desc},index)=>{
                      return (
                          <SwiperSlide key={index} className='job'>
                            <span className='job_title'>{jobTitle + " "}</span>
                            <span className='job_company'>{company}</span>
                            <h5 className='job_duration'>{duration}</h5>
                            <ul className='job_description'>
                                {desc.map((descItem,i) => <li key={i}> {descItem} </li>)}
                            </ul>
                          </SwiperSlide>
                      )
                  })
              }
          </Swiper >
        </FadeInSection>
    </section>
  )
}


export default Jobs;

// run this command for defualt template: rafce