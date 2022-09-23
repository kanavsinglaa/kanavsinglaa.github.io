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
        "Worked in a team with seniorresearchers to build & ship a learning based planning stack for Huawei’s self driving system.",
        "Reproduced SOTA papers from scratch, orchestrated training runs on GPU clusters & extended these models to act as our baselines.",
        "Developed a modular and RL-friendly simulation environment (on top of CARLA) fortraining & modulartesting of different end to end or traditional autonomy stack based solutions, significantly improving team’s development productivity.",
        "Effectively contributed to the research, implementation & patents for different learning-based solutions developed by the team."
      ]
    },
    {
      jobTitle: "Machine Learning Summer Research Fellow @",
      company: "UofT Dynamic Optimization Lab",
      duration: "SUMMER 2020",
      desc: [
      "Achieved real-time inference at detecting contraband in X-ray baggage scans deployed in industry, at the Seoul–Incheon Intl. Airport.",
      "Led analysis & testing of 25+ object detection & classification models in Pytorch to maximize the recall for the problem in hand.",
      "Effectively managed a team of student researchers to develop the detection pipeline trained on a customized private data-set & successfully scored funding alongside ESROP- U of T fellowship award for the research conducted."
      ]
    },
    {
    jobTitle: "Junior Machine Learning Engineer @",
    company: "Omdena",
    duration: "SUMMER 2020",
    desc: [
      "Worked with a team of 50 contributors from across the globe to deploy an AI solution to prevent the spreading of Malaria in Africa, and other active sites in this world.",
      "Helped the finalist team of IBM Watson AI XPRIZE challenge (AI for Good), Zzapp Malaria to integrate our developed AI solution to their already built platform to win the $5 Million cash prize and take this initiative to the next level."
    ]
    },   
    {
      jobTitle: "CV Lead @",
      company: "Autonomous Rover Team",
      desc: [
        "Lead the design, development & deployment of the CV pipelines for two rovers to compete in the international robotics competition.",
        "Deployed the pipeline with different detection and classification models, in production using TorchScript & ONNX on a Raspberry Pi.",
        "Managed the vision team of 15 senior engineering students in an Agile development cycle, for the Intelligent Ground Vehicle Competition."
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