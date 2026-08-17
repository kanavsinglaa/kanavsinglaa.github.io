// All site content, mapped from the Aug 2026 resume.
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
  { t: 'i make voice models answer in ' },
  { t: '22 milliseconds', hl: 'voice' },
  { t: '. models & inference lead at sadie ai. before that i co-founded ' },
  { t: 'ampliphi', hl: 'product' },
  { t: ' (0 → $500k arr in a year), was the ' },
  { t: 'first ai hire', hl: 'models' },
  { t: ' at valsoft, and shipped ' },
  { t: 'self-driving planners', hl: 'autonomy' },
  { t: ' at huawei’s noah’s ark lab. i build eval sets before models, and kill expensive ideas with data.' },
]

export const experience = [
  {
    id: 'sadie',
    role: 'models & inference lead',
    org: 'Sadie AI',
    sub: 'multi-tenant real-time voice agent platform',
    when: 'apr 2026 — present',
    where: 'toronto',
    domain: 'voice',
    points: [
      'dropped first-sentence latency from 218 ms to 22 ms by warming models at session start; benchmarked GPU endpoints to low-200 ms p50 time-to-first-token.',
      'shipped an int8 ONNX classifier (40% → 87% accuracy) that cut per-turn LLM tokens 20% input / 33% output, measured by A/B on live production calls.',
      'cut LLM spend ~55% through a targeted inference migration, validated independently by finance to within 4%.',
      'stabilized delivery across turns, cutting acoustic discontinuity 72% on production call replays.',
      'run LoRA fine-tunes on managed inference endpoints to make voice models task-specific and controllable.',
      'build eval sets before models: gold-case suites with adversarial acceptance traps the baseline fails by design; killed two costly directions with that data.',
    ],
  },
  {
    id: 'ampliphi',
    role: 'technical co-founder & ai lead',
    org: 'Ampliphi',
    sub: 'a Valsoft company',
    when: 'jan 2025 — apr 2026',
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
    sub: 'ai founding engineer (2023) · ai solutions architect (2024) · ai solutions lead (2025)',
    when: 'jun 2023 — apr 2026',
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
    sub: null,
    when: 'jun 2021 — sep 2022',
    where: 'markham',
    domain: 'autonomy',
    points: [
      'shipped a learning-based planning stack for Huawei’s self-driving system.',
      'reproduced state-of-the-art planning papers from scratch as internal team baselines.',
      'orchestrated distributed training across GPU clusters and large multimodal datasets.',
      'built a modular closed-loop CARLA simulator for training and offline evaluation.',
      'contributed to team patents on learning-based autonomy.',
    ],
  },
]

export const results = [
  { value: '218 → 22 ms', label: 'first-sentence latency, warmed voice pipeline', domain: 'voice' },
  { value: '−55%', label: 'LLM spend, validated by finance to within 4%', domain: 'voice' },
  { value: '40% → 87%', label: 'int8 ONNX classifier accuracy, A/B on live calls', domain: 'models' },
  { value: '$0 → $500k', label: 'ARR at ampliphi in under a year', domain: 'product' },
  { value: '100+', label: 'hotels on shipped forecasting & dynamic pricing', domain: 'product' },
  { value: '−72%', label: 'acoustic discontinuity on production replays', domain: 'voice' },
]

export const research = [
  {
    title: 'undergraduate thesis — autonomous racing',
    org: 'Toronto Intelligent Systems Lab (TISL) · with Toyota Research Institute',
    when: 'sep 2022 — jun 2023',
    domain: 'autonomy',
    points: [
      'joint TISL × Toyota Research Institute project on autonomous racing.',
      'learned online adaptation as track conditions shift at run time.',
      'advised by Prof. Igor Gilitschenski (TISL).',
    ],
  },
  {
    title: 'machine learning summer researcher',
    org: 'University of Toronto',
    when: 'may — aug 2020',
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
    org: 'UofT Robotics Association · 2021 — 2022',
    domain: 'autonomy',
    text: 'led vision pipelines for two IGVC competition rovers; deployed detection and classification with TorchScript; managed a 15-person team.',
  },
  {
    title: 'junior machine learning engineer',
    org: 'Omdena × Zzapp Malaria · jul — sep 2020',
    domain: 'models',
    text: 'built satellite-imagery ML for malaria prevention with Zzapp Malaria, winner of the $5M IBM Watson AI XPRIZE.',
  },
  {
    title: 'software developer',
    org: 'sMart, student marketplace · jul — oct 2020',
    domain: 'product',
    text: 'built a student–mentor marketplace with personalized mentor recommendations. Django, React.',
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
    items: ['real-time streaming', 'latency profiling', 'TTFT tuning', 'managed endpoints', 'distributed GPU training', 'LiveKit pipelines', 'TorchScript', 'Docker'],
  },
  {
    group: 'practice',
    domain: 'product',
    items: ['eval harness design', 'production A/B testing', 'cost & capacity modeling', 'Python', 'SQL', 'mypy / ruff'],
  },
]
