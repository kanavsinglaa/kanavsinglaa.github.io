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

const experienceItems = [
    {
      jobTitle: "AI Engineer @",
      company: "Huawei's Noah's Ark Lab",
      duration: "JUN 2021 - PRESENT",
      desc: [
        "Working in a team with seniorresearchers to build & ship a learning based planning stack for Huawei’s self driving system.",
        "Reproduced SOTA papers from scratch, orchestrated training runs on GPU clusters & extended these models to act as our baselines.",
        "Developed a modular and RL-friendly simulation environment (on top of CARLA) fortraining & modulartesting of different end to end or traditional autonomy stack based solutions, significantly improving team’s development productivity.",
        "Effectively contributed to the research, implementation & patents for different learning-based solutions developed by the team"
      ]
    },
    {
      jobTitle: "Machine Learning Summer Research Fellow @",
      company: "UofT DeepLearning lab",
      duration: "SUMMER 2020",
      desc: [
      "Achieved real-time inference at detecting contraband in X-ray baggage scans deployed in industry, at the Seoul–Incheon Intl. Airport.",
      "Led analysis & testing of 25+ object detection & classification models in Pytorch to maximize the recall forthe problem in hand.",
      "Effectively managed a team of student researchers to develop the detection pipeline trained on a customized private data-set & successfully scored funding alongside ESROP- U of T fellowship award forthe research conducted."
      ]
    },
    {
      jobTitle: "CV Lead @",
      company: "Autonomous Rover Team",
      desc: [
        "Lead the design, development & deployment of the CV pipelines fortwo rovers to compete in the internationalrobotics competition.",
        "Deployed the pipeline with different detection and classification models, in production using TorchScript",
        "Managed the vision team of 15 senior engineering students in an Agile development cycle, forthe Intelligent Ground Vehicle Competition."
      ]
    },
]




const Jobs = () => {
  return (
    <section id='jobs'>
        <div className="section-header ">
            <span className="section-title">/ jobs</span>
        </div>
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
                        {desc.map(function (descItem,i) {
                          return (
                            <li key={i}> {descItem} </li>
                          )
                        })}
                    </ul>
                    </SwiperSlide>
                        
                    )

                })
            }
            
        </Swiper >

    </section>
  )
}

export default Jobs

// run this command for defualt template: rafce