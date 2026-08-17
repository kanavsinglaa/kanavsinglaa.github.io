// All site content, mapped from the Aug 2026 resume (Kanav_Singla_Resume_1.pdf).
// Domains drive the color system: each entry is tagged with one.
//   voice  = voice & inference (amber)
//   models = models & training (green)
//   product = product & business (lilac)
//   autonomy = autonomy & robotics (blue)

export const contact = {
  name: 'kanav singla',
  location: 'Toronto, ON, Canada',
  email: 'navsngla@gmail.com',
  phone: '+1 647 936 7827',
  linkedin: 'https://linkedin.com/in/kanavsinglaa',
  github: 'https://github.com/kanavsinglaa',
  resume: '/resume.pdf',
}

export const intro = [
  { t: 'i bridge ' },
  { t: 'ai and creativity', hl: 'models' },
  { t: '. at ' },
  { t: 'sadie ai', url: 'https://www.heysadie.ai/' },
  { t: ' i work on models & inference for voice: shaving ' },
  { t: 'the silence before the first word', hl: 'voice' },
  { t: ', trimming the token bill behind every turn, teaching small models to do big-model work, and cleaning data until the evals mean something. i co-founded ' },
  { t: 'ampliphi', hl: 'product', url: 'https://www.getampliphi.com/about-us' },
  { t: ' and grew it from zero to half a million arr in a year. earlier i trained ' },
  { t: 'planning models', hl: 'autonomy' },
  { t: ' for self-driving cars at huawei’s noah’s ark lab. i like hard problems and instruments that feel alive.' },
]

export const discussion = [
  {
    title: 'speed',
    domain: 'voice',
    text: 'model stacks have a half-life of months now. i treat that as the game: learn continuously, push each new tool to its cracks, and ship with it while everyone else is still forming an opinion.',
  },
  {
    title: 'taste',
    domain: 'product',
    text: 'i got here through the bridge between ai and creativity: generative art, music, interfaces that feel alive. products get judged with a designer’s eye, not just a benchmark suite.',
  },
  {
    title: 'depth',
    domain: 'autonomy',
    text: 'taste without depth is decoration. mine is earned: training planning models end-to-end for huawei’s self-driving lab, and engineering science at uoft, the most rigorous undergraduate engineering program in canada.',
  },
]

export const experience = [
  {
    id: 'sadie',
    role: 'models & inference',
    org: 'Sadie AI',
    url: 'https://www.heysadie.ai/',
    sub: 'voice AI for hospitality, live in 1,500+ restaurants and hotels',
    when: 'apr 2026 → present',
    where: 'toronto',
    domain: 'voice',
    points: [
      'dropped first-sentence latency from 218 ms to 22 ms by warming models at session start; benchmarked GPU endpoints to low-200 ms p50 time-to-first-token.',
      'fine-tune models for specific verticals so restaurants, hotels, and car rental each book in their own language.',
      'shipped an int8 ONNX classifier (40% to 87% accuracy) that cut per-turn LLM tokens 20% input and 33% output on live production calls.',
      'cut LLM spend ~55% with a targeted inference migration, validated independently by finance to within 4%.',
      'own the data path end to end: mine production calls, build labeling pipelines, and freeze gold eval sets before every training run.',
      'stabilized turn-to-turn delivery, cutting acoustic discontinuity 72% on production call replays.',
      'killed two costly bets early with data, not opinion, using traps the baseline fails by design.',
    ],
  },
  {
    id: 'ampliphi',
    role: 'technical co-founder & ai lead',
    org: 'Ampliphi',
    url: 'https://www.getampliphi.com/about-us',
    sub: 'a Valsoft company',
    when: 'jan 2025 → apr 2026',
    where: 'toronto',
    domain: 'product',
    points: [
      'owned the complete MVP: backend, ML and LLM architecture, and the end-to-end AI team.',
      'built the platform from 0 to half a million ARR in under a year, across the US, Canada, and Australia.',
      'shipped demand forecasting, compression-event consolidation, and dynamic pricing to 100+ hotels.',
      'layered LLM pricing insights and LLM-extracted event signals into demand forecasts.',
      'hired and led the AI team, owning the evaluation bar every model cleared before it touched customer pricing.',
    ],
  },
  {
    id: 'valsoft',
    role: 'ai solutions lead',
    org: 'Valsoft / Aspire Software',
    url: 'https://www.aspiresoftware.com/ai-labs/',
    sub: 'ai founding engineer (2023) · ai solutions architect (2024) · ai solutions lead (2025)',
    when: 'jun 2023 → apr 2026',
    where: 'toronto',
    domain: 'models',
    points: [
      'first AI hire; built Valsoft’s M&A sourcing platform on LLM extraction and retrieval.',
      'turned it into a repeatable acquisition-sourcing engine, funded by parent firm Valsef.',
      'grew from sole contributor to owning AI architecture across the portfolio.',
      'shipped AI features from prototype to revenue with portfolio SaaS teams.',
    ],
  },
  {
    id: 'huawei',
    role: 'ai research engineer',
    org: 'Noah’s Ark Lab, Huawei',
    url: 'https://www.noahlab.com.hk/en',
    sub: null,
    when: 'jun 2021 → sep 2022',
    where: 'markham',
    domain: 'autonomy',
    points: [
      'shipped a learning-based planning stack for Huawei’s self-driving system.',
      'reproduced state-of-the-art planning papers from scratch as internal team baselines.',
      'orchestrated distributed training across GPU clusters and large multimodal datasets.',
      'built a modular closed-loop CARLA simulator for training and offline evaluation.',
    ],
  },
]

export const results = [
  { value: '218 → 22 ms', label: 'first-sentence latency for live voice agents', domain: 'voice' },
  { value: '1,500+', label: 'restaurants and hotels answering with voice AI', domain: 'voice' },
  { value: '$0 → $500k', label: 'ARR in year one as technical co-founder', domain: 'product' },
  { value: '−55%', label: 'LLM inference spend, at production scale', domain: 'voice' },
  { value: '100+', label: 'hotels running live ML pricing', domain: 'product' },
  { value: '94%', label: 'recall, real-time detection shipped to incheon airport', domain: 'models' },
]

export const research = [
  {
    title: 'undergraduate thesis: autonomous racing',
    org: 'Toronto Intelligent Systems Lab × Toyota Research Institute',
    url: 'https://tisl.cs.toronto.edu/',
    when: '2022 → 2023',
    domain: 'autonomy',
    points: [
      'joint TISL and Toyota Research Institute project on autonomous racing.',
      'learned online adaptation as track conditions shift at run time.',
      'advised by Prof. Igor Gilitschenski (TISL).',
    ],
  },
  {
    title: 'machine learning summer researcher',
    org: 'University of Toronto',
    url: null,
    when: 'may → aug 2020',
    domain: 'models',
    points: [
      'evaluated 25+ detection models; lifted recall 10%.',
      'shipped a 94%-recall real-time pipeline to Incheon Airport.',
      'won a UofT fellowship award.',
    ],
  },
]

export const projects = [
  {
    title: 'computer vision lead, autonomous rover team',
    org: 'UofT Robotics Association · 2021 → 2022',
    domain: 'autonomy',
    text: 'led vision pipelines for two IGVC competition rovers; deployed detection and classification with TorchScript; managed a 15-person team.',
  },
  {
    title: 'junior machine learning engineer',
    org: 'Omdena × Zzapp Malaria · jul → sep 2020',
    domain: 'models',
    text: 'built satellite-imagery ML for malaria prevention with Zzapp Malaria, winner of the $5M IBM Watson AI XPRIZE.',
  },
  {
    title: 'software developer',
    org: 'sMart, student marketplace · jul → oct 2020',
    domain: 'product',
    text: 'built a student and mentor marketplace with personalized mentor recommendations. Django, React.',
  },
]

export const education = {
  school: 'University of Toronto',
  degree: 'BASc, Engineering Science (honors)',
  detail: 'robotics major · minors in AI and business · 2023',
}

export const skills = [
  {
    group: 'models',
    domain: 'models',
    items: ['PyTorch', 'HuggingFace', 'ONNX Runtime', 'LoRA / PEFT', 'post-training', 'quantization', 'TTS / STT', 'LLMs & RAG', 'computer vision'],
  },
  {
    group: 'inference',
    domain: 'voice',
    items: ['real-time streaming', 'latency profiling', 'TTFT tuning', 'managed endpoints', 'distributed GPU training', 'LiveKit pipelines', 'TorchScript'],
  },
  {
    group: 'data & evals',
    domain: 'product',
    items: ['dataset curation from production traffic', 'labeling pipelines', 'gold eval sets', 'adversarial test design', 'production A/B testing', 'cost & capacity modeling'],
  },
  {
    group: 'practice',
    domain: 'autonomy',
    items: ['Python', 'SQL', 'mypy / ruff', 'Docker'],
  },
]
