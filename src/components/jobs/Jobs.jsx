import React, { useState } from 'react';
import './jobs.css';
import FadeInSection from '../FadeInSection/FadeInSection';

// const experienceItems = [
//     {
//         jobTitle: "Lead AI Engineer @",
//         company: "Valsoft",
//         duration: "AUG 2022 - PRESENT",
//         desc: [
//             "Directed AI initiatives, bridging the gap between innovative research and real-world applications.",
//             "Developed and deployed advanced AI-driven solutions, leading to a 20% increase in operational efficiency.",
//             "Collaborated with cross-functional teams, ensuring the seamless integration of AI modules with core products.",
//             "Mentored a team of junior AI engineers, fostering a culture of continuous learning and innovation."
//         ]
//     },
//     {
//     jobTitle: "AI Engineer @",
//     company: "Huawei Technologies, Noah's Ark Self Driving Division",
//     duration: "JUN 2021 - AUG2022",
//     desc: [

//         "Contributed to the implementations & patents for the planning stack of Huawei’s Autonomous Driving System",
//         "Implemented state-of-the-art end-to-end solutions from literature for prediction & planning in PyTorch",
//         "Orchestrated runs on big data-sets & performed hyperparameter tuning to develop 4 different baselines",
//         "Developed modular simulation environments for training & offline evaluation of our models, reducing team’s evaluation & testing times by 50%"
//     ]
//     },
//     {
//     jobTitle: "Machine Learning Summer Research Fellow @",
//     company: "UofT Dynamic Optimization Lab",
//     duration: "SUMMER 2020",
//     desc: [
//     "Developed a contraband detection pipeline for X-ray baggage scans using transfer learning on a private dataset",
//     "Led analysis & testing of object detection & classification models to increase the pipeline’s recall by 10%",
//     "Awarded with UofT Fellowship Award (valued at $10,000) for successful implementation of practical research",
//     "Achieved real-time inference & 94% recall for our pipeline deployed at the Seoul–Incheon Intl. Airport"
//     ]
//     },
//     {
//     jobTitle: "Junior Machine Learning Engineer @",
//     company: "Zzapp Malaria",
//     duration: "SUMMER 2020",
//     desc: [
//     "Worked on the vision pipeline integrating with a map-based mobile app to identify & detect malaria hotspots",
//     "Analyzed different models that utilized topography & satellite imagery to segment the transmission hotspots",
//     "Deployed the app across the sub-Saharan Africa protecting a population of 200,000 people by reducing mosquito population by over 60% in as little as three and a half months from deployment",
//     "Won the IBM Watson’s AI XPRIZE ($5 million) with the team"
//     ]
//     },   
//     {
//     jobTitle: "CV Lead @",
//     company: "Autonomous Rover Team",
//     desc: [
//         "Lead the design, development & deployment of the CV pipelines for two rovers to compete in the international robotics competition",
//         "Deployed the pipeline with different detection and classification models, in production using TorchScript & ONNX on a Raspberry Pi",
//         "Managed the vision team of 15 senior engineering students in an Agile development cycle, for the Intelligent Ground Vehicle Competition"
//     ]
//     },
// ]
const experienceItems = [
    {
        jobTitle: "AI Division Founding Engineer @",
        company: "Valsoft",
        duration: "JUN 2023 - PRESENT",
        desc: [
            "Spearheaded Valsoft's <emp>AI Lab</emp> in a compact team, owning the full AI product lifecycle from MVP to scaled deployment.",
            "Engineered innovative <emp>language and RAG-based sourcing tools</emp>, revolutionizing M&A lead generation.",
            "Showcased adaptability and technical prowess, seamlessly integrating cutting-edge AI into core M&A operations."
        ]
    },
    {
        jobTitle: "AI Engineer @",
        company: "Huawei Technologies, Noah's Ark Self Driving Division",
        duration: "JUN 2021 - AUG 2022",
        desc: [
            "Advanced Huawei's <emp>Autonomous Driving System</emp> through key implementations and patents.",
            "Developed <emp>modular simulation environments</emp>, halving team's evaluation time."
        ]
    },
    {
        jobTitle: "Machine Learning Summer Research Fellow @",
        company: "UofT Dynamic Optimization Lab",
        duration: "SUMMER 2020",
        desc: [
            "Crafted a <emp>contraband detection pipeline</emp> for X-ray baggage with 94% recall.",
            "Deployed at Seoul–Incheon Airport, backed by a <emp>UofT Fellowship Award</emp>."
        ]
    },
    {
        jobTitle: "Machine Learning Engineer @",
        company: "Zzapp Malaria",
        duration: "SUMMER 2020",
        desc: [
            "Spearheaded a <emp>vision pipeline</emp> to identify malaria hotspots, protecting 200K+ individuals.",
            "Contributed to winning <emp>IBM Watson’s AI XPRIZE ($5 million)</emp>."
        ]
    },
    {
        jobTitle: "CV Lead @",
        company: "Autonomous Rover Team",
        desc: [
            "Helmed <emp>CV development</emp> for two competition rovers, deploying on Raspberry Pi.",
            "Led a 15-member vision team for the <emp>Intelligent Ground Vehicle Competition</emp>."
        ]
    },
];
const Jobs = () => {
    const [hoveredJob, setHoveredJob] = useState(null);

    return (
        <section id='jobs'>
            <div className="section-header">
                <span className="section-title">/ jobs</span>
            </div>
            <div className={`timeline ${hoveredJob !== null ? 'job-hovered' : ''}`}>
                {
                    experienceItems.map(({ jobTitle, company, duration, desc }, index) => {
                        return (
                            <FadeInSection key={index}>
                                <div className={`job ${index % 2 === 0 ? 'left' : 'right'}`}>
                                    <span className='job_title'>{jobTitle + " "}</span>
                                    <span className='job_company'>{company}</span>
                                    { duration && <h5 className='job_duration'>{duration}</h5> }
                                    <div 
                                        className="circle" 
                                        onMouseEnter={() => setHoveredJob(index)} 
                                        onMouseLeave={() => setHoveredJob(null)}
                                    ></div>
                                    <ul className='job_description'>
                                        {desc.map((descItem, i) => <li key={i} dangerouslySetInnerHTML={{ __html: descItem }}></li>)}
                                    </ul>
                                </div>
                            </FadeInSection>
                        )
                    })
                }
            </div>
        </section>
    )
}

export default Jobs;